// components/ErrorModal.tsx
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ErrorModalProps {
    open: boolean;
    errorMessage: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ open, errorMessage, onClose }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-error-title"
            aria-describedby="modal-error-description"
        >
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', bgcolor: 'background.paper',
                p: 4, borderRadius: 1, color: '#173D65', textAlign: 'center'
            }}>
                <Typography id="modal-error-title" variant="h6" component="h2" className="text-red-700 font-bold">
                    Erro nos Dados
                </Typography>
                <Typography id="modal-error-description" sx={{ mt: 2 }}>
                    {errorMessage}
                </Typography>
                <Button onClick={onClose} sx={{ mt: 3, bgcolor: 'red' }} variant="contained" color="primary">
                    Fechar
                </Button>
            </Box>
        </Modal>
    );
};

export default ErrorModal;