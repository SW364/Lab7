import React from 'react';
import ProfileList from './components/ProfileList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Administrador de Perfiles</h1>
      </header>
      <main>
        <ProfileList />
      </main>
      <footer>
        <p>CRUD de Perfiles © 2025</p>
      </footer>
    </div>
  );
}

export default App;
