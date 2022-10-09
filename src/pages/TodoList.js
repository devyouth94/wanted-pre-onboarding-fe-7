import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Todo from "../Components/Todo";

import instance from "../app/instance";

import styled from "styled-components";
import { StContentsWrap, StInput, StTextButton, StTitle } from "../shared/GlobalStyle";

const TodoList = () => {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const todoRef = useRef(null);

  const getTodoAPI = useCallback(async () => {
    try {
      const { data } = await instance.get("/todos");
      setTodos(data);
    } catch (error) {
      alert(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTodoAPI();
    } else {
      navigate("/");
    }
  }, [getTodoAPI, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await instance.post("/todos", { todo: todoRef.current.value });
      setTodos((prev) => [...prev, data]);
    } catch (error) {
      alert(error.response.data.message);
    }
    todoRef.current.value = "";
  };

  return (
    <StContentsWrap>
      <StTitle>오늘의 할일</StTitle>

      <StForm onSubmit={onSubmitHandler}>
        <StInput placeholder="할일을 등록해주세요" ref={todoRef} />
        <StTextButton>등록</StTextButton>
      </StForm>

      <StMain>
        {todos.map((todo) => (
          <Todo todo={todo} setTodos={setTodos} key={todo.id} />
        ))}
      </StMain>
    </StContentsWrap>
  );
};

export default TodoList;

const StForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
`;

const StMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  margin-top: 30px;
`;
