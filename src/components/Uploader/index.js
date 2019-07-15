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

const Uploader = ({
  onProgress,
  onError,
  onFinish,
  autoUpload,
}) => (
  <Mutation mutation={mutation}>
    {
      (mutate) => {
        const getSignedUrl = async (file, callback) => {
          let variables;
          let data;

          try {
            variables = await extractMetadata(file);
          } catch (error) {
            onError(error);
            return;
          }

          try {
            data = await mutate({ variables });
          } catch (error) {
            onError(error);
            return;
          }

          const { data: { createDirectUpload: { directUpload } } } = data;
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
  onProgress: PropTypes.func,
  onError: PropTypes.func,
  onFinish: PropTypes.func,
  autoUpload: PropTypes.bool,
};

/* eslint-disable no-console */
Uploader.defaultProps = {
  onProgress: (progress) => { console.log(`Upload Progress: ${progress}%`); },
  onError: (error) => { console.log(`Upload Error: ${error}`); },
  onFinish: ({ signedBlobId }) => { console.log(`Upload Finished! Signed blob id: ${signedBlobId}`); },
  autoUpload: true,
};
/* eslint-enable no-console */

export default Uploader;
