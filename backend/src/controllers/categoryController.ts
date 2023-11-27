import { sqlConfig } from '../config/sqlConfig'
import { Request, Response } from 'express'
import mssql from 'mssql'
import {v4} from 'uuid'

export const createCategory = async (req: Request, res: Response) => {
    try {
        const {category_name,category_description} = req.body
        const category_id = v4();
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('category_id', mssql.VarChar, category_id)
        .input('category_name', mssql.VarChar, category_name)
        .input('category_description', mssql.VarChar, category_description)

        .execute('InsertCategory');
  
      const createdCategory = result.recordset[0];
      res.status(201).json(createdCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  