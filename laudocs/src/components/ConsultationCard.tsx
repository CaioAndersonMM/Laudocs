// ConsultationCard.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface ConsultationCardProps {
    title: string;
    options: string;
    onClick: () => void; // Adicionando a propriedade onClick
}

const ConsultationCard: React.FC<ConsultationCardProps> = ({ title, options, onClick }) => {
    return (
        <Card
            sx={{
                backgroundColor: '#15AAAA',
                margin: 1,
                flex: '1 0 21%',
                cursor: 'pointer', // Muda o cursor para indicar que é clicável
                '&:hover': {
                    backgroundColor: '#0A8B8B', // Cor ao passar o mouse
                },
            }}
            onClick={onClick} // Adicionando o manipulador de clique
            key={title}
        >
            <CardContent>
                <Typography variant="h5" color="white">
                    {title}
                </Typography>
                <Typography variant="body1" color="white">
                    {options}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ConsultationCard;
