export const validateName = (name) => {
  if (name.trim() === "") {
    return { valid: false, message: "Name cannot be empty" };
  } else if (name.length < 2) {
    return { valid: false, message: "Name must be at least 2 characters long" };
  }

  return { valid: true, message: "" };
};

export const validateEmail = (email) => {
  const emailRegex =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  if (!email.match(emailRegex)) {
    return { valid: false, message: "Invalid email address" };
  }

  return { valid: true, message: "" };
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$£!?%*#&!@#\$%&*\/\\?\(\)\{\}\[\]\|`¬¦ "^'<>:;~_\-+=,.])[A-Za-z\d@$£!?%*#&!@#\$%&*\/\\?\(\)\{\}\[\]\|`¬¦ "^'<>:;~_\-+=,.]{6,}$/;
  if (password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters long",
    };
  } else if (!password.match(passwordRegex)) {
    return {
      valid: false,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    };
  }

  return { valid: true, message: "" };
};
