import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {blogsRepository} from "../repositories/blogs-repository";

export const testingRouter = Router({})

testingRouter.delete('/',
    async (req: Request, res: Response) => {
        console.log(req)
        const isPostsDeleted = await postsRepository.deleteAllPosts();
        const isBlogsDeleted = await blogsRepository.deleteAllBlogs();
        if (isPostsDeleted && isBlogsDeleted) {
            return res.sendStatus(204)
        } else {
            res.sendStatus(404);
        }


    })

testingRouter.get('/',
    (req: Request, res: Response,) => {
        res.send("fdsffsd")
    })