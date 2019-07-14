import React from 'react';
import Uploader from 'components/Uploader';


const NewProjectPage = () => (
  <Uploader onError={error => console.log(error)} />
);

export default NewProjectPage;
