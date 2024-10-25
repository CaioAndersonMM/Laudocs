// app/page.tsx
import CardPatient from '../components/CardPatient';
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F2F3]">

      <div className="bg-[#173D65] text-white p-2 flex-1 text-center font-bold h-full ml-10">
        <h1 className='mb-7'>Fila de Espera</h1>
        <CardPatient></CardPatient>
        <CardPatient></CardPatient>
      </div>
      <div className="bg-white flex-1 text-center p-2 text-[#173D65] font-bold">
        <h1 className='mb-7 text-lg'>Adicionar Paciente na Fila</h1>

        <div className="flex flex-col space-y-4 text-left">
          <div>
            <label htmlFor="name" className="block text-lg font-bold text-[#173D65]">Nome Completo</label>
            <input type="text" id="name" className="mt-1 block w-full p-2 border border-[#173D65] rounded-md h-14" />
          </div>
          <div>
            <label htmlFor="age" className="block text-lg font-bold text-[#173D65]">Idade</label>
            <input type="number" id="age" className="mt-1 block w-full p-2 border border-[#173D65] rounded-md h-14" />
          </div>
          <div>
            <label htmlFor="condition" className="block text-lg font-bold text-[#173D65]">Médico Solicitante</label>
            <input type="text" id="condition" className="mt-1 block w-full p-2 border border-[#173D65] rounded-md h-14" />
          </div>
        </div>
      </div>

    </div>

  );
}
