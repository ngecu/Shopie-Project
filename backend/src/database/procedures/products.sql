
CREATE OR ALTER PROCEDURE InsertProduct
 @product_id VARCHAR(255),
  @name VARCHAR(255),
  @price DECIMAL(18, 2),
  @discount INT,
  @tags  VARCHAR(255),
  @image VARCHAR(255),
  @category_id VARCHAR(255),
  @countInStock INT,
  @numReviews INT,
  @description TEXT
AS
BEGIN
  INSERT INTO products (
    product_id,
    name,
    price,
    discount,
    tags,
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
    @tags,
    @image,
    @category_id,
    @countInStock,
    @numReviews,
    @description
  );

  
END;