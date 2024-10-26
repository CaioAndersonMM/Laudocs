import { CardPatientInterface } from '@/interfaces/CardPatientInterface';
import Icon1 from '../assets/medicIcon.svg';
import Icon2 from '../assets/patientIcon.svg';


export default function CardPatient({ id, name, age, solicitingDoctor }: CardPatientInterface) {
  return (
    <div className="bg-white shadow-md rounded-lg p-2 mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center ml-2">
          <img src="/assets/patientIcon.svg" alt="Icone Médico" className="w-6 h-6 mr-2" />
          <h2 className="text-base font-extrabold text-cyan-800">{name}, {age}</h2>
        </div>
        <button className="w-10 h-7 rounded-md bg-[#15AAAA] text-white flex items-center justify-center">
          <span className="text-xs font-bold">X</span>
        </button>
      </div>
      <div className="flex items-center justify-between mb-1">

        <div className="flex items-center ml-2">
          <img src="/assets/medicIcon.svg" alt="Icone Hospital" className="w-6 h-6 mr-2" />
          <p className="text-cyan-800 font-bold">{solicitingDoctor}</p>
        </div>
        <button className="w-10 h-7 rounded-md bg-[#15AAAA] text-white flex items-center justify-center">
          <span className="text-xs font-bold">Y</span>
        </button>
      </div>
    </div>
  );
};

