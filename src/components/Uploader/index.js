import React from 'react';
import PropTypes from 'prop-types';
import ReactS3Uploader from 'react-s3-uploader';
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
  onStart,
  onProgress,
  onError,
  onFinish,
  autoUpload,
}) => (
  <Mutation mutation={mutation}>
    {
      (mutate) => {
        const getSignedUrl = async (file, callback) => {
          const { response, error } = await getMutationResponse(file, mutate);

          if (error) {
            onError(error);
            return;
          }

          onStart(response);

          const { data: { createDirectUpload: { directUpload } } } = response;
          delete directUpload.headers['Content-Type'];

          callback(directUpload);
        };

        return (
          <ReactS3Uploader
            getSignedUrl={getSignedUrl}
            onProgress={onProgress}
            onError={onError}
            onFinish={onFinish}
            autoUpload={autoUpload}
            uploadRequestHeaders={{}}
          />
        );
      }
    }
  </Mutation>
);

Uploader.propTypes = {
  onStart: PropTypes.func,
  onProgress: PropTypes.func,
  onError: PropTypes.func,
  onFinish: PropTypes.func,
  autoUpload: PropTypes.bool,
};

/* eslint-disable no-console */
Uploader.defaultProps = {
  onStart: (signingResponse) => {
    console.log(`Upload Started. Signing server response ${signingResponse}`);
  },
  onProgress: (progress, message, file) => {
    console.log(`Upload Progress for ${file.name}: ${progress}% ${message}`);
  },
  onError: (error) => {
    console.log(`Upload Error: ${error}`);
  },
  onFinish: ({ signedBlobId }) => {
    console.log(`Upload Finished. Signed blob id: ${signedBlobId}`);
  },
  autoUpload: true,
};
/* eslint-enable no-console */

export default Uploader;
