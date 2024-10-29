"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

const TitlePage = () => {
    const { title } = useParams() as { title: string }; // Captura o parâmetro da rota
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const [hasNodule, setHasNodule] = useState(false);
    const [noduleLocation, setNoduleLocation] = useState('');
    const [patient, setPatient] = useState('');
    const [data, setData] = useState(new Date().toISOString().split('T')[0]); // Define a data atual
    const [doctor, setDoctor] = useState('');
    const [error, setError] = useState(''); // Estado para controlar o aviso de erro
    const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal

    // Obter informações do paciente dos parâmetros da URL
    useEffect(() => {
        if (searchParams) {
            const patientName = searchParams.get('patientName');
            const patientAge = searchParams.get('patientAge');
            const solicitingDoctor = searchParams.get('doctor');
            
            if (patientName && patientAge && solicitingDoctor) {
                setPatient(`${patientName} (${patientAge} anos)`);
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
            patient,
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
                return (
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-4">
                            <label className="block text-lg font-semibold">
                                Tem nódulo?
                                <select 
                                    value={hasNodule ? 'sim' : 'nao'} 
                                    onChange={(e) => setHasNodule(e.target.value === 'sim')}
                                    className="ml-2 p-2 border rounded-md"
                                >
                                    <option value="nao">Não</option>
                                    <option value="sim">Sim</option>
                                </select>
                            </label>
                        </div>
                        {hasNodule && (
                            <div className="mb-4">
                                <label className="block text-lg font-semibold">
                                    Onde está o nódulo?
                                    <select 
                                        value={noduleLocation} 
                                        onChange={(e) => setNoduleLocation(e.target.value)}
                                        className="ml-2 p-2 border rounded-md"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="esquerda">Esquerda</option>
                                        <option value="direita">Direita</option>
                                        <option value="ambas">Ambas</option>
                                    </select>
                                </label>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-lg font-semibold">
                                Data:
                                <input 
                                    type="date" 
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    className="ml-2 p-2 border rounded-md"
                                    required
                                />
                            </label>
                        </div>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-cyan-800 text-white font-bold rounded-md shadow-lg hover:bg-cyan-700 transition duration-300 ease-in-out"
                        >
                            Enviar
                        </button>
                    </form>
                );

            case 'outraConsulta':
                return (
                    <div>
                        <h2 className="text-xl font-bold">Outra lógica para consulta</h2>
                    </div>
                );

            default:
                return <h2 className="text-xl font-bold">Nenhuma pergunta disponível para esta consulta.</h2>;
        }
    };

    return (
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
                <h1 className="text-2xl font-bold text-center">Ultrassom de {title} do Paciente {patient}</h1>
                {renderQuestions()}
            </div>
        </div>
    );
};

export default TitlePage;