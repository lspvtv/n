import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Calendar, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import { Person, User } from '../types';

function PeopleList() {
  const user = useStore((state) => state.user) as User;
  const { people, setPeople } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('people')
          .select('*')
          .eq('user_id', user.id)
          .order('name');

        if (fetchError) throw fetchError;

        setPeople(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, [user.id, setPeople]);

  const handleDelete = async (personId: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого человека?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('people')
        .delete()
        .eq('id', personId);

      if (deleteError) throw deleteError;

      setPeople(people.filter(p => p.id !== personId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(date);
  };

  const getDaysUntilBirthday = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = nextBirthday.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Мои контакты</h2>
        <Link
          to="/add-person"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Добавить человека
        </Link>
      </div>

      {people.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">У вас пока нет добавленных контактов</p>
          <Link
            to="/add-person"
            className="text-purple-600 hover:text-purple-700"
          >
            Добавить первый контакт
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {people.map((person: Person) => (
            <div key={person.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{person.name}</h3>
                  <p className="text-gray-600 mb-1">{person.relationship}</p>
                  <p className="text-sm text-gray-500">
                    День рождения: {formatDate(person.birthDate)}
                  </p>
                  <p className="text-sm text-purple-600 mt-1">
                    До дня рождения: {getDaysUntilBirthday(person.birthDate)} дней
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(person.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Удалить"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {person.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-purple-50 text-purple-700 text-sm px-3 py-1 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex space-x-3">
                <Link
                  to={`/generate/${person.id}`}
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
                >
                  <Gift className="w-4 h-4" />
                  <span>Создать поздравление</span>
                </Link>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
                  <Calendar className="w-4 h-4" />
                  <span>Добавить в календарь</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PeopleList;