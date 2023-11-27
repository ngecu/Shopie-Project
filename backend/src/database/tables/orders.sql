
CREATE TABLE orders (
    order_id VARCHAR(255) PRIMARY KEY,
    product_id VARCHAR(255) ,

    user_id VARCHAR(500) NOT NULL,
    shipping_address VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email_address VARCHAR(100),
    payment_method VARCHAR(50) NOT NULL,
    payment_result_id VARCHAR(255),
    payment_result_status VARCHAR(50),
    payment_result_update_time DATETIME,
    payment_result_email_address VARCHAR(100),
    tax_price DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    shippingAddress DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    
    shipping_price DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    total_price DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    is_paid INT NOT NULL DEFAULT 0,
    paid_at DATETIME,
    is_delivered INT  DEFAULT 0,
    delivered_at DATETIME,
    created_at TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),

);