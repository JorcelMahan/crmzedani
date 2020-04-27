import React from 'react';
import Head from 'next/head';

import Sidebar from './SideBar';
import { useRouter } from 'next/router';
const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>ZEDANI</title>
      </Head>
      {router.pathname === '/login' ? (
        { children }
      ) : (
        <Sidebar>{children}</Sidebar>
      )}
    </>
  );
};

export default Layout;
