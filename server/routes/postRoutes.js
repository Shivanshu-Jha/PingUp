import express from 'express';
import { upload } from '../configs/multer.js';
import { protect } from '../middlewares/auth.js';
import { addPost, getFeedPosts, likePost } from '../controllers/postController.js';

const postRouter = express.Router()

// api route for adding post
postRouter.post('/add', upload.array('images', 4), protect, addPost)

// api route for getting feeds
postRouter.get('/feed', protect, getFeedPosts)

// api route for like/unlike post
postRouter.post('/like', protect, likePost)

export default postRouter