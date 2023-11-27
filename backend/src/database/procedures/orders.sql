CREATE OR ALTER PROCEDURE AddOrder
@order_id VARCHAR(500),
    @product_id NVARCHAR(MAX),
    @shippingAddress NVARCHAR(MAX),
    @paymentMethod VARCHAR(50),
    @itemsPrice DECIMAL(10, 2),
    @taxPrice DECIMAL(10, 2),
    @shippingPrice DECIMAL(10, 2),
    @totalPrice DECIMAL(10, 2),
    @user_id VARCHAR(500)
AS
BEGIN

    INSERT INTO orders (
        order_id,
		product_id,
        user_id,
        shipping_address,
        payment_method,
        tax_price,
        shipping_price,
        total_price
        
    )
    VALUES (
        @order_id, 
		 @product_id,
        @user_id,
        @shippingAddress,
        @paymentMethod,
        @taxPrice,
        @shippingPrice,
        @totalPrice
      
    );

   
END;