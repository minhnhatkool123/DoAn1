import React from 'react';
import '../scss/comment.scss';

function Comment({ comment }) {
  return (
    <div key={comment.id} className="comment">
      <div className={comment.parentId ? "reply-comment" : "original-comment"}>
        <div className="avatar">{comment.userName.split(" ").pop().charAt(0)}</div>
        <div className="comment-content">
          <div className="author">{comment.userName}</div>
          <div className="content">{comment.content}</div>
          {!comment.parentId && <span className="reply-btn">Trả lời</span>}
        </div>
      </div>
      {comment.responses && comment.responses.map(reply => <Comment key={reply.id} comment={reply} />)}
    </div>
  );
}

export default Comment;