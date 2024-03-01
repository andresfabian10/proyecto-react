// todoService.ts
import { Homerwork } from '../types/Homework';

export const getAll = (): Homerwork[] => {
  try {
    const data = localStorage.getItem('todos');
    return data ? JSON.parse(data) : fetchDefaultTodos();
  } catch (error) {
    console.error('Error al leer los datos:', error);
    return fetchDefaultTodos();
  }
};

export const setAll = (todos: Homerwork[]): void => {
  try {
    const data = JSON.stringify(todos, null, 2);
    localStorage.setItem('todos', data);
  } catch (error) {
    console.error('Error al escribir en los datos:', error);
  }
};

const fetchDefaultTodos = (): Homerwork[] => [
  {
    id: 1,
    title: 'ventas',
    complete: false,
  },
  {
    id: 2,
    title: 'estudio',
    complete: true,
  },
  {
    id: 3,
    title: 'GYM',
    complete: false,
  },
];

export const addTodo = (newTodo: Homerwork): Homerwork[] => {
  const todos = getAll();
  const updatedTodos = [...todos, newTodo];
  setAll(updatedTodos);
  return updatedTodos;
};

export const deleteAll = (id: number): Homerwork[] => {
  const todos = getAll();
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  setAll(updatedTodos);
  return updatedTodos;
};
