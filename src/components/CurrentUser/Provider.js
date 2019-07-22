import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import _ from 'lodash';
import { setAccessToken, clearAccessToken } from 'utils/accessToken';
import context from './context';

const query = gql`
  query Me {
    me {
      id
      login
      email
      admin
    }
  }
`;

const Provider = ({ children }) => (
  <Query query={query}>
    {
      ({
        loading, error, data, refetch,
      }) => {
        const user = _.get(data, 'me');

        const logout = () => {
          clearAccessToken();
          refetch();
        };

        const login = (token) => {
          setAccessToken(token);
          refetch();
        };

        return (
          <context.Provider
            value={{
              user,
              loading,
              error,
              logout,
              login,
            }}
          >
            { children }
          </context.Provider>
        );
      }
    }
  </Query>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
