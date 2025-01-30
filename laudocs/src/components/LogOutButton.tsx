"use client"
import { useState } from 'react';
import logout from '../../services/auth/LogOut';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import { clear } from 'console';
import { clearStorage } from '@/utils/token';

export default function LogOutComponent() {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        clearStorage();
        router.push('/');
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)} className="bg-black text-white p-1 rounded">
                <LogoutIcon />
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-80 text-center">
                        <h2 className="text-lg font-semibold text-[#173D65]">Tem certeza que deseja sair?</h2>
                        <p className=' text-xs text-[#173D65] py-6 px-6'>Na próxima vez que acessar, você precisará logar novamente.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setShowModal(false);
                                }}
                                className="bg-red-700 text-white px-4 py-2 rounded"
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
