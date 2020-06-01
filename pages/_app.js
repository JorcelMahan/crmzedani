import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
//theme
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme/index';
import VentasState from '../context/ventas/VentasState';
// styles
import '../assets/index.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Main from '../layouts/Main/Main';
import React from "react";

const MyApp = ({ Component, pageProps, router }) => {
  if (router.pathname.startsWith('/login')) {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <VentasState>
            <Component {...pageProps} />
          </VentasState>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
  if (router.pathname.startsWith('/sign-up')) {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <VentasState>
            <Component {...pageProps} />
          </VentasState>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <VentasState>
          <Main>
            <Component {...pageProps} />
          </Main>
        </VentasState>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
