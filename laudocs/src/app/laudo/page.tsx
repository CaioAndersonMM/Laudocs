"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { formatDate, processFormState } from '../../utils/processFormState';

const Laudo = () => {
    const searchParams = useSearchParams();
    const formState = searchParams ? searchParams.get('formState') : null;

    const { parsedFormState, idadePaciente, nomePaciente, dataExame, tipoExame, medicoSolicitante, noduleData, condicionalData } = processFormState(formState);

    const handlePrintAndSend = async () => {
        const input = document.getElementById('laudo-content');
        const printButton = document.getElementById('print-button');
        if (input) {
            if (printButton) printButton.style.display = 'none'; 

            input.style.zoom = '1';

            const canvas = await html2canvas(input, { scale: 2, useCORS: true });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            const pdfBlob = pdf.output('blob');

            input.style.zoom = '0.75';
            pdf.save('laudo.pdf');
            const formData = new FormData();
            formData.append('file', pdfBlob, 'laudo.pdf');

            await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (printButton) printButton.style.display = 'block'; // Show the print button again

            // Imprimir a página
            window.print();
        }
    };

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
        <div id="laudo-content" className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg" style={{ zoom: '0.75' }}>
            <style jsx global>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 1cm;
                    }
                    body {
                       width: 210mm; /* Ajuste o tamanho para A4 */
                        height: 297mm;
                        margin: 0 auto;
                        padding: 1cm;
                        box-sizing: border-box;
                    }
                    .page-break {
                        page-break-after: always; /* Força uma quebra de página */
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
                .flex {
                    display: flex;
                    align-items: center;
                }
                .items-center {
                    align-items: center;
                }
                .space-x-1 > * + * {
                    margin-left: 0.25rem;
                }
                .truncate {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .text-md {
                    font-size: 1rem;
                }
                .text-cyan-900 {
                    color: #065f46;
                }
                .bg-gray-50 {
                    background-color: #f9fafb;
                }
                .bg-gray-100 {
                    background-color: #f3f4f6;
                }
                .bg-cyan-900 {
                    background-color: #164e63;
                }
                .bg-white {
                    background-color: #ffffff;
                }
                .rounded-lg {
                    border-radius: 0.5rem;
                }
                .shadow-sm {
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                }
                .shadow-xs {
                    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
                }
                .p-1 {
                    padding: 0.25rem;
                }
                .p-2 {
                    padding: 0.5rem;
                }
                .p-3 {
                    padding: 0.75rem;
                }
                .p-4 {
                    padding: 1rem;
                }
                .mt-4 {
                    margin-top: 1rem;
                }
                .mt-6 {
                    margin-top: 1.5rem;
                }
                .mt-20 {
                    margin-top: 5rem;
                }
                .mb-3 {
                    margin-bottom: 0.75rem;
                }
                .mb-6 {
                    margin-bottom: 1.5rem;
                }
                .leading-relaxed {
                    line-height: 1.625;
                }
                .text-center {
                    text-align: center;
                }
                .text-justify {
                    text-align: justify;
                }
                .text-lg {
                    font-size: 1.125rem;
                }
                .text-xl {
                    font-size: 1.25rem;
                }
                .text-2xl {
                    font-size: 1.5rem;
                }
                .font-bold {
                    font-weight: 700;
                }
                .font-semibold {
                    font-weight: 600;
                }
                .capitalize {
                    text-transform: capitalize;
                }
                .opacity-55 {
                    opacity: 0.55;
                }
                .border {
                    border-width: 1px;
                }
                .rounded-md {
                    border-radius: 0.375rem;
                }
                .block {
                    display: block;
                }
                .w-1/2 {
                    width: 50%;
                }
                .w-2/3 {
                    width: 66.666667%;
                }
                .hover\\:bg-blue-600:hover {
                    background-color: #2563eb;
                }
                .focus\\:outline-none:focus {
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                }
                .focus\\:ring-2:focus {
                    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
                }
                .focus\\:ring-blue-300:focus {
                    box-shadow: 0 0 0 2px rgba(147, 197, 253, 0.5);
                }
                .bg-green-700 {
                    background-color: #047857;
                }
                .text-white {
                    color: #ffffff;
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
                    id="print-button"
                    onClick={handlePrintAndSend}
                    className="w-2/3 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Imprimir
                </button>
            </div>
        </div>
    );
};

export default Laudo;