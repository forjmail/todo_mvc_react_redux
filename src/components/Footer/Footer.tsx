import { useEffect, useState } from 'react';
import styles from './footer.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { StateType } from '../../types';
import { removeCompleted, setFilter } from '../../redux/todos.slice';

export default function Footer() {
  const dispatch = useAppDispatch();
  const { todos, filter } = useAppSelector(
    (state: { main: StateType }) => state.main
  );

  const [remaining, setRemaining] = useState(
    todos.filter((el) => el.completed !== true).length
  );
  const [completed, setCompleted] = useState(
    todos.filter((el) => el.completed === true).length
  );

  useEffect(() => {
    setRemaining(todos.filter((el) => el.completed !== true).length);
    setCompleted(todos.filter((el) => el.completed === true).length);
  }, [todos, filter]);

  return todos.length ? (
    <footer className={styles.footer}>
      <span className={styles.todo_count}>
        <strong>{remaining}</strong>
        <span>{remaining === 1 ? ' item' : ' items'} left</span>
      </span>
      <ul className={styles.filters}>
        <li>
          <button
            className={`${filter === 'all' ? styles.selected : ''}`}
            onClick={() => dispatch(setFilter('all'))}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={`${filter === 'active' ? styles.selected : ''}`}
            onClick={() => dispatch(setFilter('active'))}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={`${filter === 'completed' ? styles.selected : ''}`}
            onClick={() => dispatch(setFilter('completed'))}
          >
            Completed
          </button>
        </li>
      </ul>
      {completed ? (
        <button
          className={styles.clear_completed}
          onClick={() => dispatch(removeCompleted())}
        >
          Clear completed
        </button>
      ) : (
        <></>
      )}
    </footer>
  ) : (
    <></>
  );
}
