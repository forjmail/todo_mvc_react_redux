import { useEffect, useState } from 'react';
import { StateType, Todo } from '../../types';
import OneTodo from '../OneTodo/OneTodo';
import styles from './list.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { saveToLocal, toggleAll } from '../../redux/todos.slice';

export default function List() {
  const dispatch = useAppDispatch();
  const { todos, filter } = useAppSelector(
    (state: { main: StateType }) => state.main
  );

  const [filteredTodo, setFilteredTodo] = useState(todos);

  useEffect(() => {
    switch (filter) {
      case 'all':
        setFilteredTodo(todos);
        break;
      case 'active':
        setFilteredTodo(todos.filter((el: Todo) => el.completed === false));
        break;
      case 'completed':
        setFilteredTodo(todos.filter((el: Todo) => el.completed === true));
        break;
      default:
        setFilteredTodo(todos);
        break;
    }
  }, [todos, filter]);

  useEffect(() => {
    dispatch(saveToLocal());
  }, [todos]);

  function toggleAllHandler(event: React.FormEvent<HTMLInputElement>) {
    const el = event.target as HTMLInputElement;
    dispatch(toggleAll(el.checked));
  }

  return todos.length ? (
    <section className={styles.main}>
      <input
        id="toggle-all"
        className={styles.toggle_all}
        type="checkbox"
        onChange={toggleAllHandler}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className={styles.todo_list}>
        {filteredTodo.map((todo: Todo) => (
          <li key={todo.id}>
            <OneTodo todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  ) : (
    <></>
  );
}
