import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// import fetch from "node-fetch";
import { setContext } from 'apollo-link-context';
// import { relayStylePagination } from '@apollo/client/utilities';
// import { offsetLimitPagination } from '@apollo/client/utilities';

let uri = '';
const environment = process.env.NODE_ENV;
// console.log(environment);
if (environment === 'development') {
  uri = 'http://localhost:4000/';
} else {
  uri = 'https://warm-island-75318.herokuapp.com/';
}

const httpLink = createHttpLink({
  uri: uri,
  // fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
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
          allventasCurrentMonth: {
            merge(existing, incomming) {
              return incomming;
            },
          },
          zapatosCodigo: {
            merge(existing, incomming) {
              return incomming;
            },
          },
          zapatosToDownload: {
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
      localStorage.removeItem('token');
      location.href = '/';
    }
  },
});

export default client;

// ctrl + p = search between files
