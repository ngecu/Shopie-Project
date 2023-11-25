import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from "../controllers/ordersController";

const order_router = Router()


order_router.route('/').post(addOrderItems).get(verifyToken, getOrders)
order_router.route('/myorders').get(verifyToken, getMyOrders)
order_router.route('/:id').get(verifyToken, getOrderById)
order_router.route('/:id/pay').put(verifyToken, updateOrderToPaid)
order_router.route('/:id/deliver').put(verifyToken, updateOrderToDelivered)

export default order_router;