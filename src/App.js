import React from 'react';
import './App.css';
import Header from './components/Header/index';
import PhoneBook from './components/PhoneBook/index';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <PhoneBook></PhoneBook>
    </div>
  );
}

export default App;
