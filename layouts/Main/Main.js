import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import Footer from './components/Footer/Footer';
import TopBar from './components/TopBar/TopBar';
import SideBar from './components/Sidebar/Sidebar';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
const GET_USER = gql`
  query getUser {
    getUser {
      name
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: '100%',
  },
}));

const Main = ({ children }) => {
  const { loading, error, data } = useQuery(GET_USER);
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  const shouldOpenSidebar = isDesktop ? true : openSidebar;
  if (loading) return 'Loading...';
  if (error) return `Error ${error.message}`;
  if (!data.getUser) return router.push('/login');
  const { name } = data.getUser;
  const closeSession = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <TopBar onSidebarOpen={handleSidebarOpen} closeSession={closeSession} />
      <SideBar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
        name={name}
      />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Main;
