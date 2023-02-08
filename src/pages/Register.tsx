import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  emailAuth,
  nicknameCheckApi,
  registerApi,
  userIdCheckApi,
} from "../APIs/loginRegisterApi";
import { IEmail, IForm, IUserId } from "../types/loginRegisterType";
import styled from "styled-components";
import { useEffect, useState } from "react";
import LayOut from "../components/layout/LayOut";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({ mode: "onChange" });

  const { mutateAsync: registerMutate } = useMutation(registerApi);
  const { mutateAsync: userIdCheckMutate } = useMutation(userIdCheckApi);
  const { mutateAsync: nicknameCheckMutate } = useMutation(nicknameCheckApi);
  const { mutateAsync: emailAuthMutate } = useMutation(emailAuth);

  const [onClickIdCheck, setClickIdCheck] = useState(false);
  const [onClickNicknameCheck, setClickNicknameCheck] = useState(false);
  const [onEmailAuthClickCheck, setEmailAuthClickCheck] = useState(false);
  const [onEmailAuthPass, setEmailAuthPass] = useState(false);
  const [userIdPassMsg, setUserIdPassMsg] = useState("");
  const [nicknamePassMsg, setNicknamePassMsg] = useState("");
  const [emailAuthPassMsg, setEmailAuthPassMsg] = useState("");

  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [code, setCode] = useState("");

  const onValid = (data: IForm) => {
    if (!onClickIdCheck) return alert("이메일 중복확인 버튼을 눌러주세요!");
    if (!onEmailAuthClickCheck) return alert("이메일 인증을 진행해 주세요!");
    if (!onEmailAuthPass) return alert("인증코드를 다시한번 확인해주세요!");
    if (!onClickNicknameCheck)
      return alert("닉네임 중복확인 버튼을 눌러주세요!");

    console.log(errors?.email?.message);

    if (data.password !== data.passwordCheck) {
      setError(
        "passwordCheck",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    } else {
      const registerInfo: IForm = data;
      registerMutate(registerInfo)
        .then((res) => {
          navigate("/login");
        })
        .catch((error) => {
          setError("extraError", { message: error.response.data.msg });
          alert(error.response.data.msg);
        });
    }
    // setError("extraError", { message: "Server offline." });
  };
  // console.log(errors);

  const userIdCheck = () => {
    setClickIdCheck(true);
    const userId: IForm = watch();
    userIdCheckMutate(userId)
      .then((res) => {
        console.log(res);
        setError("email", { message: "" });
        setUserIdPassMsg("이메일 인증버튼을 눌러주세요");
        //alert("이메일 인증을 진행해주세요!");
        setEmail(userId.email);
        console.log(email);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        setUserIdPassMsg("");
        setError("email", { message: error.response.data.msg });
      });
  };

  const nicknameCheck = () => {
    setClickNicknameCheck(true);
    const nickname: IForm = watch();
    nicknameCheckMutate(nickname)
      .then((res) => {
        console.log(res);
        setError("nickname", { message: "" });
        setNicknamePassMsg("멋진 닉네임이네요!");
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        setNicknamePassMsg("");
        setError("nickname", { message: error.response.data.msg });
      });
  };

  const emailAuthCheckMail = () => {
    setEmailAuthClickCheck(true);
    alert("입력하신 이메일로 인증메일이 발송되었습니다!");
    emailAuthMutate({ email: email }).then((res) => {
      setCode(res.msg);
    });
  };

  const onEmailCheckHandler = (c: string) => {
    if (c !== code) {
      setEmailAuthPass(false);
      setEmailAuthPassMsg("잘못된 코드입니다");
      return;
    } else {
      setEmailAuthPass(true);
      setEmailAuthPassMsg("인증되었습니다");
    }
  };
  return (
    <LayOut height="100vh">
      <Total>
        <Header>
          <div className="wrap">
            <img
              src="/image/iconLeftArrow.svg"
              onClick={() => navigate("/login")}
            />
            <div>회원가입</div>
          </div>
        </Header>
        <HeaderImg src="/image/iconLogo.svg" />
        <Form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit(onValid)}
        >
          <div style={{ display: "flex" }}>
            <Input
              {...register("email", {
                required: "필수 정보입니다.",
                pattern: {
                  value: /\w+@\w+\.\w{2,4}\.?\w{0,2}/,
                  message: "올바른 이메일 형식이 아닙니다.",
                },
              })}
              placeholder="이메일"
              //onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                setClickIdCheck(false);
                setUserIdPassMsg("");
              }}
            />
            <Check onClick={userIdCheck} color={onClickIdCheck}>
              중복 확인
            </Check>
          </div>
          {errors?.email?.message ? (
            <Msg>{errors?.email?.message}</Msg>
          ) : (
            <Msg style={{ color: "#5fce80" }}>{userIdPassMsg}</Msg>
          )}
          {onClickIdCheck &&
          userIdPassMsg === "이메일 인증버튼을 눌러주세요" ? (
            <>
              <EmailAuth>
                <Input
                  placeholder="인증코드"
                  onChange={(e) => onEmailCheckHandler(e.target.value)}
                />
                <Check
                  onClick={emailAuthCheckMail}
                  color={onEmailAuthClickCheck}
                >
                  이메일 인증
                </Check>
              </EmailAuth>
              {onEmailAuthPass ? (
                <Msg style={{ color: "#5fce80" }}>{emailAuthPassMsg}</Msg>
              ) : (
                <Msg style={{ color: "red" }}>{emailAuthPassMsg}</Msg>
              )}
            </>
          ) : null}
          <div style={{ display: "flex" }}>
            <Input
              {...register("nickname", {
                required: "필수 정보입니다.",
                minLength: {
                  value: 5,
                  message: "5~10글자를 적어주세요.",
                },
                maxLength: {
                  value: 10,
                  message: "5~10글자를 적어주세요.",
                },
                pattern: {
                  value: /^[A-za-z0-9가-힣]{5,10}$/,
                  message: "가능한 문자 : 영문 대소문자, 글자 단위 한글, 숫자",
                },
              })}
              placeholder="닉네임"
              onBlur={() => {
                setClickNicknameCheck(false);
                setNicknamePassMsg("");
              }}
            />
            <Check onClick={nicknameCheck} color={onClickNicknameCheck}>
              중복 확인
            </Check>
          </div>
          {errors?.nickname?.message ? (
            <Msg>{errors?.nickname?.message}</Msg>
          ) : (
            <Msg style={{ color: "#5fce80" }}>{nicknamePassMsg}</Msg>
          )}

          <Input
            {...register("password", {
              required: "필수 정보입니다.",
              minLength: {
                value: 8,
                message: "8글자 이상 적어주세요.",
              },
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{8,20}$/,
                message: "영문 대소문자, 숫자, 특수문자를 포함한 8~20글자",
              },
            })}
            placeholder="비밀번호"
            type="password"
          />
          <Msg>{errors?.password?.message}</Msg>
          <Input
            {...register("passwordCheck", {
              required: "필수 정보입니다.",
            })}
            placeholder="비밀번호 재확인"
            type="password"
          />
          <Msg>{errors?.passwordCheck?.message}</Msg>
          {errors?.email?.message ||
          errors?.nickname?.message ||
          errors?.password?.message ||
          errors?.passwordCheck?.message ? (
            <button disabled>회원가입</button>
          ) : (
            <button>회원가입</button>
          )}
          <span>{errors?.extraError?.message}</span>
        </Form>
      </Total>
    </LayOut>
  );
};

const Total = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Noto Sans KR", sans-serif;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 20px;
  display: flex;
  .wrap {
    width: 60%;
    display: flex;
    justify-content: space-between;
  }
  //justify-content: center;
  align-items: center;
`;

const HeaderImg = styled.img`
  margin-top: -2px;
  margin-bottom: 40px;
  width: 160px;
`;

const Form = styled.form`
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 340px;
    height: 56px;
    background-color: #5fce80;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 17px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 17px;
    cursor: pointer;
    transition: all 0.5s linear;

    &:hover {
      background-color: white;
      border: 1px solid #5fce80;
      color: #5fce80;
    }
    div {
      height: 17px;
    }
  }
  span {
    font-size: 13px;
    color: red;
    text-align: left;
    margin-bottom: 15px;
  }
`;

const Msg = styled.div`
  width: 340px;
  font-size: 13px;
  font-weight: 400;
  color: red;
  text-align: left;
  margin: 7px 0px 13px 12px;
  //border: 1px solid black;
`;

const Check = styled.div<{ color: any }>`
  min-width: 90px;
  height: 48px;
  border: 1px solid gray;
  color: gray;
  font-weight: 400;
  border: 1px solid ${(props) => (props.color ? "#5fce80" : "gray")};
  color: ${(props) => (props.color ? "#5fce80" : "gray")};
  font-size: 14px;
  margin-left: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s linear;

  &:hover {
    background-color: white;
    border: 1px solid #5fce80;
    color: #5fce80;
  }
`;

const Input = styled.input`
  width: 100%;
  min-width: 238px;
  height: 48px;
  border-radius: 10px;
  border: none;
  background-color: #f9f9f9;
  padding-left: 15px;

  &:focus {
    outline: 1px solid #5fce80;
    background-color: white;
  }
`;

const EmailAuth = styled.div`
  display: flex;
  //margin-bottom: 20px; ;
`;

export default Register;