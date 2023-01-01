import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {blogsService} from "../domain/blogs-service";

import {RequestWithBody, RequestWithParamsAndBody} from "../models/types";

export const blogsRouter = Router({})

import {nameValidation} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {basicAuthMiddleware} from "../middlewares/basic-auth.middleware";
import {descriptionValidation} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {websiteUrlValidation} from "../middlewares/input-validation-middleware/input-validation-middleware";


// GET Returns All blogs
blogsRouter.get('/', async (req: Request, res: Response) => {
    const allBlogs = await blogsService.getAllBlogs()
    res.status(200).send(allBlogs);
})

// POST add blogs
blogsRouter.post('/',
    basicAuthMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    async (req: RequestWithParamsAndBody<any,any>, res: Response) => {
        const newBlog = await blogsService.createBlog(req.body.name, req.body.description, req.body.websiteUrl)
        res.status(201).send(newBlog)

    })

//GET blog buy id
blogsRouter.get('/:id', async (req: Request, res: Response) => {
    let foundBlog = await blogsService.getBlogByID(req.params.id.toString())
    if(foundBlog){
        res.status(200).send(foundBlog)
    }
    else {
        res.sendStatus(404)
    }
})

// DELETE blog video by id
blogsRouter.delete('/:id',
    basicAuthMiddleware,
    async (req, res) => {
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
    async (req, res) => {
    const updateBlog = await blogsService.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
        if (updateBlog){
            const blog = blogsService.getBlogByID(req.params.id)
            res.sendStatus(204)
        }
        else {
            res.sendStatus(404)
        }


    })




