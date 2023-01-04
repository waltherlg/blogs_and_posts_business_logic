import {client} from "./db";
import {postCollection} from "./posts-repository";
import {blogCollection, blogsRepository} from "./blogs-repository";
import {blogType, blogTypeOutput} from "../models/types";
import {paginationBlogOutputModel, requestBlogsQueryModel} from "../models/models";

function sort(sortDirection: string){
    return (sortDirection === 'desc') ? -1 : 1;
}

function skipped(pageNumber: string, pageSize: string): number {
    return (+pageNumber - 1) * (+pageSize);
}


export const blogsQueryRepo = {

    async getAllBlogs(
        searchNameTerm: string,
        sortBy: string,
        sortDirection: string,
        pageNumber: string,
        pageSize: string,) {

        let blogs = await blogCollection.find({})
            .skip(skipped(pageNumber, pageSize))
            .limit(+pageSize)
            .sort({[sortBy]: sort(sortDirection)})
            .toArray()

        let outBlogs = blogs.map((blogs: blogType) => {
            return {
                id: blogs._id.toString(),
                name: blogs.name,
                description: blogs.description,
                websiteUrl: blogs.websiteUrl,
                createdAt: blogs.createdAt
            }
        })

        let blogsCount = await blogCollection.countDocuments({})

        let pageCount = Math.ceil(+blogsCount / +pageSize)

        let outputBlogs: paginationBlogOutputModel  = {
            pageCount: pageCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: blogsCount,
            items: outBlogs
        }
        return outputBlogs
    },


}