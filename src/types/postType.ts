export interface IAllPosts {
  postId: number;
  profileImage: string;
  nickname: string;
  title: string;
  content: string;
  imgUrl: string;
  postLikeNum: number;
  category: string | null;
  createAt: string;
  modifiedAt: string;
  likePost: boolean;
  commentCount: number;
  children?: JSX.Element | JSX.Element[];
  commentCount: number;
}
