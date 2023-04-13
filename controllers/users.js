import User from "../models/User.js";


//getUser,
//     getUserFriends,
//     addRemoveFriends,


export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({})
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriend = friends.map(
            ({
                 _id,
                 firstName,
                 lastName,
                 occupation,
                 location,
                 picturePath,
             }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath,
                }
            }
        );
        res.status(200).json(formattedFriend);
    } catch (err) {
        res.status(400).json({})
    }
}

export const addRemoveFriends = async (req, res) => {
    try {
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (user.friends.includes(friend)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friend);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriend = friends.map(
            ({
                 _id,
                 firstName,
                 lastName,
                 occupation,
                 location,
                 picturePath,
             }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath,
                }
            }
        );
        res.status(200).json(formattedFriend);
    } catch (err) {
        res.status(400).json({})
    }
}