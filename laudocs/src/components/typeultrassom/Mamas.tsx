"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const Mamas = ({ title }: { title: string }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [hasNodule, setHasNodule] = useState(false);
    const [hasLinfonodos, setHasLinfonodos] = useState(false);

    const [noduleLocation, setNoduleLocation] = useState('');
    const [linfonodosLocation, setLinfonodosLocation] = useState('');

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
            noduledireita: noduleLocation === 'direita' || noduleLocation === 'ambas' ? 'Nódulo encontrado na axila direita' : 'Ausência de nódulos e/ou coleções acusticamente detectáveis.',
            noduleesquerda: noduleLocation === 'esquerda' || noduleLocation === 'ambas' ? 'Nódulo encontrado na axila esquerda' : 'Ausência de nódulos e/ou coleções acusticamente detectáveis.',
            linfonododireito: linfonodosLocation === 'direita' || linfonodosLocation === 'ambas' ? 'Linfonodo axilar direito com aspecto não habitual' : 'Linfonodos axilares com aspecto habitual.',
            linfonodoesquerdo: linfonodosLocation === 'esquerda' || linfonodosLocation === 'ambas' ? 'Linfonodo axilar esquerdo com aspecto não habitual' : 'Linfonodos axilares com aspecto habitual.',
            conclusao: 'Conclusão do exame, sem alterações significativas.',
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
                const errorData = await response.json();
                throw new Error(`Erro: ${errorData.message}`);
            }

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
            alert("Erro ao gerar o documento: " + (error as Error).message);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center">Ultrassom de {title} do Paciente {patient}, {age} anos</h1>
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

                <div className='mb-4'>
                    <label className="block text-lg font-semibold">
                        Linfonodos axilares tem aspecto não habital?
                        <select
                            value={hasLinfonodos ? 'sim' : 'nao'}
                            onChange={(e) => setHasLinfonodos(e.target.value === 'sim')}
                            className="ml-2 p-2 border rounded-md"
                        >
                            <option value="nao">Não</option>
                            <option value="sim">Sim</option>
                        </select>
                    </label>
                </div>
                {hasLinfonodos && (
                    <div className="mb-4">
                        <label className="block text-lg font-semibold">
                            Onde está o Linfonodo com aspecto não habital nas mamas?
                            <select
                                value={linfonodosLocation}
                                onChange={(e) => setLinfonodosLocation(e.target.value)}
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
        </div>
    );
};

export default Mamas;
