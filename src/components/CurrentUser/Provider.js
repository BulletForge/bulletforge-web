import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import _ from 'lodash';

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
      ({ loading, error, data }) => {
        if (loading) {
          return <p>loading...</p>;
        }
        if (error) {
          return <p>{error.message}</p>;
        }
        return (
          <context.Provider value={_.get(data, 'me', 'user')}>
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
