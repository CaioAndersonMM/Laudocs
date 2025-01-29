import React from 'react';

interface FormFieldProps {
    question: any;
    formState: any;
    handleInputChange: (questionLabel: string, value: string) => void;
    handleSelectChange: (questionLabel: string, value: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({
    question,
    formState,
    handleInputChange,
    handleSelectChange
}) => {
    return (
        <div className="flex flex-col">
            <label className="block text-sm font-semibold">
                {question.label}
                {question.isNumberInput ? (
                    <input
                        type="number"
                        value={formState[question.label] as string || ""}
                        onChange={(e) => handleInputChange(question.label, e.target.value)}
                        className="p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
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
                        className="p-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-cyan-800"
                    >
                        {question.options.map((option: string, idx: number) => (
                            <option key={idx} value={option}>{option}</option>
                        ))}
                    </select>
                )}
            </label>
        </div>
    );
};

export default FormField;