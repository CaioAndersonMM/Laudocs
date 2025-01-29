"use client";

import SignUp from '@/components/SignUpPatient';
import React, { useState, useEffect } from 'react';
import ListPatients from '@/components/ListPatients';
import { CardConsultaInterface } from '@/interfaces/AllInterfaces';
import axios from 'axios';
import LoadingCard from '@/components/LoadingCard';
import LogOutComponent from '@/components/LogOutButton';
import ProtectedLayout from '@/components/ProtectedLayout';

export default function Home() {
  const [consultas, setConsultas] = useState<CardConsultaInterface[]>([]);
  const [selectedConsulta, setSelectedConsulta] = useState<CardConsultaInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const wsURL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws/consultas';

  useEffect(() => {
    fetchConsultas();
    const socket = new WebSocket(wsURL);

    socket.onopen = () => {
      console.log("Conectado ao WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Mensagem recebida via WebSocket:", data);

      if (data.action === "add") {
        setConsultas((prev) => [...prev, data.consulta]);
      } else if (data.action === "remove") {
        setConsultas((prev) => prev.filter((consulta) => consulta.id !== data.consulta.id));
      } else if (data.action === "update") {
        setConsultas((prev) => prev.map((c) => (c.id === data.consulta.id ? data.consulta : c)));
      }
    };

    socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket desconectado");
    };

    return () => {
      socket.close();
    };
  }, []);

  const fetchConsultas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/api/v1/consultas`);
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
    setConsultas((prevConsultas) => prevConsultas.filter((consulta) => consulta.id !== id));
  };

  const handleSelectConsulta = (consulta: CardConsultaInterface) => {
    setSelectedConsulta(consulta);
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
              <ListPatients arrayOfConsultas={consultas} onSelectConsulta={handleSelectConsulta} removeConsulta={removeConsulta} updateConsulta={fetchConsultas} />
            )}
          </div>
          <div className="flex h-[97%]">
            <SignUp addConsulta={addConsulta} />
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
