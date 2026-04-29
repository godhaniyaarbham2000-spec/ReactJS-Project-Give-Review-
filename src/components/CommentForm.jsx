import React, { useState } from "react";

export default function CommentForm() {
  const [formData, setFormData] = useState({
    username: "",
    remarks: "",
    rating: 1
  });

  const [comments, setComments] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.username.trim() || !formData.remarks.trim()) return;

    const newComment = {
      id: Date.now(),
      ...formData
    };
    setComments((prev) => [newComment, ...prev]);
    setFormData({ username: "", remarks: "", rating: 1 });
  }

  return (
    <div className="comment-container">
      <form className="comment-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            placeholder="@username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Remarks
          <textarea
            name="remarks"
            placeholder="Write your comment..."
            value={formData.remarks}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Rating
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="btn">
          Add Comment
        </button>
      </form>

      {comments.length > 0 && (
        <div className="comment-list">
          <h2>All Comments</h2>
          {comments.map((c) => (
            <div key={c.id} className="comment-card">
              <p className="user">{c.username}</p>
              <p className="remarks">{c.remarks}</p>
              <p className="rating">⭐ {c.rating}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
