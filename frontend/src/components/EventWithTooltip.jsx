import { useState } from 'react';

const EventWithPopup = ({ event, allEvents }) => {
  const [showPopup, setShowPopup] = useState(false);

  const eventDate = new Date(event.start).toDateString();

  const sameDayEvents = allEvents.filter(e =>
    new Date(e.start).toDateString() === eventDate
  );
console.log(sameDayEvents, "same day" )
  return (
    <div
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
      className="relative"
    >
      <div className="cursor-pointer">{event.title}</div>

      {showPopup && (
        <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-md z-50 p-3 rounded w-64 text-sm">
          <strong>{eventDate}</strong>
          <ul className="mt-1 list-disc list-inside max-h-40 overflow-y-auto">
            {sameDayEvents.map((e, idx) => (
              <li key={idx} style={{
                border: 'red'
              }}>
                
                {e.title} ({new Date(e.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default EventWithPopup