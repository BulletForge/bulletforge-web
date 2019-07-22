import React from 'react';
import PropTypes from 'prop-types';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import extractMetadata from './metadata';

const mutation = gql`
  mutation DirectUpload(
    $filename: String!,
    $byteSize: Int!,
    $checksum: String!,
    $contentType: String!
  ) {
    createDirectUpload(input: {
      filename: $filename
      byteSize: $byteSize
      checksum: $checksum
      contentType: $contentType
    }) {
      directUpload {
        signedUrl
        headers
        signedBlobId
      }
      errors {
        path
        message
      }
    }
  }
`;

const getMutationResponse = async (file, mutate) => {
  let response;

  try {
    const variables = await extractMetadata(file);
    response = await mutate({ variables });
  } catch (error) {
    return { error };
  }

  return { response };
};

const Uploader = ({
  accept,
  autoUpload,
  onStart,
  onError,
  children,
  ...props
}) => (
  <Mutation mutation={mutation}>
    {
      (mutate) => {
        const getSignedUrl = async (file, callback) => {
          onStart(file);

          const { response, error: mutationError } = await getMutationResponse(file, mutate);

          if (mutationError) {
            onError(mutationError.message);
            return;
          }

          const { data: { createDirectUpload: { directUpload, errors: userErrors } } } = response;

          if (userErrors[0]) {
            onError(userErrors[0].message);
            return;
          }

          delete directUpload.headers['Content-Type'];
          callback(directUpload);
        };

        const uploadOptions = {
          getSignedUrl,
          autoUpload,
          uploadRequestHeaders: {},
          preprocess: (file, next) => { next(file); },
        };

        return (
          <DropzoneS3Uploader
            upload={uploadOptions}
            s3Url="https://s3.amazonaws.com/bulletforge_development"
            passChildrenProps={false}
            onError={onError}
            accept={accept}
            {...props}
          >
            {children}
          </DropzoneS3Uploader>
        );
      }
    }
  </Mutation>
);

Uploader.propTypes = {
  accept: PropTypes.string,
  autoUpload: PropTypes.bool,
  onStart: PropTypes.func,
  onError: PropTypes.func,
  children: PropTypes.node,
};

/* eslint-disable no-console */
Uploader.defaultProps = {
  accept: 'image/*',
  autoUpload: true,
  onStart: (file) => {
    console.log(`Upload Started: ${file.name}`);
  },
  onError: (error) => {
    console.log(`Upload Error: ${error}`);
  },
  children: null,
};
/* eslint-enable no-console */

export default Uploader;
