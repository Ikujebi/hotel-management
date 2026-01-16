'use client';

import { useEffect, useState } from 'react';
import ThemeContext from '@/context/themeContext';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [mounted, setMounted] = useState(false); // avoid flash

  // Load theme from localStorage on client
  useEffect(() => {
    const themeFromStorage = localStorage.getItem('hotel-theme');
    if (themeFromStorage) setDarkTheme(JSON.parse(themeFromStorage));
    setMounted(true);
  }, []);

  // Apply/remove `dark` class on body & persist theme
  useEffect(() => {
    if (!mounted) return;
    if (darkTheme) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    localStorage.setItem('hotel-theme', JSON.stringify(darkTheme));
  }, [darkTheme, mounted]);

  if (!mounted) return null; // prevent flash of wrong theme

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children} {/* no extra divs */}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
