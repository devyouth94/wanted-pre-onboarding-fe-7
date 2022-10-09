import React, { useRef, useState } from "react";

import instance from "../app/instance";

import styled, { css } from "styled-components";
import { StInput, StTextButton } from "../shared/GlobalStyle";

const Todo = ({ todo, setTodos }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const editTodoRef = useRef(null);

  const onDeleteHandler = async (id) => {
    try {
      await instance.delete(`todos/${id}`);
      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onSuccessHandler = async (id) => {
    try {
      const { data } = await instance.put(`todos/${id}`, { todo: todo.todo, isCompleted: true });
      setTodos((prev) => prev.map((item) => (item.id === id ? data : item)));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onEditHandler = async (id) => {
    try {
      const { data } = await instance.put(`todos/${id}`, {
        todo: editTodoRef.current.value,
        isCompleted: todo.isCompleted,
      });
      setTodos((prev) => prev.map((item) => (item.id === id ? data : item)));
    } catch (error) {
      alert(error.response.data.message);
    }
    setIsEditMode((prev) => !prev);
  };

  return (
    <StTodoWrap>
      <StTodo>
        {!todo.isCompleted && !isEditMode && <div onClick={() => onSuccessHandler(todo.id)}>☑️</div>}

        {isEditMode ? (
          <StInput defaultValue={todo.todo} ref={editTodoRef} />
        ) : (
          <StTodoTitle complete={todo.isCompleted}>{todo.todo}</StTodoTitle>
        )}
      </StTodo>

      <StButtonWrap>
        {isEditMode ? (
          <>
            <StTextButton onClick={() => onEditHandler(todo.id)}>완료</StTextButton>
            <StTextButton onClick={() => setIsEditMode((prev) => !prev)}>취소</StTextButton>
          </>
        ) : (
          <>
            {!todo.isCompleted && <StTextButton onClick={() => setIsEditMode((prev) => !prev)}>수정</StTextButton>}
            <StTextButton onClick={() => onDeleteHandler(todo.id)}>삭제</StTextButton>
          </>
        )}
      </StButtonWrap>
    </StTodoWrap>
  );
};

export default Todo;

const StTodoWrap = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  height: 50px;
  padding: 0 10px;

  border-radius: 10px;
  border: 1px solid #eee;
`;

const StTodo = styled.div`
  display: flex;
  align-items: center;

  width: 80%;

  div {
    margin-right: 5px;

    cursor: pointer;
  }
`;

const StTodoTitle = styled.h2`
  ${(props) =>
    props.complete &&
    css`
      text-decoration: line-through;
      color: #aaa;
    `}
`;

const StButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
