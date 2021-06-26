import React from 'react';
import './App.css';
import Events from './components/Events';

const App: React.FunctionComponent=()=>{
  return (
    <div className="App">
      <h1>Local Events</h1>
      <Events />
    </div>
  );
}

export default App;
