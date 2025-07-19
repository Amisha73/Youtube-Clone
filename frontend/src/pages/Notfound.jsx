import React from 'react';

const NotFound = () => {
  return (
    <section className="min-w-screen min-h-screen flex justify-center items-center gap-4">
      <div className="p-4 rounded-md flex justify-center flex-col items-center">
        <img
          // src="https://res.cloudinary.com/dtayqqu2k/image/upload/v1752761330/nwy3invdr5bktnohpy5u.png"
          src='https://thumbs.dreamstime.com/b/oops-error-page-not-found-sign-oops-error-page-not-found-sign-white-background-143897660.jpg'
          alt="not found"
          className="w-60 h-60 rounded-full shadow-md shadow-gray-200"
        />

        <div className="flex flex-col justify-center items-center mt-3">
          <p className="text-gray-500 mb-6 text-center">
            Sorry, the page you’re looking for doesn’t exist or has been moved.
          </p>
          <a
            href="/"
            className="text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black w-40 transition"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
