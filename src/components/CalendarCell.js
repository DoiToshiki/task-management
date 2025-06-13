import React from 'react';
import './CalendarCell.css';

function CalendarCell({ date, tasks, onDateClick }) {
  return (
    <div className="calendar-cell" onClick={onDateClick}>
      <div className="calendar-date">{date.split('-')[2]}</div>
      <ul className="calendar-tasks">
        {tasks.map((task) => (
          <li key={task.id} className="calendar-task">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarCell;
