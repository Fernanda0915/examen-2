import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Lista.css'; 

const Lista = () => {
  const [todos, setTodos] = useState([]);

  const [selectedMenu, setSelectedMenu] = useState(null);

  useEffect(() => {
    axios.get('http://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  const generateTodoList = (type) => {
    switch (type) {
      case 'ids':
        return todos.map(todo => <p key={todo.id}>{todo.id}</p>);
      case 'idsAndTitles':
        return todos.map(todo => <p key={todo.id}>{todo.id} - {todo.title}</p>);
      case 'unresolved':
        return todos.filter(todo => !todo.completed).map(todo => <p key={todo.id}>{todo.id} - {todo.title}</p>);
      case 'resolved':
        return todos.filter(todo => todo.completed).map(todo => <p key={todo.id}>{todo.id} - {todo.title}</p>);
      case 'idsAndUserId':
        return todos.map(todo => <p key={todo.id}>{todo.id} - {todo.userId}</p>);
      case 'resolvedAndUserId':
        return todos.filter(todo => todo.completed).map(todo => <p key={todo.id}>{todo.id} - {todo.userId}</p>);
      case 'unresolvedAndUserId':
        return todos.filter(todo => !todo.completed).map(todo => <p key={todo.id}>{todo.id} - {todo.userId}</p>);
      default:
        return null;
    }
  };
  
  const handleClick = (type) => {
    const todoList = generateTodoList(type);
    setSelectedMenu(todoList);
  };

  return (
    <div className="lista-container">
      <h1>Lista de NFL</h1>
      <div className="menu">
        <button onClick={() => handleClick('ids')}>Lista de todos los pendientes(solo IDs)</button>
        <button onClick={() => handleClick('idsAndTitles')}>Lista de todos los pendientes (IDs y Títulos)</button>
        <button onClick={() => handleClick('unresolved')}>Lista de todos los pendientes sin resolver (ID y Título)</button>
        <button onClick={() => handleClick('resolved')}>Lista de todos los pendientes resueltos (ID y Título)</button>
        <button onClick={() => handleClick('idsAndUserId')}>Lista de todos los pendientes (IDs y userID)</button>
        <button onClick={() => handleClick('resolvedAndUserId')}>Lista de todos los pendientes resueltos (ID y userID)</button>
        <button onClick={() => handleClick('unresolvedAndUserId')}>Lista de todos los pendientes sin resolver (ID y userID)</button>
      </div>
      <div className="todo-list">
        {selectedMenu}
      </div>
    </div>
  );
};

export default Lista;
