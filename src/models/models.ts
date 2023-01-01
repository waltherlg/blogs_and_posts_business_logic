
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

export type URIParamsPostByBlogIdModel = {
    /**
     * blogId
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