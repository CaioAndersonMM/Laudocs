
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { CardPatientProps } from '@/interfaces/AllInterfaces';
import Image from 'next/image';
import dayjs from 'dayjs';

export default function CardPatient({ id, pacienteId,nomePaciente,dataNascPaciente,dataConsulta,idadePaciente, medicoSolicitante, removePatient, updatePatients}: CardPatientProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(nomePaciente);
  const [editedDataNasc, setEditeDataNasc] = useState<string>(dayjs(dataNascPaciente).format('DD/MM/YYYY'));
  const [editedDoctor, setEditedDoctor] = useState(medicoSolicitante);

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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

  const handleEdit = async () => {
      if (validateBirthDate(editedDataNasc) && editedName.trim().length >= 5 && editedDoctor.trim().length >= 5) {
    try {
      const pacienteAtualiado = {
        
        id: id,
        dataNascPaciente: editedDataNasc,
        pacienteId: pacienteId,
        medicoSolicitante: editedDoctor,
        nomePaciente: editedName,
    };
    console.log(pacienteAtualiado);
      const response = await axios.put(`${baseURL}/api/v1/consultas/${id}`, pacienteAtualiado);
      closeModal();
      const response2 = await axios.get(`${baseURL}/api/v1/consultas`);
      updatePatients?.(response2.data);
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
    }
  }
  else {
    console.error('Erro ao atualizar paciente: Dados inválidos');
  }
  };

  const remove = async (id: number, removePatient: (id: number) => void) => {
    try {
      await axios.put(`${baseURL}/api/v1/consultas/updateStatus/${id}`);
      removePatient(id);
      const response = await axios.get(`${baseURL}/api/v1/consultas`);
      updatePatients?.(response.data);
      console.log('Paciente deletado com sucesso');
    } catch (error) {
      console.error('Erro ao deletar paciente:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-2 mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center ml-2">
          <Image src="/assets/patientIcon.svg" alt="Icone Médico" width={24} height={24} className="mr-2" />
          <h2 className="text-base font-extrabold text-cyan-800">{nomePaciente}, {idadePaciente} anos</h2>
        </div>
        <button className="w-10 h-7 rounded-md bg-[#15AAAA] text-white flex items-center justify-center" onClick={openModal}>
          <span className="text-xs font-bold"> <EditIcon /> </span>
        </button>
      </div>
      <div className="flex items-center justify-between mb-1">

        <div className="flex items-center ml-2">
          <Image src="/assets/medicIcon.svg" alt="Icone Hospital" width={24} height={24} className="mr-2" />
          <p className="text-cyan-800 font-bold">{medicoSolicitante}</p>
        </div>
        <button className="w-10 h-7 rounded-md bg-[#15AAAA] text-white flex items-center justify-center" onClick={() => id && removePatient && remove(id, removePatient)}>
          <span className="text-xs font-bold"><DeleteIcon /></span>
        </button>
      </div>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, width: 300, margin: 'auto', marginTop: '20vh' }}>
          <h2 className='text-cyan-800 font-bold mb-4'>Editar Paciente</h2>
          <TextField
            label="Nome"
            variant="outlined"
            value={editedName}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-ZÀ-ÿ\s]*$/.test(value)) {
                setEditedName(value);
              }
            }}
            margin="normal"
          />
          <TextField
            label="data de Nascimento"
            variant="outlined"
            type="text"
            value={editedDataNasc}
            onChange={(e) => setEditeDataNasc((e.target.value))}
            margin="normal"
          />
          <TextField
            label="Médico Solicitante"
            variant="outlined"
            value={editedDoctor}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-ZÀ-ÿ\s]*$/.test(value)) {
                setEditedDoctor(value);
              }
            }}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Salvar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}