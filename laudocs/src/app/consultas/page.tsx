"use client";
import React, { useState, useEffect } from "react";
import SelectPatient from "@/components/SelectPatient";
import ListPatients from "@/components/ListPatients";
import { CardConsultaInterface } from "@/interfaces/AllInterfaces";
import LoadingCard from "@/components/LoadingCard";
import ProtectedLayout from "@/components/ProtectedLayout";
import LogOutComponent from "@/components/LogOutButton";
import axios from "axios";
import { checkValidToken, getRole, getToken, isAdmin } from "@/utils/token";
import { useRouter } from "next/navigation";

function Consultas() {
  const router = useRouter();
  const [consultas, setConsultas] = useState<CardConsultaInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedConsulta, setSelectedConsulta] = useState<CardConsultaInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Função para buscar consultas
  const fetchConsultas = async () => {
    setIsLoading(true);
    try {
      const token = getToken();
      const response = await axios.get(`${baseURL}/api/v1/consultas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConsultas(response.data);
      setError(null);
    } catch (error: any) {
      setError("Erro ao buscar pacientes: " + error.message);
      console.error("Erro ao buscar pacientes:", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
      if(!checkValidToken())
        router.push('/');

      if (!isAdmin())
        router.push('/lista-de-pacientes');

    fetchConsultas();

    
    const eventSource = new EventSource("http://localhost:8080/sse/subscribe");

    // Evento de nova consulta recebida
    eventSource.addEventListener("consulta-adicionada", (event) => {
      console.log("Nova consulta recebida via SSE:", event.data);
      fetchConsultas();
    });
    eventSource.addEventListener('consulta-atualizada', (event) => {
      const consulta = JSON.parse(event.data);
      console.log('Consulta atualizada:', consulta);
      // Atualize a lista de consultas no frontend
      fetchConsultas(); // Chame o endpoint de listar consultas
  });
  
  // Escuta eventos de consulta removida
  eventSource.addEventListener('consulta-removida', (event) => {
      const consultaId = JSON.parse(event.data);
      console.log('Consulta removida:', consultaId);
      // Atualize a lista de consultas no frontend
      fetchConsultas(); // Chame o endpoint de listar consultas
  });
    return () => {
      eventSource.close();
    };
  }, [baseURL]);

  return (
    <div className="bg-gray-100 h-screen p-1">
      <div className="flex justify-end pr-6">
        <LogOutComponent />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 pr-5 pb-5 pl-5 pt-1 items-stretch h-full md:gap-0 gap-x-4">
        <div className="flex-1">
          {isLoading ? (
            <div className="bg-[#173D65] text-white flex flex-col p-2 rounded-l-lg h-[97%]">
              <h1 className="mt-4 mb-7 text-center text-2xl font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
                Fila de Espera
              </h1>
              <div className="overflow-y-auto flex-1 px-8 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </div>
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ListPatients arrayOfConsultas={consultas} onSelectConsulta={setSelectedConsulta} updateConsulta={setConsultas} />
          )}
        </div>
        <div className="flex h-[97%]">
          <SelectPatient selectedConsulta={selectedConsulta} removePatientSelected={() => setSelectedConsulta(null)} />
        </div>
      </div>
    </div>
  );
}

export default Consultas;
