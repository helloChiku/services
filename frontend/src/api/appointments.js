
import axios from "axios";
import { getAuthToken } from "../utils/auth";
import axiosClient from "./axiosClient";




// GET all appointments
export const getAppointments = async () => {
 
  try {
   

    const response = await axiosClient.get(
      `/appointments`,
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

// CREATE appointment
export const addAppointment = async (appointment) => {
 try {


    const response = await axiosClient.post(
      `${import.meta.env.VITE_API_BASE_URL}/appointments`,
      appointment,
      {
        headers: {
          Authorization: getAuthToken(),
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// DELETE appointment
export const deleteAppointment = async (id) => {
 try {


    const response = await axiosClient.delete(
      `${import.meta.env.VITE_API_BASE_URL}/appointments/${id}`,
      {
        headers: {
          Authorization: getAuthToken(),
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// UPDATE appointment (used for drag-drop and editing)
export const updateAppointment = async (updatedData) => {
 try {

delete updatedData?.__v;
delete updatedData?.updatedAt;
delete updatedData?.location;
delete updatedData?.userId;
delete updatedData?.createdAt;


    const response = await axiosClient.put(
      `${import.meta.env.VITE_API_BASE_URL}/appointments/${updatedData.id}`,
      updatedData,
      {
        headers: {
          Authorization: getAuthToken(),
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
