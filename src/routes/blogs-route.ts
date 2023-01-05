import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {blogsService} from "../domain/blogs-service";
import {postsService} from "../domain/posts-service";

import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithParamsAndQuery,
    RequestWithQuery
} from "../models/types";

export const blogsRouter = Router({})

import {nameValidation} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {basicAuthMiddleware} from "../middlewares/basic-auth.middleware";
import {descriptionValidation} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {websiteUrlValidation} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {
    createBlogModel,
    requestBlogsQueryModel, requestPostsByBlogsIdQueryModel, requestPostsQueryModel,
    updateBlogModel,
    URIParamsBlogModel,
    URIParamsIDBlogModel
} from "../models/models";
import {blogsQueryRepo} from "../repositories/blog-query-repository";
import {postsQueryRepo} from "../repositories/post-query-repository";


// GET Returns All blogs
blogsRouter.get('/', async (req: RequestWithQuery<requestBlogsQueryModel>, res: Response) => {
    try {
        let searchNameTerm = req.query.searchNameTerm ? req.query.searchNameTerm: 'null'
        let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt'
        let sortDirection = req.query.sortDirection ? req.query.sortDirection : 'desc'
        let pageNumber = req.query.pageNumber ? req.query.pageNumber : '1'
        let pageSize = req.query.pageSize ? req.query.pageSize : '10'
        const allBlogs = await blogsQueryRepo.getAllBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)
        res.status(200).send(allBlogs);
    }
    catch (e){
        res.status(500).send(e)
    }

})

// POST add blogs
blogsRouter.post('/',
    basicAuthMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    async (req: RequestWithBody<createBlogModel>, res: Response) => {
        const newBlog = await blogsService.createBlog(req.body.name, req.body.description, req.body.websiteUrl)
        res.status(201).send(newBlog)

    })

//GET blog buy id
blogsRouter.get('/:id', async (req: RequestWithParams<URIParamsBlogModel>, res: Response) => {
    let foundBlog = await blogsService.getBlogByID(req.params.id.toString())
    if(foundBlog){
        res.status(200).send(foundBlog)
    }
    else {
        res.sendStatus(404)
    }
})

//GET all posts by blogs id
blogsRouter.get('/:id/posts', async (req: RequestWithParamsAndQuery<URIParamsBlogModel, requestPostsByBlogsIdQueryModel>, res: Response) => {
    try {
        let blogId = req.params.id.toString()
        let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt'
        let sortDirection = req.query.sortDirection ? req.query.sortDirection : 'desc'
        let pageNumber = req.query.pageNumber ? req.query.pageNumber : '1'
        let pageSize = req.query.pageSize ? req.query.pageSize : '10'
        let foundPosts = await postsQueryRepo.getAllPostsByBlogsID(blogId, sortBy, sortDirection, pageNumber, pageSize)
        if(foundPosts) {
            res.status(200).send(foundPosts)
        }
    }
    catch (e){
            res.status(500).send(e)
        }


})

// DELETE blog video by id
blogsRouter.delete('/:id',
    basicAuthMiddleware,
    async (req: RequestWithParams<URIParamsBlogModel>, res) => {
        const isDeleted = await blogsService.deleteBlog(req.params.id)
        if (isDeleted) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404);
        }
    })

// PUT update blogs by id
blogsRouter.put('/:id',
    basicAuthMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    async (req: RequestWithParamsAndBody<URIParamsBlogModel, updateBlogModel>, res) => {
    const updateBlog = await blogsService.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
        if (updateBlog){
            const blog = blogsService.getBlogByID(req.params.id)
            res.sendStatus(204)
        }
        else {
            res.sendStatus(404)
        }


    })




