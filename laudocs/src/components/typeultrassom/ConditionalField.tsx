import React, { useEffect, useRef } from 'react';

interface ConditionalSectionProps {
    select: any;
    conditionField: any;
    isConditionMet: boolean;
    formState: any;
    handleSelectChange: (questionLabel: string, value: string) => void;
    handleConditionalChange: (sectionMark: string, fieldLabel: string, value: string) => void;
}

const ConditionalSection: React.FC<ConditionalSectionProps> = ({
    select,
    conditionField,
    isConditionMet,
    formState,
    handleSelectChange,
    handleConditionalChange
}) => {
    const initialized = useRef(false);

    useEffect(() => {
        if (isConditionMet && conditionField && !initialized.current) {
            conditionField.fields.forEach((field: any) => {
                if (field.questions && formState.conditionalData[select.mark]?.fields[field.label] === 'Presentes') {
                    field.questions.forEach((question: any) => {
                        if (!formState.conditionalData[select.mark]?.fields[question.label]) {
                            handleConditionalChange(select.mark, question.label, question.options[0] || '');
                        }
                    });
                }
            });
            initialized.current = true;
        }
    }, [isConditionMet, conditionField, formState.conditionalData, select.mark, handleConditionalChange]);

    const handleFieldChange = (sectionMark: string, fieldLabel: string, value: string) => {
        handleConditionalChange(sectionMark, fieldLabel, value);
        if (value === 'Presentes') {
            const field = conditionField.fields.find((f: any) => f.label === fieldLabel);
            if (field && field.questions) {
                field.questions.forEach((question: any) => {
                    handleConditionalChange(sectionMark, question.label, question.options[0] || '');
                });
            }
        }
    };

    const renderField = (field: any, value: any, handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, subFieldLabel?: string) => void) => {
        if (field.isNumberInput) {
            return (
                <input
                    type="number"
                    value={value || ""}
                    onChange={(e) => handleChange(e)}
                    className="mt-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                    placeholder="Digite a medida"
                />
            );
        } else if (field.isTextInput) {
            return (
                <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => handleChange(e)}
                    className="mt-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                    placeholder="Digite o texto"
                />
            );
        } else {
            return (
                <select
                    value={typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value || field.options[0]}
                    onChange={(e) => handleChange(e)}
                    className="mt-1 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                >
                    {field.options.map((option: string, idx: number) => (
                        <option key={idx} value={option}>{option}</option>
                    ))}
                </select>
            );
        }
    };

    const renderSubQuestions = (questions: any[], formState: any, handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, subFieldLabel?: string) => void) => {
        return questions.map((question, index) => (
            <div key={index} className="flex flex-col mt-4">
                <label className="block text-sm font-semibold">
                    {question.label}
                    {renderField(question, formState[question.label], (e) => handleChange(e, question.label))}
                </label>
            </div>
        ));
    };

    return (
        <div className="flex flex-col space-y-4">
            <label className="block text-sm font-semibold">
                {select.label}
                <select
                    value={formState[select.mark] as string || select.options[0]}
                    onChange={(e) => handleSelectChange(select.mark, e.target.value)}
                    className="mt-1 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                >
                    {select.options.map((option: string, idx: number) => (
                        <option key={idx} value={option}>{option}</option>
                    ))}
                </select>
            </label>
            {isConditionMet && conditionField && (
                <div className="mt-2">
                    <h2 className="text-lg font-semibold bg-cyan-900 text-white p-1 rounded text-center">Informações sobre {select.label}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300 ease-in-out">
                        {conditionField.fields.map((field: any, index: number) => (
                            <div key={index} className="flex flex-col">
                                <label className="block text-sm font-semibold">
                                    {field.label}
                                    {renderField(field, formState.conditionalData[select.mark]?.fields[field.label], (e) => handleFieldChange(select.mark, field.label, e.target.value))}
                                </label>
                                {field.questions && formState.conditionalData[select.mark]?.fields[field.label] === 'Presentes' && (
                                    <div className="ml-4 mt-2">
                                        {renderSubQuestions(field.questions, formState.conditionalData[select.mark]?.fields, (e, subFieldLabel) => handleConditionalChange(select.mark, subFieldLabel || field.label, e.target.value))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConditionalSection;