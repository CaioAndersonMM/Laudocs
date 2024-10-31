import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { CardPatientInterface } from '@/interfaces/CardPatientInterface';

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

interface ListTypeConsultProps {
    patient: CardPatientInterface;
}

const ListTypeConsult: React.FC<ListTypeConsultProps> = ({ patient }) => {
    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2}>
                {consultations.map((consultation, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <a
                            href={`/consultatype?patientId=${patient.id}&consultation=${consultation}&doctor=${encodeURIComponent(patient.solicitingDoctor)}&patientAge=${patient.age}&patientName=${encodeURIComponent(patient.name)}`} style={{ textDecoration: 'none' }}
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
