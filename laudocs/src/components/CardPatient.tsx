import { CardPatientInterface } from '@/interfaces/CardPatientInterface';


export default function CardPatient({ id, name, age, solicitingDoctor}: CardPatientInterface) {
    return (
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h2 className="text-base font-bold mb-2 text-cyan-800">{name}</h2>
        <p className="text-gray-700">{solicitingDoctor}</p>
      </div>
    );
  };
  
  