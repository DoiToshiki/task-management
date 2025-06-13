import React from 'react';
import CalendarCell from './CalendarCell';
import './CalendarView.css';

function CalendarView({
  tasks,
  currentDate,
  goToPrevMonth,
  goToNextMonth,
  onDateClick,
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const startDay = new Date(year, month, 1).getDay(); // 月初の曜日
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 月の日数

  const dates = [];

  // 前の月の空白
  for (let i = 0; i < startDay; i++) {
    dates.push(<div key={`empty-${i}`} className="calendar-cell empty" />);
  }

  // カレンダーの日付部分
  for (let i = 1; i <= daysInMonth; i++) {
    const dateObj = new Date(year, month, i);
    const dateStr = dateObj.toISOString().split('T')[0];

    const tasksForDate = tasks.filter(
      (task) => task.deadline === dateStr // ここでは `deadline` フィールドを使用
    );

    dates.push(
      <CalendarCell
        key={dateStr}
        date={dateStr}
        tasks={tasksForDate}
        onDateClick={() => onDateClick(dateStr)}
      />
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={goToPrevMonth}>←</button>
        <h2>{year}年 {month + 1}月</h2>
        <button onClick={goToNextMonth}>→</button>
      </div>

      <div className="calendar-grid">
        <div>日</div><div>月</div><div>火</div><div>水</div><div>木</div><div>金</div><div>土</div>
        {dates}
      </div>
    </div>
  );
}

export default CalendarView;
