import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const finalizarConsulta = async (pacienteId: String) => {
    window.location.href = '/consultas';

};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-cyan-900">Finalizar Consulta</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-900 text-5xl">
                        &times;
                    </button>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
};

export default Modal;