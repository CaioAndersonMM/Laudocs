"use client";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SignUpProps } from '@/interfaces/AllInterfaces';
import MaskedInput from 'react-text-mask';
import dayjs from 'dayjs';
import { getToken } from '@/utils/token';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '1.3rem',
    color: theme.palette.getContrastText('#173D65'),
    backgroundColor: '#173D65',
    '&:hover': {
        backgroundColor: blue[700],
    },
}));

export default function SignUp({ addConsulta }: SignUpProps) {
    const [cpf, setCpf] = useState('');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState('');
    const [solicitingDoctor, setSolicitingDoctor] = useState('');
    const [priority, setPriority] = useState(false);

    const [cpfError, setCpfError] = useState('');
    const [nameError, setNameError] = useState('');
    const [birthDateError, setBirthDateError] = useState('');
    const [doctorError, setDoctorError] = useState('');

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const validateCpf = (cpf: string) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);

    const validateBirthDate = (date: string) => {
        const [day, month, year] = date.split('/').map(Number);
        const isValidDate = dayjs(`${year}-${month}-${day}`).isValid();
        const isWithinRange = year <= dayjs().year();
        return isValidDate && day <= 31 && month <= 12 && isWithinRange;
    };

    const calculateAge = (birthDate: string) => {
        const [day, month, year] = birthDate.split('/').map(Number);
        const birth = dayjs(`${year}-${month}-${day}`);
        return dayjs().diff(birth, 'year');
    };

    useEffect(() => {
        const fetchPatientByCpf = async () => {
            if (validateCpf(cpf)) {
                try {
                    const token = await getToken();
                    const response = await axios.get(`${baseURL}/api/v1/paciente/cpf/${cpf}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const { nome, dataNasc } = response.data;
                    setName(nome);
                    setBirthDate(dataNasc);
                    setAge(calculateAge(dataNasc).toString());
                } catch (error) {
                    console.log('Paciente não encontrado:', error);
                    setName('');
                    setBirthDate('');
                    setAge('');
                }
            }
        };

        fetchPatientByCpf();
    }, [cpf]);

    const validateForm = () => {
        let isValid = true;

        setCpfError('');
        setNameError('');
        setBirthDateError('');
        setDoctorError('');

        if (!validateCpf(cpf)) {
            setCpfError('CPF inválido.');
            isValid = false;
        }
        if (!name.trim() || name.length < 5) {
            setNameError('É obrigatório informar o nome completo do paciente.');
            isValid = false;
        }
        if (!validateBirthDate(birthDate)) {
            setBirthDateError('Data de nascimento inválida.');
            isValid = false;
        }
        if (!solicitingDoctor.trim() || solicitingDoctor.length < 5) {
            setDoctorError('É obrigatório informar o nome completo do médico.');
            isValid = false;
        }

        return isValid;
    };

    const createPatient = async () => {
        const externalPatient = {
            nome: name,
            cpf,
            dataNasc: birthDate,
            idade: calculateAge(birthDate),
        };
        const token = await getToken();
        const response = await axios.post(`${baseURL}/api/v1/paciente/criar`, externalPatient, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.id;
    };

    const createAppointment = async (patientId: string) => {
        const today = dayjs().format("DD/MM/YYYY");
        const newAppointment = {
            pacienteId: patientId,
            medicoSolicitante: solicitingDoctor,
            dataConsulta: today,
        };
        const token = await getToken();
        const response = await axios.post(`${baseURL}/api/v1/consultas`, newAppointment, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    };

    const handleAddPatient = async () => {
        if (!validateForm()) return;

        try {
            const token = await getToken();
            let patientId;

            try {
                const existingPatientResponse = await axios.get(`${baseURL}/api/v1/paciente/cpf/${cpf}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                patientId = existingPatientResponse.data.id;
                console.log('Paciente encontrado:', existingPatientResponse.data);
            } catch (error) {
                console.log('Paciente não encontrado, criando novo paciente:', error);
                patientId = await createPatient();
                console.log('Novo paciente criado com ID:', patientId);
            }

            const newAppointment = await createAppointment(patientId);
            addConsulta(newAppointment);
            console.log('Consulta adicionada:', newAppointment);

            setCpf('');
            setName('');
            setBirthDate('');
            setAge('');
            setSolicitingDoctor('');
            setPriority(false);
        } catch (error) {
            console.error('Erro ao adicionar paciente ou consulta:', error);
        }
    };

    return (
        <div className="bg-white flex flex-col justify-between h-full w-full p-4 text-[#173D65] font-bold rounded-r-lg border border-[#173D65]">
            <h1 className="mt-4 mb-7 text-center text-2xl font-extrabold" style={{ fontFamily: 'Inter, sans-serif' }}>Adicionar Paciente na Fila</h1>

            <div className="flex flex-col space-y-4 text-left flex-grow p-4">
                <div>
                    <label htmlFor="cpf" className="block text-lg font-bold text-[#173D65]">CPF</label>
                    <MaskedInput
                        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        render={(ref, props) => (
                            <input
                                {...props}
                                ref={ref as React.LegacyRef<HTMLInputElement>}
                                id="cpf"
                                className="mt-1 block w-full p-2 border border-[#173D65] rounded-md h-14"
                            />
                        )}
                    />
                    {cpfError && <span className="text-red-500 text-sm">{cpfError}</span>}
                </div>
                <div>
                    <label htmlFor="name" className="block text-lg font-bold text-[#173D65]">Nome Completo</label>
                    <input
                        type="text"
                        id="name"
                        className="mt-1 block w-full p-2 border border-[#173D65] rounded-md h-14"
                        value={name}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            if (!/\d/.test(inputValue)) {
                                setName(inputValue);
                            }
                        }}
                    />
                    {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
                </div>
                <div>
                    <label htmlFor="birthDate" className="block text-lg font-bold text-[#173D65]">Data de Nascimento</label>
                    <MaskedInput
                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                        value={birthDate}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            setBirthDate(inputValue);
                            if (validateBirthDate(inputValue)) {
                                setAge(calculateAge(inputValue).toString());
                            } else {
                                setAge('');
                            }
                        }}
                        render={(ref, props) => (
                            <input
                                {...props}
                                ref={ref as React.Ref<HTMLInputElement>}
                                id="birthDate"
                                className="mt-1 block w-full p-2 border border-[#173D65] rounded-md h-14"
                            />
                        )}
                    />
                    {birthDateError && <span className="text-red-500 text-sm">{birthDateError}</span>}
                    {age && <div className="mt-2 text-lg font-bold text-[#173D65]">Idade: {age}</div>}
                </div>
                <div>
                    <label htmlFor="solicitingDoctor" className="block text-lg font-bold text-[#173D65]">Médico Solicitante</label>
                    <input
                        type="text"
                        id="solicitingDoctor"
                        className="mt-1 block w-full p-2 border border-[#173D65] rounded-md h-14"
                        value={solicitingDoctor}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            if (!/\d/.test(inputValue)) {
                                setSolicitingDoctor(inputValue);
                            }
                        }}
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