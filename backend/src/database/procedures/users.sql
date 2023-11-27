CREATE PROCEDURE InsertUser
    @user_id VARCHAR(50),
    @name VARCHAR(100),
    @email VARCHAR(100),
    @phone_number VARCHAR(20),
    @password VARCHAR(100)
AS
BEGIN
    INSERT INTO users (user_id, name, email, phone_number, password)
    VALUES (@user_id, @name, @email, @phone_number, @password);
END;


CREATE PROCEDURE LoginUser
    @email VARCHAR(100),
    @password VARCHAR(100)
AS
BEGIN
    DECLARE @userId INT;

    SELECT @userId = user_id
    FROM users
    WHERE email = @email AND password = @password AND active = 1;

    IF @userId IS NOT NULL
    BEGIN
        SELECT user_id, name, email, phone_number
        FROM users
        WHERE user_id = @userId;
    END
    ELSE
    BEGIN
        SELECT NULL AS user_id, NULL AS name, NULL AS email, NULL AS phone_number;
    END
END;
