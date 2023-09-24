import Link from 'next/link';

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
    </div>
  );
};

export default ThankYouPage;
