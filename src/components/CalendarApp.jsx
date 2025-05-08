


// import React, { useState, useEffect } from 'react';
// import {
//   addMonths, subMonths, format, startOfMonth, endOfMonth,
//   startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay
// } from 'date-fns';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const categoryColors = {
//   Default: "bg-green-400",
//   Birthdays: "bg-purple-400",
//   Tasks: "bg-yellow-400",
// };

// function hasConflict(events) {
//   const seen = {};
//   for (const e of events) {
//     const key = `${e.date}-${e.time}`;
//     if (seen[key]) return true;
//     seen[key] = true;
//   }
//   return false;
// }

// export default function CalendarApp() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetch('/events.json')
//       .then(res => res.json())
//       .then(data => setEvents(data))
//       .catch(err => console.error("Failed to load events:", err));
//   }, []);

//   const header = () => (
//     <div className="flex items-center justify-between mb-4">
//       <h2 className="text-xl font-bold">Sparrow Calendar</h2>
//       <div className="flex gap-2 items-center">
//         <button className="btn" onClick={() => setCurrentDate(new Date())}>Today</button>
//         <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
//           <ChevronLeft />
//         </button>
//         <span className="font-medium">{format(currentDate, 'MMMM yyyy')}</span>
//         <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
//           <ChevronRight />
//         </button>
//       </div>
//     </div>
//   );

//   const renderCells = () => {
//     const monthStart = startOfMonth(currentDate);
//     const monthEnd = endOfMonth(monthStart);
//     const startDate = startOfWeek(monthStart);
//     const endDate = endOfWeek(monthEnd);

//     const rows = [];
//     let days = [];
//     let day = startDate;

//     while (day <= endDate) {
//       for (let i = 0; i < 7; i++) {
//         const cloneDay = day;
//         const dayEvents = events.filter(e => e.date === format(cloneDay, 'yyyy-MM-dd'));
//         const conflict = hasConflict(dayEvents);

//         days.push(
//           <div
//             key={cloneDay}
//             className={`border p-2 h-32 overflow-auto text-sm relative
//               ${!isSameMonth(cloneDay, monthStart) ? 'bg-gray-100 text-gray-400' : ''}
//               ${isSameDay(cloneDay, new Date()) ? 'bg-teal-100 rounded-md' : ''}
//               ${conflict ? 'border-red-500' : ''}`}
//             title={conflict ? 'Conflict: Multiple events at the same time' : ''}
//           >
//             <div className="font-medium">{format(cloneDay, 'd')}</div>
//             {dayEvents.map((event, idx) => (
//               <div
//                 key={idx}
//                 className={`mt-1 px-1 py-0.5 rounded text-white text-xs ${categoryColors[event.category] || 'bg-blue-400'}`}
//               >
//                 {event.time} - {event.title} ({event.duration})
//               </div>
//             ))}
//           </div>
//         );
//         day = addDays(day, 1);
//       }
//       rows.push(<div className="grid grid-cols-7" key={day}>{days}</div>);
//       days = [];
//     }
//     return <div>{rows}</div>;
//   };

//   const daysOfWeek = () => (
//     <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
//       {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//         <div key={day}>{day}</div>
//       ))}
//     </div>
//   );

//   const renderMiniCalendar = () => {
//     const start = startOfWeek(startOfMonth(currentDate));
//     const end = endOfWeek(endOfMonth(currentDate));
//     const days = [];
//     let day = start;

//     while (day <= end) {
//       const isToday = isSameDay(day, new Date());
//       const hasEvent = events.some(e => e.date === format(day, 'yyyy-MM-dd'));
//       const isCurrentMonth = isSameMonth(day, currentDate);

//       days.push(
//         <div
//           key={day.toString()}
//           className={`p-1 m-0.5 rounded cursor-pointer ${
//             isCurrentMonth ? 'text-black' : 'text-gray-400'
//           } ${isToday ? 'bg-blue-200 font-bold' : ''}`}
//           onClick={(e) => {
//             e.stopPropagation(); // Prevent bubbling to outer div
//             setCurrentDate(day);
//           }}
//         >
//           {format(day, 'd')}
//           {hasEvent && (
//             <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-0.5" />
//           )}
//         </div>
//       );
//       day = addDays(day, 1);
//     }

//     return (
//       <div className="bg-gray-100 rounded p-2 mb-4">
//         <h3 className="font-semibold mb-2">Mini Calendar</h3>
//         <div className="flex items-center justify-between mb-2">
//           <button onClick={(e) => {
//             e.stopPropagation();
//             setCurrentDate(subMonths(currentDate, 1));
//           }}>
//             <ChevronLeft size={16} />
//           </button>
//           <span className="text-sm font-medium">{format(currentDate, 'MMMM yyyy')}</span>
//           <button onClick={(e) => {
//             e.stopPropagation();
//             setCurrentDate(addMonths(currentDate, 1));
//           }}>
//             <ChevronRight size={16} />
//           </button>
//         </div>

//         <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-600">
//           {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
//             <div key={d}>{d}</div>
//           ))}
//         </div>

//         <div className="grid grid-cols-7 text-center text-xs">
//           {days}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <div className="border rounded shadow bg-white">
//         <div className="p-4">
//           {header()}
//           <div className="flex">
//             <div className="w-3/4">
//               {daysOfWeek()}
//               {renderCells()}
//             </div>
//             <div className="w-1/4 pl-4">
//               {renderMiniCalendar()}

//               <div>
//                 <h3 className="font-semibold mb-2">My Calendars</h3>
//                 {Object.keys(categoryColors).map(cat => (
//                   <div key={cat} className="flex items-center space-x-2 mb-1">
//                     <div className={`w-3 h-3 rounded ${categoryColors[cat]}`}></div>
//                     <span>{cat}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useState, useEffect } from 'react';
import {
  addMonths, subMonths, format, startOfMonth, endOfMonth,
  startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categoryColors = {
  Default: "bg-green-400",
  Birthdays: "bg-purple-400",
  Tasks: "bg-yellow-400",
};

function hasTimeConflict(events) {
  const timeSlots = {};
  
  for (const event of events) {
    if (event.time === "All Day") continue;
    
    const [startHour, startMin] = event.time.split(':').map(Number);
    const durationParts = event.duration.split(' ');
    const durationHours = durationParts.includes('hour') ? parseInt(durationParts[0]) : 0;
    const durationMins = durationParts.includes('min') ? parseInt(durationParts[durationParts.length - 2]) : 0;
    
    const startTime = startHour * 60 + startMin;
    const endTime = startTime + durationHours * 60 + durationMins;
    
    for (let t = startTime; t < endTime; t++) {
      if (timeSlots[t]) return true;
      timeSlots[t] = true;
    }
  }
  
  return false;
}

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try multiple possible paths
        const possiblePaths = [
          '/events.json',
          './events.json'
        ];

        let response;
        
        for (const path of possiblePaths) {
          try {
            response = await fetch(path);
            if (response.ok) break;
          } catch (err) {
            console.warn(`Failed to fetch from ${path}:`, err);
          }
        }

        if (!response || !response.ok) {
          throw new Error(`Failed to load events`);
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error loading events:", err);
        setError("Failed to load events. Please check console for details.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const header = () => (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">Sparrow Calendar</h2>
      <div className="flex gap-2 items-center">
        <button 
          className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
          onClick={() => setCurrentDate(new Date())}
        >
          Today
        </button>
        <button 
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        >
          <ChevronLeft />
        </button>
        <span className="font-medium">{format(currentDate, 'MMMM yyyy')}</span>
        <button 
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(cloneDay, 'yyyy-MM-dd');
        const dayEvents = events.filter(e => e.date === formattedDate);
        const hasConflict = hasTimeConflict(dayEvents);

        days.push(
          <div
            key={cloneDay.toString()}
            className={`border p-2 h-32 overflow-auto text-sm relative
              ${!isSameMonth(cloneDay, monthStart) ? 'bg-gray-100 text-gray-400' : ''}
              ${isSameDay(cloneDay, new Date()) ? 'bg-teal-100 rounded-md' : ''}
              ${hasConflict ? 'border-2 border-red-500' : ''}`}
            title={hasConflict ? 'Time conflict: Events overlap' : ''}
          >
            <div className="font-medium">{format(cloneDay, 'd')}</div>
            {dayEvents.map((event, idx) => (
              <div
                key={`${event.date}-${event.time}-${idx}`}
                className={`mt-1 px-1 py-0.5 rounded text-white text-xs ${
                  categoryColors[event.category] || 'bg-blue-400'
                }`}
              >
                {event.time === "All Day" ? (
                  <span>{event.title} (All Day)</span>
                ) : (
                  <span>{event.time} - {event.title} ({event.duration})</span>
                )}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const daysOfWeek = () => (
    <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );

  const renderMiniCalendar = () => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    const days = [];
    let day = start;

    while (day <= end) {
      const isToday = isSameDay(day, new Date());
      const hasEvent = events.some(e => e.date === format(day, 'yyyy-MM-dd'));
      const isCurrentMonth = isSameMonth(day, currentDate);

      days.push(
        <div
          key={day.toString()}
          className={`p-1 m-0.5 rounded cursor-pointer text-xs
            ${isCurrentMonth ? 'text-black' : 'text-gray-400'}
            ${isToday ? 'bg-blue-200 font-bold' : ''}
            hover:bg-gray-200`}
          onClick={() => setCurrentDate(day)}
        >
          {format(day, 'd')}
          {hasEvent && (
            <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-0.5" />
          )}
        </div>
      );
      day = addDays(day, 1);
    }

    return (
      <div className="bg-gray-100 rounded p-2 mb-4">
        <h3 className="font-semibold mb-2">Mini Calendar</h3>
        <div className="flex items-center justify-between mb-2">
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-medium">{format(currentDate, 'MMM yyyy')}</span>
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-600">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Loading calendar events...</p>
          </div>
        </div>
      )}
      
      <div className="border rounded shadow bg-white">
        <div className="p-4">
          {header()}
          {error && (
            <div className="text-red-500 p-4">
              {error}
            </div>
          )}
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4">
              {daysOfWeek()}
              {renderCells()}
            </div>
            <div className="w-full md:w-1/4 pl-0 md:pl-4 mt-4 md:mt-0">
              {renderMiniCalendar()}
              <div className="bg-gray-100 rounded p-2">
                <h3 className="font-semibold mb-2">My Calendars</h3>
                {Object.entries(categoryColors).map(([category, color]) => (
                  <div key={category} className="flex items-center space-x-2 mb-1">
                    <div className={`w-3 h-3 rounded ${color}`} />
                    <span className="text-sm">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






