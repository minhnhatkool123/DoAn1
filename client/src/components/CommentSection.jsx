import '../scss/commentSection.scss';
import React, { useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../recoil/userState';
import { toastDisplayState } from '../recoil/toastDisplayState';
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import Comment from './Comment';
import axios from 'axios';

// const data = [
//   {
//     id: 1,
//     parentId: null,
//     date: '01/01/2021',
//     userName: 'Phúc An',
//     content: 'Áo đẹp lắm ạ'
//   },
//   {
//     id: 2,
//     parentId: null,
//     date: '09/02/2021',
//     userName: 'Như Uyên',
//     content: 'Sản phẩm vừa khít luôn rất đẹp ạ. Ủng hộ shop.'
//   },
//   {
//     id: 3,
//     parentId: 2,
//     date: '15/02/2021',
//     userName: 'Ngọc Diễm',
//     content: 'Bạn mua size bn ấy?'
//   },
//   {
//     id: 4,
//     parentId: 2,
//     date: '22/02/2021',
//     userName: 'Như Uyên',
//     content: 'Size M á bạn'
//   },
//   {
//     id: 5,
//     parentId: null,
//     date: '20/03/2021',
//     userName: 'Ánh Vy',
//     content: 'Sản phẩm đẹp như hình ạ'
//   },
//   {
//     id: 6,
//     parentId: null,
//     date: '01/04/2021',
//     userName: 'Hoài An',
//     content: 'Mình mua 2 màu, màu nào cũng đẹp hết ý'
//   },
//   {
//     id: 7,
//     parentId: null,
//     date: '10/04/2021',
//     userName: 'Vân Khánh',
//     content: 'Áo đẹp, chất liệu vải tốt, shop có thể nhập thêm nhiều màu khác nữa được ko ạ?'
//   }, {
//     id: 8,
//     parentId: null,
//     date: '10/04/2021',
//     userName: 'Thanh Tú',
//     content: 'Áo cute ghê luôn, trên hình đã đẹp rồi nhìn thực tế còn đẹp hơn'
//   },
//   {
//     id: 9,
//     parentId: null,
//     date: '11/04/2021',
//     userName: 'Hạ Vũ',
//     content: 'Áo siêu đẹp luôn, nhân tiện cho mình hỏi màu vàng bao giờ có lại ấy shop?'
//   },
//   {
//     id: 10,
//     parentId: 7,
//     date: '12/04/2021',
//     userName: 'ZShop - Mua Sắm Thời Trang',
//     content: 'Sắp tới shop sẽ nhập thêm một số màu nữa nhé.'
//   },
//   {
//     id: 11,
//     parentId: 9,
//     date: '12/04/2021',
//     userName: 'ZShop - Mua Sắm Thời Trang',
//     content: 'Cỡ thứ 6 shop có lại nhen.'
//   }
// ];

function CommentSection() {
  const { id: productId } = useParams();
  const user = useRecoilValue(userState);

  const setToastDisplay = useSetRecoilState(toastDisplayState);

  const buttonsRef = useRef(null);
  const commentBoxRef = useRef(null);

  const { data: comments, refetch } = useQuery('comments', async () => {
    const response = await axios.get(`http://localhost:5000/api/comment/get?productId=${productId}`);
    return response.data;
  });

  const handleCommentBoxFocus = () => {
    buttonsRef.current.classList.add('active');
  }

  const handleCancelClick = () => {
    commentBoxRef.current.innerText = '';
    buttonsRef.current.classList.remove('active');
  }

  const handleOnSubmit = () => {
    const commentContent = commentBoxRef.current.innerText;

    if (!commentContent) return;

    if (!user.info) {
      setToastDisplay({
        show: true,
        message: 'Bạn phải đăng nhập để sử dụng tính năng bình luận'
      });
      return;
    } else if (user.info.mute) {
      setToastDisplay({
        show: true,
        message: 'Quản trị viên đã cấm bạn bình luận'
      });
      return;
    }

    const comment = {
      user: user.info._id,
      content: commentContent,
      productId: productId
    }

    const config = {
      headers: {
        Authorization: user.accessToken
      }
    }

    axios.post('http://localhost:5000/api/comment/add', comment, config)
      .then(response => {
        console.log(response.data.message);
        refetch();
        commentBoxRef.current.innerText = '';
      })
      .catch(error => {
        console.log(error.response.data.message);
      })

  }

  const handleEnterPress = (e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      handleOnSubmit();
    }
  }

  return (
    <React.Fragment>
      {comments && <div className="comment-section">
        <div className="title">Đánh giá ({comments.length})</div>

        <div className="comment-posting-area">
          <div className="comment-typing-area">
            <div className="avatar">
              <div className={user.info && user.info.type === 1 ? "text-avatar admin-mode" : "text-avatar"}>
                {user.info ? (user.info.type === 1 ? 'Z' : user.info.name.split(" ").pop().charAt(0)) : 'P'}
              </div>
            </div>
            <div
              contentEditable="true"
              className="comment-typing"
              data-placeholder="Hãy cho chúng tôi biết cảm nghĩ của bạn."
              onFocus={handleCommentBoxFocus}
              onKeyDown={handleEnterPress}
              ref={commentBoxRef}
            />
          </div>

          <div className="btn-group" ref={buttonsRef}>
            <div className="cancel-btn" onClick={handleCancelClick}>Hủy</div>
            <div className="submit-btn" onClick={handleOnSubmit}>Bình luận</div>
          </div>
        </div>

        <div className="comment-display-area">
          {[...comments].reverse().map(comment => (
            <Comment
              key={comment._id}
              commentId={comment._id}
              comment={comment}
              refetch={refetch}
            />
          ))}
        </div>
      </div>}
    </React.Fragment>
  );
}

export default CommentSection;