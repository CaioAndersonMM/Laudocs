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

    const parsedFormState = formState ? JSON.parse(formState as string) : {};

    console.log(parsedFormState);

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
                        <p className="mt-2 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold capitalize">{parsedFormState.patientAge}</p>
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-cyan-900 opacity-55">Médico Solicitante</label>
                        <p className="mt-2 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold capitalize">{parsedFormState.solicitingDoctor}</p>
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-cyan-900 opacity-55">Data</label>
                        <p className="mt-2 p-2 border rounded-md bg-gray-100 text-cyan-900 font-semibold">{formatDate(parsedFormState.data)}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-cyan-900 opacity-70">Resultados do Ultrassom</h2>
                <div className="space-y-4">
                    {Object.entries(parsedFormState)
                        .filter(([key]) => !['tipo', 'patientName', 'patientAge', 'solicitingDoctor', 'data'].includes(key))
                        .reduce((acc: [string, string][][], [key, value], index) => {
                            if (index % 2 === 0) acc.push([[key, value as string]]);
                            else acc[acc.length - 1].push([key, value as string]);
                            return acc;
                        }, [])
                        .map((pairGroup, index) => (
                            <div key={index} className="grid grid-cols-2 gap-4">
                                {pairGroup.map(([key, value]) => (
                                    <div key={key} className="flex flex-col">
                                        <label
                                            className="block text-lg font-semibold text-cyan-900 truncate"
                                            title={key} // Tooltip com o valor completo da label
                                        >
                                            {key}
                                        </label>
                                        <p
                                            className="mt-2 p-2 border rounded-md bg-cyan-900 opacity-80 font-bold truncate"
                                            title={String(value)} // Tooltip com o valor completo
                                        >
                                            {String(value)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                </div>
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