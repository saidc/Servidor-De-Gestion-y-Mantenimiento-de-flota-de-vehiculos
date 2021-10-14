function validatePassword(password) {
    return [!(password.length < 6), !(password.search(/[a-z]/i) < 0) , !(password.search(/[0-9]/) < 0)];
}
module.exports ={
    isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    /**
     * La contraseña debe contener como minimo 6 caracteres.
     * La contraseña debe contener almenos una letra.
     * La contraseña debe contener almenos un digito.
     */
    validatePassword(password) {
        return [!(password.length < 6), !(password.search(/[a-z]/i) < 0) , !(password.search(/[0-9]/) < 0)];
    },
    isValidPassword(password) {
        const p = validatePassword(password);
        return (p[0]||p[1]||p(2));
    }
}