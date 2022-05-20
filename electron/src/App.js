import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const handleImport = () => {
    window.appAPI.import((data) => {
      console.log('data', data)
    }, (error) => {
      console.log('error', error)
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleImport}>Import data</button>
      </header>
    </div>
  );
}

export default App;
