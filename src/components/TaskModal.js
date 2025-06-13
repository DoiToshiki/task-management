import React, { useState, useEffect } from 'react';
import './TaskDetailModal.css';

function TaskModal({ selectedTask, onSave, onClose }) {
  const [task, setTask] = useState(selectedTask || {
    title: '',
    dueDate: '',
    priority: '中',
    status: '未着手',
    memo: '',
    tags: { role: '', category: '' },
  });

  useEffect(() => {
    if (selectedTask) setTask(selectedTask);
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleTagChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, tags: { ...task.tags, [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>タスク編集</h3>
        <form onSubmit={handleSubmit}>
          <label>
            タイトル：<input name="title" value={task.title} onChange={handleChange} required />
          </label>
          <label>
            期限：<input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
          </label>
          <label>
            優先度：
            <select name="priority" value={task.priority} onChange={handleChange}>
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </select>
          </label>
          <label>
            ステータス：
            <select name="status" value={task.status} onChange={handleChange}>
              <option value="未着手">未着手</option>
              <option value="進行中">進行中</option>
              <option value="完了">完了</option>
            </select>
          </label>
          <label>
            担当者：
            <select name="role" value={task.tags.role} onChange={handleTagChange}>
              <option value="">未設定</option>
              <option value="自分">自分</option>
              <option value="ちーむ">ちーむ</option>
              <option value="上司確認">上司確認</option>
              <option value="顧客対応">顧客対応</option>
            </select>
          </label>
          <label>
            カテゴリ：
            <select name="category" value={task.tags.category} onChange={handleTagChange}>
              <option value="">未設定</option>
              <option value="資料作成">資料作成</option>
              <option value="開発">開発</option>
              <option value="営業">営業</option>
              <option value="会議">会議</option>
              <option value="学習">学習</option>
            </select>
          </label>
          <label>
            メモ：<textarea name="memo" value={task.memo} onChange={handleChange} />
          </label>
          <button type="submit">保存</button>
          <button type="button" onClick={onClose}>キャンセル</button>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
