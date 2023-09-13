import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import { useRef } from "react";
import emailjs from '@emailjs/browser';

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(NEXT_PUBLIC_EMAIL_ID, NEXT_PUBLIC_TEMPLATE_ID, form.current, NEXT_PUBLIC_EMAIL_KEY)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="pb-0 section row">
          <div className="col-12 md:col-6 lg:col-7">
            <form
              className="contact-form"
              method="POST"
              action={contact_form_action}
              ref={form}
              onSubmit={sendEmail}
            >
              <div className="mb-3">
                <input
                  className="w-full rounded form-input"
                  name="from_name"
                  type="text"
                  placeholder="Peter Rainier"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="w-full rounded form-input"
                  name="from_email"
                  type="email"
                  placeholder="pete@example.com"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="w-full rounded form-input"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="w-full rounded-md form-textarea"
                  rows="7"
                  placeholder="Your message"
                  name="message"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Send Now
              </button>
            </form>
          </div>
          <div className="content col-12 md:col-6 lg:col-5">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            <ul className="mt-5 contact-list">
              {info.contacts.map((contact, index) => (
                <li key={index} className="text-sm sm:text-base">
                  {markdownify(contact.method, "strong", "text-dark")}
                  <span className="pl-2">{markdownify(contact.text, "span", "text-dark")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
