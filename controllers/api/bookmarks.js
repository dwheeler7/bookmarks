const Bookmark = require('../../models/bookmark')

module.exports = {
    create,
    index,
    show,
    update,
    destroy,
    jsonBookmarks,
    jsonBookmark
}


function jsonBookmarks(_, res) {
    res.json(res.locals.data.bookmarks)
}

function jsonBookmark(_, res) {
    res.json(res.locals.data.bookmark)
}


async function create(req, res, next) {
    try {
        req.body.user = req.user._id
        const bookmark = await Bookmark.create(req.body)
        req.user.bookmarks.addToSet(bookmark)
        req.user.save()        
        res.locals.data.bookmark = bookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

async function index(_, res, next) {
    try {
        const bookmarks = await Bookmark.find()
        res.locals.data.bookmarks = bookmarks
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


async function show(req, res, next) {
    try {
        const bookmark = await Bookmark.findById(req.params.id)
        res.locals.data.bookmark = bookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


/****** U - Update *****/


async function update(req, res, next) {
    try {
        const bookmark = await Bookmark.findOneAndUpdate({_id : req.params.id}, req.body, { new: true })
        res.locals.data.bookmark = bookmark
        console.log(res.locals.data.bookmark)
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

/***** D - destroy/delete *****/

async function destroy(req, res, next) {
    try {
        const bookmark = await Bookmark.findOneAndDelete({_id : req.params.id})
        req.user.bookmarks.pull(bookmark)
        req.user.save()
        res.locals.data.bookmark = bookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}