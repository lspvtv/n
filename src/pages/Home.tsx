import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Calendar, Heart } from 'lucide-react';

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Персонализированные поздравления с днем рождения
        </h1>
        <p className="text-xl text-gray-600">
          Создавайте уникальные поздравления для ваших близких с помощью искусственного интеллекта
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Gift className="w-12 h-12 text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Персонализация</h2>
          <p className="text-gray-600">
            Создавайте анкеты для каждого человека, чтобы получать идеально подходящие поздравления
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Calendar className="w-12 h-12 text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Google Календарь</h2>
          <p className="text-gray-600">
            Интегрируйте поздравления с Google Календарем и никогда не забывайте о важных датах
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Heart className="w-12 h-12 text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Ваш стиль</h2>
          <p className="text-gray-600">
            Выберите свой стиль общения, и поздравления будут звучать естественно
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/auth"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Начать сейчас
        </Link>
      </div>
    </div>
  );
}

export default Home;