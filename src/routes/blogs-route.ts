import {Request, Response, Router} from "express";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {basicAuthMiddleware} from "../middlewares/basic-auth.middleware";
import {blogsRepository} from "../repositories/blogs-repository";

export const blogsRouter = Router({})

import {nameValidation} from "../middlewares/input-validation-middleware/input-validation-middleware";


const descriptionValidation = body('description')
    .exists().bail().withMessage({"message": "description not exist", "field": "description" })
    .trim().bail().withMessage({"message": "description is not string", "field": "description" })
    .isLength({max: 500}).withMessage({"message": "wrong length description", "field": "description" })

const websiteUrlValidation = body('websiteUrl')
    .exists().bail().withMessage({"message": "websiteUrl not exist", "field": "websiteUrl" })
    .trim().bail().withMessage({"message": "websiteUrl is not string", "field": "websiteUrl" })
    .isLength({max: 100}).bail().withMessage({"message": "wrong length websiteUrl", "field": "websiteUrl" })
    .isURL().bail().withMessage({"message": "wrong websiteUrl", "field": "websiteUrl" })

// GET Returns All blogs
blogsRouter.get('/', async (req: Request, res: Response) => {
    const allBlogs = await blogsRepository.getAllBlogs()
    res.status(200).send(allBlogs);
})

// POST add blogs
blogsRouter.post('/',
    basicAuthMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newBlog = await blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl)
        res.status(201).send(newBlog)

    })

//GET blog buy id
blogsRouter.get('/:id', async (req: Request, res: Response) => {
    let foundBlog = await blogsRepository.getBlogByID(req.params.id.toString())
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
        const isDeleted = await blogsRepository.deleteBlog(req.params.id)
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
    const updateBlog = await blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
        if (updateBlog){
            const blog = blogsRepository.getBlogByID(req.params.id)
            res.sendStatus(204)
        }
        else {
            res.sendStatus(404)
        }


    })




