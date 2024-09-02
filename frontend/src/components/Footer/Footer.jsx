import React from 'react'
import imgSrc from '../../assets/12.png'; 
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div>
         <footer className="bg-gray-900">
  <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="flex justify-center">
           <Link  to="/">
              <img src={imgSrc} alt="" width={250} />
            </Link>
    </div>

    <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
    EasyDoc helps you manage documents and tasks effortlessly, keeping everything organized and accessible in one place.
    </p>

    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="/"> Home </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="/about"> About </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="login"> Sign In </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="signup"> Sign Up </a>
      </li>

   
    </ul>
 <br />
 <br />
    <p className='text-center text-gray-700 transition hover:text-gray-700/75 font-bold'>© 2024 EasyDoc. All rights reserved.</p>
  </div>
</footer>
    </div>
  )
}

export default Footer
