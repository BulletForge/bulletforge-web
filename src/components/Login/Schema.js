import { object, string } from 'yup';

export default object().shape({
  login: string()
    .required(),
  password: string()
    .required(),
});
