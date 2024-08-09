import React from 'react';
import { Navbar } from '../components';

export const MainLayout = ({ children, className = '' }) => {
  return (
    <>
      <Navbar />
      <main className={`layout-delimiter ${className}`}>
        {children}
      </main>
    </>
  );
}
