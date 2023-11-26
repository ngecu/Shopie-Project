CREATE TABLE reviews (
    review_id VARCHAR(255) PRIMARY KEY AUTO_INCREMENT,
    -- name VARCHAR(255),
    rating INT,
    comment TEXT,
    user_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id)
    FOREIGN KEY (product_id) REFERENCES products(id)

);
