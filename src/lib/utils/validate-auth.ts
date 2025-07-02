const validateEmail = (email: string) => {
  let error_message = "";

  if (!email) {
    error_message = "Please enter the email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error_message = "Please enter a valid email address";
  }

  return error_message;
};

const validatePassword = (password: string) => {
  let error_message = "";

  if (!password) {
    error_message = "Please enter the password";
  } else if (password.length < 6) {
    error_message = "Password must be at least 6 characters long";
  }

  return error_message;
};

export { validateEmail, validatePassword };
