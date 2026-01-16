'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useSession } from 'next-auth/react';

import ThemeContext from '@/context/themeContext';
import Image from 'next/image';

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const { data: session } = useSession();

  return (
    <header className='py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between'>
      <div className='flex items-center w-full md:2/3'>
        <Link href='/' className='font-black text-[#F27405] no-underline'>
          Hotelzz
        </Link>
        <ul className='flex items-center ml-5'>
          <li className='flex items-center'>
            {session?.user ? (
              <Link href={`/users/${session.user.id}`}>
                {session.user.image ? (
                  <div className='w-10 h-10 rounded-full overflow-hidden'>
                    <Image
                      src={session.user.image}
                      alt={session.user.name!}
                      width={40}
                      height={40}
                      className='scale-animation img'
                    />
                  </div>
                ) : (
                  <FaUserCircle className='cursor-pointer' />
                )}
              </Link>
            ) : (
              <Link href='/auth'>
                <FaUserCircle className='cursor-pointer' />
              </Link>
            )}
          </li>
          <li className='ml-2'>
            {darkTheme ? (
              <MdOutlineLightMode
                className='cursor-pointer'
                onClick={() => {
                  setDarkTheme(false);
                  localStorage.removeItem('hotel-theme');
                }}
              />
            ) : (
              <MdDarkMode
                className='cursor-pointer'
                onClick={() => {
                  setDarkTheme(true);
                  localStorage.setItem('hotel-theme', 'true');
                }}
              />
            )}
          </li>
        </ul>
      </div>

 <ul className="flex items-center justify-end w-full mt-4 space-x-6 text-gray-800 dark:text-gray-200 font-medium list-none">
  {['Home', 'Rooms', 'Contact'].map((link, i) => (
    <li
      key={i}
      className="cursor-pointer transform transition duration-300 ease-in-out 
                 hover:-translate-y-2 hover:scale-110 active:translate-y-1 active:scale-105"
    >
      <Link
        href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
        className="text-lg md:text-xl font-semibold  hover:text-[#F27405] transition-colors duration-300 no-underline "
      >
        {link}
      </Link>
    </li>
  ))}
</ul>
    </header>
  );
};

export default Header;
