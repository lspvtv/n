import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Users, Plus, LogIn } from 'lucide-react';
import { useStore } from '../store/useStore';

function Navbar() {
  const { user } = useStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-4">
          <Link to="/" className="text-purple-600 hover:text-purple-800">
            Главная
          </Link>
          <Link to="/people" className="text-purple-600 hover:text-purple-800">
            Список людей
          </Link>
          <Link to="/add-person" className="text-purple-600 hover:text-purple-800">
            Добавить человека
          </Link>
          <Link to="/auth" className="text-purple-600 hover:text-purple-800">
            Авторизация
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar