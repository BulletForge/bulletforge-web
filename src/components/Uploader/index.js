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
  accept,
  autoUpload,
  onStart,
  onProgress,
  onError,
  onFinish,
  sizeLimit,
  ...props
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

          onStart();

          const { data: { createDirectUpload: { directUpload } } } = response;
          delete directUpload.headers['Content-Type'];

          callback(directUpload);
        };

        const preprocess = (file, next) => {
          if (file.size > sizeLimit) {
            onError(`File size too large. File size limit is ${sizeLimit} bytes`);
          } else {
            next(file);
          }
        };

        return (
          <ReactS3Uploader
            getSignedUrl={getSignedUrl}
            preprocess={preprocess}
            onProgress={onProgress}
            onError={onError}
            onFinish={onFinish}
            accept={accept}
            autoUpload={autoUpload}
            uploadRequestHeaders={{}}
            {...props}
          />
        );
      }
    }
  </Mutation>
);

Uploader.propTypes = {
  accept: PropTypes.string,
  autoUpload: PropTypes.bool,
  onStart: PropTypes.func,
  onProgress: PropTypes.func,
  onError: PropTypes.func,
  onFinish: PropTypes.func,
  sizeLimit: PropTypes.number,
};

/* eslint-disable no-console */
Uploader.defaultProps = {
  accept: 'image/*',
  autoUpload: true,
  onStart: () => {
    console.log('Upload Started.');
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
  sizeLimit: 314572800,
};
/* eslint-enable no-console */

export default Uploader;
