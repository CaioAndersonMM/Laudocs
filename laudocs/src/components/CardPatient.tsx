import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { CardPatientProps } from '@/interfaces/AllInterfaces';
import Image from 'next/image';
import dayjs from 'dayjs';
import { getToken } from '@/utils/token';

export default function CardPatient({
  id,
  pacienteId,
  nomePaciente,
  dataNascPaciente,
  dataConsulta,
  idadePaciente,
  medicoSolicitante,
  removePatient,
  updatePatients,
}: CardPatientProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(nomePaciente);
  const [editedDataNasc, setEditedDataNasc] = useState<string>(dayjs(dataNascPaciente).format('DD/MM/YYYY'));
  const [editedDoctor, setEditedDoctor] = useState(medicoSolicitante);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

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
    if (!validateBirthDate(editedDataNasc)) {
      setSnackbarMessage('Data de nascimento inválida.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (editedName.trim().length < 5 || editedDoctor.trim().length < 5) {
      setSnackbarMessage('Nome e médico solicitante devem ter pelo menos 5 caracteres.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const token = await getToken();
      if (!token) {
        setSnackbarMessage('Token de autenticação não encontrado.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      const pacienteAtualizado = {
        id,
        dataNascPaciente: editedDataNasc,
        pacienteId,
        medicoSolicitante: editedDoctor,
        nomePaciente: editedName,
      };

      await axios.put(`${baseURL}/api/v1/consultas/${id}`, pacienteAtualizado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axios.get(`${baseURL}/api/v1/consultas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      updatePatients?.(response.data);

      setSnackbarMessage('Paciente atualizado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      closeModal();
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      setSnackbarMessage('Erro ao atualizar paciente.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleRemove = async () => {
    if (!id || !removePatient) return;

    try {
      const token = await getToken();
      if (!token) {
        setSnackbarMessage('Token de autenticação não encontrado.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      await axios.put(`${baseURL}/api/v1/consultas/updateStatus/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      removePatient(id);

      const response = await axios.get(`${baseURL}/api/v1/consultas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      updatePatients?.(response.data);

      setSnackbarMessage('Paciente removido com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erro ao deletar paciente:', error);
      setSnackbarMessage('Erro ao remover paciente.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-2 mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center ml-2">
          <Image src="/assets/patientIcon.svg" alt="Icone Médico" width={24} height={24} className="mr-2" />
          <h2 className="text-base font-extrabold text-cyan-800">
            {nomePaciente}, {idadePaciente} anos
          </h2>
        </div>
        <button
          className="w-10 h-7 rounded-md bg-[#15AAAA] text-white flex items-center justify-center"
          onClick={openModal}
        >
          <span className="text-xs font-bold">
            <EditIcon />
          </span>
        </button>
      </div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center ml-2">
          <Image src="/assets/medicIcon.svg" alt="Icone Hospital" width={24} height={24} className="mr-2" />
          <p className="text-cyan-800 font-bold">{medicoSolicitante}</p>
        </div>
        <button
          className="w-10 h-7 rounded-md bg-[#15AAAA] text-white flex items-center justify-center"
          onClick={handleRemove}
        >
          <span className="text-xs font-bold">
            <DeleteIcon />
          </span>
        </button>
      </div>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            width: 300,
            margin: 'auto',
            marginTop: '20vh',
          }}
        >
          <h2 className="text-cyan-800 font-bold mb-4">Editar Paciente</h2>
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
            label="Data de Nascimento"
            variant="outlined"
            value={editedDataNasc}
            onChange={(e) => setEditedDataNasc(e.target.value)}
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

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}