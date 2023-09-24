import Link from 'next/link';
import Image from 'next/image';

const ThankYouPage = () => {
  return (
    <div className="container py-16 mx-auto text-center">
      <h1 className="mb-4 text-3xl font-semibold">Thank you for your submission!</h1>
      <p className="mb-8 text-lg">
        We have received your message and will get back to you shortly.
      </p>
      <p className="text-sm">
        Redirecting back to the previous page...
      </p>
      {/* You can also include a link to go back to the homepage or any other page */}
      <Link href="/" className="inline-block mt-4 text-blue-500 hover:underline">
        Return to Home
      </Link>
      <div className='my-5'>
        <Image
          src="/images/special/redirect.png"
          alt="We are redirecting you back to the previous page."
          width={768}
          height={768}
          priority
          className='mx-auto'
        />
      </div>
    </div>
  );
};

export default ThankYouPage;
