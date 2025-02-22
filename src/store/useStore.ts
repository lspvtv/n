import { create } from 'zustand';
import { Person, User } from '../types';

interface Store {
  user: User | null;
  people: Person[];
  setUser: (user: User | null) => void;
  setPeople: (people: Person[]) => void;
  addPerson: (person: Person) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  people: [],
  setUser: (user) => set({ user }),
  setPeople: (people) => set({ people }),
  addPerson: (person) => set((state) => ({ people: [...state.people, person] })),
}));