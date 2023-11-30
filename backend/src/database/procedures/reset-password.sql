CREATE OR ALTER  PROCEDURE [dbo].[resetPassword]
	(@user_id varchar(100),@password varchar(100))
as

set nocount on;

begin
	UPDATE users
	SET 
	password = @password
	WHERE user_id = @user_id 
end;



CREATE OR ALTER PROCEDURE [dbo].[getUserByEmail]
    @email NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Add your logic to retrieve user information based on email
    -- Replace 'YourUserTable' with the actual name of your user table

    SELECT name, email
    FROM users
    WHERE email = @email;
END;









