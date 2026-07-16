export const validCredentials = {
  username: 'student',
  password: 'Password123',
};

export const invalidCredentials = {
  wrongUsername: {
    username: 'incorrectUser',
    password: 'Password123',
  },
  wrongPassword: {
    username: 'student',
    password: 'incorrectPassword',
  },
};

export const errorMessages = {
  invalidUsername: 'Your username is invalid!',
  invalidPassword: 'Your password is invalid!',
};