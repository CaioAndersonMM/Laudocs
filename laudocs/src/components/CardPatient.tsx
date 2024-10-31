
import { CardPatientInterface } from '@/interfaces/CardPatientInterface';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

interface CardPatientProps extends CardPatientInterface {
  removePatient?: (id: string) => void;
}

export default function CardPatient({ id, name, age, solicitingDoctor, removePatient }: CardPatientProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedAge, setEditedAge] = useState(age);
  const [editedDoctor, setEditedDoctor] = useState(solicitingDoctor);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEdit = async () => {
    try {
      await axios.put(`/api/pacientes/${id}`, { name: editedName, age: editedAge });
      closeModal();
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
    }
  };

  const remove = async (id: string, removePatient: (id: string) => void) => {
    try {
      await axios.delete(`/api/pacientes/${id}`);
      removePatient(id);
    } catch (error) {
      console.error('Erro ao deletar paciente:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-2 mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center ml-2">
          <img src="/assets/patientIcon.svg" alt="Icone Médico" className="w-6 h-6 mr-2" />
          <h2 className="text-base font-extrabold text-cyan-800">{name}, {age} anos</h2>
        </div>
        <button className="w-10 h-7 rounded-md bg-[#15AAAA] text-white flex items-center justify-center" onClick={openModal}>
          <span className="text-xs font-bold"> <EditIcon /> </span>
        </button>
      </div>
      <div className="flex items-center justify-between mb-1">

        <div className="flex items-center ml-2">
          <img src="/assets/medicIcon.svg" alt="Icone Hospital" className="w-6 h-6 mr-2" />
          <p className="text-cyan-800 font-bold">{solicitingDoctor}</p>
        </div>
        <button className="w-10 h-7 rounded-md bg-[#15AAAA] text-white flex items-center justify-center" onClick={() => id && removePatient && remove(id, removePatient)}>
          <span className="text-xs font-bold"><DeleteIcon /></span>
        </button>
      </div>

      {/* Modal de edição */}
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
              if (/^[a-zA-ZÀ-ÿ\s]*$/.test(value)) { // Permite letras acentuadas e espaços
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