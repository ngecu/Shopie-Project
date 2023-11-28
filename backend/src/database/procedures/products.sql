CREATE OR ALTER PROCEDURE InsertProduct
 @product_id VARCHAR(255),
 @name VARCHAR(255),
 @price DECIMAL(18, 2),
 @discount INT,
 @tags VARCHAR(255),
 @image VARCHAR(255),
 @category_id VARCHAR(255),
 @countInStock INT,
 @numReviews INT,
 @description TEXT
AS
BEGIN
 SET NOCOUNT ON;

 -- Check if the category exists in the database
 IF NOT EXISTS (SELECT 1 FROM categories WHERE category_id = @category_id)
 BEGIN
    -- Insert the new category into the database
    INSERT INTO categories (category_id)
    VALUES (@category_id);
 END

 -- Check if the product already exists in the database
 IF NOT EXISTS (SELECT 1 FROM products WHERE product_id = @product_id)
 BEGIN
    -- Insert the new product into the database
    INSERT INTO products (
      product_id,
      name,
      price,
      discount,
      image,
      category_id,
      countInStock,
      numReviews,
      description
    )
    VALUES (
      @product_id,
      @name,
      @price,
      @discount,
      @image,
      @category_id,
      @countInStock,
      @numReviews,
      @description
    );
 END
 ELSE
 BEGIN
    -- Return an error message if the product already exists
    RAISERROR('The product with product_id %s already exists in the database.', 16, 1, @product_id)
    RETURN;
 END
END;