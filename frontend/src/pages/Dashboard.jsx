import AppointmentForm from '../components/AppointmentForm';
import AppointmentList from '../components/AppointmentList';
import CalendarView from '../components/CalendarView';
import Header from '../components/Header';
import { useEffect } from 'react';
import { useAppointments } from '../context/AppointmentContext';
const DashboardPage = () => {
  const {getAllAppointments} = useAppointments()
  useEffect(() => {
    getAllAppointments()
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-50">
      
      <Header/>

      {/* Main content */}
      <main className="p-4">
        {/* <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">📅 Appointment Scheduler</h1> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AppointmentForm />
          <CalendarView />
        </div>
        <AppointmentList />
      </main>
    </div>

  );
};

export default DashboardPage;
