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
exports.blogsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const basic_auth_middleware_1 = require("../middlewares/basic-auth.middleware");
const blogs_service_1 = require("../domain/blogs-service");
exports.blogsRouter = (0, express_1.Router)({});
const input_validation_middleware_2 = require("../middlewares/input-validation-middleware/input-validation-middleware");
const descriptionValidation = (0, express_validator_1.body)('description')
    .exists().bail().withMessage({ "message": "description not exist", "field": "description" })
    .trim().bail().withMessage({ "message": "description is not string", "field": "description" })
    .isLength({ max: 500 }).withMessage({ "message": "wrong length description", "field": "description" });
const websiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .exists().bail().withMessage({ "message": "websiteUrl not exist", "field": "websiteUrl" })
    .trim().bail().withMessage({ "message": "websiteUrl is not string", "field": "websiteUrl" })
    .isLength({ max: 100 }).bail().withMessage({ "message": "wrong length websiteUrl", "field": "websiteUrl" })
    .isURL().bail().withMessage({ "message": "wrong websiteUrl", "field": "websiteUrl" });
// GET Returns All blogs
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBlogs = yield blogs_service_1.blogsService.getAllBlogs();
    res.status(200).send(allBlogs);
}));
// POST add blogs
exports.blogsRouter.post('/', basic_auth_middleware_1.basicAuthMiddleware, input_validation_middleware_2.nameValidation, descriptionValidation, websiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlog = yield blogs_service_1.blogsService.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(newBlog);
}));
//GET blog buy id
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let foundBlog = yield blogs_service_1.blogsService.getBlogByID(req.params.id.toString());
    if (foundBlog) {
        res.status(200).send(foundBlog);
    }
    else {
        res.sendStatus(404);
    }
}));
// DELETE blog video by id
exports.blogsRouter.delete('/:id', basic_auth_middleware_1.basicAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield blogs_service_1.blogsService.deleteBlog(req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
// PUT update blogs by id
exports.blogsRouter.put('/:id', basic_auth_middleware_1.basicAuthMiddleware, input_validation_middleware_2.nameValidation, descriptionValidation, websiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBlog = yield blogs_service_1.blogsService.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (updateBlog) {
        const blog = blogs_service_1.blogsService.getBlogByID(req.params.id);
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
