import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import _ from 'lodash';

import FormikMutation from 'components/FormikMutation';
import useSnackbar from 'utils/snackbar';
import { projectNodeFragment } from 'utils/graphql';

import Archive from './Archive';
import Schema from './Schema';
import Form from './Form';

const createProjectMutation = gql`
  mutation CreateProject(
    $title: String!,
    $description: String!,
    $category: CategoryEnum!,
    $danmakufuVersion: DanmakufuVersionEnum!,
    $signedBlobId: String!
  ) {
    createProject(input: {
      title: $title
      description: $description
      category: $category
      danmakufuVersion: $danmakufuVersion
      signedBlobId: $signedBlobId
    }) {
      project {
        ...ProjectNode
      }
      errors {
        path
        message
      }
    }
  }
  ${projectNodeFragment}
`;

const NewProject = ({ onSuccess }) => {
  const [uploading, setUploading] = useState(true);
  const showSnackbar = useSnackbar();

  return (
    <FormikMutation
      mutation={createProjectMutation}
      onMutationSuccess={(response, { setFieldError }) => {
        const { data: { createProject: { project, errors } } } = response;

        if (_.isEmpty(errors)) {
          onSuccess(project);
        } else {
          _.each(errors, ({ path, message }) => {
            setFieldError(path[1], message);
          });
        }
      }}
      initialValues={{
        title: '',
        description: '',
        category: 'SINGLE',
        danmakufuVersion: 'V_PH3',
        signedBlobId: '',
      }}
      validationSchema={Schema}
    >
      {
        ({ isSubmitting, setFieldValue }) => {
          const handleUploadFinish = ({ signedBlobId }) => {
            setFieldValue('signedBlobId', signedBlobId);
            setUploading(false);
          };

          const handleUploadError = (message) => {
            showSnackbar(message, 'error');
          };

          return (
            <>
              <Archive
                onFinish={handleUploadFinish}
                onError={handleUploadError}
              />
              <Form isSubmitting={isSubmitting} uploading={uploading} />
            </>
          );
        }
      }
    </FormikMutation>
  );
};

NewProject.propTypes = {
  onSuccess: PropTypes.func,
};

NewProject.defaultProps = {
  onSuccess: null,
};

export default NewProject;
