
CREATE OR ALTER PROCEDURE InsertProduct
  @name VARCHAR(255),
  @price DECIMAL(18, 2),
  @discount INT,
  @image VARCHAR(255),
  @category_id VARCHAR(255),
  @countInStock INT,
  @numReviews INT,
  @description TEXT
AS
BEGIN
  INSERT INTO products (
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
    @name,
    @price,
    @discount,
    @image,
    @category_id,
    @countInStock,
    @numReviews,
    @description
  );

  
END;
