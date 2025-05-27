import axios from "axios";
import axiosClient from "./axiosClient";
import { getAuthToken } from "../utils/auth";
export const login = async (userData) => {
 try {
    const response = await axiosClient.post(`/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const signup = async (userData) => {
  try {
    
    const response = await axiosClient.post(`/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const forgotPassword = async (userData) => {
  try {
    
    const response = await axiosClient.post(`/auth/forgot-password`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const getUserProfile = async () => {
  try {
   

    const response = await axiosClient.get(
      `/auth/profile`,
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
