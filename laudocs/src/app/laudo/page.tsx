"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { formatDate, processFormState } from '../../utils/processFormState';

const Laudo = () => {
    const searchParams = useSearchParams();
    const formState = searchParams ? searchParams.get('formState') : null;

    const { parsedFormState, idadePaciente, nomePaciente, dataExame, tipoExame, medicoSolicitante, noduleData, condicionalData } = processFormState(formState);

    const renderField = (key: string, value: string) => {
        console.log(key, value);
        let label = key;
        if (value === 'Com' || value === 'Sem' || value == 'Presença' || value === 'Ausência' || value === 'Presença de' || value === 'Ausência de') {
            label = `${value} ${key}`;
        } else if (value === 'Comprometido' || value === 'Não comprometido' || value === 'Normal' || value === 'Alterado') {
            label = `${key} ${value}`;
        }
        return (
            <div key={key} className="flex items-center space-x-2">
                <span className="block text-lg font-semibold text-cyan-900 truncate" title={label}>
                    - {label}
                </span>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <style jsx>{`
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    .print-container {
                        width: 100%;
                        height: 100%;
                        page-break-inside: avoid;
                    }
                    .print-header, .print-footer {
                        page-break-before: always;
                    }
                }
            `}</style>
            <header className="text-center mb-8 print-header">
                <h1 className="text-3xl font-bold text-cyan-700">Consultório Doutor Mauro</h1>
                <p className="text-lg text-gray-600">Ultrassom de {tipoExame}</p>
            </header>

            <p className="mb-8 text-gray-900 text-justify leading-relaxed">
                Exame realizado em equipamento dinâmico, com transdutor linear, bidimensional, na frequência de 12,0 MHz.
            </p>
            <section className="mb-8 print-container">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-lg font-semibold text-cyan-900 opacity-55">Nome do Paciente</label>
                        <p className="mt-2 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold capitalize">{nomePaciente}</p>
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-cyan-900 opacity-55">Idade do Paciente</label>
                        <p className="mt-2 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold capitalize">{idadePaciente}</p>
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-cyan-900 opacity-55">Médico Solicitante</label>
                        <p className="mt-2 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold capitalize">{medicoSolicitante}</p>
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-cyan-900 opacity-55">Data</label>
                        <p className="mt-2 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold">{formatDate(dataExame)}</p>
                    </div>
                </div>
            </section>
            <section className="mb-8 print-container">
                <h2 className="text-2xl font-semibold mb-4 text-cyan-900 opacity-70">Resultados do Ultrassom</h2>
                <div className="space-y-4">
                    {Object.entries(parsedFormState)
                        .filter(([key, value]) => value !== 'Não')
                        .map(([key, value]) => renderField(key, value as string))}
                </div>
                {noduleData && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {noduleData.esquerda && Object.keys(noduleData.esquerda).length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold text-bl bg-cyan-700 p-2 rounded max-w-xs mb-3 text-ce">Nódulo esquerdo</h3>
                                <div className="space-y-2">
                                    {Object.entries(noduleData.esquerda)
                                        .filter(([key, value]) => value !== 'Não')
                                        .map(([key, value]) => renderField(key, value as string))}
                                </div>
                            </div>
                        )}
                        {noduleData.direita && Object.keys(noduleData.direita).length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold text-bl bg-cyan-700 p-2 rounded max-w-xs">Nódulo direito</h3>
                                <div className="space-y-2">
                                    {Object.entries(noduleData.direita)
                                        .filter(([key, value]) => value !== 'Não')
                                        .map(([key, value]) => renderField(key, value as string))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {condicionalData && Object.keys(condicionalData).map((sectionKey) => (
                    <div key={sectionKey} className="mt-4 print-container">
                        {condicionalData[sectionKey].conditionMet && Object.keys(condicionalData[sectionKey].fields).length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold text-bl bg-cyan-700 p-2 rounded mb-3 text-center">
                                    {(() => {
                                        const sectionName = sectionKey.split('_').pop();
                                        return sectionName ? sectionName.charAt(0).toUpperCase() + sectionName.slice(1) : '';
                                    })()}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(condicionalData[sectionKey].fields)
                                        .filter(([key, value]) => value !== 'Não')
                                        .map(([key, value]) =>
                                            renderField(key, value as string)
                                        )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </section>

            <div className="mt-24 text-center print-footer">
                <hr className="border-t border-gray-900 mb-4 w-1/2 mx-auto" />
                <p className="text-lg font-semibold text-gray-500">Dr. MAURO P. F. DE CARVALHO JÚNIOR</p>
                <p className="text-lg text-gray-600">CRM-RN 4868</p>
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => window.print()}
                    className="w-2/3 px-6 py-2 bg-green-700 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Imprimir
                </button>
            </div>
        </div>
    );
};

export default Laudo;