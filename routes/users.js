import express from ' express';
import {
    getUser,
    getUserFriends,
    addRemoveFriends,
} from '../controllers/users.js';

import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get('/:id', getUser); // specific ID  // query string here

router.get('/:id/friends', verifyToken, getUserFriends);

router.patch('/:id/friendID', verifyToken, addRemoveFriends);


export default router;

