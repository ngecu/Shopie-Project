import { sqlConfig } from '../config/sqlConfig'
import { Request, Response } from 'express'
import mssql from 'mssql'

export const getProducts = async (req: Request, res: Response) => {
    try {
      const pageSize = 10;
      const page = Number(req.query.pageNumber) || 1;
  
      const keyword = req.query.keyword
        ? `WHERE name LIKE '%${req.query.keyword}%'`
        : '';
  
      const pool = await mssql.connect(sqlConfig);
  
      const countResult = await pool.request().query(`SELECT COUNT(*) as count FROM products ${keyword}`);
      const count = countResult.recordset[0].count;
  
      const result = await pool.request().query(`
        SELECT * FROM (
          SELECT ROW_NUMBER() OVER (ORDER BY product_id) as row, * FROM products ${keyword}
        ) as products
        WHERE row > ${(page - 1) * pageSize} AND row <= ${page * pageSize}
      `);
  
      const products = result.recordset;
  
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
export const getProductById = async (req: Request, res: Response) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request().input('product_id', mssql.VarChar, req.params.id).query('SELECT * FROM products WHERE product_id = @product_id');
  
      if (result.recordset.length > 0) {
        res.json(result.recordset[0]);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const deleteProduct = async (req: Request, res: Response) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request().input('product_id', mssql.VarChar, req.params.id).execute('usp_DeleteProduct');
  
      if (result.rowsAffected > 0) {
        res.json({ message: 'Product removed' });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export  const createProduct = async (req: Request, res: Response) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('name', mssql.VarChar, 'Sample name')
        .input('price', mssql.Decimal, 0)
        .input('discount', mssql.Int, Math.floor(Math.random() * (10 - 1 + 1)) + 1)
        .input('user_id', mssql.VarChar, req.user._id)
        .input('image', mssql.VarChar, '/images/sample.jpg')
        .input('brand', mssql.VarChar, 'Sample brand')
        .input('category_id', mssql.VarChar, '648a3c1059b8f5eb381f29f0')
        .input('branding', mssql.VarChar, 'Sample Branding')
        .input('countInStock', mssql.Int, 0)
        .input('numReviews', mssql.Int, 0)
        .input('description', mssql.Text, 'Sample description')
        .execute('usp_InsertProduct');
  
      const createdProduct = result.recordset[0];
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


export const updateProduct = async (req: Request, res: Response) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool.request()
        .input('product_id', mssql.VarChar, req.params.id)
        .input('name', mssql.VarChar, req.body.name)
        .input('image', mssql.VarChar, req.body.image)
        .input('category_id', mssql.VarChar, req.body.category)
        .input('branding', mssql.VarChar, req.body.branding)
        .input('description', mssql.Text, req.body.description)
        .input('discount', mssql.Int, req.body.discount)
        .input('price', mssql.Decimal, req.body.price)
        .input('countInStock', mssql.Int, req.body.countInStock)
        .execute('usp_UpdateProduct');
  
      const updatedProduct = result.recordset[0];
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export  const createProductReview = async (req: Request, res: Response) => {
    try {
      const { rating, comment } = req.body;
  
      const pool = await mssql.connect(sqlConfig);
  
      // Check if the product exists
      const productResult = await pool.request()
        .input('product_id', mssql.VarChar, req.params.id)
        .query('SELECT * FROM products WHERE product_id = @product_id');
  
      const product = productResult.recordset[0];
  
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
  
      const alreadyReviewedResult = await pool.request()
        .input('product_id', mssql.VarChar, req.params.id)
        .input('user_id', mssql.VarChar, req.user._id)
        .query('SELECT * FROM product_reviews WHERE product_id = @product_id AND user_id = @user_id');
  
      const alreadyReviewed = alreadyReviewedResult.recordset[0];
  
      if (alreadyReviewed) {
        res.status(400).json({ error: 'Product already reviewed' });
        return;
      }

      const addReviewResult = await pool.request()
        .input('product_id', mssql.VarChar, req.params.id)
        .input('user_id', mssql.VarChar, req.user._id)
        .input('name', mssql.VarChar, req.user.name)
        .input('rating', mssql.Int, Number(rating))
        .input('comment', mssql.VarChar, comment)
        .execute('usp_AddProductReview');
  
      const updateProductResult = await pool.request()
        .input('product_id', mssql.VarChar, req.params.id)
        .query('UPDATE products SET numReviews = (SELECT COUNT(*) FROM product_reviews WHERE product_id = @product_id), rating = (SELECT AVG(CAST(rating AS FLOAT)) FROM product_reviews WHERE product_id = @product_id) WHERE product_id = @product_id');
  
      res.status(201).json({ message: 'Review added' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  