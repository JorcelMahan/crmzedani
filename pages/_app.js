import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
//theme
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme/index';
import VentasState from '../context/ventas/VentasState';
import SalidaState from '../context/salidas/SalidaState';
import AuthState from '../context/auth/AuthState';
// styles
import '../assets/index.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Main from '../layouts/Main/Main';
import React from 'react';

const MyApp = ({ Component, pageProps, router }) => {
  if (router.pathname.startsWith('/login')) {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <VentasState>
            <SalidaState>
              <AuthState>
                <Component {...pageProps} />
              </AuthState>
            </SalidaState>
          </VentasState>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
  if (router.pathname.startsWith('/sign-up')) {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <VentasState>
          <SalidaState>
            <AuthState>
              <Main>
                <Component {...pageProps} />
              </Main>
            </AuthState>
          </SalidaState>
        </VentasState>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
