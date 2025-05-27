import { useState } from 'react';
import { Pencil, Trash2 } from "lucide-react";
import { useAppointments } from '../context/AppointmentContext';
import { generateOsmIframeUrl } from '../utils/auth';
import { updateAppointment, deleteAppointment } from '../api/appointments';
const AppointmentList = () => {
  const { appointments, updateAppointments, getAllAppointments } = useAppointments();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (appointment) => {
    setSelectedAppointment({ ...appointment });
    setShowModal(true);
  };

  const handleDelete = async (id) => {

    try {
    

     
     const response =  await deleteAppointment(id);
getAllAppointments()
        toast.success(response.message)

    } catch (err) {
      console.log(err, "erro")
      toast.error(err.message || 'Appointments failed to delete !');
    }

    
  };

  const handleSave = async (e) => {
    e.preventDefault();
    selectedAppointment.id = selectedAppointment._id;
    delete selectedAppointment?._id;
    await updateAppointments(selectedAppointment);
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-white mt-6 p-6 rounded-xl shadow border border-blue-100">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Appointments</h2>

        <ul className="space-y-4">
          {appointments.map((a, index) => {
            const lat = a.location?.coordinates[1];
            const lng = a.location?.coordinates[0];
            const { iframeUrl, linkUrl } = generateOsmIframeUrl(lat, lng);

            return (
              <li
                key={a._id}
                className={`flex flex-col md:flex-row md:items-center md:justify-between border p-4 rounded shadow-sm hover:shadow-md transition-all ${
                  index % 2 === 0 ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                {/* Left side */}
                <div className="flex-1 mb-4 md:mb-0">
                  <p className="font-semibold text-gray-800 text-lg">{a.title}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(a.dateTime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Duration: {a.duration} minutes</p>
                  <p className="text-sm text-gray-500 italic">{a.description}</p>
                  {a.location?.address && (
                    <p className="text-xs text-blue-600 mt-1">{a.location.address}</p>
                  )}
                </div>

                {/* Map */}
                {lat && lng && (
                  <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-[150px] h-[100px] border rounded overflow-hidden"
                  >
                    <iframe
                      title="Map Preview"
                      src={iframeUrl}
                      width="150"
                      height="100"
                      className="w-full h-full"
                      frameBorder="0"
                      scrolling="no"
                    ></iframe>
                  </a>
                )}

                {/* Buttons */}
                <div className="flex items-center gap-4 m-4">
                  <button
                    onClick={() => handleEdit(a)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                     style={{
                      cursor: "pointer"
                    }}
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                    style={{
                      cursor: "pointer"
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Edit Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 bg-gradient-to-r from-blue-100 to-blue-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <h3 className="text-xl font-bold mb-4 text-blue-700">Edit Appointment</h3>

            <form onSubmit={handleSave} className="space-y-4">
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={selectedAppointment.title}
                onChange={(e) =>
                  setSelectedAppointment((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Title"
              />
              <textarea
                className="w-full border p-2 rounded"
                value={selectedAppointment.description}
                onChange={(e) =>
                  setSelectedAppointment((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Description"
              ></textarea>
              <input
                type="datetime-local"
                className="w-full border p-2 rounded"
                value={new Date(selectedAppointment.dateTime).toISOString().slice(0, -8)}
                onChange={(e) =>
                  setSelectedAppointment((prev) => ({
                    ...prev,
                    dateTime: new Date(e.target.value),
                  }))
                }
              />
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={selectedAppointment.duration}
                onChange={(e) =>
                  setSelectedAppointment((prev) => ({
                    ...prev,
                    duration: e.target.value,
                  }))
                }
                placeholder="Duration"
              />

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentList;
