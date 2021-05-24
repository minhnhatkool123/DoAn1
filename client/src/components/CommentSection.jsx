import React from 'react';
import Comment from './Comment';
import '../scss/commentSection.scss';

const data = [
  {
    id: 1,
    parentId: null,
    date: '01/01/2021',
    userName: 'Phúc An',
    content: 'Áo đẹp lắm ạ'
  },
  {
    id: 2,
    parentId: null,
    date: '09/02/2021',
    userName: 'Như Uyên',
    content: 'Sản phẩm vừa khít luôn rất đẹp ạ. Ủng hộ shop.'
  },
  {
    id: 3,
    parentId: 2,
    date: '15/02/2021',
    userName: 'Ngọc Diễm',
    content: 'Bạn mua size bn ấy?'
  },
  {
    id: 4,
    parentId: 2,
    date: '22/02/2021',
    userName: 'Như Uyên',
    content: 'Size M á bạn'
  },
  {
    id: 5,
    parentId: null,
    date: '20/03/2021',
    userName: 'Ánh Vy',
    content: 'Sản phẩm đẹp như hình ạ'
  },
  {
    id: 6,
    parentId: null,
    date: '01/04/2021',
    userName: 'Hoài An',
    content: 'Mình mua 2 màu, màu nào cũng đẹp hết ý'
  },
  {
    id: 7,
    parentId: null,
    date: '10/04/2021',
    userName: 'Vân Khánh',
    content: 'Áo đẹp, chất liệu vải tốt, shop có thể nhập thêm nhiều màu khác nữa được ko ạ?'
  }, {
    id: 8,
    parentId: null,
    date: '10/04/2021',
    userName: 'Thanh Tú',
    content: 'Áo cute ghê luôn, trên hình đã đẹp rồi nhìn thực tế còn đẹp hơn'
  },
  {
    id: 9,
    parentId: null,
    date: '11/04/2021',
    userName: 'Hạ Vũ',
    content: 'Áo siêu đẹp luôn, nhân tiện cho mình hỏi màu vàng bao giờ có lại ấy shop?'
  },
  {
    id: 10,
    parentId: 7,
    date: '12/04/2021',
    userName: 'ZShop - Mua Sắm Thời Trang',
    content: 'Sắp tới shop sẽ nhập thêm một số màu nữa nhé.'
  },
  {
    id: 11,
    parentId: 9,
    date: '12/04/2021',
    userName: 'ZShop - Mua Sắm Thời Trang',
    content: 'Cỡ thứ 6 shop có lại nhen.'
  }
];

const getThreadedComments = (data) => {
  const comments = [];

  for (let comment of data) {
    if (comment.parentId) {
      const index = comments.findIndex(i => i.id === comment.parentId);
      comments[index].responses.push(comment);
    } else {
      comments.push({ ...comment, responses: [] });
    }
  }

  return comments;
}

function CommentSection() {
  const comments = getThreadedComments(data);

  return (
    <div className="comment-section">
      <div className="title">Đánh giá ({comments.length})</div>

      <div className="comment-posting-area">
        <div className="comment-typing-area">
          <div className="avatar">P</div>
          <div contentEditable="true" className="comment-typing" data-placeholder="Hãy cho chúng tôi biết cảm nghĩ của bạn." />
        </div>

        <div className="btn-group">
          <div className="cancel-btn">Hủy</div>
          <div className="submit-btn">Bình luận</div>
        </div>
      </div>

      <div className="comment-display-area">
        {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
}

export default CommentSection;