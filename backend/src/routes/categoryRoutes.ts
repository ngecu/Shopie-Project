import { Router } from "express";
import { createCategory } from "../controllers/categoryController";

const category_router = Router()


category_router.post('/', createCategory)

export default category_router;