import {blogTypeOutput} from "./types";

export type URIParamsPostModel = {
    /**
     * id of existing post
     */
    id: string
}

export type URIParamsBlogModel = {
    /**
     * id of existing blog
     */
    id: string
}

export type URIParamsGetPostByBlogIdModel = {
    /**
     * When you need get post by blog id
     */
    blogId: string
}

export type createPostModel = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export type updatePostModel = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export type createBlogModel = {
    name: string,
    description: string,
    websiteUrl: string,
}

export type updateBlogModel = {
    name: string,
    description: string,
    websiteUrl: string,
}

export type requestBlogsQueryModel = {
    searchNameTerm: string,
    sortBy: string,
    sortDirection: string,
    pageNumber: string,
    pageSize: string,
}

export type paginationBlogOutputModel = {
    pageCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: any
}