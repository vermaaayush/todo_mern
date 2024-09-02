import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <>
    <section className="relative bg-gray-50 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
      <video
          src="https://res.cloudinary.com/dpvmafj9s/video/upload/v1725224136/4k_Video___Technology_Looped_Background___No_Copyright_Loop_Background_Video_tsim8t.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        
      </div>
      
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center relative z-10">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
            Your Digital Vault for
            <strong className="font-extrabold text-orange-600 sm:block">
              Notes and Documents.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-white">
          Effortlessly create, manage, and share your documents with EasyDoc. Enjoy seamless organization, secure storage, and quick access to your notes and files, all in one intuitive platform.          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-orange-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-orange-700 focus:outline-none focus:ring active:bg-orange-500 sm:w-auto"
              to="/login"
            >
              Sign In
            </Link>

            <Link
              className="block w-full rounded px-12 py-3 text-sm font-medium text-orange-600 shadow hover:text-orange-700 focus:outline-none focus:ring active:text-orange-500 sm:w-auto border-orange-600 border-2"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>

<br />
    <span class="relative flex justify-center">
  <div
    class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-orange-600 to-transparent opacity-75"
  ></div>

  <span class="relative z-10 bg-white px-6 text-orange-600">EasyDoc By Aayush Verma</span>
</span>
<br />

<section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <img
          alt=""
          src="https://res.cloudinary.com/dpvmafj9s/image/upload/v1725261515/pexels-serpstat-177219-572056_1_xc3dwv.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="lg:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">Welcome to EasyDoc, where simplicity meets productivity</h2>

        <p className="mt-4 text-gray-600">
        At EasyDoc, we believe that managing your documents and tasks should be straightforward and efficient. That's why we've created a platform that seamlessly integrates document management with to-do list functionalities, giving you the tools you need to stay organized and on top of your work.

        </p>

        <p className="mt-4 text-gray-600">
        With a focus on user-friendly design and robust security, EasyDoc ensures that your documents and tasks are not only accessible but also protected. We're committed to helping you streamline your workflow so you can focus on what really matters.
        </p>

        <a
          href="/signup"
          className="mt-8 inline-block rounded bg-orange-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-orange-600 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Get Started Today
        </a>
      </div>
    </div>
  </div>
</section>

<section>
  <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
      <div className="relative z-10 lg:py-16">
        <div className="relative h-64 sm:h-80 lg:h-full">
          <img
            alt=""
            src="https://res.cloudinary.com/dpvmafj9s/image/upload/v1725261517/pexels-thisisengineering-3862132_dxrgpn.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="relative flex items-center bg-gray-100">
        <span
          className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"
        ></span>

        <div className="p-8 sm:p-16 lg:p-24">
          <h2 className="text-2xl font-bold sm:text-3xl">
          Organize Your Life with EasyDoc: Docs & To-Dos in One Place
          </h2>

          <p className="mt-4 text-gray-600">
          EasyDoc combines powerful document management with a robust to-do list feature, giving you the ultimate tool for productivity. Create, edit, and share documents while keeping track of your tasks, all within a single, user-friendly platform. Whether you're working solo or collaborating with a team, EasyDoc helps you stay on top of your work, ensuring everything you need is just a click away.
      
          </p>

        
        </div>
      </div>
    </div>
  </div>
</section>
<div className="space-y-4 pr-40 pl-40 pb-40">
  <h1 className='text-center font-bold'>FAQ</h1>
  <details className="group [&_summary::-webkit-details-marker]:hidden" open>
    <summary
      className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="font-medium">How do I create an account on EasyDoc?</h2>

      <svg
        className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>

    <p className="mt-4 px-4 leading-relaxed text-gray-700">
    Click "Sign Up" on the homepage, enter your details, and verify your email to start using EasyDoc.
    </p>
  </details>

  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="font-medium">How do I manage my account settings?</h2>

      <svg
        className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>

    <p className="mt-4 px-4 leading-relaxed text-gray-700">
    Log in, go to "Account Settings" under your profile, and update your personal info, password, or subscription.
    </p>
  </details>


  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="font-medium">How do I share a document with others?</h2>

      <svg
        className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>

    <p className="mt-4 px-4 leading-relaxed text-gray-700">
    Open the document, click "Share," enter the recipients' emails, set permissions, and send.
    </p>
  </details>
</div>
    </>
  )
}

export default Home
