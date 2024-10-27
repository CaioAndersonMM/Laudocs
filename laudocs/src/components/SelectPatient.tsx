"use client"

import { CardPatientInterface } from '@/interfaces/CardPatientInterface';
import ListTypeConsult from './ListTypeConsult';

interface SelectPatientProps {
    selectedPatient: CardPatientInterface | null;
    removePatientSelected: () => void;
}

export default function SelectPatient({ selectedPatient, removePatientSelected }: SelectPatientProps) {
    return (
        <div className="bg-white flex flex-col justify-between h-full w-full p-4 text-[#173D65] font-bold rounded-r-lg border border-[#173D65]">
            {/* Condição para mostrar o título ou as informações do paciente */}
            {selectedPatient ? (
                <div className='text-left'>
                    <div className="flex items-center justify-between mb-1">

                        <div className='flex items-center ml-2'>
                            <img src="/assets/patientIcon.svg" alt="Icone Médico" className="w-6 h-6 mr-2" />
                            <h3 className=" ml-4 text-2xl font-extrabold">{selectedPatient.name}, {selectedPatient.age} anos</h3>
                        </div>
                        <button className="w-10 h-7 rounded-md bg-[#15AAAA] text-white flex items-center justify-center" onClick={removePatientSelected}>
                            <span className="text-xs font-bold">X</span>
                        </button>
                    </div>

                    <div className='flex items-center ml-2 mt-3'>

                        <img src="/assets/medicIcon.svg" alt="Icone Hospital" className="w-6 h-6 mr-2" />
                        <p className="text-left">Solicitante: {selectedPatient.solicitingDoctor}</p>
                        <hr className='border-1 border-cyan-800 mt-3' />
                    </div>
                    <hr className='border-1 border-cyan-800 mt-7' />

                    <h1 className='text-2xl mt-4'>Clique em uma opção para iniciar a consulta:</h1>
                    <ListTypeConsult patientId={selectedPatient.id}></ListTypeConsult>



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