// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { Suspense, lazy } from "react";

// import Footer from "../components/footer/Footer";
// import Loading from "../components/Loading/Loading";
// import MyAlert from "../components/alert/MyAlert";
// import Splash from "../pages/Splash";

// const Main = lazy(() => import("../pages/Main"));
// const Register = lazy(() => import("../pages/Register"));
// const Login = lazy(() => import("../pages/Login"));
// const KakaoSocial = lazy(() => import("../APIs/KakaoSocial"));
// const Board = lazy(() => import("../pages/Board"));
// const Post = lazy(() => import("../pages/Post"));
// const Posting = lazy(() => import("../pages/Posting"));
// const Free = lazy(() => import("../components/category/Free"));
// const PartTime = lazy(() => import("../components/category/PartTime"));
// const Cover = lazy(() => import("../components/category/Cover"));
// const Search = lazy(() => import("../pages/Search"));
// const MyPage = lazy(() => import("../pages/MyPage"));
// const MyPageEdit = lazy(() => import("../pages/MyPageEdit"));
// const Calendar = lazy(() => import("../pages/Calendar"));
// const AddWork = lazy(() => import("../pages/Addwork"));
// const AddShift = lazy(() => import("../pages/Addshift"));
// const EditShift = lazy(() => import("../pages/EditShift"));
// const Chart = lazy(() => import("../pages/Chart"));
// const MyLike = lazy(() => import("../components/mypage/MyLike"));
// const MyComment = lazy(() => import("../components/mypage/MyComment"));
// const ChatList = lazy(() => import("../pages/ChatList"));
// const ChatRoom = lazy(() => import("../components/chat/ChatRoom"));
// const Alert = lazy(() => import("../pages/Alert"));
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";
import KakaoSocial from "../APIs/KakaoSocial";
import Board from "../pages/Board";
import Post from "../pages/Post";
import Posting from "../pages/Posting";
import Free from "../components/category/Free";
import PartTime from "../components/category/PartTime";
import Cover from "../components/category/Cover";
import Search from "../pages/Search";
import MyPage from "../pages/MyPage";
import MyPageEdit from "../pages/MyPageEdit";
import Calendar from "../pages/Calendar";
import AddWork from "../pages/Addwork";
import AddShift from "../pages/Addshift";
import Test from "../pages/CalendarModal";
import EditShift from "../pages/EditShift";
import Chart from "../pages/Chart";
import MyLike from "../components/mypage/MyLike";
import MyComment from "../components/mypage/MyComment";
import ChatList from "../pages/ChatList";
import ChatRoom from "../components/chat/ChatRoom";
import Footer from "../components/footer/Footer";
import Loading from "../components/Loading/Loading";
import Alert from "../pages/Alert";
import MyAlert from "../components/alert/MyAlert";
import SockJS from "sockjs-client";
import { baseURL } from "../APIs/axios";
import stompJS from "stompjs";
import Splash from "../pages/Splash";
import { useEffect } from "react";

function Router() {
  return (
    <BrowserRouter>
      {/* <Suspense fallback={<Loading />}> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/start" element={<Splash />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/callback/kakao" element={<KakaoSocial />} />
        <Route path="/posting/:id?" element={<Posting />} />

        <Route path="/board" element={<Board />}>
          <Route path="free" element={<Free />} />
          <Route path="partTime" element={<PartTime />} />
          <Route path="cover" element={<Cover />} />
        </Route>

        <Route path="/search" element={<Search />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/:id/:locationId" element={<Post />} />

        <Route path="/mypage" element={<MyPage />}>
          <Route path="myLike" element={<MyLike />} />
          <Route path="myComment" element={<MyComment />} />
        </Route>
        <Route path="/mypage/edit" element={<MyPageEdit />} />

        <Route path="/addShift/:id" element={<AddShift />} />
        <Route path="/editShift/:todoId" element={<EditShift />} />

        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar/:id" element={<Calendar />}>
          <Route path=":todoId" element={<Calendar />} />
        </Route>

        <Route path="/addWork/:id?" element={<AddWork />} />
        <Route path="/addShift/:id" element={<AddShift />} />
        <Route path="/addShift/:id/:dateId" element={<AddShift />} />

        <Route path="/chart" element={<Chart />} />

        <Route path="/chat" element={<ChatList />} />
        <Route path="/chat/:id" element={<ChatRoom />} />

        <Route path="/loading" element={<Loading />} />
        <Route path="/alert" element={<Alert />} />
      </Routes>
      {/* </Suspense> */}
      <Footer />
      <MyAlert />
    </BrowserRouter>
  );
}

export default Router;
