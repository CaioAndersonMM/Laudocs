export interface CardPatientInterface {
    id?: string; 
    name: string;
    solicitingDoctor: string;
    age: number;
    priority?: boolean;
}

export interface SignUpProps {
    addPatient: (patient: { id: string; name: string; age: number; solicitingDoctor: string; priority?: boolean; }) => void;
}

export interface SelectPatientProps {
    selectedPatient: CardPatientInterface | null;
    removePatientSelected: () => void;
}

export interface ListTypeConsultProps {
    patient: CardPatientInterface;
}

export interface ListPatientsProps {
    arrayOfPatients: CardPatientInterface[];
    onSelectPatient?: (patient: CardPatientInterface) => void;
    removePatient?: (id: string) => void;
}


export interface ConsultationCardProps {
    title: string;
    options: string;
    onClick: () => void; 
}

export interface CardPatientProps extends CardPatientInterface {
    removePatient?: (id: string) => void;
  }
  
