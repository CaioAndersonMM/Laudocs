export interface CardConsultaInterface {
    id: number;
    dataConsulta: string;
    pacienteId: number;
    medicoSolicitante: string;
    laudoId?: number | null;
    nomePaiente: string;
    idadePaciente: number;

}

export interface SignUpProps {
    addConsulta: (consulta: CardConsultaInterface) => void;
}

export interface SelectConsultaProps {
    selectedConsulta: CardConsultaInterface | null;
    removePatientSelected: () => void;
}

export interface ListTypeConsultProps {
    consulta: CardConsultaInterface;
}

export interface ListConsultaProps {
    arrayOfConsultas: CardConsultaInterface[];
    onSelectConsulta?: (consulta: CardConsultaInterface) => void;
    removeConsulta?: (id: number) => void;
    updateConsulta?: (updatedPatients: CardConsultaInterface[]) => void;
}


export interface ConsultationCardProps {
    title: string;
    options: string;
    onClick: () => void; 
}

export interface CardPatientProps extends CardConsultaInterface {
    removePatient?: (id: number) => void;
    updatePatients?: (updatedPatients: CardConsultaInterface[]) => void;
}
  
