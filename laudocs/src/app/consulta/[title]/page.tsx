'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedLayout from '@/components/ProtectedLayout';
import FormUltrassom from '@/components/typeultrassom/FormUltrassom';
import ModalErro from '@/components/ModalErro';

const TitlePage = () => {
    const router = useRouter();
    const [patient, setPatient] = useState('');
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

            const patientName = urlParams.get('patientName');
            const patientAge = urlParams.get('patientAge');
            const solicitingDoctor = urlParams.get('doctor');

            if (patientName && patientAge && solicitingDoctor) {
                setPatient(patientName);
                setAge(patientAge);
                setDoctor(solicitingDoctor);
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
                tipo="Ultrassom"
                patientName={patient}
                patientAge={age}
                solicitingDoctor={doctor}
            />
        );
    };

    return (
        <ProtectedLayout>
            <div className="bg-gray-100 h-screen p-6 rounded-lg">
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
        </ProtectedLayout>
    );
};

export default TitlePage;
