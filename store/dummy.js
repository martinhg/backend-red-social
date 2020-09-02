const db = {
    'user': [
        {id: 1, name: 'Martin'},
        {id: 2, name: 'Facundo'},
        {id: 3, name: 'Julieta'},
        {id: 4, name: 'Mariana'},
        {id: 5, name: 'Gustavo'},
    ],
};

async function list(table) {
    return db[table] || [];
}

async function get(table, id) {
    let collection = await list(table);
    return collection.find( item => item.id == id) || null;
}

async function upsert(table, data) {
    if (!db[table]) {
        db[table] = [];
    }

    db[table].push(data);
}

async function remove(table, id) {
    return true;
}

async function query(table, q) {
    let collection = await list(table);
    let keys = Object.keys(q);
    let key = keys[0];

    return collection.find( item => item[key] == q[key]) || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
};
