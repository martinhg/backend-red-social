const { nanoid}  = require('nanoid');
const auth = require('../auth');

const table = 'user'

module.exports = (injectedStore = require('../../../store/dummy')) => {

    const postUser = async (userData) => {
        const user = {
            username: userData.username,
            name: userData.name
        };

        if (userData.id) {
            user.id = userData.id
         } else {
            user.id = nanoid();
         } 

        if (userData.password || userData.username) {
            await auth.postUser({
                id: user.id,
                username: user.username,
                password: userData.password
            });
        }

        return injectedStore.upsert(table, user);
    }

    return {
        getUsers: () => injectedStore.list(table),
        getUser: (userId) => injectedStore.get(table, userId),
        postUser,
        deleteUser: (userId) => injectedStore.remove(table, userId)
    }
};
