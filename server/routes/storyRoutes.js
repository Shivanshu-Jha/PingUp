import express from 'express'
import { upload } from '../configs/multer.js'
import { protect } from '../middlewares/auth.js'
import { addUserStory, getStories } from '../controllers/storyController.js'

const storyRouter = express.Router()

// api route for adding user story
storyRouter.post('/create', upload.single('media'), protect, addUserStory)

// api route for getting stories of user and user's connections
storyRouter.get('/get', protect, getStories)

export default storyRouter