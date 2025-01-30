"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { saveRole, saveToken } from '@/utils/token';

export default function LoginPage() {
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [credenciaisError, setCredencialError] = useState('');
    const [loading, setLoading] = useState(true);
    const [saveCredentials, setSaveCredentials] = useState(false);

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        setLoading(false);
    }, []);

    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleForm = async () => {
        setEmailError('');
        setPasswordError('');
        setCredencialError('');
    
        let hasError = false;
        
        if (email.length < 5) {
            setEmailError('O email deve conter no mínimo 5 caracteres.');
            hasError = true;
        }
        else if (!validateEmail(email)) {
            setEmailError('O formato do email é inválido.');
            hasError = true;
        }
        if (password.length < 6) {
            setPasswordError('A senha deve conter no mínimo 6 caracteres.');
            hasError = true;
        }
    
        if (hasError) {
            return;
        }

        const payload = {
            email: email,
            senha: password
        };

        try {
            const response = await axios.post(`${baseURL}/api/v1/auth/login`, payload);
    
            const data = response.data;
    
            console.log("Response:", response);
            console.log("Data:", data);

            if (response.status === 200) {
                saveToken(data.token);
                saveRole(data.role);

                if (data.role.toUpperCase() === "ADMIN") {
                    router.push('/consultas');
                } else {
                    router.push('/lista-de-pacientes');
                }

            } else {
                setCredencialError(`Email e senha não coincidem.`);
            }
        } catch (error) {
            setCredencialError("Erro ao fazer a requisição. Servidor não alcançado.");
        }

    };
    

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#F1F2F3]">
                <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-lg text-center">
                    <div className="animate-pulse">
                        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded w-full mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded w-full mb-4"></div>
                        <div className="h-10 bg-gray-300 rounded w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen bg-[#F1F2F3]">
            <div className="w-full md:w-1/3 flex flex-col p-4 md:p-0">
                <div className="bg-[#173D65] text-white text-center p-4 rounded-tl-lg rounded-tr-lg">
                    <h1 className="text-2xl font-extrabold">Entrar no Sistema Laudocs!</h1>
                    <p className='text-sm font-semibold mt-2 p-4'>
                        Informe suas credenciais para utilizar as funcionalidades do sistema ou entre em contato com o suporte <a href="/suporte" className='underline text-white'>aqui</a>.
                    </p>
                </div>
                <div className="bg-white text-[#173D65] text-center p-4 border-l border-r border-b border-[#173D65] rounded-bl-lg rounded-br-lg">
                    {credenciaisError && <p className="text-red-600 font-bold text-lg mb-5">{credenciaisError}</p>}
                    <p className="justify-start flex font-bold text-xl py-2">Email</p>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        className="w-full p-2 border-2 border-[#173D65] rounded-md mb-4 px-4 py-4"
                    />
                    {emailError && <p className="text-red-600 font-bold text-sm mb-5 text-left">{emailError}</p>}
                    <p className="justify-start flex font-bold text-xl py-2">Senha</p>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        className="w-full p-2 border-2 border-[#173D65] rounded-md mb-4 px-4 py-4"
                    />
                    {passwordError && <p className="text-red-600 font-bold text-sm mb-5 text-left">{passwordError}</p>}
                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center">
                            <input 
                                type="checkbox" 
                                className="mr-2" 
                                checked={saveCredentials}
                                onChange={() => setSaveCredentials(!saveCredentials)} 
                            />
                            <span>Lembrar minhas credenciais</span>
                        </label>
                        <a href="/suporte" className='text-[#173D65] font-bold'>Esqueci minha senha</a>
                    </div>

                    <button 
                        onClick={handleForm} 
                        className="bg-[rgb(23,61,101)] text-white font-bold text-2xl rounded-md p-2 py-4 px-4 w-full"
                    >
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    );
}
