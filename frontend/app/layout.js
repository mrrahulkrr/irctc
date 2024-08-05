import Link from 'next/link';
import './globals.css';
import { ReactNode } from 'react';

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Railway Management System</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <nav className='flex flex-row justify-between px-2 py-2 bg-blue-500 p-4 text-white'>
          <ul className='px-2 py-2 flex space-x-4 justify-center'>
            <li><a className='cursor:pointer mx-2 my-2' href="/">Home</a></li>
            <li><a className='cursor:pointer'  href="/login">Login</a></li>
            <li><a className='cursor:pointer'  href="/signup">Sign Up</a></li>
            <li><a className='cursor:pointer'  href="/trains">Trains</a></li>
            {/* <li><Link href="/book">Book Seat</Link></li> */}
            <li><a className='cursor:pointer'  href="/bookings">Bookings</a></li>
          </ul>
        </nav>
        <main className='p-6'>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
