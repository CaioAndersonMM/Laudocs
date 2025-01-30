"use client"

import SignUp from '@/components/SignUpPatient';
import React, { useState, useEffect } from 'react';
import ListPatients from '@/components/ListPatients';
import { CardConsultaInterface } from '@/interfaces/AllInterfaces';
import axios from 'axios';
import LoadingCard from '@/components/LoadingCard';
import LogOutComponent from '@/components/LogOutButton';
import { useRouter } from 'next/navigation';
import { checkValidToken, getRole, getToken } from '@/utils/token';

export default function Home() {
  const router = useRouter();
  const [consultas, setConsultas] = useState<CardConsultaInterface[]>([]);
  const [selectedConsulta, setSelectedConsulta] = useState<CardConsultaInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

 useEffect(() => {
    if(!checkValidToken())
      router.push('/');

    fetchConsultas(); 
    
    const eventSource = new EventSource("http://localhost:8080/sse/subscribe");


    eventSource.addEventListener("consulta-adicionada", (event) => {
      console.log("Nova consulta recebida via SSE:", event.data);
      fetchConsultas();
    });
    eventSource.addEventListener('consulta-atualizada', (event) => {
      const consulta = JSON.parse(event.data);
      console.log('Consulta atualizada:', consulta);
    
      fetchConsultas(); 
   });
   
   
   eventSource.addEventListener('consulta-removida', (event) => {
       const consultaId = JSON.parse(event.data);
       console.log('Consulta removida:', consultaId);
       fetchConsultas();
   });
     return () => {
       eventSource.close();
     };
   }, [baseURL]);

  const fetchConsultas = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await axios.get(`${baseURL}/api/v1/consultas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConsultas(response.data);
    } catch (err) {
      setError('Erro ao buscar pacientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const addConsulta = (consulta: CardConsultaInterface) => {
    setConsultas((prevConsultas) => [...prevConsultas, consulta]);
  };

  const removeConsulta = (id: number) => {
    setConsultas((prevConsultas) => prevConsultas.filter((consulta) => consulta.id!== id));
  };

  const handleSelectConsulta = (consulta: CardConsultaInterface) => {
    setSelectedConsulta(consulta);
  };

  return (
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
            <ListPatients arrayOfConsultas={consultas} onSelectConsulta={handleSelectConsulta} removeConsulta={removeConsulta}  updateConsulta={fetchConsultas} />
          )}
        </div>

        <div className="flex h-[97%]">
          <SignUp addConsulta={addConsulta} />
        </div>

      </div>
    </div>
  );
}