import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Gift, Copy, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import { Person, User } from '../types';

function GenerateGreeting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useStore((state) => state.user) as User;
  const [person, setPerson] = useState<Person | null>(null);
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('people')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;
        setPerson(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (id) {
      fetchPerson();
    }
  }, [id]);

  const generateGreeting = async () => {
    if (!person || user.credits < 1) return;

    setLoading(true);
    setError('');

    try {
      // Here we would typically make an API call to generate the greeting
      // For now, we'll use a placeholder greeting
      const interests = person.interests.join(', ');
      const traits = person.personalityTraits.join(', ');
      
      const placeholderGreeting = `Дорогой ${person.name}!
      
В этот особенный день я хочу от всего сердца поздравить тебя с днем рождения! Ты всегда был замечательным ${person.relationship.toLowerCase()}, и я очень ценю твою любовь к ${interests}. Твои качества - ${traits} - делают тебя по-настоящему особенным человеком.

Желаю тебе бесконечного счастья, крепкого здоровья и исполнения всех твоих желаний! Пусть каждый день приносит тебе радость и новые возможности для развития твоих увлечений.

С любовью и наилучшими пожеланиями!`;

      setGreeting(placeholderGreeting);

      // Update user credits
      const { error: updateError } = await supabase
        .from('users')
        .update({ credits: user.credits - 1 })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Update local user state
      useStore.setState({ user: { ...user, credits: user.credits - 1 } });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(greeting);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Не удалось скопировать текст');
    }
  };

  if (!person) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate('/people')}
          className="text-purple-600 hover:text-purple-700"
        >
          ← Вернуться к списку
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Поздравление для {person.name}
          </h2>
          <div className="text-sm text-gray-500">
            Кредитов: {user.credits}
          </div>
        </div>

        {!greeting ? (
          <div className="text-center py-8">
            <Gift className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">
              Нажмите кнопку ниже, чтобы сгенерировать уникальное поздравление для {person.name}
            </p>
            <button
              onClick={generateGreeting}
              disabled={loading || user.credits < 1}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Генерация...' : 'Сгенерировать поздравление'}
            </button>
            {user.credits < 1 && (
              <p className="text-red-500 mt-2">
                Недостаточно кредитов для генерации
              </p>
            )}
          </div>
        ) : (
          <div>
            <div className="bg-gray-50 p-6 rounded-lg mb-4 whitespace-pre-wrap">
              {greeting}
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setGreeting('')}
                className="text-gray-600 hover:text-purple-600"
              >
                Сгенерировать заново
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Копировать текст</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GenerateGreeting;