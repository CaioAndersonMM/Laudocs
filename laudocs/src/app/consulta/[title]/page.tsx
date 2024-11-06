"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import ProtectedLayout from '@/components/ProtectedLayout';
import FormUltrassom from '@/components/typeultrassom/FormUltrassom';
import ModalErro from '@/components/ModalErro';

const TitlePage = () => {
    const { title } = useParams() as { title: string };
    const searchParams = useSearchParams();
    const router = useRouter();
    const [patient, setPatient] = useState('');
    const [age, setAge] = useState('');
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
        return <FormUltrassom tipo={formType.charAt(0).toUpperCase() + formType.slice(1)} patientName={patient} patientAge={age} solicitingDoctor={doctor} />;
    };

    return (
        <ProtectedLayout>
            <div className="bg-gray-100 h-screen p-6 rounded-lg">
                <div className='text-[#173D65] border border-black rounded-md bg-white p-4'>
                    {showModal && (
                        <ModalErro 
                            errorMessage={error}
                            onClose={() => setShowModal(false)} open={showModal}                        />
                    )}
                    {renderQuestions()}
                </div>
            </div>
        </ProtectedLayout>
    );
};

export default TitlePage;
