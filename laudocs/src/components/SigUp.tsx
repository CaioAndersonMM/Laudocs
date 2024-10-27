"use client"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import axios from 'axios';

interface SignUpProps {
    addPatient: (patient: { id: string; name: string; age: number; solicitingDoctor: string; priority?: boolean; }) => void;
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '1.3rem',
    color: theme.palette.getContrastText('#173D65'),
    backgroundColor: '#173D65',
    '&:hover': {
        backgroundColor: blue[700],
    },
}));

export default function SignUp({ addPatient }: SignUpProps) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [solicitingDoctor, setSolicitingDoctor] = useState('');
    const [priority, setPriority] = useState(false);

    // Erros
    const [nameError, setNameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [doctorError, setDoctorError] = useState('');

    const handleAddPatient = async () => {
        console.log('entrando na função de adicionar paciente');
        let isValid = true;

        setNameError('');
        setAgeError('');
        setDoctorError('');

        // Validações
        if (!name.trim() && name.length < 5) {
            setNameError('Nome completo é obrigatório.');
            isValid = false;
        }
        if (!age.trim() || isNaN(Number(age)) || Number(age) <= 0) {
            setAgeError('Idade deve ser um número positivo.');
            isValid = false;
        }
        if (!solicitingDoctor.trim() && solicitingDoctor.length < 5) {
            setDoctorError('Nome do médico solicitante é obrigatório.');
            isValid = false;
        }

        if (isValid) {
            const newPatient = {
                name,
                age: parseInt(age),
                solicitingDoctor,
                priority
            };

            try {
                console.log('Enviando para o backend:', newPatient);
                const response = await axios.post('/api/pacientes', newPatient);
                const patientWithId = { id: response.data.id, ...newPatient };
                addPatient(patientWithId);
                setName('');
                setAge('');
                setSolicitingDoctor('');
                setPriority(false);
            } catch (error) {
                console.error('Erro ao adicionar paciente:', error);
            }
        }
    };

    return (
        <div className="bg-white flex flex-col justify-between h-full w-full p-4 text-[#173D65] font-bold rounded-r-lg border border-[#173D65]">
            <h1 className="mt-4 mb-7 text-center text-2xl font-extrabold" style={{ fontFamily: 'Inter, sans-serif' }}>Adicionar Paciente na Fila</h1>

            <div className="flex flex-col space-y-4 text-left flex-grow p-4">
                <div>
                    <label htmlFor="name" className="block text-lg font-bold text-[#173D65]">Nome Completo</label>
                    <input
                        type="text"
                        id="name"
                        className="mt-1 block w-full p-2 border border-[#173D65] rounded-md h-14"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
                </div>
                <div>
                    <label htmlFor="age" className="block text-lg font-bold text-[#173D65]">Idade</label>
                    <input
                        type="number"
                        id="age"
                        className="mt-1 block w-full p-2 border border-[#173D65] rounded-md h-14"
                        value={age}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            if (parseInt(inputValue) > 0 || inputValue === '') {
                                setAge(inputValue);
                            }
                        }}
                    />
                    {ageError && <span className="text-red-500 text-sm">{ageError}</span>}
                </div>
                <div>
                    <label htmlFor="condition" className="block text-lg font-bold text-[#173D65]">Médico Solicitante</label>
                    <input
                        type="text"
                        id="solicitingDoctor"
                        className="mt-1 block w-full p-2 border border-[#173D65] rounded-md h-14"
                        value={solicitingDoctor}
                        onChange={(e) => setSolicitingDoctor(e.target.value)}
                    />
                    {doctorError && <span className="text-red-500 text-sm">{doctorError}</span>}
                </div>

                <div className='flex justify-start'>
                    <FormControlLabel
                        className='text-[#173D65] text-lg font-bold'
                        control={<Checkbox checked={priority} onChange={(e) => setPriority(e.target.checked)} />}
                        label={<span className='font-bold'>Prioridade</span>}
                    />
                </div>
                <div className="w-full mt-4">
                    <ColorButton variant="contained" fullWidth sx={{ height: '70px', textTransform: 'none' }} onClick={handleAddPatient}>
                        Adicionar
                    </ColorButton>
                </div>
            </div>
        </div>
    );
}
