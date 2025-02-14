"use client";

import { getToken } from "@/utils/token";
import LogOutComponent from "@components/LogOutButton";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

interface Paciente {
  id: number;
  nomePaciente: string;
  dataConsulta: string;
  medicoSolicitante: string;
  status: string;
  laudosIds: number;
}

const HistoricoPacientes: React.FC = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const pacientesPorPagina = 10;

  useEffect(() => {

    const fetchPacientes = async () => {
        try {
          const token = getToken();
          const response = await axios.get(`${baseURL}/api/v1/consultas/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          const data = response.data;
          data.sort((a: Paciente, b: Paciente) => new Date(b.dataConsulta).getTime() - new Date(a.dataConsulta).getTime());

          setPacientes(data);
          setTotalPaginas(Math.ceil(data.length / pacientesPorPagina));
        } catch (err) {
        //   setError('Erro ao buscar pacientes');
          console.error(err);
        } finally {
        //   setLoading(false);
        }
      };

    fetchPacientes();
  }, []);

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const handleProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const indiceInicial = (paginaAtual - 1) * pacientesPorPagina;
  const indiceFinal = indiceInicial + pacientesPorPagina;
  const pacientesPaginaAtual = pacientes.slice(indiceInicial, indiceFinal);

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
        Histórico de Pacientes
      </h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-cyan-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nome
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
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Laudos
                </th>

            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pacientesPaginaAtual.map((paciente) => (
              <tr key={paciente.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700">{paciente.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{paciente.nomePaciente}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {paciente.dataConsulta}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{paciente.medicoSolicitante}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{paciente.status}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{paciente.laudosIds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={handlePaginaAnterior}
          disabled={paginaAtual === 1}
          className={`px-4 py-2 text-sm font-medium text-white ${
            paginaAtual === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } rounded-md transition-colors`}
        >
          Página Anterior
        </button>
        <span className="text-sm text-gray-700">
          Página {paginaAtual} de {totalPaginas}
        </span>
        <button
          onClick={handleProximaPagina}
          disabled={paginaAtual === totalPaginas}
          className={`px-4 py-2 text-sm font-medium text-white ${
            paginaAtual === totalPaginas
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } rounded-md transition-colors`}
        >
          Próxima Página
        </button>
      </div>
    </div>
  );
};

export default HistoricoPacientes;