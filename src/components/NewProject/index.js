import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import _ from 'lodash';

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
    <Mutation mutation={createProjectMutation}>
      {
          createProject => (
            <Formik
              initialValues={{
                title: '',
                description: '',
                category: 'SINGLE',
                danmakufuVersion: 'V_PH3',
                signedBlobId: '',
              }}
              validationSchema={Schema}
              onSubmit={async (variables, { setSubmitting, setFieldError }) => {
                let response;

                try {
                  response = await createProject({ variables });
                } catch (error) {
                  showSnackbar(error.message, 'error');
                  return;
                } finally {
                  setSubmitting(false);
                }

                const { data: { createProject: { project, errors } } } = response;

                if (_.isEmpty(errors)) {
                  onSuccess(project);
                } else {
                  _.each(errors, ({ path, message }) => {
                    setFieldError(path[1], message);
                  });
                }
              }}
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
            </Formik>
          )
        }
    </Mutation>
  );
};

NewProject.propTypes = {
  onSuccess: PropTypes.func,
};

NewProject.defaultProps = {
  onSuccess: null,
};

export default NewProject;
