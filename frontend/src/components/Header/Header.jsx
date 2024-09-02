import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearUser } from '../../slice/userSlice';
import { useNavigate } from 'react-router-dom';
import imgSrc from '../../assets/12.png'; 

const Header = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
     

      const response = await axios.post("http://localhost:3000/users/logout", {}, {
        withCredentials: true,
      });

      console.log('Logout response:', response);

     
      dispatch(clearUser());

      
      sessionStorage.removeItem('persist:root');


      toast.success("Logout successful!");
      navigate('/'); // Redirect to login page after logout
    } catch (err) {
      console.log('Logout failed', err);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link  to="/">
              <img src={imgSrc} alt="" width={180} />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <nav aria-label="Global" className="hidden md:block">
                  <ul className="flex items-center gap-6 text-sm">
                    {/* <li>
                      <NavLink className="text-orange-500 transition hover:text-orange-500/75" to="/">Home</NavLink>
                    </li>
                    <li>
                      <NavLink className="text-orange-500 transition hover:text-orange-500/75" to="/about">About</NavLink>
                    </li> */}
                    <li>
                      <NavLink className="text-orange-500 transition hover:text-orange-500/75" to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                      <NavLink className="text-orange-500 transition hover:text-orange-500/75" to="/profile">Profile</NavLink>
                    </li>
                    <li>
                      <button className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow" onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </nav>
              ) : (
                <>
                  {/* <nav aria-label="Global" className="hidden md:block">
                    <ul className="flex items-center gap-6 text-sm">
                      <li>
                        <NavLink className="text-orange-600 transition hover:text-orange-500/75  text-xl" to="/">Home</NavLink>
                      </li>
                      <li>
                        <NavLink className="text-orange-600 transition hover:text-orange-500/75 text-xl" to="/about">About</NavLink>
                      </li>
                    </ul>
                  </nav> */}
                  <div className="sm:flex sm:gap-4">
                    <Link
                      className="rounded-md bg-orange-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                      to="/login"
                    >
                      Sign In
                    </Link>
                    <div className="hidden sm:flex">
                      <Link
                        className="rounded-md bg-orange-100 px-5 py-2.5 text-sm font-medium text-orange-600"
                        to="/signup"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </>
              )}

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
