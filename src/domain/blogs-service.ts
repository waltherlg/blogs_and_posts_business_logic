import {blogsRepository} from "../repositories/blogs-repository";
import {ObjectId} from "mongodb";
import {blogType} from "../repositories/blogs-repository";
import {blogTypeOutput} from "../repositories/blogs-repository";

export const blogsService = {

    async getBlogByID(id: string): Promise<blogTypeOutput | null> {
        return blogsRepository.getBlogByID(id)
    },

    async getAllBlogs(): Promise<blogTypeOutput[]> {
        return blogsRepository.getAllBlogs()
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<blogTypeOutput> {
        const newBlog: blogType = {
            "_id": new ObjectId(),
            "name": name,
            "description": description,
            "websiteUrl": websiteUrl,
            "createdAt": new Date().toISOString()
        }
        const createdBlog = await blogsRepository.createBlog(newBlog)
        return createdBlog
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{
        if (ObjectId.isValid(id)){
            let _id = new ObjectId(id)
            const result = await blogCollection
                .updateOne({_id: _id},{$set: {name: name, description: description, websiteUrl: websiteUrl}})
            return result.matchedCount === 1
        }
        else return false

    },

    async deleteBlog(id: string): Promise<boolean>{
        if (ObjectId.isValid(id)){
            let _id = new ObjectId(id)
            const result = await blogCollection.deleteOne({_id: _id})
            return result.deletedCount === 1
        }
        else return false

    },

    async deleteAllBlogs(): Promise<boolean> {
        const result = await blogCollection
            .deleteMany({})
        return true
    },
}

