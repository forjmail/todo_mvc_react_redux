import React, { useState } from 'react';
import styles from './App.module.css';
import List from './components/List/List';
import Footer from './components/Footer/Footer';
import { useAppDispatch } from './redux/store';
import { addTodo } from './redux/todos.slice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const [titleInput, setTitleinput] = useState('');

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTitleinput(e.target.value);
  }

  function keyHandler(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      const el = event.target as HTMLInputElement;
      const value = el.value.trim();
      dispatch(addTodo(value));
      setTitleinput('');
    }
  }

  return (
    <>
      <section className={styles.todoapp}>
        <header className={styles.header}>
          <h1>todos</h1>
          <input
            className={styles.new_todo}
            autoFocus
            placeholder="What needs to be done?"
            value={titleInput}
            onChange={changeHandler}
            onKeyUp={(e: React.KeyboardEvent<HTMLElement>) => keyHandler(e)}
          />
        </header>
        <List />
        <Footer />
      </section>
    </>
  );
}

export default App;
