import React from 'react';
import './FilterBar.css';

function FilterBar({ filter, setFilter, selectedRole, setSelectedRole, selectedCategory, setSelectedCategory }) {

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-bar">
      <label>
        ステータス：
        <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
          <option value="すべて">すべて</option>
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="連絡済み">連絡済み</option>
          <option value="待ち">待ち</option>
          <option value="遅延">遅延</option>
          <option value="完了">完了</option>
        </select>
      </label>

      <label>
        優先度：
        <select value={filter.priority} onChange={(e) => setFilter({ ...filter, priority: e.target.value })}>
          <option value="すべて">すべて</option>
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </select>
      </label>

      <label>
        担当者：
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="">すべて</option>
          <option value="自分">自分</option>
          <option value="ちーむ">ちーむ</option>
          <option value="上司確認">上司確認</option>
          <option value="顧客対応">顧客対応</option>
        </select>
      </label>

      <label>
        カテゴリ：
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">すべて</option>
          <option value="資料作成">資料作成</option>
          <option value="開発">開発</option>
          <option value="営業">営業</option>
          <option value="会議">会議</option>
          <option value="学習">学習</option>
        </select>
      </label>
    </div>

  );
}

export default FilterBar;
