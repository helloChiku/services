import { createContext, useContext, useState, useEffect } from 'react';
import { getAppointments, updateAppointment } from '../api/appointments';
import toast from 'react-hot-toast';


const AppointmentContext = createContext(undefined);


export const AppointmentProvider = ({ children }) => {

  const [appointments, setAppointments] = useState([])
  const [appointment, setAppointment] = useState({})


  
  async function updateAppointments(payload) {
try {
      const response = await updateAppointment(payload)

     
        toast.success(response.message)
      getAllAppointments()


    } catch (err) {
      console.log(err, "erro")
      toast.error(err.message || 'Appointments failed to fetch !');
    }
  }

  async function getAllAppointments() {



    try {
      const response = await getAppointments()

      if (response.data) {
        setAppointments(response.data.appointments
        )
        toast.success(response.message)
      } else {
        if (response.message) {
          toast.error(response.message)
        } else {
          throw new Error('Unable to fetch Appointments')
        }
      }


    } catch (err) {
      
      toast.error(err.message || 'Appointments failed to fetch !');
    }

  }

  

  return (
    <AppointmentContext.Provider value={{ appointments, appointment, updateAppointments, getAllAppointments }}>

      {children}

    </AppointmentContext.Provider>
  );
};


export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error('useAppointments must be used inside AppointmentProvider');
  return context;
};


