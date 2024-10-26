// app/page.tsx
import CardPatient from '../components/CardPatient';
import SignUp from '@/components/SigUp';
import React from 'react';
import ListPatients from '@/components/ListPatients';
import { CardPatientInterface } from '@/interfaces/CardPatientInterface';

const patients: CardPatientInterface[] = [
  { id: 1, name: 'João', age: 23, solicitingDoctor: 'Dr. Silva' },
  { id: 2, name: 'Maria', age: 45, solicitingDoctor: 'Dr. Santos' },
  { id: 3, name: 'José', age: 33, solicitingDoctor: 'Dr. Oliveira' },
  { id: 4, name: 'Ana', age: 19, solicitingDoctor: 'Dr. Costa' },
  { id: 5, name: 'Carlos', age: 67, solicitingDoctor: 'Dr. Pereira' },
  { id: 6, name: 'Paula', age: 25, solicitingDoctor: 'Dr. Almeida' },
  { id: 7, name: 'Pedro', age: 50, solicitingDoctor: 'Dr. Ferreira' },
  { id: 8, name: 'Mariana', age: 37, solicitingDoctor: 'Dr. Lima' },
];

export default function Home() {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 p-5 items-stretch h-full md:gap-0 gap-x-4">
      
        <div>
          <ListPatients arrayOfPatients = {patients} />
        </div>
 
        <div className="flex h-full">
          <SignUp />
        </div>

      </div>
    </div>
  );
}
