import { sqlConfig } from '../config/sqlConfig'
import { Request, Response } from 'express'
import mssql from 'mssql'
import {v4} from'uuid';

export const addOrderItems = async (req: Request, res: Response) => {
    try {
      const {
        product_id,
        user_id,
        shipping_address,
        first_name,
        last_name,
        phone_number,
        email_address,
        payment_method,
        payment_result_id,
        payment_result_status,
        payment_result_update_time,
        payment_result_email_address,
        tax_price,
   
        total_price,
        is_paid,
        paid_at
    } = req.body;
    
  
  
      const pool = await mssql.connect(sqlConfig);
      const order_id = v4()
      const result = await pool.request()
      .input('product_id', mssql.VarChar, product_id)
      .input('order_id', mssql.VarChar, order_id)
        .input('user_id', mssql.VarChar, user_id)
        .input('shipping_address', mssql.NVarChar, shipping_address)
        .input('paymentMethod', mssql.VarChar, payment_method)
        .input('first_name', mssql.VarChar, first_name)
        .input('last_name', mssql.VarChar, last_name)
        .input('phone_number', mssql.VarChar, phone_number)
        .input('email_address', mssql.VarChar, email_address
        .input('email_address', mssql.VarChar, email_address)
        .input('payment_result_id', mssql.VarChar, payment_result_id)
        .input('payment_result_status', mssql.VarChar, payment_result_status)
        .input('payment_result_update_time', mssql.VarChar, payment_result_update_time)
        .input('payment_result_email_address', mssql.VarChar, payment_result_email_address)
        .input('tax_price', mssql.VarChar, tax_price)
        .input('total_price', mssql.VarChar, total_price)
        .input('is_paid', mssql.VarChar, is_paid)
        .input('paid_at', mssql.VarChar, paid_at)

        
        )
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
  