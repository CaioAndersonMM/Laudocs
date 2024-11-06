"use client";
import React, { useState } from 'react';
import Questions from '@/utils/question';
import { preencherSubstituicoes } from '@/utils/question';

interface FormUltrassomProps {
    tipo: string;
    patientName: string;
    patientAge: string;
    solicitingDoctor: string;
}

type FormState = {
    [key: string]: string | boolean;
};

const FormUltrassom = ({ tipo, patientName, patientAge, solicitingDoctor }: FormUltrassomProps) => {

    const [data, setData] = useState(new Date().toISOString().split('T')[0]);
    const [formState, setFormState] = useState<FormState>({});
    const [hasNodule, setHasNodule] = useState(false);
    const [hasLinfonodo, setHasLinfonodo] = useState(false);


    const formQuestions = Questions[tipo] || { Selects: [], Checkbox: [] };

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

        const substituicoes = preencherSubstituicoes(formState, tipo, patientName, patientAge, data, solicitingDoctor);

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
                                    value={formState[question.label] as string || ""}
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
                                checked={formState[question.label] as boolean || false}
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
