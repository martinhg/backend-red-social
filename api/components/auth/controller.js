const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const table = 'auth';

module.exports = (injectedStore = require('../../../store/dummy')) => {

    const login = async (username, password) => {
        const data = await injectedStore.query(table, { username: username });

        return bcrypt.compare(password, data.password)
            .then( sonIguales => {
                if ( sonIguales === true) {
                    // Generar token
                    return auth.sign(data);
                } else {
                    throw new Error('Información inválida');
                }
            });  
    }

    const postUser = async (userData) => {
        const authData = {
            id: userData.id
        };

        if (userData.username) authData.username = userData.username;

        if (userData.password) authData.password = await bcrypt.hash(userData.password, 5);

        return injectedStore.upsert(table, authData);
    }

    return {
        login,
        postUser
    }
};
