import {
  ApolloClient,
  concat,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';

// const uridevelop = 'http://localhost:4000/';
const uriproduction = 'https://warm-island-75318.herokuapp.com/';
const HttpLink = createHttpLink({
  uri: uriproduction,
  fetch,
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
    addTypename: false,
  }),
  link: concat(authLink, HttpLink),
  onError: (error) => {
    const { networkError } = error;
    if (networkError && networkError.result.code === 'invalid_token') {
      sessionStorage.removeItem('token');
      location.href = '/';
    }
  },
});

export default client;
