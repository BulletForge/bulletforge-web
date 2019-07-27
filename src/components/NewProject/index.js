import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { useSnackbar } from 'notistack';
import { Formik } from 'formik';
import _ from 'lodash';

import showSnackbar from 'utils/snackbar';
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

export default () => {
  const [uploading, setUploading] = useState(true);
  const snackbarHook = useSnackbar();

  const handleUploadStart = (file) => {
    console.log(`Upload Started. File: ${file.name}`);
  };
  const handleUploadError = (message) => {
    showSnackbar(snackbarHook, message, 'error');
  };

  return (
    <>
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
                  showSnackbar(snackbarHook, error.message, 'error');
                  return;
                } finally {
                  setSubmitting(false);
                }

                const { data: { createProject: { errors } } } = response;

                if (_.isEmpty(errors)) {
                  // onSuccess();
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
                  return (
                    <>
                      <Archive
                        onStart={handleUploadStart}
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
    </>
  );
};
