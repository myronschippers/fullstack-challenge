import React from 'react';
import { Layout } from '../../templates/Layout';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Layout>
      <img src={logo} className="App-logo" alt="logo" />
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
    </Layout>
  );
}

export default App;
