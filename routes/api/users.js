const express = require('express')
const router = express.Router()
const userController = require('../../controllers/api/users')
const bookmarkController = require('../../controllers/api/bookmarks')

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/:id', userController.auth, userController.updateUser)
router.delete('/:id', userController.auth, userController.deleteUser)
router.get('/:id/bookmarks', userController.auth, userController.indexBookmarks, bookmarkController.jsonBookmarks)

module.exports = router