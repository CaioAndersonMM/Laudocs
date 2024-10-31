'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import signIn from '../../services/auth/SignIn';
import { FirebaseError } from 'firebase/app';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const handleForm = async () => {
        try {
            console.log('Email:', email);
            console.log('Password:', password);
            const { result, error } = await signIn(email, password);

            if (error) {
                const firebaseError = error as FirebaseError;
                if (firebaseError.message) {
                    alert(firebaseError.message);
                    console.log(firebaseError.message);
                    throw new Error(firebaseError.message);
                } else {
                    alert('Erro desconhecido');
                    console.log('Unknown Error:', firebaseError);
                    throw new Error('Unknown Error');
                    setEmail('')
                    setPassword('')
                }
            }

            console.log(result)
            return router.push("/");
        } catch (error) {
            console.error('Error: ', error);
        }
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2 flex flex-col rounded-md border-2 border-black">
                <div className="bg-[#173D65] text-white text-center p-4 ">
                    <h1 className="text-2xl font-bold">Entrar no Sistema Loudocs</h1>
                    <p>Informe suas credênciais para utilizar as funcionalidades do sistema ou entre em contato com o suporte aqui</p>
                </div>
                <div className="bg-white text-[#173D65] text-center p-4">
                    <p className="justify-start px-4 flex font-bold text-2xl py-4 ">Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="w-full p-2 border-2 border-[#173D65] rounded-md px-4 py-4" />
                    <p className="justify-start px-4 flex font-bold text-2xl py-4 ">Senha</p>
                    <input  onChange={(e) => setPassword(e.target.value)} type="password" className="w-full p-2 border-2 border-[#173D65] rounded-md px-4 py-4" />
                    <p className="justify-end pr-4  text-[#173D65] flex py-4 font-bold">esqueci minha senha</p>

                    <button onClick={handleForm} className="bg-[#173D65] text-white font-bold text-2xl rounded-md p-2 py-4 px-4 w-full">Entrar</button>

                </div>
            </div>
        </div>
    );
}