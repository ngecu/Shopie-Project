CREATE OR ALTER PROCEDURE InsertUser
    @user_id VARCHAR(50),
    @name VARCHAR(100),
    @email VARCHAR(100),
    @password VARCHAR(100)
AS
BEGIN
    INSERT INTO users (user_id, name, email,  password)
    VALUES (@user_id, @name, @email,  @password);
END;



CREATE OR ALTER PROCEDURE loginUser(@email VARCHAR(200), @password VARCHAR(200))
AS
BEGIN

    SELECT * FROM users WHERE email= @email

END
