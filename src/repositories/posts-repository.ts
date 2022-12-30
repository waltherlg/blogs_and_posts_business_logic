import {client} from "./db";
import {ObjectId} from "mongodb";
// import {blogType} from "./blogs-repository";

type postTypeOutput = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}
type postType = {
    _id: string | ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}


const postCollection = client.db("blogsAndPosts").collection<postType>("post")
export const postsRepository = {

    async getPostByID(id: string): Promise<postTypeOutput | null> {
        if (!ObjectId.isValid(id)){
            return null
        }
        let _id = new ObjectId(id)
        const post: any | null = await postCollection.findOne({_id: _id})
        if (!post) {
            return null
        }
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }
    },

    async getPostByBlogsID(blogId: string): Promise<postTypeOutput | null> {
        const post: any | null = await postCollection.findOne({blogId: blogId})
        if (!post) {
            return null
        }
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }
    },

    async getAllPosts(): Promise<postTypeOutput[]> {
        let outPosts = await postCollection.find({}).toArray()
        return outPosts.map((posts: any) => ({
            id: posts._id.toString(),
            title: posts.title,
            shortDescription: posts.shortDescription,
            content: posts.content,
            blogId: posts.blogId,
            blogName: posts.blogName,
            createdAt: posts.createdAt
        }))
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
        const result = await postCollection.insertOne(newPost)
        return {
            id: newPost._id.toString(),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: newPost.blogName,
            createdAt: newPost.createdAt
        }
    },

    async updatePost(
        id: string,
        title: string,
        shortDescription: string,
        content: string,
        blogId: string): Promise<boolean> {
        if (ObjectId.isValid(id)){
            let _id = new ObjectId(id)
            const result = await postCollection
                .updateOne({_id: _id},{$set: {
                        title: title,
                        shortDescription: shortDescription,
                        content: content,
                        blogId: blogId,
                    }})
            return result.matchedCount === 1
        }
        else return false
    },

    async deletePost(id: string): Promise<boolean> {
        if (ObjectId.isValid(id)){
            let _id = new ObjectId(id)
            const  result = await postCollection.deleteOne({_id: _id})
            return result.deletedCount === 1
        }
        else return false

    },

    async deleteAllPosts(): Promise<boolean> {
        const result = await postCollection.deleteMany({})
        return true
    },
}