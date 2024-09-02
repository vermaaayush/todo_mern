import React from 'react'

const About = () => {
  return (
   <>
   
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
</section></>
  )
}

export default About
