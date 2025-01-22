export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export const processFormState = (formState: string | null) => {
    let parsedFormState = formState ? JSON.parse(formState as string) : {};

    let newParsedFormState: { [key: string]: any } = {};

    console.log(parsedFormState);

    if (parsedFormState['Tem nódulo?'] === 'Sim') {
        if (parsedFormState['Onde está o Nódulo?'] === 'Esquerda') {
            newParsedFormState['Nódulo esquerdo'] = 'Presente';
        } else if (parsedFormState['Onde está o Nódulo?'] === 'Direita') {
            newParsedFormState['Nódulo direito'] = 'Presente';
        } else if (parsedFormState['Onde está o Nódulo?'] === 'Ambos') {
            newParsedFormState['Nódulo esquerdo'] = 'Presente';
            newParsedFormState['Nódulo direito'] = 'Presente';
        }
        newParsedFormState = { ['Presença de nódulo']: 'Sim', ...newParsedFormState };
    } else if (parsedFormState['Tem nódulo?'] === 'Não') {
        newParsedFormState['Nenhum nódulo encontrado'] = 'Sim';
    }

    if (parsedFormState['Há Doppler?'] === 'Sim') {
        newParsedFormState['Doppler presente'] = 'Sim';
    }

    if (parsedFormState['Linfonodos têm aspecto não habitual?'] === 'Sim') {
        newParsedFormState['Aspecto não habitual dos linfonodos'] = 'Sim';
        if (parsedFormState['Onde está o Linfonodo?'] === 'Esquerda') {
            newParsedFormState['Linfonodo esquerdo'] = 'Alterado';
        }
        else if (parsedFormState['Onde está o Linfonodo?'] === 'Direita') {
            newParsedFormState['Linfonodo direito'] = 'Alterado';
        }
        else {
            newParsedFormState['Linfonodo esquerdo'] = 'Alterado';
            newParsedFormState['Linfonodo direito'] = 'Alterado';
        }
    }

    delete parsedFormState['Tem nódulo?'];
    delete parsedFormState['Onde está o Nódulo?'];
    delete parsedFormState['Onde está o Linfonodo?'];
    delete parsedFormState['Linfonodos têm aspecto não habitual?'];
    delete parsedFormState['Há Doppler?'];

    parsedFormState = { ...newParsedFormState, ...parsedFormState };

    const idadePaciente = parsedFormState.patientAge;
    delete parsedFormState.patientAge;

    const nomePaciente = parsedFormState.patientName;
    delete parsedFormState.patientName;

    const dataExame = parsedFormState.data;
    delete parsedFormState.data;

    const tipoExame = parsedFormState.tipo;
    delete parsedFormState.tipo;

    const medicoSolicitante = parsedFormState.solicitingDoctor;
    delete parsedFormState.solicitingDoctor;

    const noduleData = parsedFormState.noduleData;
    delete parsedFormState.noduleData;

    const condicionalData = parsedFormState.conditionalData;
    delete parsedFormState.conditionalData;

    return { parsedFormState, idadePaciente, nomePaciente, dataExame, tipoExame, medicoSolicitante, noduleData, condicionalData };
};