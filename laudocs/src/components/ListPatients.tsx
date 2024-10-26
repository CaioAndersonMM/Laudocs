import CardPatient from "./CardPatient";
import { CardPatientInterface } from "../interfaces/CardPatientInterface";

interface ListPatientsProps {
  arrayOfPatients: CardPatientInterface[];
}

export default function ListPatients({ arrayOfPatients }: ListPatientsProps) {
    return (
        <div className="bg-[#173D65] text-white flex flex-col p-2 h-full"> 
        <h1 className="mb-7 text-center">Fila de Espera</h1>

        <div className="overflow-y-auto flex-1 pr-2" style={{ maxHeight: 'calc(100vh - 120px)' }}> 
            {arrayOfPatients.map((patient) => (
                <CardPatient key={patient.id} id={patient.id} name={patient.name} age={patient.age} solicitingDoctor={patient.solicitingDoctor} />
            ))}
        </div>
      </div>
    );
}
