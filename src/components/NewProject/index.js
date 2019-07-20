import React from 'react';

import Archive from './Archive';

export default () => {
  const onStart = () => {
    console.log('Upload Started.');
  };
  const onFinish = ({ signedBlobId }) => {
    console.log(`Upload Finished. Signed blob id: ${signedBlobId}`);
  };

  return (
    <Archive
      onStart={onStart}
      onFinish={onFinish}
    />
  );
};
