"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import ProtectedLayout from '@/components/ProtectedLayout';
import Axila from '@/components/typeultrassom/Axila';
import Mamas from '@/components/typeultrassom/Mamas';

const TitlePage = () => {
    const { title } = useParams() as { title: string }; // Captura o parâmetro da rota
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

    // Obter informações do paciente dos parâmetros da URL
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
                setShowModal(true); // Exibe o modal de erro
                setTimeout(() => {
                    router.push('/consultas'); // Redireciona para /consultas se os dados não estiverem presentes
                }, 3000); // Redireciona após 3 segundos
            }
        }
    }, [searchParams, router]);

    // Envio do form
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const substituicoes = {
            typeUltrassom: title,
            patient,
            age,
            data,
            doctor,
            noduledireita: noduleLocation === 'direita' || noduleLocation === 'ambas' ? 'Nódulo encontrado na axila direita' : '',
            noduleesquerda: noduleLocation === 'esquerda' || noduleLocation === 'ambas' ? 'Nódulo encontrado na axila esquerda' : '',
            conclusao: 'Conclusão do exame, sem alterações significativas.'
        };

        try {
            const response = await fetch('/api/gerar-doc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ substituicoes })
            });
        
            if (!response.ok) {
                const errorData = await response.json(); // Captura o JSON de erro retornado
                throw new Error(`Erro: ${errorData.message}`);
            }
        
            const data = await response.json();
            alert(data.message); // Exibe a mensagem de sucesso
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
            alert("Erro ao gerar o documento: " + (error as Error).message);
        }
    };

    const renderQuestions = () => {
        switch (typeof title === 'string' ? title.toLowerCase() : '') {
            case 'axila':
                return <Axila title={title} />;
                case 'mamas':
                    return <Mamas title={title} />;
                default:
                    return <h2 className="text-xl font-bold">Nenhuma pergunta disponível para esta consulta.</h2>;
        }
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