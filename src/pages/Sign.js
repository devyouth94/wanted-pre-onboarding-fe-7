import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authAPI } from "../app/api";

import useSignInput from "../hooks/useSignInput";
import { setToken } from "../shared/localstorage";

import styled from "styled-components";
import { StContentsWrap, StInput, StTitle } from "../shared/GlobalStyle";

const Sign = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const { user, checkEmail, checkPassword, onChangeHandler } = useSignInput();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (isSignUp) {
        await authAPI.signup(user);
        setIsSignUp(false);
        alert("회원가입 완료!");
      } else {
        const { data } = await authAPI.signin(user);
        setToken(data.access_token);
        navigate("/todo");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <StContentsWrap>
      <StTitle>{isSignUp ? "회원가입" : "로그인"}</StTitle>

      <StForm onSubmit={onSubmitHandler}>
        <StArticle>
          <StLabel>아이디</StLabel>
          <StInput
            type="text"
            name="email"
            value={user.email}
            onChange={onChangeHandler}
            placeholder="이메일을 입력해주세요"
          />
          {!checkEmail && <StHelper>올바른 형식이 아닙니다</StHelper>}
        </StArticle>

        <StArticle>
          <StLabel>비밀번호</StLabel>
          <StInput
            type="password"
            name="password"
            value={user.password}
            onChange={onChangeHandler}
            placeholder="비밀번호를 입력해주세요"
          />
          {!checkPassword && <StHelper>비밀번호는 8자 이상입니다</StHelper>}
        </StArticle>

        <StButton disabled={checkEmail && checkPassword ? false : true}>{isSignUp ? "회원가입" : "로그인"}</StButton>
      </StForm>

      <StNavi onClick={() => setIsSignUp((prev) => !prev)}>{isSignUp ? "로그인" : "회원가입"} 하러가기</StNavi>
    </StContentsWrap>
  );
};

export default Sign;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
`;

const StArticle = styled.article`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const StLabel = styled.div`
  margin-bottom: 5px;

  font-weight: 500;
`;

const StHelper = styled.span`
  margin-top: 7px;
  margin-left: 5px;

  font-size: 12px;
  color: #fe9e2d;
`;

const StButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;
  background-color: transparent;

  border: 1.2px solid #fe9e2d;
  border-radius: 10px;

  color: #fe9e2d;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background-color: #fe9e2d;
    color: #fff;
  }

  &:disabled {
    background-color: #ddd;
    border: none;
    color: #bbb;
  }
`;

const StNavi = styled.span`
  margin-top: 30px;

  font-size: 14px;
  color: #aaa;
`;
