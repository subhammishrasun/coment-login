import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file

function CommentPage() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      const response = await axios.get('http://localhost:5200/api/comments');
      setComments(response.data);
    }
    fetchComments();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username');
    await axios.post('http://localhost:5200/api/comments', { text: commentText, username });
    setCommentText('');
    const response = await axios.get('http://localhost:5200/api/comments');
    setComments(response.data);
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    const username = localStorage.getItem('username');
    await axios.post(`http://localhost:5200/api/comments/${commentId}/replies`, { text: replyText, username });
    setReplyText('');
    setReplyTo(null);
    const response = await axios.get('http://localhost:5200/api/comments');
    setComments(response.data);
  };

  return (
    <div>
      <h1>Comments</h1>
      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
      <ul className="comment-list">
        {comments.map(comment => (
          <li className="comment-item" key={comment._id}>
            <p>{comment.username}: {comment.text}</p>
            <button onClick={() => setReplyTo(comment._id)}>Reply</button>
            {replyTo === comment._id && (
              <form className="reply-form" onSubmit={(e) => handleReplySubmit(e, comment._id)}>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  required
                />
                <button type="submit">Post Reply</button>
              </form>
            )}
            <ul className="comment-list">
              {comment.replies.map(reply => (
                <li className="comment-item" key={reply._id}>
                  <p>{reply.username}: {reply.text}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentPage;
