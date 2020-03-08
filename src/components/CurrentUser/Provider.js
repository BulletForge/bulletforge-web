import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';

import { setAccessToken, clearAccessToken } from 'utils/accessToken';
import { userNodeFragment } from 'utils/graphql';

import context from './context';

const query = gql`
  query Me {
    me {
      ...UserNode
    }
  }
  ${userNodeFragment}
`;

const Provider = ({ children }) => {
  const {
    loading, error, data, refetch,
  } = useQuery(query);

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
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
