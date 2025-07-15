import React, { useState, useEffect } from 'react';
import './TaskDetailModal.css';

function TaskDetailModal({ task, onClose, onUpdate }) {
  const [editableTask, setEditableTask] = useState({ ...task });

  // taskが変更されたとき、編集データも更新
  useEffect(() => {
    setEditableTask({ ...task });
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableTask((prev) => ({ ...prev, [name]: value }));
  };

  // 新規追加: 誰のため/なぜやる/成功条件
  const handleExtraChange = (e) => {
    const { name, value } = e.target;
    setEditableTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedTask = {
      ...editableTask,
      tags: {
        urgent,
        role: roleTag,
        category: categoryTag
      }
    };

    onUpdate(updatedTask);  // 親コンポーネントに更新依頼
    onClose();
  };


  const [showTagEditor, setShowTagEditor] = useState(false);
  const [urgent, setUrgent] = useState(task.tags?.urgent || false);
  const [roleTag, setRoleTag] = useState(task.tags?.role || '');
  const [categoryTag, setCategoryTag] = useState(task.tags?.category || '');


  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>タスク編集</h3>

        <label>
          タイトル：
          <input
            type="text"
            name="title"
            value={editableTask.title}
            onChange={handleChange}
          />
        </label>

        {editableTask.type === '期限付き' && (
          <label>
            締切：
            <input
              type="date"
              name="dueDate"
              value={editableTask.dueDate}
              onChange={handleChange}
            />
          </label>
        )}

        <label>
          優先度：
          <select name="priority" value={editableTask.priority} onChange={handleChange}>
            <option value="高">高</option>
            <option value="中">中</option>
            <option value="低">低</option>
          </select>
        </label>

        <label>
          ステータス：
          <select name="status" value={editableTask.status} onChange={handleChange}>
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="連絡済み">連絡済み</option>
            <option value="待ち">待ち</option>
            <option value="レビュー中">レビュー中</option>
            <option value="完了">完了</option>
            <option value="遅延">遅延</option>
          </select>
        </label>

        <label>
          メモ：
          <textarea
            name="memo"
            value={editableTask.memo}
            onChange={handleChange}
          />
        </label>

        {/* 誰のため、なぜやる、成功条件の入力欄を追加 */}
        <label>
          誰のため：
          <input
            type="text"
            name="forWhom"
            value={editableTask.forWhom || ''}
            onChange={handleExtraChange}
            placeholder="例：顧客、チーム、自分など"
          />
        </label>
        <label>
          なぜやる：
          <input
            type="text"
            name="why"
            value={editableTask.why || ''}
            onChange={handleExtraChange}
            placeholder="目的や理由"
          />
        </label>
        <label>
          成功条件：
          <input
            type="text"
            name="successCriteria"
            value={editableTask.successCriteria || ''}
            onChange={handleExtraChange}
            placeholder="達成の基準やゴール"
          />
        </label>

        <button onClick={() => setShowTagEditor(!showTagEditor)}>
          {showTagEditor ? 'タグ編集を閉じる' : 'タグを編集'}
        </button>

        {showTagEditor && (
          <div className="tag-editor">
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
          </div>
        )}


        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleSave} className="close-btn">保存</button>
          <button onClick={onClose} className="close-btn" style={{ marginLeft: '0.5rem' }}>キャンセル</button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailModal;
