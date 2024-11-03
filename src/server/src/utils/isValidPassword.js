const isValidPassword = (password) => {
    const minCharacters = 8;
    const maxCharacters = 20;
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/; // checks if there is at least 1 special character and 1 number in expression
    if (password.length >= minCharacters && password.length <= maxCharacters && regex.test(password)){
        return true;
    }
    return false;
}

module.exports = { isValidPassword }
