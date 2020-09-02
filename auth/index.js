const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret

function sign(userData) {
    return jwt.sign(userData, secret);
}

function verify(token) {
    return jwt.verify(token, secret);
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req);
        console.log(decoded);

        //Comprobar si es o no propio
        if (decoded.id !== owner) {
            throw error('No puedes hacer esto', 401);
        }
    }
}

function getToken(auth) {
    if (!auth) {
        throw error('No viene token', 401);
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato invalido', 401);
    }

    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    console.log(req.headers.authorization);
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check
};
