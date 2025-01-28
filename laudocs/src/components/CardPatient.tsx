
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { CardPatientProps } from '@/interfaces/AllInterfaces';
import Image from 'next/image';

export default function CardPatient({ id, pacienteId,nomePaiente, dataConsulta,idadePaciente, medicoSolicitante, removePatient, updatePatients}: CardPatientProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(nomePaiente);
  const [editedAge, setEditedAge] = useState(idadePaciente);
  const [editedDoctor, setEditedDoctor] = useState(medicoSolicitante);

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleEdit = async () => {
    try {
      await axios.put(`/api/pacientes/${id}`, {
         name: editedName, age: editedAge, solicitingDoctor: editedDoctor 
        });
      closeModal();
      const updatedPatients = await axios.get('/api/pacientes');
      updatePatients?.(updatedPatients.data);
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
    }
  };

  const remove = async (id: number, removePatient: (id: number) => void) => {
    try {
      await axios.delete(`${baseURL}/api/v1/consultas/${id}`);
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
          <h2 className="text-base font-extrabold text-cyan-800">{nomePaiente}, {idadePaciente} anos</h2>
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
            label="Idade"
            variant="outlined"
            type="number"
            value={editedAge}
            onChange={(e) => setEditedAge(Number(e.target.value))}
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