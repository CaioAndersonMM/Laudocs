"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { formatDate, processFormState } from '../../utils/processFormState';

const Laudo = () => {
    const searchParams = useSearchParams();
    const formState = searchParams ? searchParams.get('formState') : null;

    const { parsedFormState, idadePaciente, nomePaciente, dataExame, tipoExame, medicoSolicitante, noduleData, condicionalData } = processFormState(formState);

    const renderField = (key: string, value: string) => {
        let label = key;
        if (value === 'Com' || value === 'Sem' || value === 'Presença' || value === 'Ausência' || value === 'Presença de' || value === 'Ausência de') {
            label = `${value} ${key}`;
        } else if (value === 'Sim') {
            label = `${key}`;
        } else {
            label = `${key} ${value}`;
        }
        label = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
        return (
            <div key={key} className="flex items-center space-x-1">
                <span className="block text-md text-cyan-900 truncate" title={label}>
                    - {label}
                </span>
            </div>
        );
    };

    const renderNoduleSection = (side: 'esquerda' | 'direita', nodules: any[]) => {
        if (!nodules || nodules.length === 0) return null;

        return (
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-white bg-cyan-900 p-1 rounded mb-3 text-center flex items-center justify-center">
                    Nódulos na {side === 'esquerda' ? 'Esquerda' : 'Direita'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {nodules.map((nodule, index) => (
                        <div key={index} className="p-2 bg-gray-100 rounded-lg shadow-sm">
                            <h4 className="text-md font-semibold text-cyan-900 mb-1">Nódulo {index + 1}</h4>
                            <div className="space-y-1">
                                {Object.entries(nodule)
                                    .filter(([key, value]) => value !== 'Não' && value !== '')
                                    .map(([key, value]) => renderField(key, value as string))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderConditionalSection = (sectionKey: string, sectionData: any) => {
        const calculateVolumes = (fields: any) => {
            return Object.entries(fields)
                .filter(([key]) => key.startsWith('Medida'))
                .map(([key, value]) => {
                    const [length, width, height] = (value as string).split('x').map(parseFloat);
                    if (!isNaN(length) && !isNaN(width) && !isNaN(height)) {
                        return { key, volume: (length * width * height).toFixed(2) };
                    }
                    return null;
                })
                .filter(volume => volume !== null);
        };

        const volumes = calculateVolumes(sectionData.fields);

        if (sectionData.conditionMet) {
            return (
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-white bg-cyan-900 p-1 rounded mb-3 text-center flex items-center justify-center">
                        {(() => {
                            const sectionName = sectionKey.split('_').pop();
                            return sectionName ? sectionName.replace(/([A-Z])/g, ' $1').trim().charAt(0).toUpperCase() + sectionName.slice(1) : '';
                        })()}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        {Object.entries(sectionData.fields)
                            .filter(([key, value]) => value !== 'Não' && value !== '')
                            .map(([key, value]) => (
                                <React.Fragment key={key}>
                                    {renderField(key, value as string)}
                                    {volumes.find(volume => volume.key === key) && (
                                        <div className="flex items-center space-x-1">
                                            <span className="block text-md text-cyan-900 truncate" title={`Volume: ${volumes.find(volume => volume.key === key)?.volume} cm³`}>
                                                - Volume do {key.split(' ').pop()} {volumes.find(volume => volume.key === key)?.volume} cm³
                                            </span>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-white bg-cyan-900 p-1 rounded mb-3 text-center flex items-center justify-center">
                        {(() => {
                            const sectionName = sectionKey.split('_').pop();
                            return sectionName ? sectionName.replace(/([A-Z])/g, ' $1').trim().charAt(0).toUpperCase() + sectionName.slice(1) : '';
                        })()}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 text-sm">
                        <div className="bg-white p-3 rounded-lg shadow-xs">
                            <span className="block text-md text-cyan-900 truncate" title="Não há alterações">
                                - Não há alterações ou não visualizado
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">

            <style jsx global>{`
                @media print {
                    @page {
                        margin: 1cm;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                    }
                    .no-print {
                        display: none;
                    }
                   
                    .bg-gray-100 {
                        background-color: #f3f4f6 !important;
                    }
                    .bg-cyan-700 {
                        background-color: #0369a1 !important;
                    }
                    .shadow-sm {
                        box-shadow: none;
                    }
                    .rounded-lg {
                        border-radius: 0;
                    }
                    .grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr); /* Garante que a grade seja mantida */
                        gap: 8px;
                    }
                    .text-sm {
                        font-size: 12px;
                    }
                    .text-md {
                        font-size: 14px;
                    }
                    .text-lg {
                        font-size: 16px;
                    }
                    .text-xl {
                        font-size: 18px;
                    }
                }
            `}</style>

            <header className="text-center mb-6 print-header">
                <h1 className="text-2xl font-bold text-cyan-700">Consultório Doutor Mauro</h1>
                <p className="text-lg text-gray-600">Ultrassom de {tipoExame}</p>
            </header>

            <p className="mb-6 text-gray-900 text-justify leading-relaxed">
                Exame realizado em equipamento dinâmico, com transdutor linear, bidimensional, na frequência de 12,0 MHz.
            </p>

            <section className="mb-6 print-container">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-semibold text-cyan-900 opacity-55">Nome do Paciente</label>
                        <p className="mt-1 p-1 border rounded-md bg-gray-100 text-cyan-900 font-semibold capitalize">{nomePaciente}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-cyan-900 opacity-55">Idade do Paciente</label>
                        <p className="mt-1 p-1 border rounded-md bg-gray-100 text-cyan-900 font-semibold capitalize">{idadePaciente}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-cyan-900 opacity-55">Médico Solicitante</label>
                        <p className="mt-1 p-1 border rounded-md bg-gray-100 text-cyan-900 font-semibold capitalize">{medicoSolicitante}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-cyan-900 opacity-55">Data</label>
                        <p className="mt-1 p-1 border rounded-md bg-gray-100 text-cyan-900 font-semibold">{formatDate(dataExame)}</p>
                    </div>
                </div>
            </section>

            <section className="mb-6 print-container">
                <h2 className="text-xl font-semibold mb-3 text-cyan-900 opacity-70">Resultados do Ultrassom</h2>
                <div className="space-y-2">
                    {Object.entries(parsedFormState)
                        .filter(([key, value]) => value !== 'Não' && value !== '')
                        .map(([key, value]) => renderField(key, value as string))}
                </div>
            </section>

            {noduleData && (
                <section className="mb-6 print-container">
                    {renderNoduleSection('esquerda', noduleData.esquerda)}
                    {renderNoduleSection('direita', noduleData.direita)}
                </section>
            )}

            {condicionalData && Object.keys(condicionalData).map((sectionKey) => (
                <div key={sectionKey} className="mt-4 print-container">
                    {renderConditionalSection(sectionKey, condicionalData[sectionKey])}
                </div>
            ))}

            <div className="mt-20 text-center print-footer">
                <hr className="border-t border-gray-900 mb-3 w-1/2 mx-auto" />
                <p className="text-md font-semibold text-gray-500">Dr. MAURO P. F. DE CARVALHO JÚNIOR</p>
                <p className="text-sm text-gray-600">CRM-RN 4868</p>
            </div>

            <div className="flex justify-center mt-6 no-print">
                <button
                    onClick={() => window.print()}
                    className="w-2/3 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Imprimir
                </button>
            </div>
        </div>
    );
};

export default Laudo;