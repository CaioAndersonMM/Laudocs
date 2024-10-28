'use client';
import SelectPatient from '@/components/SelectPatient';
import React, { useState, useEffect } from 'react';
import ListPatients from '@/components/ListPatients';
import { CardPatientInterface } from '@/interfaces/CardPatientInterface';
import axios from 'axios';

export default function Home() {
  const [patients, setPatients] = useState<CardPatientInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<CardPatientInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const fetchPatients = async () => {
    try {
      setIsLoading(true); 
      const response = await axios.get('/api/pacientes');
      setPatients(response.data); 
      setError(null);
    } catch (err) {
      setError('Erro ao buscar pacientes');
      console.error(err);
    } finally {
      setIsLoading(false); 
    }
  };

 
  useEffect(() => {
   
    fetchPatients();

    const intervalId = setInterval(fetchPatients, 20000);

    
    return () => clearInterval(intervalId);
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
      
     
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 items-stretch h-full md:gap-0 gap-x-4">
          <div className="flex-1">
            <ListPatients arrayOfPatients={patients} onSelectPatient={handleSelectPatient} />
          </div>
          <div className="flex h-[97%]">
            <SelectPatient selectedPatient={selectedPatient} removePatientSelected={removePatientSelected} />
          </div>
        </div>
      )}
    </div>
  );
}
