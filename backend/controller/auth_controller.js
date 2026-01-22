import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from "../database/db.js";



export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);


    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    


    db.get(
      "SELECT id FROM users WHERE email = ?",
      [email],
      async (err, row) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Database error",
          });
        }

        if (row) {
          return res.status(409).json({
            success: false,
            message: "User already exists",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, hashedPassword],
          function (err) {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Failed to create user",
              });
            }

            const userId = this.lastID;

            const token = jwt.sign(
              { userId },
              process.env.JWT_SECRET,
              { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.status(201).json({
              success: true,
              token,
              user: {
                id: userId,
                name,
                email,
              },
            });
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};





export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    db.get(
      "SELECT id, name, email, password FROM users WHERE email = ?",
      [email],
      async (err, row) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Database error",
          });
        }

        if (!row) {
          return res.status(401).json({
            success: false,
            message: "Invalid email or password",
          });
        }

        const isMatch = await bcrypt.compare(password, row.password);

        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: "Invalid email or password",
          });
        }

        const token = jwt.sign(
          { userId: row.id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
          success: true,
          token,
          user: {
            id: row.id,
            name: row.name,
            email: row.email,
          },
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};





//i am defining logic in this controller file and routes re in seprate file