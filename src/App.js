import React from "react";
import { Route, Routes } from "react-router-dom";

import Sign from "./pages/Sign";
import TodoList from "./pages/TodoList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Sign />} />
      <Route path="/todo" element={<TodoList />} />
    </Routes>
  );
};

export default App;
