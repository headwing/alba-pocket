import { postInstance } from "./axios";

/* 커뮤니티 게시판 글작성 */
export const addPost = async (payload: any) => {
  console.log("addpost payload:", payload);
  await postInstance.post("/api/posts", payload);
  return (window.location.href = "/board");
};
