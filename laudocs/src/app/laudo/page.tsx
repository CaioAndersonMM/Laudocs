"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';

const Laudo = () => {
    const searchParams = useSearchParams();
    const formState = searchParams ? searchParams.get('formState') : null;

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    let parsedFormState = formState ? JSON.parse(formState as string) : {};

    console.log(parsedFormState.noduleData.esquerda);

    if (parsedFormState['Tem nódulo?'] === 'Sim') {
        delete parsedFormState['Tem nódulo?'];

        if (parsedFormState['Onde está o Nódulo?'] === 'Esquerda') {
            parsedFormState['Nódulo esquerdo'] = 'Presente';
        } else if (parsedFormState['Onde está o Nódulo?'] === 'Direita') {
            parsedFormState['Nódulo direito'] = 'Presente';
        } else if (parsedFormState['Onde está o Nódulo?'] === 'Ambos') {
            parsedFormState['Nódulo esquerdo'] = 'Presente';
            parsedFormState['Nódulo direito'] = 'Presente';
        }

        parsedFormState['Presença de nódulo'] = 'Sim';
        delete parsedFormState['Onde está o Nódulo?'];
    } else if (parsedFormState['Tem nódulo?'] === 'Não') {
        parsedFormState['Nenhum nódulo encontrado'] = 'Sim';
        delete parsedFormState['Tem nódulo?'];
    }

    if (parsedFormState['Há Doppler?'] === 'Sim') {
        parsedFormState['Doppler presente'] = 'Sim';
        delete parsedFormState['Há Doppler?'];
    }

    const idadePaciente = parsedFormState.patientAge;
    delete parsedFormState.patientAge;

    const renderField = (key: string, value: string) => {
        let label = key;
        if (value === 'Com' || value === 'Sem') {
            label = `${value} ${key}`;
        } else if (value === 'Comprometido' || value === 'Não comprometido') {
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
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-cyan-700">Consultório Doutor Mauro</h1>
                <p className="text-lg text-gray-600">Ultrassom de {parsedFormState.tipo}</p>
            </header>

            <p className="mb-8 text-gray-900 text-justify leading-relaxed">
                Exame realizado em equipamento dinâmico, com transdutor linear, bidimensional, na frequência de 12,0 MHz.
            </p>
            <section className="mb-8">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-lg font-semibold text-cyan-900 opacity-55">Nome do Paciente</label>
                        <p className="mt-2 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold capitalize">{parsedFormState.patientName}</p>
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-cyan-900 opacity-55">Idade do Paciente</label>
                        <p className="mt-2 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold capitalize">{idadePaciente}</p>
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-cyan-900 opacity-55">Médico Solicitante</label>
                        <p className="mt-2 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold capitalize">{parsedFormState.solicitingDoctor}</p>
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-cyan-900 opacity-55">Data</label>
                        <p className="mt-2 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold">{formatDate(parsedFormState.data)}</p>
                    </div>
                </div>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-cyan-900 opacity-70">Resultados do Ultrassom</h2>
                <div className="space-y-4">
                    {Object.entries(parsedFormState)
                        .filter(([key, value]) => value === 'Sim')
                        .map(([key, value]) => renderField(key, value as string))}
                </div>
                {parsedFormState.noduleData && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {parsedFormState.noduleData.esquerda && Object.keys(parsedFormState.noduleData.esquerda).length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold text-bl bg-cyan-700 p-2 rounded max-w-xs mb-3">Nódulo esquerdo</h3>
                                <div className="space-y-2">
                                    {Object.entries(parsedFormState.noduleData.esquerda).map(([key, value]) => renderField(key, value as string))}
                                </div>
                            </div>
                        )}
                        {parsedFormState.noduleData.direita && Object.keys(parsedFormState.noduleData.direita).length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold text-bl bg-cyan-700 p-2 rounded max-w-xs">Nódulo direito</h3>
                                <div className="space-y-2">
                                    {Object.entries(parsedFormState.noduleData.direita).map(([key, value]) => renderField(key, value as string))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {parsedFormState.dopplerData && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {Object.keys(parsedFormState.dopplerData).length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold text-bl bg-cyan-700 p-2 rounded max-w-xs mb-3">Doppler</h3>
                                <div className="space-y-2">
                                    {Object.entries(parsedFormState.dopplerData).map(([key, value]) => renderField(key, value as string))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>

            <div className="mt-24 text-center">
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