import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// import fetch from "node-fetch";
import { setContext } from 'apollo-link-context';

// const uridevelop = 'http://localhost:4000/';
const uriproduction = 'https://warm-island-75318.herokuapp.com/';
const httpLink = createHttpLink({
  uri: uriproduction,
  // fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          salesByDate: {
            merge(existing, incomming) {
              return incomming;
            },
          },
          salesStoreByDate: {
            merge(existing, incomming) {
              return incomming;
            },
          },
          allventas: {
            merge(existing, incomming) {
              return incomming;
            },
          },
          zapatosAlmacen: {
            merge(existing, incomming) {
              return incomming;
            },
          },
        },
      },
    },
    addTypename: false,
  }),
  link: authLink.concat(httpLink),
  onError: (error) => {
    const { networkError } = error;
    if (networkError && networkError.result.code === 'invalid_token') {
      sessionStorage.removeItem('token');
      location.href = '/';
    }
  },
});

export default client;
