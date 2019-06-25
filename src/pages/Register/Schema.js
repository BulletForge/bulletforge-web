import { object, string, ref } from 'yup';

export default object().shape({
  username: string()
    .min(2)
    .max(255)
    .required(),
  email: string()
    .email()
    .required(),
  password: string()
    .min(8)
    .max(255)
    .required(),
  passwordConfirmation: string()
    .equals(
      [ref('password')],
    ),
});
