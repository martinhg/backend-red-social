const { Router } = require('express');

const response = require('../../../network/response');
const Controller = require('./index');
const secure = require('./secure');

const router = Router();

router.get('/', (req, res, next) => {
    Controller.getUsers()
        .then( usersList => {
            response.success(req, res, usersList, 200);
        })
        .catch(next);
    
});

router.get('/:id', (req, res, next) => {
    Controller.getUser(req.params.id)
        .then( user => {
            response.success(req, res, user, 200);
        })
        .catch(next);
});

router.post('/', secure('update'),(req, res, next) => {
    Controller.postUser(req.body)
        .then( user => {
            response.success(req, res, user, 201);
        })
        .catch(next);
});

router.put('/', (req, res, next) => {
    Controller.postUser(req.body)
        .then( user => {
            response.success(req, res, user, 201);
        })
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Controller.deleteUser(req.params.id)
        .then( user => {
            response.success(req, res, user, 200);
        })
        .catch(next);
});

module.exports = router;
