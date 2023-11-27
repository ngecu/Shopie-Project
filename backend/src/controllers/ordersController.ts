import { sqlConfig } from '../config/sqlConfig'
import { Request, Response } from 'express'
import mssql from 'mssql'

export const addOrderItems = async (req: Request, res: Response) => {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user_id,
      } = req.body;
  
      if (!orderItems || orderItems.length === 0) {
        res.status(400).json({ error: 'No order items' });
        return;
      }
  
      const pool = await mssql.connect(sqlConfig);
  
      const result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .input('orderItems', mssql.NVarChar, JSON.stringify(orderItems))
        .input('shippingAddress', mssql.NVarChar, JSON.stringify(shippingAddress))
        .input('paymentMethod', mssql.VarChar, paymentMethod)
        .input('itemsPrice', mssql.Decimal, itemsPrice)
        .input('taxPrice', mssql.Decimal, taxPrice)
        .input('shippingPrice', mssql.Decimal, shippingPrice)
        .input('totalPrice', mssql.Decimal, totalPrice)
        .execute('AddOrder');
  
      const createdOrder = result.recordset[0];
  
      res.status(201).json(createdOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
export  const getOrderById = async (req: Request, res: Response) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('order_id', mssql.VarChar, req.params.id)
        .query('SELECT * FROM orders WHERE order_id = @order_id');
  
      const order = result.recordset[0];
  
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export  const updateOrderToPaid = async (req: Request, res: Response) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('order_id', mssql.VarChar, req.params.id)
        .input('payment_id', mssql.VarChar, req.body.id)
        .input('payment_status', mssql.VarChar, req.body.status)
        .input('update_time', mssql.VarChar, req.body.update_time)
        .input('email_address', mssql.VarChar, req.body.payer.email_address)
        .execute('usp_UpdateOrderToPaid');
  
      const updatedOrder = result.recordset[0];
  
      if (updatedOrder) {
        res.json(updatedOrder);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
export  const getMyOrders = async (req: Request, res: Response) => {
    try {
      const {user_id} = req.body
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .query('SELECT * FROM orders WHERE user_id = @user_id');
  
      const orders = result.recordset;
  
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export  const getOrders = async (req: Request, res: Response) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .query('SELECT * FROM orders');
  
      const orders = result.recordset;
  
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
export const updateOrderToDelivered = async (req: Request, res: Response) => {
    try {
      const {id} = req.params
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('order_id', mssql.VarChar, id)
        .execute('UpdateOrderToDelivered');
  
      const updatedOrder = result.recordset[0];
  
      if (updatedOrder) {
        res.json(updatedOrder);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  