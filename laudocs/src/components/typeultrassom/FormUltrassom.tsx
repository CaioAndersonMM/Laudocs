"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Questions from '@/utils/question';
import { preencherSubstituicoes, noduleQuestions } from '@/utils/question';
import { useRouter } from 'next/navigation';

interface FormUltrassomProps {
    tipo: string;
    patientName: string;
    patientAge: string;
    solicitingDoctor: string;
}

type NoduleData = {
    [key: string]: string;
};

type ConditionalSectionData = {
    conditionMet: boolean;
    fields: { [key: string]: string };
};

type FormState = {
    [key: string]: string | boolean | FormState | { esquerda: NoduleData; direita: NoduleData } | NoduleData | { [key: string]: any };
    noduleData: { esquerda: NoduleData; direita: NoduleData };
    conditionalData: { [key: string]: ConditionalSectionData };
};

const FormUltrassom = ({ tipo, patientName, patientAge, solicitingDoctor }: FormUltrassomProps) => {
    const router = useRouter();
    const [data, setData] = useState(new Date().toISOString().split('T')[0]);
    const [formState, setFormState] = useState<FormState>({
        noduleData: { esquerda: {}, direita: {} },
        conditionalData: {}
    });
    const [hasNodule, setHasNodule] = useState(false);
    const [hasLinfonodo, setHasLinfonodo] = useState(false);
    const [noduleLocation, setNoduleLocation] = useState<string>('Esquerda');

    const formQuestions = Questions[tipo] || { Selects: [], Checkbox: [], ConditionalSections: {} };

    useEffect(() => {
        const initialFormState: FormState & { noduleData: { esquerda: NoduleData; direita: NoduleData } } = {
            noduleData: {
                esquerda: {},
                direita: {},
            },
            conditionalData: {},
        };

        formQuestions.Selects.forEach((question) => {
            initialFormState[question.label] = question.options[0] || "";
        });

        formQuestions.Checkbox.forEach((question) => {
            initialFormState[question.label] = false;
        });

        noduleQuestions.forEach((question) => {
            initialFormState.noduleData.esquerda[question.label] = question.options[0] || "";
            initialFormState.noduleData.direita[question.label] = question.options[0] || "";
        });

        Object.entries(formQuestions.ConditionalSections || {}).forEach(([key, section]) => {
            initialFormState.conditionalData[key] = {
                conditionMet: false,
                fields: {},
            };
            section.fields.forEach((field) => {
                initialFormState.conditionalData[key].fields[field.label] = field.options[0] || "";
            });
        });


        setFormState((prevState) => ({
            ...prevState,
            ...initialFormState,
            'Tem nódulo?': 'Não',
            'Onde está o Nódulo?': 'Esquerda'
        }));
    }, [formQuestions]);

    const handleSelectChange = (questionLabel: string, value: string) => {
        console.log(questionLabel, value);
        setFormState((prevState) => ({
            ...prevState,
            [questionLabel]: value
        }));

        if (questionLabel === 'Tem nódulo?') {
            setHasNodule(value === 'Sim');

            if (value === 'Sim') {
                setFormState((prevState) => {
                    const newState = { ...prevState };
                    noduleQuestions.forEach((question) => {
                        if (!newState.noduleData.esquerda[question.label]) {
                            newState.noduleData.esquerda[question.label] = question.options[0] || "";
                        }
                        if (!newState.noduleData.direita[question.label]) {
                            newState.noduleData.direita[question.label] = question.options[0] || "";
                        }
                    });
                    return newState;
                });
            }
        }

        if (questionLabel.endsWith('_doppler')) {
            formState['Há Doppler?'] = value
        }

        if (questionLabel === 'Linfonodos axilares têm aspecto não habitual?') {
            setHasLinfonodo(value === 'Sim');
        }

        if (questionLabel === 'Onde está o Nódulo?') {
            setNoduleLocation(value);
        }

        Object.entries(formQuestions.ConditionalSections || {}).forEach(([key, section]) => {
            if (key === questionLabel) {
                setFormState((prevState) => ({
                    ...prevState,
                    conditionalData: {
                        ...prevState.conditionalData,
                        [key]: {
                            ...prevState.conditionalData[key],
                            conditionMet: value === section.condition,
                        },
                    },
                }));
            }
        });
    };

    const handleConditionalChange = (sectionMark: string, fieldLabel: string, value: string) => {
        setFormState((prevState) => ({
            ...prevState,
            conditionalData: {
                ...prevState.conditionalData,
                [sectionMark]: {
                    ...prevState.conditionalData[sectionMark],
                    fields: {
                        ...prevState.conditionalData[sectionMark].fields,
                        [fieldLabel]: value,
                    },
                },
            },
        }));
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

    const handleNoduleChange = (side: "esquerda" | "direita", questionLabel: string, value: string) => {

        setFormState((prevState) => ({
            ...prevState,
            noduleData: {
                ...prevState.noduleData,
                [side]: {
                    ...prevState.noduleData[side],
                    [questionLabel]: value,
                },
            },
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        formState.tipo = tipo;
        formState.patientName = patientName;
        formState.patientAge = patientAge;
        formState.solicitingDoctor = solicitingDoctor;
        formState.data = data;

        const cleanedFormState = Object.keys(formState).reduce((acc, key) => {
            if (!key.includes('_')) {
                acc[key] = formState[key];
            }
            return acc;
        }, {} as FormState);

        const updatedFormState = cleanedFormState;

        if (hasNodule) {

            if (updatedFormState['Onde está o Nódulo?'] === 'Esquerda') {
                noduleQuestions.forEach((question) => {
                    delete updatedFormState.noduleData.direita[question.label];
                });
            } else if (updatedFormState['Onde está o Nódulo?'] === 'Direita') {
                noduleQuestions.forEach((question) => {
                    delete updatedFormState.noduleData.esquerda[question.label];
                });
            } else {
                noduleQuestions.forEach((question) => {
                    if (!updatedFormState.noduleData.esquerda[question.label]) {
                        updatedFormState.noduleData.esquerda[question.label] = question.options[0] || "";
                    }
                    if (!updatedFormState.noduleData.direita[question.label]) {
                        updatedFormState.noduleData.direita[question.label] = question.options[0] || "";
                    }
                });
            }

        } else {
            noduleQuestions.forEach((question) => {
                delete updatedFormState.noduleData.esquerda[question.label];
                delete updatedFormState.noduleData.direita[question.label];
            });
            Object.keys(updatedFormState).forEach(key => {
                if (key.endsWith('_nodulo')) {
                    delete updatedFormState[key];
                }
            });
        }

        if (formState['Há Doppler?'] === 'Não') {
            delete updatedFormState['Há Doppler?'];

            const Section = Questions[tipo];

            if (Section?.ConditionalSections) {
                Object.keys(Section.ConditionalSections).forEach(sectionKey => {
                    const section = Section?.ConditionalSections?.[sectionKey];

                    if (section && section.fields) {
                        // Remover os campos de `formState` que possuem `mark` ou `label` correspondentes
                        section.fields.forEach(field => {
                            if (field.mark && field.mark.endsWith('_doppler')) {
                                delete updatedFormState[field.mark];
                            }

                            if (field.label) {
                                delete updatedFormState[field.label];
                            }
                        });

                        section.fields = section.fields.filter(field => {
                            return !field.mark.endsWith('_doppler');
                        });

                        if (section.fields.length === 0) {
                            if (Section.ConditionalSections) {
                                delete Section.ConditionalSections[sectionKey];
                            }
                        }
                    }
                });
            }
        }

        if (typeof window !== "undefined") {
            router.push(`/laudo?formState=${encodeURIComponent(JSON.stringify(updatedFormState))}`);
        } else {
            console.error("Router is not mounted in this environment.");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6">
                Ultrassom de {tipo} do Paciente {patientName}, {patientAge} anos
            </h1>
            <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    {formQuestions.Selects.map((select, index) => {
                        const conditionField = formQuestions.ConditionalSections?.[select.mark];
                        const isConditionMet = conditionField && formState[select.mark] === conditionField.condition;

                        const value = typeof formState[select.mark] === 'boolean'
                            ? formState[select.mark] ? 'Sim' : 'Não'
                            : formState[select.mark] || select.options[0];

                        if (select.mark.startsWith('condicional_')) {
                            return (
                                <div key={index} className="flex flex-col">
                                    <label className="block text-lg font-semibold">
                                        {select.label}
                                        <select
                                            value={formState[select.mark] as string || select.options[0]}
                                            onChange={(e) => handleSelectChange(select.mark, e.target.value)}
                                            className="mt-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                                        >
                                            {select.options.map((option, idx) => (
                                                <option key={idx} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </label>
                                    {isConditionMet && conditionField && (
                                        <div className="mt-6">
                                            <h2 className="text-xl font-semibold bg-cyan-900 text-white p-1">Informações sobre {select.label}</h2>
                                            <div className="grid grid-cols-3 gap-4 mt-4 mb-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300 ease-in-out">
                                                {conditionField.fields.map((field, index) => (
                                                    <div key={index} className="flex flex-col">
                                                        <label className="block text-lg font-semibold">
                                                            {field.label}
                                                            <select
                                                                value={typeof formState.conditionalData[select.mark]?.fields[field.label] === 'boolean'
                                                                    ? (formState.conditionalData[select.mark]?.fields[field.label] ? 'Sim' : 'Não')
                                                                    : formState.conditionalData[select.mark]?.fields[field.label] || field.options[0]}
                                                                onChange={(e) => handleConditionalChange(select.mark, field.label, e.target.value)}
                                                                className="mt-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                                                            >
                                                                {field.options.map((option, idx) => (
                                                                    <option key={idx} value={option}>{option}</option>
                                                                ))}
                                                            </select>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                    {formQuestions.Selects.map((question, index) => {
                        if (question.mark.startsWith('condicional_')) return null;

                        // Verifica se a pergunta 'Onde está o Nódulo?' ou 'Onde está o Linfonodo?' deve ser exibida
                        if (question.label === 'Onde está o Nódulo?' && !hasNodule) return null;
                        if (question.label === 'Onde está o Linfonodo?' && !hasLinfonodo) return null;

                        return (
                            <div key={index} className="flex flex-col">
                                <label className="block text-lg font-semibold">
                                    {question.label}
                                    {question.isNumberInput ? (
                                        <input
                                            type="number"
                                            value={formState[question.label] as string || ""}
                                            onChange={(e) => handleInputChange(question.label, e.target.value)}
                                            className="mt-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                                            placeholder="Digite o valor"
                                        />
                                    ) : question.isTextInput ? (
                                        <input
                                            type="text"
                                            value={formState[question.label] as string || ""}
                                            onChange={(e) => handleInputChange(question.label, e.target.value)}
                                            className="mt-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                                            placeholder="Digite o texto"
                                        />
                                    ) : question.isDateInput ? (
                                        <input
                                            type="date"
                                            value={formState[question.label] as string || ""}
                                            onChange={(e) => handleInputChange(question.label, e.target.value)}
                                            className="mt-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                                        />
                                    ) : (
                                        <select
                                            value={formState[question.label] as string || question.options[0]}
                                            onChange={(e) => handleSelectChange(question.label, e.target.value)}
                                            className="mt-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                                        >
                                            {question.options.map((option, idx) => (
                                                <option key={idx} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    )}
                                </label>
                            </div>
                        );
                    })}
                </div>

                {hasNodule && (
                    <div>
                        <div className="flex items-center mb-6">
                            <Image src="/assets/nodule.svg" alt="Ícone Hospital" width={45} height={24} />
                            <h1 className="ml-4 font-semibold">Informações sobre os nódulos encontrados</h1>
                        </div>

                        {(noduleLocation === 'Esquerda' || noduleLocation === 'Ambas') && (
                            <>
                                <h2 className="mt-6 text-xl font-semibold">Informações sobre o nódulo na posição Esquerda</h2>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    {noduleQuestions.map((question, index) => (
                                        <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300 ease-in-out">
                                            <label className="block text-lg font-semibold text-gray-700">
                                                {question.label}
                                                {question.isNumberInput ? (
                                                    <input
                                                        type="number"
                                                        value={formState.noduleData.esquerda[question.label] || ""}
                                                        onChange={(e) => handleNoduleChange("esquerda", question.mark, e.target.value)}
                                                        className="mt-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                                                        placeholder="Digite a medida"
                                                    />
                                                ) : (
                                                    <select
                                                        value={formState.noduleData.esquerda[question.label] || question.options[0]}
                                                        onChange={(e) => handleNoduleChange("esquerda", question.label, e.target.value)}
                                                        className="mt-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
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
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    {noduleQuestions.map((question, index) => (
                                        <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300 ease-in-out">
                                            <label className="block text-lg font-semibold text-gray-700">
                                                {question.label}
                                                {question.isNumberInput ? (
                                                    <input
                                                        type="number"
                                                        value={formState.noduleData.direita[question.label] || ""}
                                                        onChange={(e) => handleNoduleChange("direita", question.mark, e.target.value)}
                                                        className="mt-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                                                        placeholder="Digite a medida"
                                                    />
                                                ) : (
                                                    <select
                                                        value={formState.noduleData.direita[question.label] || question.options[0]}
                                                        onChange={(e) => handleNoduleChange("direita", question.label, e.target.value)}
                                                        className="mt-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
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
                <div className="flex justify-center mt-8">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormUltrassom;