'use client'
import SelectPatient from '@/components/SelectPatient';
import React, { useState } from 'react';
import ListPatients from '@/components/ListPatients';
import { CardPatientInterface } from '@/interfaces/CardPatientInterface';

const patients: CardPatientInterface[] = [
  { id: 1, name: 'João Paulo da Silva Souza', age: 23, solicitingDoctor: 'Dr. Silva' },
  { id: 2, name: 'Maria da Costa Silva Pereira', age: 45, solicitingDoctor: 'Dr. Santos' },
  { id: 3, name: 'José Armando de Souza', age: 33, solicitingDoctor: 'Dr. Oliveira' },
  { id: 4, name: 'Ana Maria dos Santos', age: 19, solicitingDoctor: 'Dr. Costa' },
  { id: 5, name: 'Carlos Alberto Vieira Costa', age: 67, solicitingDoctor: 'Dr. Pereira' },
  { id: 6, name: 'Paula Eliza Martins dos Santos', age: 25, solicitingDoctor: 'Dr. Almeida' },
  { id: 7, name: 'Pedro Pereira Santiago Filho', age: 50, solicitingDoctor: 'Dr. Ferreira' },
  { id: 8, name: 'Mariana Karla Pinheiro', age: 37, solicitingDoctor: 'Dr. Lima' },
];

export default function Home() {

    const [selectedPatient, setSelectedPatient] = useState<CardPatientInterface | null>(null);

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
              <SelectPatient selectedPatient={selectedPatient} />
            </div>
    
          </div>
        </div>
      );
    }