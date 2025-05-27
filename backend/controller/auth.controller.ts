import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.model';
import { errorHandler } from '../middleware/error.middleware';
import responseLib from '../lib/responseLib';
/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, contact= '000000000' } = req.body;
     const existingUser = await User.findOne({ email }).lean();
     if(existingUser){
        const response = responseLib.generateApiResponse(true, null, 'Email already exist, login ', undefined)
    return res.status(409).send(response)
     }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, contact, password: hashedPassword });
    await user.save();

    const response = responseLib.generateApiResponse(false, null, 'User created succefully', undefined)
    return res.status(201).send(response)
  } catch (error) {
    console.log(error, "error")
    const response = responseLib.generateApiResponse(true, null, 'User registration failed', error)
    return res.status(500).send(response)
    
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        const response = responseLib.generateApiResponse(true, null, 'Invalid credentials', undefined)
    return res.status(401).send(response)

     
    }
    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET!, { expiresIn: '11h' });
    const response = responseLib.generateApiResponse(false, {token}, 'User login succefully', undefined)
    return res.status(200).send(response)
    
  } catch (error) {
    const response = responseLib.generateApiResponse(true, null, 'Login failed', error)
   return  res.status(500).send(response)
    
  }
};


/**
 * @desc    Reset user's password
 * @route   POST /api/auth/forgot-password
 * @access  Public or Protected (depending on use-case)
 */
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      const response = responseLib.generateApiResponse(true, null, 'Invalid credentials', undefined);
      return res.status(401).send(response);
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    const response = responseLib.generateApiResponse(false, null, 'Password updated successfully', undefined);
    return res.status(200).send(response);

  } catch (error) {
    const response = responseLib.generateApiResponse(true, null, 'Password update failed', error);
    return res.status(500).send(response);
  }
};


/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Protected
 */
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; 

    if (!userId) {
      const response = responseLib.generateApiResponse(true, null, 'Unauthorized access', undefined);
      return res.status(401).send(response);
    }

    const user = await User.findById(userId).select('-password'); 
    if (!user) {
      const response = responseLib.generateApiResponse(true, null, 'User not found', undefined);
      return res.status(404).send(response);
    }

    const response = responseLib.generateApiResponse(false, user, 'User profile fetched', undefined);
    return res.status(200).send(response);

  } catch (error) {
    const response = responseLib.generateApiResponse(true, null, 'Failed to fetch user profile', error);
    return res.status(500).send(response);
  }
};
