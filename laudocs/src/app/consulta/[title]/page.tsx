'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import FormUltrassom from '@/components/typeultrassom/FormUltrassom';
import ModalErro from '@/components/ModalErro';

const TitlePage = () => {
    const router = useRouter();
    const [tipo, setTipo] = useState('');
    const [patient, setPatient] = useState('');
    const [patientId, setPatientId] = useState('');
    const [age, setAge] = useState('');
    const [doctor, setDoctor] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const urlParams = new URLSearchParams(window.location.search);
            const path = window.location.pathname;
            const tipo = path.split('/')[2];
            const patientId = urlParams.get('patientId');
            const patientName = urlParams.get('patientName');
            const patientAge = urlParams.get('patientAge');
            const solicitingDoctor = urlParams.get('doctor');

            if (patientId && patientName && patientAge && solicitingDoctor && tipo) {
                setPatientId(patientId);
                setPatient(patientName);
                setAge(patientAge);
                setDoctor(solicitingDoctor);
                setTipo(tipo);
            } else {
                setError('Dados do paciente não encontrados. Redirecionando para consultas...');
                setShowModal(true);
                setTimeout(() => {
                    router.push('/consultas');
                }, 3000);
            }
        }
    }, [isClient, router]);

    const renderQuestions = () => {
        return (
            <FormUltrassom
                patientId={patientId} //é o id da consulta
                tipo={tipo}
                patientName={patient}
                patientAge={age}
                solicitingDoctor={doctor}
            />
        );
    };

    return (
            <div className="bg-gray-100 h-screen p-6 rounded-lg">
            <button
                    onClick={() => router.back()}
                    className="text-[#173D65] bg-white border border-[#173D65] rounded-md px-4 py-2 mb-4 hover:bg-[#173D65] hover:text-white transition duration-200"
                >
                    Voltar
                </button>
                <div className="text-[#173D65] border border-black rounded-md bg-white p-4">
                    {showModal && (
                        <ModalErro
                            errorMessage={error}
                            onClose={() => setShowModal(false)}
                            open={showModal}
                        />
                    )}
                    <Suspense fallback={<div>Carregando...</div>}>
                        {renderQuestions()}
                    </Suspense>
                </div>
            </div>
    );
};

export default TitlePage;
