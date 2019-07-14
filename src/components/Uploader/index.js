import React from 'react';
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
        url
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

export default ({
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
          const { url: signedUrl } = directUpload;

          const headers = JSON.parse(directUpload.headers);
          delete headers['Content-Type'];

          callback({ signedUrl, headers });
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
