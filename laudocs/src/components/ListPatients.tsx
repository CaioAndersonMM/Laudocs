import CardPatient from "./CardPatient";
import { CardPatientInterface } from "../interfaces/CardPatientInterface";

interface ListPatientsProps {
  arrayOfPatients: CardPatientInterface[];
  onSelectPatient?: (patient: CardPatientInterface) => void;
  removePatient?: (id: string) => void;
}


export default function ListPatients({ arrayOfPatients, onSelectPatient, removePatient }: ListPatientsProps) {
  return (
    <div className="bg-[#173D65] text-white flex flex-col p-2 rounded-l-lg h-[97%]">
      <h1 className="mt-4 mb-7 text-center text-2xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Fila de Espera</h1>

      <div
        className="overflow-y-auto flex-1 px-8 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300"
        style={{
          maxHeight: 'calc(100vh - 120px)',
          scrollbarWidth: 'thin',
          scrollbarColor: '#4A5568 #CBD5E0',
        }}
      >
        {arrayOfPatients.map((patient) => (
          <div 
            key={patient.id} 
            onClick={() => onSelectPatient?.(patient)}
            className="cursor-pointer"
          >
            <CardPatient 
              id={patient.id} 
              name={patient.name} 
              age={patient.age} 
              solicitingDoctor={patient.solicitingDoctor} 
              removePatient={removePatient} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
