import React from 'react';

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
                                    {field.isNumberInput ? (
                                        <input
                                            type="number"
                                            // value={formState.condicionalData[field.mark] || ""}
                                            onChange={(e) => handleConditionalChange(select.mark, field.label, e.target.value)}
                                            className="mt-2 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                                            placeholder="Digite a medida"
                                        />
                                    ) : (
                                        <select
                                            value={typeof formState.conditionalData[select.mark]?.fields[field.label] === 'boolean'
                                                ? (formState.conditionalData[select.mark]?.fields[field.label] ? 'Sim' : 'Não')
                                                : formState.conditionalData[select.mark]?.fields[field.label] || field.options[0]}
                                            onChange={(e) => handleConditionalChange(select.mark, field.label, e.target.value)}
                                            className="mt-1 p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                                        >
                                            {field.options.map((option: string, idx: number) => (
                                                <option key={idx} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    )}

                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConditionalSection;