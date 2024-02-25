const express = require('express')
const router = express.Router()
const userController = require('../../controllers/api/users')
const bookmarkController = require('../../controllers/api/bookmarks')

// Index
// 
router.get('/', bookmarkController.index, bookmarkController.jsonBookmarks)
// Delete
router.delete('/:id', userController.auth, bookmarkController.destroy, bookmarkController.jsonBookmark)
// Update
router.put('/:id', userController.auth, bookmarkController.update, bookmarkController.jsonBookmark)
// Create
router.post('/', userController.auth, bookmarkController.create, bookmarkController.jsonBookmark)
// Show
router.get('/:id', bookmarkController.show, bookmarkController.jsonBookmark)


module.exports = router