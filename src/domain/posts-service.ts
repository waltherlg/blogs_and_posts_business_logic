import {postsRepository} from "../repositories/posts-repository";
import {ObjectId} from "mongodb";
import {postType} from "../models/types";
import {postTypeOutput} from "../models/types";


export const postsService = {

    async getPostByID(id: string): Promise<postTypeOutput | null> {
        return await postsRepository.getPostByID(id)
    },

    async getPostByBlogsID(blogId: string): Promise<postTypeOutput | null> {
        return await postsRepository.getPostByBlogsID(blogId)
    },

    async getAllPosts(): Promise<postTypeOutput[]> {
        return await postsRepository.getAllPosts()
    },

    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<postTypeOutput> {
        const newPost: postType = {
            "_id": new ObjectId(),
            "title": title,
            "shortDescription": shortDescription,
            "content": content,
            "blogId": blogId,
            "blogName": title,
            "createdAt": new Date().toISOString()
        }
        const createdPost = await postsRepository.createPost(newPost)
        return createdPost
    },

    async createPostByBlogId(title: string, shortDescription: string, content: string, blogId: string): Promise<postTypeOutput> {
        const newPost: postType = {
            "_id": new ObjectId(),
            "title": title,
            "shortDescription": shortDescription,
            "content": content,
            "blogId": blogId,
            "blogName": title,
            "createdAt": new Date().toISOString()
        }
        const createdPost = await postsRepository.createPost(newPost)
        return createdPost
    },

    async updatePost(
        id: string,
        title: string,
        shortDescription: string,
        content: string,
        blogId: string): Promise<boolean> {
        return await postsRepository.updatePost(id, title, shortDescription, content, blogId)
    },

    async deletePost(id: string): Promise<boolean> {
        return await postsRepository.deletePost(id)
    },

    async deleteAllPosts(): Promise<boolean> {
        return await postsRepository.deleteAllPosts()
    },
}