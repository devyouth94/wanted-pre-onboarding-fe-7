import React, { useCallback, useEffect, useRef, useState } from "react";

import Todo from "../Components/Todo";

import instance from "../app/instance";

import styled from "styled-components";
import { StContentsWrap, StInput, StTextButton, StTitle } from "../shared/GlobalStyle";

const TodoList = () => {
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
    getTodoAPI();
  }, [getTodoAPI]);

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

  const onDeleteHandler = async (id) => {
    try {
      await instance.delete(`todos/${id}`);
      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onSuccessHandler = async (todo) => {
    try {
      const { data } = await instance.put(`todos/${todo.id}`, { todo: todo.todo, isCompleted: true });
      setTodos((prev) => prev.map((item) => (item.id === todo.id ? data : item)));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onEditHandler = async (todo, editTodoRef) => {
    try {
      const { data } = await instance.put(`todos/${todo.id}`, {
        todo: editTodoRef,
        isCompleted: todo.isCompleted,
      });
      setTodos((prev) => prev.map((item) => (item.id === todo.id ? data : item)));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const functionProps = { onSuccessHandler, onEditHandler, onDeleteHandler };

  return (
    <StContentsWrap>
      <StTitle>오늘의 할일</StTitle>

      <StForm onSubmit={onSubmitHandler}>
        <StInput placeholder="할일을 등록해주세요" ref={todoRef} />
        <StTextButton>등록</StTextButton>
      </StForm>

      <StMain>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} {...functionProps} />
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
