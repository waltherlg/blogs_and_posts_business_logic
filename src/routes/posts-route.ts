import {Request, Response, Router} from "express";
import {body, validationResult} from "express-validator";
import { inputValidationMiddleware} from "../middlewares/input-validation-middleware/input-validation-middleware";
import {basicAuthMiddleware} from "../middlewares/basic-auth.middleware";

import {postsRepository} from "../repositories/posts-repository";
import {blogsRepository} from "../repositories/blogs-repository";


export const postsRouter = Router({})


const titleValidation = body('title')
    .exists().bail().withMessage({message: "title not exist", field: "title" })
    .trim().bail().withMessage({message: "title is not string", field: "title" })
    .isLength({min: 1, max: 30}).bail().withMessage({message: "title wrong length", field: "title" })

const shortDescriptionValidation = body('shortDescription')
    .exists().bail().withMessage({message: "shortDescription not exist", field: "shortDescription" })
    .trim().bail().withMessage({message: "shortDescription is not string", field: "shortDescription" })
    .isLength({min: 1, max: 100}).bail().withMessage({message: "shortDescription wrong length", field: "shortDescription" })

const contentValidation = body('content')
    .exists().bail().withMessage({message: "content not exist", field: "content" })
    .trim().bail().withMessage({message: "content is not string", field: "content" })
    .isLength({min: 1, max: 1000}).bail().withMessage({message: "wrong content", field: "content" })

const blogIdValidation = body('blogId')
    .exists().bail().withMessage({message: "is not a string", field: "blogId" })
    .trim().bail().withMessage({message: "wrong blogId", field: "blogId" })

const createBlogIdValidation = body('blogId')
    .exists().bail().withMessage({message: "is not a string", field: "blogId" })
    .trim().bail().withMessage({message: "wrong blogId", field: "blogId" })
    .custom(async value => {
        const isBlogIdExist = await blogsRepository.getBlogByID(value)
        if (!isBlogIdExist) throw new Error
        return true
    }).withMessage({"message": "blogId not exist", "field": "blogId" })


// GET Returns All posts
postsRouter.get('/', async (req: Request, res: Response) => {
    const allPosts = await postsRepository.getAllPosts()
    res.status(200).send(allPosts);
})

//GET return post bi id
postsRouter.get('/:id', async (req, res) => {
    let foundPost = await postsRepository.getPostByID(req.params.id.toString())
    if (foundPost) {
        res.status(200).send(foundPost)
    } else {
        res.sendStatus(404)
    }
})

//GET return post bi id
postsRouter.get('/blogid/:id', async (req, res) => {
    let foundPost = await postsRepository.getPostByBlogsID(req.params.id.toString())
    if (foundPost) {
        res.status(200).send(foundPost)
    } else {
        res.sendStatus(404)
    }
})

// POST add blogs
postsRouter.post('/',
    basicAuthMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    createBlogIdValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newPost = await postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        res.status(201).send(newPost)
    })

// PUT update post
postsRouter.put('/:id',
    basicAuthMiddleware,
    shortDescriptionValidation,
    titleValidation,
    contentValidation,
    createBlogIdValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const updatePost = await postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        if (updatePost) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

// DELETE post
postsRouter.delete('/:id',
    basicAuthMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await postsRepository.deletePost(req.params.id)
        if (isDeleted) {
            return res.sendStatus(204)
        } else {
            res.sendStatus(404);
        }
    })

