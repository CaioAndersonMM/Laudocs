'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { optionsMap } from '@/utils/consultations';
import ConsultationCard from '@/components/ConsultationCard';
import Image from 'next/image';
import ModalErro from '@/components/ModalErro';

const ConsultaPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const consulta = searchParams ? searchParams.get('consultation') as keyof typeof optionsMap | null : null;
    const patientId = searchParams ? searchParams.get('patientId') : null;
    const patientName = searchParams ? searchParams.get('patientName') : null;
    const patientAge = searchParams ? searchParams.get('patientAge') : null;
    const solicitingDoctor = searchParams ? searchParams.get('doctor') : null;

    useEffect(() => {
        if (!consulta || !patientId || !patientName || !patientAge || !solicitingDoctor) {
            setError('Dados do paciente não encontrados. Redirecionando para consultas...');
            setShowModal(true);
            setTimeout(() => {
                router.push('/consultas');
            }, 3000);
        }
    }, [consulta, patientId, patientName, patientAge, solicitingDoctor, router]);

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
            <><div className="bg-gray-100 min-h-screen p-4 md:p-6 rounded-lg">
            <div className='text-[#173D65] border border-black rounded-md bg-white h-full'>
                <div className="relative flex flex-col items-center">
                    <button
                        onClick={() => router.back()}
                        className="absolute left-4 top-4 px-4 py-2 text-[#173D65] bg-white border border-[#173D65] rounded-md mb-4 hover:bg-[#173D65] hover:text-white transition duration-200 md:left-12 md:top-6"
                    >
                        Voltar
                    </button>

                    <div className='text-center mt-20 md:mt-6'>
                        <div className="flex items-center justify-center mb-1">
                            <Image src="/assets/patientIcon.svg" alt="Ícone Médico" width={24} height={24} />
                            <h3 className="ml-4 text-xl font-bold md:text-2xl">{patientName}, {patientAge} anos</h3>
                        </div>

                        <div className="flex items-center justify-center mb-2">
                            <Image src="/assets/medicIcon.svg" alt="Ícone Hospital" width={24} height={24} />
                            <p className="ml-4 text-lg font-bold md:text-2xl">Médico Solicitante: {solicitingDoctor}</p>
                        </div>

                    </div>
                    <hr className='border-1 border-cyan-800 mt-7 w-full' />

                </div>
                <h1 className='text-xl mt-4 ml-4 md:text-2xl md:ml-8'>Selecione uma opção da categoria {consulta}:</h1>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: 2, justifyContent: 'center' }}>
                    {renderOptions()}
                </Box>
            </div>
        </div><ModalErro open={showModal} errorMessage={error} onClose={() => setShowModal(false)} /></>
    );
};

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ConsultaPage />
        </Suspense>
    );
}
