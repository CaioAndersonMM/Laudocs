"use client";
import React, { useState, useEffect } from 'react';
import SelectPatient from '@/components/SelectPatient';
import ListPatients from '@/components/ListPatients';
import { CardConsultaInterface } from '@/interfaces/AllInterfaces';
import { database } from '../../../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import LoadingCard from '@/components/LoadingCard';
import ProtectedLayout from '@/components/ProtectedLayout';
import LogOutComponent from '@/components/LogOutButton';
import axios from 'axios';

function Consultas() {
  const [consultas, setConsultas] = useState<CardConsultaInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedConsulta, setSelectedConsulta] = useState<CardConsultaInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    setIsLoading(true);
    const fetchConsultas = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/v1/consultas`);
        setConsultas(response.data);
        setError(null);
      } catch (error: any) {
        setError('Erro ao escutar pacientes: ' + error.message);
        console.error('Erro ao escutar pacientes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultas();
  }, [baseURL]);

  const handleSelectConsulta = (consulta: CardConsultaInterface) => {
    setSelectedConsulta(consulta);
  };

  const removePatientSelected = () => {
    setSelectedConsulta(null);
  };

  const updateConsulta = (updatedConsulta: CardConsultaInterface[]) => {
    setConsultas(updatedConsulta);
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
            <ListPatients arrayOfConsultas={consultas} onSelectConsulta={handleSelectConsulta} updateConsulta={updateConsulta}/>
          )}
        </div>
        <div className="flex h-[97%]">
          <SelectPatient selectedConsulta={selectedConsulta} removePatientSelected={removePatientSelected} />
        </div>
      </div>
    </div>
    </ProtectedLayout>
  );
}

export default Consultas;
