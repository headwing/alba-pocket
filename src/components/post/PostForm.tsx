import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addPost } from "../../APIs/postApi";

function PostForm() {
  const navigate = useNavigate();
  // const [post, setPost] = useState({
  //   title: "",
  //   category: "",
  //   content: "",
  // });
  const [title, setTitle] = useState({ title: "" });
  const [category, setCategory] = useState({ category: "" });
  const [content, setContent] = useState({ content: "" });
  const [file, setFile] = useState<string | Blob>();
  //const [submitColor, setSubmitColor] = useState("#c5c5c5");
  //preview image 설정 부분
  const [imgFile, setImgFile] = useState<any>("");
  const getImage = (e: any) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setImgFile(reader.result);
      setFile(image);
    };
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    //setContent({ content: content.content.replace("\n", "<br>") });
    if (title.title === "") {
      alert("제목을 입력해주세요!");
      return;
    }
    if (category.category === "") {
      alert("카테고리를 선택해주세요");
      return;
    }
    if (content.content === "") {
      alert("내용을 입력해 주세요");
      return;
    }
    if (file) {
      const formData = new FormData();
      formData.append("title", title.title);
      formData.append("content", content.content);
      formData.append("category", category.category);
      formData.append("file", file);

      writePost
        .mutateAsync(formData)
        .catch((error) => alert(error.response.data.msg));
    } else {
      const formData = new FormData();
      formData.append("title", title.title);
      formData.append("content", content.content);
      formData.append("category", category.category);
      // formData.append(
      //   "title",
      //   new Blob([JSON.stringify(title)], { type: "application/json" })
      // );
      // formData.append(
      //   "content",
      //   new Blob([JSON.stringify(content)], { type: "application/json" })
      // );
      // formData.append(
      //   "category",
      //   new Blob([JSON.stringify(category)], { type: "application/json" })
      // );

      writePost
        .mutateAsync(formData)
        .catch((error) => alert(error.response.data.msg));
    }
  };
  const writePost = useMutation(addPost);
  return (
    <>
      <STHeader>
        <img
          src="/image/iconX.svg"
          alt="x"
          onClick={() => navigate("/board")}
        />
        <div className="wrap">
          <div>게시글 작성</div>
        </div>
        <button onClick={submitHandler}>
          <div>등록</div>
        </button>
      </STHeader>

      <SBody>
        <select
          onChange={(e) => {
            const { value } = e.target;
            setCategory({ category: value });
          }}
        >
          <option defaultValue="">카테고리</option>
          <option value="free">자유</option>
          <option value="partTime">알바고민</option>
          <option value="cover">대타</option>
        </select>
        <div className="titleForm">
          <input
            type="text"
            placeholder="제목"
            onChange={(e) => {
              const { value } = e.target;
              setTitle({ title: value });
            }}
          />
        </div>
        <div className="content">
          <textarea
            placeholder="내용을 작성해주세요"
            onChange={(e) => {
              const { value } = e.target;
              setContent({ content: value });
            }}
          />
        </div>
      </SBody>

      <STImageUpLoad>
        <div className="preview">
          {imgFile ? (
            <>
              {/* <div
                onClick={() => {
                  setFile(undefined);
                  setImgFile("");
                }}
              >
                X
              </div> */}
              <img
                onClick={() => {
                  setFile(undefined);
                  setImgFile("");
                }}
                src="/image/iconX.svg"
                alt=""
              />
              <img src={imgFile} alt="" />
            </>
          ) : null}
        </div>
        <div className="line" />
        <label className="signup-profileImg-label" htmlFor="profileImg">
          <img src="/image/iconCamera.svg" alt="카메라" />
        </label>
        <input
          className="signup-profileImg-input"
          type="file"
          accept=".gif, .jpg, .png, .jpeg, .svg"
          id="profileImg"
          onChange={getImage}
        />
      </STImageUpLoad>
    </>
  );
}

const STHeader = styled.div`
  margin: 12px 0px 19.36px 0px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .wrap {
    //margin-left: 85px;
    font-size: 17px;
    font-weight: 500;
    div {
      height: 19px;
    }
  }
  button {
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    border: none;
    background-color: transparent;
    color: #5fce80;
    //margin-left: 44px;
    div {
      font-size: 17px;
      height: 19px;
    }
  }
`;
const SBody = styled.div`
  //border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* margin-bottom: 20px; */
  select {
    border: none;
    width: 90px;
    height: 25px;
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .titleForm {
    border-bottom: 0.5px solid rgba(197, 197, 197, 0.7);
    margin-bottom: 10px;
    input {
      width: 100%;
      height: 45px;
      font-weight: 400;
      font-size: 24px;
      line-height: 35px;
      border: none;
      margin-bottom: 10px;
    }
  }
  .content {
    textarea {
      border: none;
      width: 100%;
      min-height: 200px;
      max-height: 200px;
      font-weight: 400;
      font-size: 15px;
      resize: none;
      :focus {
        outline: none;
        //display: none;
      }
    }
  }
`;

const STImageUpLoad = styled.div`
  position: absolute;
  bottom: 10px;
  width: 375px;
  //border: 1px solid black;

  @media screen and (max-height: 600px) {
    display: none;
  }

  .preview {
    position: absolute;
    bottom: 50px;
    //border: 1px solid black;
    width: 341px;
    height: 220px;
    img:first-child {
      // border: 1px solid black;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      border-radius: 8px;
      position: absolute;
      top: -1px;
    }
    img {
      width: 341px;
      height: 220px;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  .line {
    width: 341px;
    height: 0px;
    border: 0.5px solid rgba(197, 197, 197, 0.7);
    margin-bottom: 10px;
    position: absolute;
    bottom: 30px;
  }
  input {
    display: none;
    .img {
      position: absolute;
      bottom: 5px;
      width: 24px;
      height: 24px;
    }
  }
`;

export default PostForm;
