import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onAdd, type }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('中');
  const [status, setStatus] = useState('未着手');
  const [memo, setMemo] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [roleTag, setRoleTag] = useState('');
  const [categoryTag, setCategoryTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      dueDate,
      priority,
      status,
      memo,
      type,
      tags: {
        urgent,
        role: roleTag,
        category: categoryTag
      }
    };
    onAdd(newTask);
    setTitle('');
    setDueDate('');
    setPriority('中');
    setStatus('未着手');
    setMemo('');
    setUrgent(false);
    setRoleTag('');
    setCategoryTag('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="タスク内容"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="高">高</option>
        <option value="中">中</option>
        <option value="低">低</option>
      </select>

      {type === '期限付き' && (
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      )}

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="連絡済み">連絡済み</option>
        <option value="待ち">待ち</option>
        <option value="完了">完了</option>
        <option value="遅延">遅延</option>
      </select>

      <input
        type="text"
        placeholder="メモ（任意）"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />

      {/* タグ追加部分 */}
      <label>
        <input
          type="checkbox"
          checked={urgent}
          onChange={(e) => setUrgent(e.target.checked)}
        />
        緊急
      </label>

      <select value={roleTag} onChange={(e) => setRoleTag(e.target.value)}>
        <option value="">担当者</option>
        <option value="自分">自分</option>
        <option value="ちーむ">ちーむ</option>
        <option value="上司確認">上司確認</option>
        <option value="顧客対応">顧客対応</option>
      </select>

      <select value={categoryTag} onChange={(e) => setCategoryTag(e.target.value)}>
        <option value="">カテゴリ</option>
        <option value="資料作成">資料作成</option>
        <option value="開発">開発</option>
        <option value="営業">営業</option>
        <option value="会議">会議</option>
        <option value="学習">学習</option>
      </select>

      <button type="submit">追加</button>
    </form>
  );
}

export default TaskForm;
