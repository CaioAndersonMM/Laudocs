"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/utils/token";
import LogOutComponent from "@components/LogOutButton";
import { useRouter } from 'next/navigation';

interface UserProfile {
  nome: string;
  email: string;
  role: string;
}

interface Consulta {
  id: number;
  dataConsulta: string;
  medicoSolicitante: string;
  status: string;
}

const Perfil: React.FC = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getToken();
        const userId = localStorage.getItem('userId');
        
        const response = await axios.get(`${baseURL}/api/v1/usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (err) {
        console.error("Erro ao buscar perfil do usuário:", err);
      }
    };

    const fetchConsultas = async () => {
      try {
        const token = getToken();
        const userId = localStorage.getItem('userId');
        
        const response = await axios.get(`${baseURL}/api/v1/consultas/usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConsultas(response.data);
      } catch (err) {
        console.error("Erro ao buscar consultas do usuário:", err);
      }
    };

    fetchUserProfile();
    fetchConsultas();
  }, []);

  if (!userProfile) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="text-[#173D65] bg-white border border-[#173D65] rounded-md px-4 py-2 mb-4 hover:bg-[#173D65] hover:text-white transition duration-200"
        >
          Voltar
        </button>
        <div className="flex justify-end pr-6">
          <LogOutComponent />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center text-cyan-800 mb-4">
        Perfil do Usuário
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-cyan-900">Nome</label>
          <div className="mt-1 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold">
            {userProfile.nome}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-cyan-900">Email</label>
          <div className="mt-1 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold">
            {userProfile.email}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-cyan-900">Cargo</label>
          <div className="mt-1 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold">
            {userProfile.role}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-cyan-800 mb-4">
        Consultas
      </h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-cyan-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Data da Consulta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Médico Solicitante
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {consultas.map((consulta) => (
              <tr key={consulta.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700">{consulta.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {new Date(consulta.dataConsulta).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{consulta.medicoSolicitante}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{consulta.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Perfil;