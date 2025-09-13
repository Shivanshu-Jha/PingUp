import express from 'express'
import { acceptConnectionRequest, discoverUsers, followUser, getUserConnections, getUserData, sendConnectionRequest, unfollowUser, updateUserData } from '../controllers/userController.js'
import { protect } from '../middlewares/auth.js'
import { upload } from '../configs/multer.js'

const userRouter = express.Router()

// api routes to get user data
userRouter.get('/data', protect, getUserData)

// api routes for uploading profile and cover photo
userRouter.post('/update', upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), protect, updateUserData)

// api routes for discover users
userRouter.post('/discover', protect, discoverUsers)

// api routes for follow user
userRouter.post('/follow', protect, followUser)

// api routes for unfollow user
userRouter.post('/unfollow', protect, unfollowUser)

// api routes for sending connection request
userRouter.post('/connect', protect, sendConnectionRequest)

// api request for accepting connection request
userRouter.post('/accept', protect, acceptConnectionRequest)

// api routes for getting users connections
userRouter.get('/connections', protect, getUserConnections)

export default userRouter
