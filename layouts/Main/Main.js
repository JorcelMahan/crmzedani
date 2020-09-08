import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import Footer from './components/Footer/Footer';
import TopBar from './components/TopBar/TopBar';
import SideBar from './components/Sidebar/Sidebar';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import AuthContext from '../../context/auth/AuthContext';

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
  const authContext = useContext(AuthContext);
  const { deselectUsername, addUsername } = authContext;
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
  useEffect(() => {
    if (data) {
      if (data.getUser !== null) addUsername(data.getUser.name);
    }
  }, [data]);
  if (loading) return 'Loading...';
  if (error) return `Error ${error.message}`;
  if (!data.getUser) {
    router.push('/login');
    return null;
  }

  const closeSession = async () => {
    sessionStorage.removeItem('token');
    deselectUsername();
    await router.push('/login');
    return null;
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
      />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Main;
