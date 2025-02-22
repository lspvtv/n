import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import { User } from '../types';

function AddPerson() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user) as User;
  const addPerson = useStore((state) => state.addPerson);

  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    relationship: '',
    interests: [''],
    personalityTraits: [''],
    communicationStyle: 'casual' as const,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInterestChange = (index: number, value: string) => {
    const newInterests = [...formData.interests];
    newInterests[index] = value;
    setFormData({ ...formData, interests: newInterests });
  };

  const addInterest = () => {
    setFormData({ ...formData, interests: [...formData.interests, ''] });
  };

  const handleTraitChange = (index: number, value: string) => {
    const newTraits = [...formData.personalityTraits];
    newTraits[index] = value;
    setFormData({ ...formData, personalityTraits: newTraits });
  };

  const addTrait = () => {
    setFormData({ ...formData, personalityTraits: [...formData.personalityTraits, ''] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: insertError } = await supabase
        .from('people')
        .insert([
          {
            ...formData,
            interests: formData.interests.filter(Boolean),
            personality_traits: formData.personalityTraits.filter(Boolean),
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      if (data) {
        addPerson(data);
        navigate('/people');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Добавить человека</h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Имя
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
              Дата рождения
            </label>
            <input
              type="date"
              id="birthDate"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">
              Кем приходится
            </label>
            <input
              type="text"
              id="relationship"
              value={formData.relationship}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Интересы
            </label>
            {formData.interests.map((interest, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={interest}
                  onChange={(e) => handleInterestChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Например: путешествия, книги, спорт"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addInterest}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              + Добавить интерес
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Черты характера
            </label>
            {formData.personalityTraits.map((trait, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={trait}
                  onChange={(e) => handleTraitChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Например: веселый, добрый, энергичный"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addTrait}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              + Добавить черту характера
            </button>
          </div>

          <div>
            <label htmlFor="communicationStyle" className="block text-sm font-medium text-gray-700 mb-1">
              Стиль общения
            </label>
            <select
              id="communicationStyle"
              value={formData.communicationStyle}
              onChange={(e) => setFormData({ ...formData, communicationStyle: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="casual">Повседневный</option>
              <option value="formal">Формальный</option>
              <option value="funny">С юмором</option>
              <option value="poetic">Поэтический</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPerson;