const express = require('express')
const router = express.Router()
const userController = require('../../controllers/api/users')
const bookmarkController = require('../../controllers/api/bookmarks')

// index
router.get('/', bookmarkController.index)
// delete
router.delete('/:id', userController.auth, bookmarkController.destroy)
// update
router.put('/:id', userController.auth, bookmarkController.update)
// create
router.post('/', userController.auth, bookmarkController.create)
// show
router.get('/:id', userController.show)

module.exports = router