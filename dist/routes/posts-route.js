"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const posts_service_1 = require("../domain/posts-service");
const blogs_service_1 = require("../domain/blogs-service");
exports.postsRouter = (0, express_1.Router)({});
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const basic_auth_middleware_1 = require("../middlewares/basic-auth.middleware");
const input_validation_middleware_2 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const input_validation_middleware_3 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const input_validation_middleware_4 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const createBlogIdValidation = (0, express_validator_1.body)('blogId')
    .exists().bail().withMessage({ message: "is not a string", field: "blogId" })
    .trim().bail().withMessage({ message: "wrong blogId", field: "blogId" })
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogIdExist = yield blogs_service_1.blogsService.getBlogByID(value);
    if (!isBlogIdExist)
        throw new Error;
    return true;
})).withMessage({ "message": "blogId not exist", "field": "blogId" });
// GET Returns All posts
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allPosts = yield posts_service_1.postsService.getAllPosts();
    res.status(200).send(allPosts);
}));
//GET return post by id
exports.postsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let foundPost = yield posts_service_1.postsService.getPostByID(req.params.id.toString());
    if (foundPost) {
        res.status(200).send(foundPost);
    }
    else {
        res.sendStatus(404);
    }
}));
//GET return post by blog id
exports.postsRouter.get('/blogid/:blogId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let foundPost = yield posts_service_1.postsService.getPostByBlogsID(req.params.blogId.toString());
    if (foundPost) {
        res.status(200).send(foundPost);
    }
    else {
        res.sendStatus(404);
    }
}));
// POST add blogs
exports.postsRouter.post('/', basic_auth_middleware_1.basicAuthMiddleware, input_validation_middleware_2.titleValidation, input_validation_middleware_3.shortDescriptionValidation, input_validation_middleware_4.contentValidation, createBlogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = yield posts_service_1.postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    res.status(201).send(newPost);
}));
// PUT update post
exports.postsRouter.put('/:id', basic_auth_middleware_1.basicAuthMiddleware, input_validation_middleware_3.shortDescriptionValidation, input_validation_middleware_2.titleValidation, input_validation_middleware_4.contentValidation, createBlogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatePost = yield posts_service_1.postsService.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (updatePost) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
// DELETE post
exports.postsRouter.delete('/:id', basic_auth_middleware_1.basicAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield posts_service_1.postsService.deletePost(req.params.id);
    if (isDeleted) {
        return res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
