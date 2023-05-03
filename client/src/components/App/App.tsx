import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../templates/Layout';
import { RootState } from '../../redux/store';
import {
  decrement,
  increment,
} from '../../redux/reducers/counterSlice.reducer';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <Layout>
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
    </Layout>
  );
}

export default App;
