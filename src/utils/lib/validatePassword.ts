export const validatePassword = (password: string) => {
  if (password.length < 8 || password.length > 16) {
    return false;
  }

  if (!/[A-Z]/.test(password)) {
    return false;
  }

  if (!/[a-z]/.test(password)) {
    return false;
  }

  if (!/[0-9]/.test(password)) {
    return false;
  }

  if (!/[!@#$%^&*~]/.test(password)) {
    return false;
  }

  if (password.includes(" ")) {
    return false;
  }

  if (
    password.includes("(") ||
    password.includes(")") ||
    password.includes("<") ||
    password.includes(">") ||
    password.includes("{") ||
    password.includes("}") ||
    password.includes("[") ||
    password.includes("]")
  ) {
    return false;
  }

  return true;
};