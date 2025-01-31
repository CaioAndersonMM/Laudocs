"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '@/utils/globals.css'

import { formatDate, processFormState } from '../../utils/processFormState';
import axios from 'axios';
import Modal, {finalizarConsulta} from '@components/laudo/Modal';
import { checkValidToken, isAdmin } from '@/utils/token';
import { useRouter } from 'next/navigation';

const Laudo = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const formState = searchParams ? searchParams.get('formState') : null;

    const { parsedFormState, idadePaciente, nomePaciente, dataExame, tipoExame, pacienteId, medicoSolicitante, noduleData, condicionalData } = processFormState(formState);

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const handlePrintAndSend = async () => {
        if (typeof window === 'undefined') return;

        const input = document.getElementById('laudo-content');
        const printButton = document.getElementById('print-button');
        const finalizarButton = document.getElementById('finalizar-consulta');

        if (!input) return;

        try {
            if (printButton) printButton.style.display = 'none';
            if (finalizarButton) finalizarButton.style.display = 'none';
            input.style.zoom = '1';

            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.7);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            let imgHeight = (canvas.height * pdfWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, '', 'SLOW');
            heightLeft -= pdfHeight;
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            input.style.zoom = '0.75';

            pdf.save('laudo.pdf');
            const pdfBlob = pdf.output('blob');

            const formData = new FormData();
            formData.append('file', pdfBlob, 'laudo.pdf');
            formData.append('consultaId', pacienteId);
            formData.append('type', tipoExame);

            const response = await axios.post(`${baseURL}/api/v1/laudo/criar`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 200) {
                console.log('PDF enviado com sucesso!');
            } else {
                console.error('Erro ao enviar o PDF:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao gerar/enviar o PDF:', error);
        }

        window.print();
        if (printButton) printButton.style.display = 'block';
        if (finalizarButton){
            finalizarButton.style.display = 'flex';
        }

        handleOpenModal();

    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    
        useEffect(() => {
            if(!checkValidToken() || !isAdmin())
                router.push('/');
            
        }, []);

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
                <span className="block text-md text-black" title={label}>
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
                                            <span className="block text-md text-cyan-900" title={`Volume: ${volumes.find(volume => volume.key === key)?.volume} cm³`}>
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
                            <span className="block text-md text-cyan-900" title="Não há alterações">
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

            <header className="text-center mb-6 print-header">
                <h1 className="text-2xl font-bold text-cyan-700">Consultório Doutor Mauro</h1>
                <p className="text-lg text-gray-600">Ultrassom de {tipoExame}</p>
            </header>

            <p className="mb-6 text-gray-900 text-justify leading-relaxed">
                Exame realizado em equipamento dinâmico, com transdutor linear, bidimensional, na frequência de 12,0 MHz.
            </p>

            <section className="mb-6 print-container">
                <div id='dados' className="grid grid-cols-2 gap-3">
                    <div className='text-black text-md'>
                        <label className="block text-sm font-semibold text-cyan-900 opacity-55 mb-2">Nome do Paciente</label>
                        {/* <div className="mt-1 p-1 border rounded-md bg-gray-100 text-cyan-900 font-semibold"></div> */}
                        {nomePaciente}
                    </div>
                    <div className='text-black text-md'>
                        <label className="block text-sm font-semibold text-cyan-900 opacity-55 mb-2">Idade do Paciente</label>
                        {/* <p className="mt-1 p-1 border rounded-md bg-gray-100 text-cyan-900 font-semibold"></p> */}
                        {idadePaciente}
                    </div>
                    <div className='text-black text-md'>
                        <label className="block text-sm font-semibold text-cyan-900 opacity-55 mb-2">Médico Solicitante</label>
                        {/* <p className="mt-1 p-1 border rounded-md bg-gray-100 text-cyan-900 font-semibold"></p> */}
                        {medicoSolicitante}
                    </div>
                    <div className='text-black text-md'>
                        <label className="block text-sm font-semibold text-cyan-900 opacity-55 mb-2">Data</label>
                    {formatDate(dataExame)}
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

            <div className="flex justify-center mt-6 no-print " id="finalizar-consulta" style={{ display: 'none', justifyContent: 'center' }}>
                <button
                    id="finalizar-button"
                    onClick={handleOpenModal}
                    className="w-2/3 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Finalizar consulta
                </button>
            </div>

            <div className="flex justify-center mt-6 no-print">
                <button
                    id="print-button"
                    onClick={handlePrintAndSend}
                    className="w-2/3 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Imprimir
                </button>

                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <p className='text-cyan-900 p-4 text-xl font-bold'>Tem certeza de que deseja finalizar a consulta?</p>
                <div className="flex justify-center">
                    <button onClick={async () => await finalizarConsulta(pacienteId)} className="w-full h-16 mt-5 px-4 py-2 bg-green-900 hover:bg-red-900 text-white font-bold rounded-md">Confirmar</button>
                </div>
                </Modal>
                
            </div>
        </div>
    );
};

export default Laudo;