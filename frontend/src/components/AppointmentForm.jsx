import { useState } from 'react';
import toast from 'react-hot-toast';
import {useAppointments} from "../context/AppointmentContext"
import { addAppointment } from '../api/appointments';
const AppointmentForm = () => {
  const {appointments,  getAllAppointments} = useAppointments()
  const [form, setForm] = useState({
    title: '',
    description: '',
    dateTime: '',
    duration: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const newStart = new Date(form.dateTime);
      const newEnd = new Date(newStart.getTime() + Number(form.duration) * 60000);

      
      const conflict = appointments.some((a) => {
        const aStart = new Date(a.dateTime);
        const aEnd = new Date(aStart.getTime() + Number(form.duration) * 60000);
        return newStart < aEnd && newEnd > aStart;
      });

      if (conflict) return toast.error('Appointment time conflicts with another.');

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(form.address)}`
      );
      const results = await response.json();
      if (!results.length) return toast.error('Could not find location');

      const lat = parseFloat(results[0].lat);
      const lon = parseFloat(results[0].lon);
      const location = {
        type: 'Point',
        coordinates: [lon, lat],
        address: form.address,
      };

     console.log(location, "location")

    await addAppointment({
      title: form.title,
        description: form.description,
        dateTime: form.dateTime,
        duration: form.duration,
        location
     })
      getAllAppointments()
      toast.success('Appointment created successfully');
      setForm({
        title: '',
        description: '',
        dateTime: '',
        duration: '',
        address: '',
      });
    } catch (err) {
      console.log(err)
      toast.error('Failed to create appointment');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-blue-100">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Create Appointment</h2>

      <input
        type="text"
        name="title"
        className="w-full border p-2 mb-3 rounded"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        className="w-full border p-2 mb-3 rounded"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        type="datetime-local"
        name="dateTime"
        className="w-full border p-2 mb-3 rounded"
        value={form.dateTime}
        onChange={handleChange}
      />
      <input
        type="number"
        name="duration"
        className="w-full border p-2 mb-3 rounded"
        placeholder="Duration (minutes)"
        value={form.duration}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        className="w-full border p-2 mb-4 rounded"
        placeholder="Location (e.g., Sydney, Australia)"
        value={form.address}
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
};

export default AppointmentForm;
