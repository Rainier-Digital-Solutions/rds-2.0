import config from "@config/config.json";
import { useRouter } from "next/router";
import { markdownify } from "@lib/utils/textConverter";
import { useRef, useState } from "react";
import Toast from "./components/Toast";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;
  const form = useRef();
  const [showToast, setShowToast] = useState(false);
  const [fromName, setFromName] = useState('');
  const router = useRouter();

  const sendEmail = (e) => {
    e.preventDefault();

    const enteredFromName = form.current.elements.from_name.value;
    const honeyPotEntry = form.current.elements.url.value;

    if (honeyPotEntry) {
      setFromName('for your submission');
      setShowToast(true);
    } else {
          form.current.reset();
          setFromName(enteredFromName);
          setShowToast(true);

          router.push('/thank-you');

          setTimeout(() => {
            router.back();
          }, 2000);
    }
    setTimeout(() => {
      setShowToast(false);
      setFromName('');
    }, 3000);
  };

  return (
    <section className="section">
      {showToast && <Toast fromName={fromName} />}
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
              name="RDS Contact Form"
            >
              <div className="mb-3">
                <div className="absolute ml-[-9999px]">
                  <label htmlFor="website-url">Your Website Url</label>
                  <input type="text" id="website-url" name="url" tabIndex={-1} autoComplete="false" />
                </div>
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
                  required
                  spellCheck
                  autoComplete="on"
                  autoCorrect="on"
                  maxLength={1024}
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
