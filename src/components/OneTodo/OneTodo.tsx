import { useState } from 'react';
import { StateType, Todo } from '../../types';
import styles from './one-todo.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { removeTodo, setEditedId, updateTodo } from '../../redux/todos.slice';

export default function OneTodo({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch();
  const editedId = useAppSelector(
    (state: { main: StateType }) => state.main.editedId
  );
  const [beforeEditCache, setBeforeEdit] = useState('');

  function keyHandler(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      doneEdit(todo);
    } else if (event.key === 'Escape' || event.keyCode === 27) {
      cancelEdit(todo);
    }
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const newTodo =
      e.target.type === 'checkbox'
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : e.target.type === 'text'
        ? { ...todo, title: e.target.value }
        : { ...todo };
    dispatch(updateTodo(newTodo));
  }

  function editTodo(todo: Todo) {
    setBeforeEdit(todo.title);
    dispatch(setEditedId(todo.id));
  }

  function cancelEdit(todo: Todo) {
    dispatch(setEditedId(0));
    todo.title = beforeEditCache;
  }

  function doneEdit(todo: Todo) {
    if (editedId === todo.id) {
      dispatch(setEditedId(0));
      todo.title = todo.title.trim();
      if (!todo.title) dispatch(removeTodo(todo.id));
    }
  }

  return (
    <span
      className={`todo ${todo.completed ? styles.completed : ''} ${
        todo.id === editedId ? styles.editing : ''
      }`}
    >
      <div className={styles.view}>
        <input
          className={styles.toggle}
          type="checkbox"
          checked={todo.completed}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeHandler(e)
          }
        />
        <label onDoubleClick={() => editTodo(todo)}>{todo.title}</label>
        <button
          className={styles.destroy}
          onClick={() => dispatch(removeTodo(todo.id))}
        ></button>
      </div>
      {beforeEditCache && (
        <input
          className={styles.edit}
          type="text"
          autoFocus
          value={todo.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeHandler(e)
          }
          onBlur={() => doneEdit(todo)}
          onKeyUp={(e: React.KeyboardEvent<HTMLElement>) => keyHandler(e)}
        />
      )}
    </span>
  );
}
