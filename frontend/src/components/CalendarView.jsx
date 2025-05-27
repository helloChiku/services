import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { useAppointments } from '../context/AppointmentContext';
import {refactorCanlenederView, convertEventToApiFormat} from '../utils/auth'
import toast from 'react-hot-toast';
import EventWithTooltip from './EventWithTooltip.jsx'

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarView = () => {
  const {appointments, updateAppointments}=useAppointments();
  
  const moveEvent = async ({ event, start, end }) => {
  const payload = convertEventToApiFormat(event, start, end);

  await updateAppointments(payload)

};

  
  

  return (
    <div className="bg-white p-4 rounded-xl shadow border border-blue-100">
      <h2 className="text-lg font-semibold mb-2 text-blue-700">Calendar</h2>
      <DnDCalendar
        localizer={localizer}
      events={refactorCanlenederView(appointments)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400 }}
        onEventDrop={moveEvent}
        resizable
        onEventResize={moveEvent}
       
      />
    </div>
  );
};

export default CalendarView;
