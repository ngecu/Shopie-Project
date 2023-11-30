import mssql from "mssql";
import bcrypt from "bcrypt";
import { getOneUser, loginUser, registerUser, updateUserDetails } from "./usersControllers";
import { Request } from "express";
import jwt from "jsonwebtoken";

describe("User Registration", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });


  it("registers a user using dbhelpers", async () => {
    const req = {
      body: {
        name: "Robin",
        email: "devngecu@gmail.com",
        password: "I@mrich24"
      },
    };

    jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValueOnce("HashedPass@word123" as never);

    const mockedInput = jest.fn().mockReturnThis();

    const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);

    await registerUser(req as Request, res as never);

        expect(res.json).toHaveBeenCalledWith({
          message: "User registered successfully",
        });
        expect(res.status).toHaveBeenCalledWith(200)
  });
  
    it("failed to register", async () => {
    const req = {
      body: {
        // userName: "Robin",
        email: "devngecu@gmail.com",
        password: "I@mrich24",
      },
    };

    jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValueOnce("HashedPass@word123" as never);

    const mockedInput = jest.fn().mockReturnThis();

    const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);

    await registerUser(req as Request, res as never);

        expect(res.json).toHaveBeenCalledWith({
          error: '"userName" is required',
        });
        expect(res.status).toHaveBeenCalledWith(400)
  });

});

describe("User Login",()=>{

      let res: any;
      let req:any;

      beforeEach(() => {
        res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };
      });

          it("Returns an error if email or password is empty", async () => {
            const req = {
              body: {
                email: "",
                password: "",
              },
            };

            await loginUser(req as Request, res);

            expect(res.json).toHaveBeenCalledWith({
              error: '"email" is not allowed to be empty',
            });
          });
 it('Returns an error if email or password is missing' ,async()=>{
        const req = {
            body:{
                
            }
        }

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({"error": "\"password\" is required"})

    })

    it("Returns an error if email is not in database", async()=>{
        const req = {
            body:{
                email: "incorrect@email.com",
                password: "12345678"
            } 
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: []})
        } as never)
 
        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({error: "Email not found"}) 
    })

    it("Handles incorrect password scenario", async()=>{
        const req = {
            body:{
                email: "correct@email.com",
                password: "wrongPassword"
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [{
                    email: 'correct@email.com',
                    password: 'hashedPwd'
                }]
            })
        } as never)

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never)

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({error: "Incorrect password"})
    })

    it("successfully logs in a user and returns a token", async()=>{

        let expectedUser = {
            user_id: "539c2d03-1605-43af-8553-f87c8045352f",
            name: "Eucs Angulars",
          email: "da@gmail.com",
          password:
            "$2b$05$hNpxpVF/oG8yQvnwLSOYQOyXxy/AUdZqk7PFtwOIStyHPDSKAnpde",

          role: 0,
          welcomed: 0,
          isOrder: 0
        };

        const req = {
            body:{
                email: expectedUser.email,
                password: "correctPassword"
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: [expectedUser]})
        } as never)

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never)

        jest.spyOn(jwt, 'sign').mockReturnValueOnce("generate-token-jghjg-jyiugjxz-mmhjruyiu" as never)

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "Logged in successfully",
            token: "generate-token-jghjg-jyiugjxz-mmhjruyiu"
        })

    })

})


describe("Get One Member", () => {

  let res: any;

  beforeEach(() => {
      res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis()
      };
  });

  it("successfully retrieves a member", async () => {
      const req = {
          params: {
              member_id: "02dcd240-47d5-43e6-8a14-5777466f588b"
          }
      };

      const mockedRecordset = [
       
          {
              member_id: "02dcd240-47d5-43e6-8a14-5777466f588b",
              firstName: "Robinson",
              lastName: "Ngecu",
              email: "robinson.ngecu@thejitu.com",
              cohortNumber: 17,
              role: "member"
          }
      ];

      const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedRecordset });
      const mockedRequest = {
          input: jest.fn().mockReturnThis(),
          execute: mockedExecute
      };
      const mockedPool = {
          request: jest.fn().mockReturnValue(mockedRequest)
      };

      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

      await getOneUser(req as unknown as Request, res as any);

      // Assertions
      expect(res.json).toHaveBeenCalledWith({
          member: mockedRecordset
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(mockedRequest.input).toHaveBeenCalledWith('member_id', '02dcd240-47d5-43e6-8a14-5777466f588b');
      expect(mockedRequest.execute).toHaveBeenCalledWith('fetchOneMember');
  });

  it("handles errors", async () => {
      const req = {
          params: {
              id: "a55daeb0-2d83-4c4f-9bba-c722c4de195cas_with_error"
          }
      };

      const errorMessage = "An error occurred";
      const mockedExecuteWithError = jest.fn().mockRejectedValue(new Error(errorMessage));
      const mockedRequestWithError = {
          input: jest.fn().mockReturnThis(),
          execute: mockedExecuteWithError
      };
      const mockedPoolWithError = {
          request: jest.fn().mockReturnValue(mockedRequestWithError)
      };

      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPoolWithError as never);

      await getOneUser(req as unknown as Request, res as any);

      // Assertions
      expect(res.json).toHaveBeenCalledWith({
          error: errorMessage
      });
      expect(res.status).toHaveBeenCalledWith(500);
  });
});





describe('updateUser', () => {

  let res: any;
  let req: any;

  beforeEach(() => {
      

      res = {
          status: jest.fn().mockReturnThis(),
          json:jest.fn().mockReturnThis(),
      };
  });

  it('should update a member successfully', async () => {
      req = {
          params: {
              member_id: '02dcd240-47d5-43e6-8a14-5777466f588b', 
          },
          body: {
              firstName: 'Jenniffer',
              lastName: 'Kalunda',
              email: 'robinson.ngecu@thejitu.com',
              cohortNumber: 7,
          },
      };

       const mockedInput = jest.fn().mockReturnThis();
       const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

       const mockedRequest = {
          input: mockedInput,
          execute: mockedExecute
      }

      const mockedPool = {
          request: jest.fn().mockReturnValue(mockedRequest)
      }


      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)


      await updateUserDetails(req as Request, res as never);

      // Assertions
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Member updated successfully' });
  });

  it('should handle errors', async () => {
      const connectMock = jest.spyOn(mssql, 'connect').mockRejectedValueOnce(new Error('Database connection error') as never);

      await updateUserDetails(req as Request, res as never);

      // Assertions
      expect(connectMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.any(Error) });
  });
});

