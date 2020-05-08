import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
//theme
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme/index';
import VentasState from '../context/ventas/VentasState';
// styles
import '../assets/index.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
// import Main from '../layouts/Main/Main';
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
