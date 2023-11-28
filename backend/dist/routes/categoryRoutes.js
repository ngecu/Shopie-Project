"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const category_router = (0, express_1.Router)();
category_router.post('/', categoryController_1.createCategory);
exports.default = category_router;
