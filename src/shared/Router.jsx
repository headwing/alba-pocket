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
import Test from "../pages/Test";
import EditShift from "../pages/EditShift";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
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
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<MyPageEdit />} />
        <Route path="/addShift/:id" element={<AddShift />} />
        <Route path="/editShift/:todoId" element={<EditShift />} />

        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar/:id" element={<Calendar />}>
          <Route path=":todoId" element={<Calendar />} />
        </Route>

        <Route path="/addWork/:id?" element={<AddWork />} />
        <Route path="/addShift/:id" element={<AddShift />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
