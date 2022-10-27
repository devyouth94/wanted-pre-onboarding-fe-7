export const isCorrectEmail = (value) => {
  const REGEX = /\w+@\w/;
  return REGEX.test(value);
};

export const isCorrectPassword = (value) => {
  const PASSWORD_LENGTH = 8;
  return value.length >= PASSWORD_LENGTH;
};
