import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddPerson from './pages/AddPerson';
import PeopleList from './pages/PeopleList';
import GenerateGreeting from './pages/GenerateGreeting';
import Auth from './pages/Auth';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/add-person" element={<AddPerson />} />
            <Route path="/people" element={<PeopleList />} />
            <Route path="/generate/:id" element={<GenerateGreeting />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;