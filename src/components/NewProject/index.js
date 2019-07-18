import React from 'react';

import ArchiveUploader from './ArchiveUploader';

export default () => {
  const onStart = () => {
    console.log('Upload Started.');
  };
  const onFinish = ({ signedBlobId }) => {
    console.log(`Upload Finished. Signed blob id: ${signedBlobId}`);
  };

  return (
    <>
      <ArchiveUploader
        onStart={onStart}
        onFinish={onFinish}
      />
    </>
  );
};
