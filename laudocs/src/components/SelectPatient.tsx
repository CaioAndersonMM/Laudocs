"use client"

import { CardPatientInterface } from '@/interfaces/CardPatientInterface';

interface SelectPatientProps {
    selectedPatient: CardPatientInterface | null;
}

export default function SelectPatient({ selectedPatient }: SelectPatientProps) {
    return (
        <div className="bg-white flex flex-col justify-between h-full w-full p-4 text-[#173D65] font-bold rounded-r-lg border border-[#173D65]">
            {/* Condição para mostrar o título ou as informações do paciente */}
            {selectedPatient ? (
                <div className='text-left'>
                    <div className='flex items-center ml-2'>
                        <img src="/assets/patientIcon.svg" alt="Icone Médico" className="w-6 h-6 mr-2" />
                        <h3 className=" ml-4 text-2xl font-extrabold">{selectedPatient.name}, {selectedPatient.age}</h3>
                    </div>
                    <div className='flex items-center ml-2 mt-3'>

                        <img src="/assets/medicIcon.svg" alt="Icone Hospital" className="w-6 h-6 mr-2" />
                        <p className="text-left">Solicitante: {selectedPatient.solicitingDoctor}</p>
                        <hr className='border-1 border-cyan-800 mt-3' />
                    </div>
                    <hr className='border-1 border-cyan-800 mt-7'/>
                </div>
            ) : (
                <h1 className="mt-4 mb-7 text-center text-2xl font-extrabold" style={{ fontFamily: 'Inter, sans-serif' }}>Selecione o Paciente</h1>
            )}
            <div className="flex flex-col space-y-4 text-left flex-grow p-4">
                {/* Exibindo mensagem quando nenhum paciente está selecionado */}
                {!selectedPatient && <p>Clique em algum paciente do menu a esquerda.</p>}
            </div>
        </div>
    );
}