const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // checks if there is no whitespace, an "@", and a "." in the email

  if (emailRegex.test(email)) {
    return true;
  }
  return false;
}

module.exports = { isValidEmail }
