function phoneValidation(phone) {
    return phone.match(/^0(2|3|5|7|8|9)[0-9]{8}$/);
}

function emailValidation(email) {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

function passwordValidation(pass) {
    return pass.match(/\w{8,}/);
}

exports = { phoneValidation, emailValidation, passwordValidation };