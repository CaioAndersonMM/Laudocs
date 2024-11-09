"use client"

import SignUp from '@/components/SignUpPatient';
import React, { useState, useEffect } from 'react';
import ListPatients from '@/components/ListPatients';
import { CardPatientInterface } from '@/interfaces/AllInterfaces';
import axios from 'axios';
import LoadingCard from '@/components/LoadingCard';
import LogOutComponent from '@/components/LogOutButton';
import ProtectedLayout from '@/components/ProtectedLayout';

export default function Home() {
  const [patients, setPatients] = useState<CardPatientInterface[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPatient, setSelectedPatient] = useState<CardPatientInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

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
    <ProtectedLayout>
    <div className="bg-gray-100 h-screen p-1">
    <div className="flex justify-end pr-6">
        <LogOutComponent />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 pr-5 pb-5 pl-5 pt-1 items-stretch h-full md:gap-0 gap-x-4">

        <div className="flex-1">
          {loading ? (
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
            <ListPatients arrayOfPatients={patients} onSelectPatient={handleSelectPatient} removePatient={removePatient}  updatePatients={fetchPatients} />
          )}
        </div>

        <div className="flex h-[97%]">
          <SignUp addPatient={addPatient} />
        </div>

      </div>
    </div>
    </ProtectedLayout>
  );
}