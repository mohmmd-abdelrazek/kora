import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import pool from "../config/pgConfig"; 
import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, verificationCode: string): Promise<void> => {
  // Create a test account on Ethereal (only needed once)
  const testAccount = await nodemailer.createTestAccount();

  // Create a transporter using the Ethereal test account
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // Ethereal username
      pass: testAccount.pass, // Ethereal password
    },
  });

  // Define email options
  const mailOptions = {
    from: '"Your Service Name" <your_service_email@example.com>', // sender address
    to: email, // list of receivers
    subject: "Verification Code", // Subject line
    text: `Your verification code is: ${verificationCode}`, // plain text body
    html: `<b>Your verification code is: ${verificationCode}</b>`, // HTML body content
  };

  // Send the email
  const info = await transporter.sendMail(mailOptions);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

export const sendVerificationCode = async (req: Request, res: Response) => {
  const { email } = req.body;
  
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Assume your `verification_codes` table has an `expires_at` timestamp field
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10); // Code expires in 10 minutes

  await pool.query('INSERT INTO verification_codes (email, code, expires_at) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET code = EXCLUDED.code, expires_at = EXCLUDED.expires_at', [email, verificationCode, expiresAt]);

  sendVerificationEmail(email, verificationCode);

  res.status(200).json({ message: 'Verification code sent.' });
};

export const verifyCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  const result = await pool.query('SELECT * FROM verification_codes WHERE email = $1 AND code = $2 AND expires_at > NOW()', [email, code]);

  if (result.rows.length === 0) {
    return res.status(400).json({ error: 'Invalid or expired code.' });
  }
  res.status(200).json({ message: 'Verification code correct.' });
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const saltRounds: number = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);

    const hashedPassword: string = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    const { id, name: userName, email: userEmail } = newUser.rows[0];
    res.status(201).json({
      message: "Signup successful",
      user: { id, name: userName, email: userEmail },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during signup." });
  }
};

export const login = (req: Request, res: Response) => {
  console.log('Sign-in request received:', req.body);
  if (req.user) {
    res.status(200).json({ message: "Login successful", user: req.user });
  } else {
    res.status(401).json({ error: "Login failed" });
  }
};

export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.status(200).json({ success: true, message: "Logout successful" });
  });
};

export const status = (req: Request, res: Response) => {
  res.status(200).json({ isAuthenticated: req.isAuthenticated(), user: req.user });
};

export const googleCallback = passport.authenticate("google");
