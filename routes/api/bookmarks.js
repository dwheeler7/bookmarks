const express = require('express')
const router = express.Router()
const userController = require('../../controllers/api/users')
const bookmarkController = require('../../controllers/api/bookmarks')

// index
router.get('/', bookmarkController.index, bookmarkController.jsonBookmarks)
// delete
router.delete('/:id', userController.auth, bookmarkController.destroy, bookmarkController.jsonBookmark)
// update
router.put('/:id', userController.auth, bookmarkController.update, bookmarkController.jsonBookmark)
// create
router.post('/', userController.auth, bookmarkController.create, bookmarkController.jsonBookmark)
// show
router.get('/:id', userController.show, bookmarkController.jsonBookmark)

module.exports = router