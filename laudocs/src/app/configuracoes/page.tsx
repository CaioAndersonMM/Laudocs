"use client";

import { useState } from "react";
import axios from "axios";
import LogOutComponent from "@components/LogOutButton";
import { useRouter } from 'next/navigation';
import { getToken } from "@/utils/token";

const Configuracoes: React.FC = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [tiposFile, setTiposFile] = useState<File | null>(null);
  const [perguntasFile, setPerguntasFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState<string>('#173D65');
const [secondaryColor, setSecondaryColor] = useState<string>('#E0FFFF');
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!tiposFile || !perguntasFile) {
      setUploadMessage("Por favor, selecione ambos os arquivos.");
      return;
    }

    const formData = new FormData();
    formData.append("tiposFile", tiposFile);
    formData.append("perguntasFile", perguntasFile);

    try {
      const token = getToken();
      const response = await axios.post(`${baseURL}/api/v1/configuracoes/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setUploadMessage("Arquivos enviados com sucesso!");
      } else {
        setUploadMessage("Erro ao enviar os arquivos.");
      }
    } catch (error) {
      console.error("Erro ao enviar os arquivos:", error);
      setUploadMessage("Erro ao enviar os arquivos.");
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryColor(e.target.value);
    document.documentElement.style.setProperty('--primary-color', e.target.value);
  };

  const handleSecondaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondaryColor(e.target.value);
    document.documentElement.style.setProperty('--secondary-color', e.target.value);
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
        Configurações do Sistema
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-cyan-900">Tipos e Subtipos de Consultas</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setTiposFile)}
            className="mt-1 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-cyan-900">Perguntas das Consultas</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setPerguntasFile)}
            className="mt-1 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold w-full"
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-cyan-900">Cor Primária</label>
            <input
              type="color"
              value={primaryColor}
              onChange={handleColorChange}
              className="mt-1 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold w-10 h-9"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-cyan-900">Cor Secundária</label>
            <input
              type="color"
              value={secondaryColor}
              onChange={handleSecondaryColorChange}
              className="mt-1 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold w-10 h-9"
            />
          </div>
        </div>
        </div>
       
        {uploadMessage && <p className="text-red-600 font-bold text-lg mb-5">{uploadMessage}</p>}
        <button
          onClick={handleUpload}
          className="bg-[#173D65] text-white font-bold text-2xl rounded-md p-2 py-4 px-4 w-full"
        >
          Enviar Arquivos
        </button>
      </div>
  );
};

export default Configuracoes;