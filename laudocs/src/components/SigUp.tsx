"use client"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { blue } from '@mui/material/colors';


const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '1.3rem',
    color: theme.palette.getContrastText('#173D65'),
    backgroundColor: '#173D65',
    '&:hover': {
        backgroundColor: blue[700],
    },
}));

export default function SignUp() {
    return (
        <div className="bg-white flex flex-col justify-between h-full w-full p-4 text-[#173D65] font-bold rounded-r-lg border border-[#173D65]">
            <h1 className="mt-4 mb-7 text-center text-2xl font-extrabold" style={{ fontFamily: 'Inter, sans-serif' }}>Adicionar Paciente na Fila</h1>

            <div className="flex flex-col space-y-4 text-left flex-grow p-4">
                <div>
                    <label htmlFor="name" className="block text-lg font-bold text-[#173D65]">Nome Completo</label>
                    <input type="text" id="name" className="mt-1 block w-full p-2 border border-[#173D65] rounded-md h-14" />
                </div>
                <div>
                    <label htmlFor="age" className="block text-lg font-bold text-[#173D65]">Idade</label>
                    <input type="number" id="age" className="mt-1 block w-full p-2 border border-[#173D65] rounded-md h-14" />
                </div>
                <div>
                    <label htmlFor="condition" className="block text-lg font-bold text-[#173D65]">Médico Solicitante</label>
                    <input type="text" id="condition" className="mt-1 block w-full p-2 border border-[#173D65] rounded-md h-14" />
                </div>

                <div className='flex justify-start'>
                    <FormControlLabel
                        className='text-[#173D65] text-lg font-bold'
                        control={<Checkbox />}
                        label={<span className='font-bold'>Prioridade</span>}
                    />
                </div>
                <div className="w-full mt-4">
                    <ColorButton variant="contained" fullWidth sx={{ height: '70px', textTransform: 'none' }}>
                        Adicionar
                    </ColorButton>
                </div>
            </div>



        </div>
    );
}
