import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addComment } from "../../APIs/detailPostApi";
import CommentList from "./CommentList";

const CommentPost = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const postCommentHandler = (e: any) => {
    e.preventDefault();
    const payload = [id, comment];
    if (comment) {
      console.log(payload);
      postComment.mutate(payload);
    } else {
      alert("댓글을 입력해주세요!");
    }
  };

  const postComment = useMutation(addComment);
  return (
    <>
      <div className="container">
        <div className="commentform">
          <form onSubmit={postCommentHandler}>
            <input
              placeholder="댓글을 작성하세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button>댓글 작성</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentPost;
