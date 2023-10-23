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
          <a
            href="#/all"
            className={`${filter === 'all' ? styles.selected : ''}`}
            onClick={() => dispatch(setFilter('all'))}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={`${filter === 'active' ? styles.selected : ''}`}
            onClick={() => dispatch(setFilter('active'))}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            className={`${filter === 'completed' ? styles.selected : ''}`}
            onClick={() => dispatch(setFilter('completed'))}
          >
            Completed
          </a>
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
