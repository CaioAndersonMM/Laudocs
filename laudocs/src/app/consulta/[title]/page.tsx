"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import ProtectedLayout from '@/components/ProtectedLayout';
import Axila from '@/components/typeultrassom/Axila';
import Mamas from '@/components/typeultrassom/Mamas';
import FormUltrassom from '@/components/typeultrassom/FormUltrassom';

const TitlePage = () => {
    const { title } = useParams() as { title: string };
    const searchParams = useSearchParams();
    const router = useRouter();
    const [hasNodule, setHasNodule] = useState(false);
    const [noduleLocation, setNoduleLocation] = useState('');
    const [patient, setPatient] = useState('');
    const [age, setAge] = useState('');
    const [data, setData] = useState(new Date().toISOString().split('T')[0]);
    const [doctor, setDoctor] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (searchParams) {
            const patientName = searchParams.get('patientName');
            const patientAge = searchParams.get('patientAge');
            const solicitingDoctor = searchParams.get('doctor');

            if (patientName && patientAge && solicitingDoctor) {
                setPatient(`${patientName}`);
                setAge(`${patientAge}`);
                setDoctor(solicitingDoctor);
            } else {
                setError('Dados do paciente não encontrados. Redirecionando para consultas...');
                setShowModal(true);
                setTimeout(() => {
                    router.push('/consultas');
                }, 3000);
            }
        }
    }, [searchParams, router]);

    const renderQuestions = () => {
        const formType = title?.toLowerCase();
        return <FormUltrassom tipo={formType.charAt(0).toUpperCase() + formType.slice(1)} />;

        // Caso não encontre o tipo de formulário, exibe mensagem de erro, mas nunca vai acontecer
        // return <h2 className="text-xl font-bold">Nenhuma pergunta disponível para esta consulta.</h2>;
    };

    return (
        <ProtectedLayout>
            <div className="bg-gray-100 h-screen p-6 rounded-lg">
                <div className='text-[#173D65] border border-black rounded-md bg-white p-4'>
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-md shadow-md">
                                <h2 className="text-xl font-bold mb-4">Erro</h2>
                                <p>{error}</p>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="mt-4 px-4 py-2 bg-red-600 text-white font-bold rounded-md shadow-lg hover:bg-red-700 transition duration-300 ease-in-out"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    )}
                    {renderQuestions()}
                </div>
            </div>
        </ProtectedLayout>
    );
};

export default TitlePage;