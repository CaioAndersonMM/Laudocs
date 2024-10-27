// consultations.ts
export const consultations = [
    'Masculino',
    'Feminino',
    'Abdomen',
    'Cabeça e Pescoço',
    'Muscular',
    'Doppler',
    'Superfície',
    'Outros',
];

export const optionsMap = {
    Masculino: [
        { title: 'Axila', options: 'Detalhes aqui' },
        { title: 'Bolsa escrotal', options: 'Orientações sobre ultrassom escrotal' },
        { title: 'Mamas', options: 'Exame da mama...' },
        { title: 'Pélvis', options: 'Avaliação da saúde da pélvis.' },
        { title: 'Próstata', options: 'Avaliação da saúde da próstata.' },
        { title: 'Transretal', options: 'Avaliação da saúde dos rins' },
        { title: 'Ultra-sonografia', options: 'Avaliação da ultrassonografia' },

    ],
    Feminino: [
        { title: 'Axila', options: 'Detalhes aqui' },
        { title: 'Axila com Doppler', options: 'Detalhes aqui' },
        { title: 'Diu', options: 'Detalhes aqui' },
        { title: 'Nódulo', options: 'Detalhes aqui' },
        { title: 'Mamas', options: 'Detalhes aqui' },
        { title: 'Mamas com Doppler', options: 'Detalhes aqui' },
        { title: 'Morfológicas', options: 'Detalhes aqui' },
        { title: 'Obstétricas', options: 'Detalhes aqui' },
    ],
    Abdomen: [
        { title: 'Ultrassom Abdominal', options: 'Exame de imagem para avaliar órgãos abdominais, como fígado, vesícula biliar e rins.' },
        { title: 'Ultrassom Obstétrico', options: 'Avaliação do desenvolvimento do feto durante a gravidez.' },
        { title: 'Ultrassom de Tireóide', options: 'Exame para avaliar a glândula tireoide e detectar nódulos.' },
        { title: 'Ultrassom de Pelve', options: 'Avaliação de órgãos reprodutivos e urinários na região pélvica.' },
    ],
    'Cabeça e Pescoço': [
        { title: 'Ressonância Magnética', options: 'Exame de imagem para avaliar o cérebro e pescoço.' },
        { title: 'Exame de Audiometria', options: 'Avaliação da audição e saúde auditiva.' },
        { title: 'Consulta com Otorrinolaringologista', options: 'Avaliação de problemas de garganta, nariz e ouvido.' },
    ],
    Muscular: [
        { title: 'Exame de Força Muscular', options: 'Teste para avaliar a força dos músculos.' },
        { title: 'Fisioterapia', options: 'Tratamento para recuperação muscular e reabilitação.' },
    ],
    Doppler: [
        { title: 'Ultrassom Doppler', options: 'Avaliação do fluxo sanguíneo em veias e artérias.' },
        { title: 'Doppler Colorido', options: 'Exame que utiliza cores para visualizar o fluxo sanguíneo.' },
    ],
    Superfície: [
        { title: 'Ultrassom Facial', options: 'Tratamento estético para melhorar a pele do rosto.' },
        { title: 'Ultrassom Corporal', options: 'Terapia para aliviar dores e inflamações em áreas específicas.' },
    ],
    Outros: [
        { title: 'Consulta Geral', options: 'Avaliação médica completa com orientações.' },
    ],
};
