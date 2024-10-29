'use client';
import React, { useState, useEffect } from 'react';
import SelectPatient from '@/components/SelectPatient';
import ListPatients from '@/components/ListPatients';
import { CardPatientInterface } from '@/interfaces/CardPatientInterface';
import { database } from '../../../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Home() {
  const [patients, setPatients] = useState<CardPatientInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<CardPatientInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const pacientesRef = collection(database, 'pacientes');

    const unsubscribe = onSnapshot(pacientesRef, (snapshot) => {
      const pacientesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CardPatientInterface[];
      setPatients(pacientesData);
      setError(null);
    }, (error) => {
      setError('Erro ao escutar pacientes: ' + error.message);
      console.error('Erro ao escutar pacientes:', error);
    });
    return () => unsubscribe();
  }, []);

  const handleSelectPatient = (patient: CardPatientInterface) => {
    setSelectedPatient(patient);
  };

  const removePatientSelected = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="bg-gray-100 h-screen p-1">
      {isLoading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 p-5 items-stretch h-full md:gap-0 gap-x-4">
        <div className="flex-1">
          <ListPatients arrayOfPatients={patients} onSelectPatient={handleSelectPatient} />
        </div>
        <div className="flex h-[97%]">
          <SelectPatient selectedPatient={selectedPatient} removePatientSelected={removePatientSelected} />
        </div>
      </div>
    </div>
  );
}
