import React from 'react';
import Image from 'next/image';
import { noduleQuestions } from '../../utils/question';


interface NoduleInfoProps {
    noduleLocation: string;
    formState: any;
    handleNoduleChange: (side: "esquerda" | "direita", questionLabel: string, value: string) => void;
}

const NoduleInfo: React.FC<NoduleInfoProps> = ({
    noduleLocation,
    formState,
    handleNoduleChange
}) => {

    return (
        <div>
            <div className="flex items-center mb-6">
                <Image src="/assets/nodule.svg" alt="Ícone Hospital" width={45} height={24} />
                <h1 className="ml-4 font-semibold">Informações sobre os nódulos encontrados</h1>
            </div>

            {(noduleLocation === 'Esquerda' || noduleLocation === 'Ambas') && (
                <>
                    <h2 className="mt-6 text-lg font-semibold">Informações sobre o nódulo na posição Esquerda</h2>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {noduleQuestions.map((question, index) => (
                            <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 ease-in-out">
                                <label className="block text-sm font-semibold text-gray-700">
                                    {question.label}
                                    {question.isNumberInput ? (
                                        <input
                                            type="number"
                                            value={formState.noduleData.esquerda[question.label] || ""}
                                            onChange={(e) => handleNoduleChange("esquerda", question.label, e.target.value)}
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
                    <h2 className="mt-6 text-lg font-semibold">Informações sobre o nódulo na posição Direita</h2>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {noduleQuestions.map((question, index) => (
                            <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300 ease-in-out">
                                <label className="block text-sm font-semibold text-gray-700">
                                    {question.label}
                                    {question.isNumberInput ? (
                                        <input
                                            type="number"
                                            value={formState.noduleData.direita[question.label] || ""}
                                            onChange={(e) => handleNoduleChange("direita", question.label, e.target.value)}
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
    );
};

export default NoduleInfo;