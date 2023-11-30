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
exports.updateOrderToDelivered = exports.getOrders = exports.getMyOrders = exports.updateOrderToPaid = exports.getOrderById = exports.createOrder = void 0;
const sqlConfig_1 = require("../config/sqlConfig");
const mssql_1 = __importDefault(require("mssql"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createOrder = createOrder;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input('order_id', mssql_1.default.VarChar, req.params.id)
            .query('SELECT * FROM orders WHERE order_id = @order_id');
        const order = result.recordset[0];
        if (order) {
            res.json(order);
        }
        else {
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getOrderById = getOrderById;
const updateOrderToPaid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input('order_id', mssql_1.default.VarChar, req.params.id)
            .input('payment_id', mssql_1.default.VarChar, req.body.id)
            .input('payment_status', mssql_1.default.VarChar, req.body.status)
            .input('update_time', mssql_1.default.VarChar, req.body.update_time)
            .input('email_address', mssql_1.default.VarChar, req.body.payer.email_address)
            .execute('usp_UpdateOrderToPaid');
        const updatedOrder = result.recordset[0];
        if (updatedOrder) {
            res.json(updatedOrder);
        }
        else {
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateOrderToPaid = updateOrderToPaid;
const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input('user_id', mssql_1.default.VarChar, user_id)
            .query('SELECT * FROM orders WHERE user_id = @user_id');
        const orders = result.recordset;
        res.json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getMyOrders = getMyOrders;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .query('SELECT * FROM orders');
        const orders = result.recordset;
        res.json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getOrders = getOrders;
const updateOrderToDelivered = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input('order_id', mssql_1.default.VarChar, id)
            .execute('UpdateOrderToDelivered');
        const updatedOrder = result.recordset[0];
        if (updatedOrder) {
            res.json(updatedOrder);
        }
        else {
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateOrderToDelivered = updateOrderToDelivered;
