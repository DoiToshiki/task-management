import React, { useState } from 'react';

function SubTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form className="subtask-form" onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="中粒度タスクを追加..."
        style={{ width: '70%' }}
      />
      <button type="submit" style={{ marginLeft: 8 }}>＋</button>
    </form>
  );
}

export default SubTaskForm;
