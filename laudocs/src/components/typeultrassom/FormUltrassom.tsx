"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Questions from '@/utils/question';
import { preencherSubstituicoes, noduleQuestions } from '@/utils/question';

interface FormUltrassomProps {
    tipo: string;
    patientName: string;
    patientAge: string;
    solicitingDoctor: string;
}

type FormState = {
    [key: string]: string | boolean | FormState;
};

const FormUltrassom = ({ tipo, patientName, patientAge, solicitingDoctor }: FormUltrassomProps) => {
    const [data, setData] = useState(new Date().toISOString().split('T')[0]);
    const [formState, setFormState] = useState<FormState>({});
    const [hasNodule, setHasNodule] = useState(false);
    const [hasLinfonodo, setHasLinfonodo] = useState(false);
    const [noduleLocation, setNoduleLocation] = useState<string>('Esquerda');

    const formQuestions = Questions[tipo] || { Selects: [], Checkbox: [] };

    useEffect(() => {
        const initialFormState: FormState = {};

        formQuestions.Selects.forEach((question) => {
            initialFormState[question.label] = question.options[0] || "";
        });

        formQuestions.Checkbox.forEach((question) => {
            initialFormState[question.label] = false;
        });

        noduleQuestions.forEach((question) => {
            initialFormState[`esquerda_${question.mark}`] = question.options[0] || "";
            initialFormState[`direita_${question.mark}`] = question.options[0] || "";
        });

        setFormState((prevState) => ({
            ...prevState,
            ...initialFormState,
            'Tem nódulo?': 'Não',
            'Onde está o Nódulo?': 'Esquerda'
        }));
    }, [formQuestions]);

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

        if (questionLabel === 'Onde está o Nódulo?') {
            setNoduleLocation(value);
        }
    };

    const handleInputChange = (questionLabel: string, value: string) => {
        setFormState((prevState) => ({
            ...prevState,
            [questionLabel]: value
        }));
    };

    const handleCheckboxChange = (questionLabel: string, checked: boolean) => {
        setFormState((prevState) => ({
            ...prevState,
            [questionLabel]: checked
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('Form State:', formState);

        const substituicoes = preencherSubstituicoes(formState, tipo, patientName, patientAge, data, solicitingDoctor);

        console.log(JSON.stringify(substituicoes));

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
                Ultrassom de {tipo} do Paciente {patientName}, {patientAge} anos
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
                                    value={formState[question.label] as string || question.options[0]}
                                    onChange={(e) => handleSelectChange(question.label, e.target.value)}
                                    className="ml-2 p-2 border rounded-md"
                                >
                                    {question.options.map((option, idx) => (
                                        <option key={idx} value={option}>{option}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    );
                })}

                {hasNodule && (
                    <div>
                        <div className="flex items-center mb-6">
                            <Image src="/assets/nodule.svg" alt="Ícone Hospital" width={45} height={24} />
                            <h1 className="ml-4 font-semibold">
                                Informações sobre os nódulos encontrados
                            </h1>
                        </div>

                        {(noduleLocation === 'Esquerda' || noduleLocation === 'Ambas') && (
                            <>
                                <h2 className="mt-6 text-xl font-semibold">Informações sobre o nódulo na posição Esquerda</h2>
                                <div className="grid grid-cols-4 gap-4 mt-4">
                                    {noduleQuestions.map((question, index) => (
                                        <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300 ease-in-out">
                                            <label className="block text-lg font-semibold text-gray-700">
                                                {question.label}
                                                {question.isNumberInput ? (
                                                    <input
                                                        type="number"
                                                        value={formState[`esquerda_${question.mark}`] as string || ""}
                                                        onChange={(e) => handleInputChange(`esquerda_${question.mark}`, e.target.value)}
                                                        className="ml-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                                                        placeholder="Digite a medida"
                                                    />
                                                ) : (
                                                    <select
                                                        value={formState[`esquerda_${question.mark}`] as string || question.options[0]}
                                                        onChange={(e) => handleInputChange(`esquerda_${question.mark}`, e.target.value)}
                                                        className="ml-1 border rounded-md w-full p-2 bg-white focus:ring-2 focus:ring-cyan-800"
                                                    >
                                                        {question.options.map((option, idx) => (
                                                            <option key={idx} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {(noduleLocation === 'Direita' || noduleLocation === 'Ambas') && (
                            <>
                                <h2 className="mt-6 text-xl font-semibold">Informações sobre o nódulo na posição Direita</h2>
                                <div className="grid grid-cols-4 gap-4 mt-4">
                                    {noduleQuestions.map((question, index) => (
                                        <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300 ease-in-out">
                                            <label className="block text-lg font-semibold text-gray-700">
                                                {question.label}
                                                {question.isNumberInput ? (
                                                    <input
                                                        type="number"
                                                        value={formState[`direita_${question.mark}`] as string || ""}
                                                        onChange={(e) => handleInputChange(`direita_${question.mark}`, e.target.value)}
                                                        className="ml-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                                                        placeholder="Digite a medida"
                                                    />
                                                ) : (
                                                    <select
                                                        value={formState[`direita_${question.mark}`] as string || question.options[0]}
                                                        onChange={(e) => handleInputChange(`direita_${question.mark}`, e.target.value)}
                                                        className="ml-1 border rounded-md w-full p-2 bg-white focus:ring-2 focus:ring-cyan-800"
                                                    >
                                                        {question.options.map((option, idx) => (
                                                            <option key={idx} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {formQuestions.Checkbox.map((question, index) => (
                    <div className="mb-4" key={index}>
                        <label className="block text-lg font-semibold">
                            <input
                                type="checkbox"
                                checked={formState[question.label] as boolean || false}
                                onChange={(e) => handleCheckboxChange(question.label, e.target.checked)}
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