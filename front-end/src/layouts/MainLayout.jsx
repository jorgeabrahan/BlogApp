import React from 'react';
import { Navbar } from '../components';

export const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  );
}
