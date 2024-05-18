// App.js
import React from 'react';
import CalendarView from './components/CalendarView';

const App = () => {
  return (
    <div className="App">
      <h1 style={{fontFamily:"sans-serif"}}>Calendar System</h1>
      <CalendarView />
    </div>
  );
};

export default App;
