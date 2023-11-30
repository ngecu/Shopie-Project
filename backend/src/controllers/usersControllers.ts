import { Request, Response } from 'express'
import mssql, { VarChar } from 'mssql'
import {v4} from 'uuid'
import bcrypt from 'bcrypt'
import { sqlConfig } from '../config/sqlConfig'
import jwt from 'jsonwebtoken'
import Connection from '../dbhelpers/dbhelpers'
import { registerUserSchema , } from '../validators/validators'
import { isEmpty } from 'lodash'
import { ExtendedUser } from '../middlewares/verifyToken'
import { validateResetpassword, validateUserEmail, } from "../validators/user-validators";
import { config } from 'dotenv'

export const dbhelper = new Connection
 
export const registerUser = async (req:Request, res:Response) => {
    console.log(req.body);
    try {
        
        
        const { name, email, password } = req.body;

        
        if (!name || !email  || !password) {
            return res.status(400).json({
                message: 'Please provide all required fields: name, email, phone_number, password',
            });
        }

        const user_id = v4();
        const hashedPwd = await bcrypt.hash(password, 5);
        const pool = await mssql.connect(sqlConfig);

        const emailTaken = await pool.request()
            .input('email', mssql.VarChar, email)
            .query('SELECT * FROM users WHERE email = @email');


        if (emailTaken.recordset.length > 0) {
            return res.status(400).json({
                error: 'This email is already in use',
            });
        }


        const result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .input('name', mssql.VarChar, name)
        .input('email', mssql.VarChar, email)
        .input('password', mssql.VarChar, hashedPwd)
        .execute('InsertUser');
        
        return res.status(201).json({
            message: 'User registered successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

export const loginUser = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const pool = await mssql.connect(sqlConfig);

        let user = await (await pool.request().input("email", email).input("password", password).execute('loginUser')).recordset;

        if (user[0]?.email == email) {
            const CorrectPwd = await bcrypt.compare(password, user[0]?.password);

            if (!CorrectPwd) {
                return res.status(401).json({
                    error: "Incorrect password"
                });
            }

            if (user[0]?.active === 0) {
                return res.status(401).json({
                    error: "Account deactivated, please contact admin"
                });
            }

            const LoginCredentials = user.map(records => {
                const { password, ...rest } = records;
                return rest;
            });

            const token = jwt.sign(LoginCredentials[0], process.env.SECRET as string);
            
            console.log(token);
            
            return res.status(200).json({
                message: "Logged in successfully", token,name:user[0]?.name
            });
        } else {
            return res.json({
                error: "Email not found"
            });
        }
    } catch (error) {
        return res.json({
            error: error
        });
    }
};

// export const manageProfile = async (req: Request, res: Response) => {
//     try {
//         const { new_password, email } = req.body;
//         console.log(req.body);
        
    
//         // Check if the email exists in the database
//         const emailExists = (await dbhelper.query(`SELECT * FROM users WHERE email = '${email}'`)).recordset;

//         if (!emailExists || emailExists.length === 0) {
//             return res.status(404).json({ error: "Email not found" });
//         }

 

//         // Hash the new password
//         // const hashedNewPassword = await bcrypt.hash(new_password, 10);
//         const hashedNewPassword = true;

//         // Update the user's password in the database
//         await dbhelper.execute('manageProfile', {
//             new_password: hashedNewPassword,
//             user_id: emailExists[0].user_id,
//         });

//         return res.status(200).json({
//             message: 'Password reset successfully'
//         });

//     } catch (error) {
//         console.log(error);
        
//         return res.status(500).json({
//             error: error.message
//         });
//     }
// };


export const checkUserDetails = async (req:ExtendedUser, res:Response)=>{
    
    if(req.info){
        console.log(req.info);
        
        return res.json({
            info: req.info 
        })
    }
    
}


export const getAllUsers =  async (req:ExtendedUser, res:Response)=>{
    try {

        const pool = await mssql.connect(sqlConfig)

        let users = (await pool.request().execute('fetchAllUsers')).recordset
       

        return res.status(200).json({
            users: users
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const getOneUser = async(req:Request, res:Response)=>{
    try {

        let id = req.params.id 

        const pool = await mssql.connect(sqlConfig)

        let user = (await pool.request().input('user_id',id).execute('fetchOneUser')).recordset

        return res.status(200).json({
            user: user
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const deleteUser = async (req: ExtendedUser, res: Response) => {
    try {
      const { user_id } = req.params;
      console.log(user_id);
      
  
      const pool = await mssql.connect(sqlConfig);
  
      // Check if the user exists before attempting deletion
      const userExists = (await pool
        .request()
        .input('user_id', mssql.VarChar(100), user_id)
        .execute('fetchOneUser')).recordset;
  
      if (!userExists.length) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Delete the user
      await pool.request().input('user_id', mssql.VarChar(100), user_id).execute('deleteUser');
  
      return res.status(200).json({message:"Deleted Successfully"}); // Successful deletion, no content response
    } catch (error) {
      return res.status(500).json({
        error: error  || 'Internal Server Error',
      });
    }
  };
  


  export const updateUserActiveStatus = async (req: ExtendedUser, res: Response) => {
    try {
        const userId = req.params.user_id;
        const { active } = req.body;

        console.log(req);
        
    
        const updateQuery = `
          UPDATE users
          SET active = @active
          WHERE user_id = @userId;
          SELECT * FROM users WHERE user_id = @userId;
        `;
    
        const pool = await mssql.connect(sqlConfig);
    
        const result = await pool.request()
          .input('active', mssql.Int, active)
          .input('userId', mssql.VarChar(500), userId)
          .query(updateQuery);
    
        const updatedUser = result.recordset[0];
    
        // Check if any rows were affected
        if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Error updating user activation status:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  };


  export const updateUserDetails = async (req: ExtendedUser, res: Response) => {
    
    try {
        const userId = req.params.user_id;
        const { name,email,password } = req.body;

        

        const hashedPwd = await bcrypt.hash(password, 5);

        const updateQuery = `
        UPDATE users
        SET name = '${name}',
            email = '${email}',
            password = '${password}'
        WHERE user_id = '${userId}';
      `;
      
      const pool = await mssql.connect(sqlConfig);

      
      
      const result = await pool.request().query(updateQuery);

      
      
    
        const updatedUser = result.rowsAffected[0];
    
       console.log(updatedUser);
        if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Error ', error);
        res.status(500).json({ error: 'Internal server dan' });
      }
  };


  