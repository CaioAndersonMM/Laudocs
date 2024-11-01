'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import signIn from '../../services/auth/SignIn';
import { FirebaseError } from 'firebase/app';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [credenciaisError, setCredencialError] = useState('');
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/lista-de-pacientes');
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleForm = async () => {
        setEmailError('');
        setPasswordError('');
        setCredencialError('');

        let hasError = false;

        // Validação dos campos
        if (email.length < 5 || !validateEmail(email)) {
            setEmailError('Por favor, insira um email válido.');
            hasError = true;
        }
        if (password.length < 5) {
            setPasswordError('A senha deve ter pelo menos 5 caracteres.');
            hasError = true;
        }

        if (hasError) {
            return;
        }
        try {
            console.log('Email:', email);
            console.log('Password:', password);
            const { result, error } = await signIn(email, password);

            if (error) {
                const firebaseError = error as FirebaseError;
                if (firebaseError.code === 'auth/invalid-email') {
                    setCredencialError('Email não encontrado.');
                } else if (firebaseError.code === 'auth/invalid-credential') {
                    setCredencialError('Email ou Senha estão incorretos.');
                } 
                else if (firebaseError.message) {
                    setCredencialError(firebaseError.message);
                }
                else {
                    setCredencialError('Erro desconhecido');
                }
                console.log(firebaseError.message);
                return;
            }

            console.log(result)
            return router.push("/");
        } catch (error) {
            console.error('Error: ', error);
        }
    }


    return (
        <div className="flex justify-center items-center h-screen bg-[F1F2F3]">
            <div className="w-1/3 flex flex-col">
                <div className="bg-[#173D65] text-white text-center p-4 rounded-tl-lg rounded-tr-lg">
                    <h1 className="text-2xl font-extrabold">Entrar no Sistema Laudocs!</h1>
                    <p className='text-sm font-semibold mt-2 p-4'>
                        Informe suas credenciais para utilizar as funcionalidades do sistema ou entre em contato com o suporte <a href="/suporte" className='underline text-white'>aqui</a>.
                    </p>

                </div>
                <div className="bg-white text-[#173D65] text-center p-4 border-l border-r border-b border-[#173D65] rounded-bl-lg rounded-br-lg">
                    {credenciaisError && <p className="text-red-600 font-bold text-lg mb-5">{credenciaisError}</p>}
                    <p className="justify-start flex font-bold text-xl py-2 ">Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="w-full p-2 border-2 border-[#173D65] rounded-md px-4 py-4 mb-4" />
                    {emailError && <p className="text-red-600 font-bold text-sm mb-5 text-left">{emailError}</p>}
                    <p className="justify-start flex font-bold text-xl py-2">Senha</p>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="w-full p-2 border-2 border-[#173D65] rounded-md px-4 py-4 mb-4" />
                    {passwordError && <p className="text-red-600 font-bold text-sm mb-5 text-left">{passwordError}</p>}
                    <p className="justify-end pr-4  text-[#173D65] flex mb-9 font-bold"><a href="/suporte" className=' text-[#173D65]'>Esqueci minha senha</a></p>

                    <button onClick={handleForm} className="bg-[rgb(23,61,101)] text-white font-bold text-2xl rounded-md p-2 py-4 px-4 w-full">Entrar</button>

                </div>
            </div>
        </div>
    );
}