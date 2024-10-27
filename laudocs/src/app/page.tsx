'use client'
import SignUp from '@/components/SigUp';
import React, { useState } from 'react';
import ListPatients from '@/components/ListPatients';
import { CardPatientInterface } from '@/interfaces/CardPatientInterface';

const patients: CardPatientInterface[] = [
  { id: 1, name: 'João Paulo da Silva Souza', age: 23, solicitingDoctor: 'Dr. Silva' },
  { id: 2, name: 'Maria da Costa Silva Pereira', age: 45, solicitingDoctor: 'Dr. Santos' },
  { id: 3, name: 'José Armando de Souza', age: 33, solicitingDoctor: 'Dr. Oliveira' },
  { id: 4, name: 'Ana Maria dos Santos', age: 19, solicitingDoctor: 'Dr. Costa' },
];

export default function Home() {

  const [patients, setPatients] = useState<CardPatientInterface[]>([
    { id: 1, name: 'João Paulo da Silva Souza', age: 23, solicitingDoctor: 'Dr. Silva' },
    { id: 2, name: 'Maria da Costa Silva Pereira', age: 45, solicitingDoctor: 'Dr. Santos' },
    { id: 3, name: 'José Armando de Souza', age: 33, solicitingDoctor: 'Dr. Oliveira' },
    { id: 4, name: 'Ana Maria dos Santos', age: 19, solicitingDoctor: 'Dr. Costa' },
  ]);

  const [selectedPatient, setSelectedPatient] = useState<CardPatientInterface | null>(null);

  const addPatient = (patient: CardPatientInterface) => {
    setPatients((prevPatients) => [...prevPatients, patient]);
  };

  const handleSelectPatient = (patient: CardPatientInterface) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="bg-gray-100 h-screen p-1">
      <div className="grid grid-cols-1 md:grid-cols-2 p-5 items-stretch h-full md:gap-0 gap-x-4">

        <div className="flex-1">
          <ListPatients arrayOfPatients={patients} onSelectPatient={handleSelectPatient} />
        </div>

        <div className="flex h-[97%]">
          <SignUp addPatient={addPatient} /> {/* Passando a função */}  
        </div>

      </div>
    </div>
  );
}
