import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Questions from '@/utils/question';
import { preencherSubstituicoes } from '@/utils/question';

interface FormUltrassomProps {
    tipo: string;
}

const FormUltrassom = ({ tipo }: FormUltrassomProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [patient, setPatient] = useState('');
    const [age, setAge] = useState('');
    const [data, setData] = useState(new Date().toISOString().split('T')[0]);
    const [doctor, setDoctor] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formState, setFormState] = useState<{ [key: string]: any }>({});
    const [hasNodule, setHasNodule] = useState(false);
    const [hasLinfonodo, setHasLinfonodo] = useState(false);


    const formQuestions = Questions[tipo] || { Selects: [], Checkbox: [] };

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

    const handleSelectChange = (questionLabel: string, value: string) => {
        setFormState((prevState) => ({
            ...prevState,
            [questionLabel]: value
        }));

        if (questionLabel === 'Tem nódulo?') {
            setHasNodule(value === 'Sim');
        }

        if (questionLabel === 'Linfonodos axilares têm aspecto não habitual?') {
            setHasLinfonodo(value === 'Sim');
        }

    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const substituicoes = preencherSubstituicoes(formState, tipo, patient, age, data, doctor);

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
            <h1 className="text-2xl font-bold text-center">
                Ultrassom de {tipo} do Paciente {patient}, {age} anos
            </h1>
            <form onSubmit={handleSubmit} className="mt-4">
                {formQuestions.Selects.map((question, index) => {
                    if (question.label === 'Onde está o Nódulo?' && !hasNodule) return null;
                    if (question.label === 'Onde está o Linfonodo?' && !hasLinfonodo) return null;

                    return (
                        <div key={index} className="mb-4">
                            <label className="block text-lg font-semibold">
                                {question.label}
                                <select
                                    value={formState[question.label] || ""}
                                    onChange={(e) => handleSelectChange(question.label, e.target.value)}
                                    className="ml-2 p-2 border rounded-md"
                                >
                                    <option value="">Selecione</option>
                                    {question.options.map((option, idx) => (
                                        <option key={idx} value={option}>{option}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    );
                })}

                {formQuestions.Checkbox.map((question, index) => (
                    <div className="mb-4" key={index}>
                        <label className="block text-lg font-semibold">
                            <input
                                type="checkbox"
                                checked={formState[question.label] || false}
                                onChange={(e) => setFormState((prevState) => ({
                                    ...prevState,
                                    [question.label]: e.target.checked
                                }))}
                                className="mr-2"
                            />
                            {question.label}
                        </label>
                    </div>
                ))}

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
export default FormUltrassom;
