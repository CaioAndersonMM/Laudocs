import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import {ListTypeConsultProps } from '@/interfaces/AllInterfaces';

const consultations = [
    'Masculino',
    'Feminino',
    'Abdomen',
    'Cabeça e Pescoço',
    'Muscular',
    'Doppler',
    'Superfície',
    'Outros',
];



const ListTypeConsult: React.FC<ListTypeConsultProps> = ({ consulta }) => {
    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2}>
                {consultations.map((consultation, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <a
                            href={`/consultatype?patientId=${consulta.id}&consultation=${consultation}&doctor=${encodeURIComponent(consulta.medicoSolicitante)}&patientAge=${consulta.idadePaciente}&patientName=${encodeURIComponent(consulta.nomePaiente)}`} style={{ textDecoration: 'none' }} // O pacienteID é o id da consulta, mudar isso aqui depois
                        >
                            <Card
                                sx={{
                                    backgroundColor: '#15AAAA',
                                    textAlign: 'center',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#138E8E',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" color="white">
                                        {consultation}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </a>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ListTypeConsult;
