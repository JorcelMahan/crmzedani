import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
//theme
import { ThemeProvider } from '@material-ui/styles';
import theme from '../components/ui/theme';
import VentasState from '../context/ventas/VentasState';
import SideBar from '../components/SideBar';
const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <VentasState>
          <Component {...pageProps} />
        </VentasState>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
