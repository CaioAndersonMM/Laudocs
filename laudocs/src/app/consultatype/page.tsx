"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import { consultations, optionsMap } from '@/utils/consultations'; // Importando as constantes
import ConsultationCard from '@/components/ConsultationCard';
import { useRouter } from 'next/navigation';


const ConsultaPage = () => {
    const router = useRouter();

    const handleVoltar = () => {
        router.push('/consultas');
    };


    const searchParams = useSearchParams();
    const consulta = searchParams ? searchParams.get('consultation') as keyof typeof optionsMap | null : null;
    const patientId = searchParams ? searchParams.get('patientId') : null;
    const patientName = searchParams ? searchParams.get('patientName') : null;
    const patientAge = searchParams ? searchParams.get('patientAge') : null;
    const solicitingDoctor = searchParams ? searchParams.get('doctor') : null;

    const handleCardClick = (title: string) => {

        router.push(`/consulta/${title}?patientId=${patientId}&patientName=${patientName}&patientAge=${patientAge}&doctor=${solicitingDoctor}`);


    };

    const renderOptions = () => {
        const selectedOptions = consulta ? optionsMap[consulta] || [] : [];

        return selectedOptions.map((option: { title: string; options: string; }) => (
            <ConsultationCard
                title={option.title}
                options={option.options}
                onClick={() => handleCardClick(option.title)}
                key={option.title}
            />
        ));
    };

    return (
        <div className="bg-gray-100 h-screen p-6 rounded-lg">
            <div className='text-[#173D65] border border-black rounded-md bg-white h-full'>
                <div className="relative "> {/* Contêiner com posição relativa */}
                    <button onClick={handleVoltar}

                        className="absolute left-12 top-4 px-4 py-2 bg-cyan-800 text-white font-bold rounded-md shadow-lg hover:bg-cyan-700 transition duration-300 ease-in-out">
                        Voltar
                    </button>

                    <div className='text-center mt-6 jus'>
                        <div className="flex items-center justify-center mb-1">
                            <img src="/assets/patientIcon.svg" alt="Ícone Médico" className="w-6 h-6" />
                            <h3 className="ml-4 text-2xl font-bold">{patientName}, {patientAge} anos</h3>
                        </div>

                        <div className="flex items-center justify-center mb-2"> {/* Consertar aqui */}
                            <img src="/assets/medicIcon.svg" alt="Ícone Hospital" className="w-6 h-6" />
                            <p className="ml-4 text-2xl font-bold">Médico Solicitante: {solicitingDoctor}</p>
                        </div>

                        <hr className='border-1 border-cyan-800 mt-7' />
                    </div>
                </div>
                <h1 className='text-2xl mt-4 ml-8'>Selecione uma opção da categoria {consulta}:</h1>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: 2 }}> {/* Flexbox para cartões lado a lado */}
                    {renderOptions()}
                </Box>
            </div>
        </div>
    );
};

export default ConsultaPage;
