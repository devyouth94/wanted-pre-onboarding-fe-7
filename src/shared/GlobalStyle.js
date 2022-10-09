import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};

  body {
    cursor: default;
  }
`;

export const StContentsWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50%;
  padding: 30px;

  border-radius: 20px;
  border: 1px solid #eee;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
`;

export const StTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const StInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 5px;

  border: 1px solid #ddd;
  border-radius: 5px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 14px;
  }
`;

export const StTextButton = styled.button`
  width: 45px;
  background-color: transparent;

  border: 1px solid #fe9e2d;
  border-radius: 5px;

  color: #fe9e2d;
  font-weight: 700;

  cursor: pointer;

  &:hover {
    background-color: #fe9e2d;
    color: #fff;
  }
`;

export default GlobalStyle;
