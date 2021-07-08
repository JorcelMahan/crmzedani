import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
//theme
import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme/index";
import VentasState from "../context/ventas/VentasState";
import SalidaState from "../context/salidas/SalidaState";
import AuthState from "../context/auth/AuthState";
import CierreState from "../context/cierre/CierreState";
// styles
import "../assets/index.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import Main from "../layouts/Main/Main";
import Head from 'next/head';

const MyApp = ({ Component, pageProps, router }) => {
  if (router.pathname.startsWith("/login")) {
    return (
      <ApolloProvider client={client}>
        <Head>
          <title>Zedani</title>
          <meta name='viewport' content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <AuthState>
            <VentasState>
              <SalidaState>
                <CierreState>
                  <Component {...pageProps} />
                </CierreState>
              </SalidaState>
            </VentasState>
          </AuthState>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
  if (
    router.pathname.startsWith("/sign-up") ||
    router.pathname.startsWith("/new-employee")
  ) {
    return (
      <ApolloProvider client={client}>
        <Head>
          <title>Zedani</title>
          <meta name='viewport' content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Zedani</title>
        <meta name='viewport' content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthState>
          <VentasState>
            <SalidaState>
              <CierreState>
                <Main>
                  <Component {...pageProps} />
                </Main>
              </CierreState>
            </SalidaState>
          </VentasState>
        </AuthState>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
