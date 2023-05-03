import React from 'react';
import { CustomerList } from '../CustomerList';
import { Layout } from '../../templates/Layout';
import './App.css';

function App() {
  return (
    <Layout data-test-id="AppContainer">
      <CustomerList />
    </Layout>
  );
}

export default App;
