import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";


//getFeedPosts , getUserPosts, likePost

export const createPosts = async (req,res) => {
    try{
        const {userId, description ,picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            like: {},
            comments: [],
        })
    }catch(err) {
        res.status(400).json({

        })
    }
}
export const getFeedPosts = async (req,res) => {
    const { id } = req.params;

}

export const getUserPosts = async (req,res) => {

}

export const likePost = async (req,res) => {

}