"use client";
import React, { useState, useEffect } from 'react';
import SelectPatient from '@/components/SelectPatient';
import ListPatients from '@/components/ListPatients';
import { CardPatientInterface } from '@/interfaces/AllInterfaces';
import { database } from '../../../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import LoadingCard from '@/components/LoadingCard';
import ProtectedLayout from '@/components/ProtectedLayout';
import LogOutComponent from '@/components/LogOutButton';

function Consultas() {
  const [patients, setPatients] = useState<CardPatientInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<CardPatientInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const pacientesRef = collection(database, 'pacientes');

    setIsLoading(true);

    const unsubscribe = onSnapshot(pacientesRef, (snapshot) => {
      const pacientesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CardPatientInterface[];
      setPatients(pacientesData);
      setError(null);
      setIsLoading(false);
    }, (error) => {
      setError('Erro ao escutar pacientes: ' + error.message);
      console.error('Erro ao escutar pacientes:', error);
      setIsLoading(false);
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
     <ProtectedLayout>
    <div className="bg-gray-100 h-screen p-1">
    <div className="flex justify-end pr-6">
        <LogOutComponent />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 pr-5 pb-5 pl-5 pt-1 items-stretch h-full md:gap-0 gap-x-4">
      <div className="flex-1">
          {isLoading ? (
            <div className="bg-[#173D65] text-white flex flex-col p-2 rounded-l-lg h-[97%]">
              <h1 className="mt-4 mb-7 text-center text-2xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Fila de Espera</h1>

              <div className="overflow-y-auto flex-1 px-8 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </div>
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ListPatients arrayOfPatients={patients} onSelectPatient={handleSelectPatient} />
          )}
        </div>
        <div className="flex h-[97%]">
          <SelectPatient selectedPatient={selectedPatient} removePatientSelected={removePatientSelected} />
        </div>
      </div>
    </div>
    </ProtectedLayout>
  );
}

export default Consultas;
