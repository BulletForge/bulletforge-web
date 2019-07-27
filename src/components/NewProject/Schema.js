import { object, string } from 'yup';

export default object().shape({
  title: string()
    .min(1)
    .max(255)
    .required(),
  description: string(),
  signedBlobId: string()
    .min(1),
});
