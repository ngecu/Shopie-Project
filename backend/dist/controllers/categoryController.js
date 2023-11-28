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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const sqlConfig_1 = require("../config/sqlConfig");
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_name, category_description, category_image } = req.body;
        const category_id = (0, uuid_1.v4)();
        console.log(req.body);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input('category_id', mssql_1.default.VarChar, category_id)
            .input('category_name', mssql_1.default.VarChar, category_name)
            .input('category_description', mssql_1.default.VarChar, category_description)
            .input('category_image', mssql_1.default.VarChar, category_image)
            .execute('InsertCategory');
        const createdCategory = result.recordset[0];
        res.status(201).json(createdCategory);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createCategory = createCategory;
