"use client"

import SignUp from '@/components/SigUp';
import React, { useState, useEffect } from 'react';
import ListPatients from '@/components/ListPatients';
import { CardPatientInterface } from '@/interfaces/CardPatientInterface';
import axios from 'axios';
import { QueryClientProvider } from '@tanstack/react-query';


export default function Home() {
  const [patients, setPatients] = useState<CardPatientInterface[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<CardPatientInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/pacientes');
        setPatients(response.data);
      } catch (err) {
        setError('Erro ao buscar pacientes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const addPatient = (patient: CardPatientInterface) => {
    setPatients((prevPatients) => [...prevPatients, patient]);
  };

  const removePatient = (id: string) => {
    setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
  };

  const handleSelectPatient = (patient: CardPatientInterface) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="bg-gray-100 h-screen p-1">
      <div className="grid grid-cols-1 md:grid-cols-2 p-5 items-stretch h-full md:gap-0 gap-x-4">

        <div className="flex-1">
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ListPatients arrayOfPatients={patients} onSelectPatient={handleSelectPatient} removePatient={removePatient} />
          )}
        </div>

        <div className="flex h-[97%]">
          <SignUp addPatient={addPatient} />
        </div>

      </div>
    </div>
  );
  
}
