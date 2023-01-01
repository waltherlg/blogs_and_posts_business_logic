import {Request, Response, Router} from "express";
import {postsService} from "../domain/posts-service";
import {blogsService} from "../domain/blogs-service";

export const testingRouter = Router({})

testingRouter.delete('/',
    async (req: Request, res: Response) => {
        console.log(req)
        const isPostsDeleted = await postsService.deleteAllPosts();
        const isBlogsDeleted = await blogsService.deleteAllBlogs();
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