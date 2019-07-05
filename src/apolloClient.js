import ApolloClient from 'apollo-boost';

import { getAccessToken, hasAccessToken } from 'utils/accessToken';

export default new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  request: async (operation) => {
    if (hasAccessToken()) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${getAccessToken()}`,
        },
      });
    }
  },
});
