import CardPatient from "./CardPatient";
import { ListConsultaProps } from "../interfaces/AllInterfaces";



export default function ListConsultas({ arrayOfConsultas, onSelectConsulta, removeConsulta, updateConsulta }: ListConsultaProps) {
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
        {arrayOfConsultas.map((consulta) => (
          console.log("id da consulta", consulta.id),
          console.log("consulta", consulta),
          <div 
            key={consulta.id} 
            onClick={() => onSelectConsulta?.(consulta)}
            className="cursor-pointer"
          >
            <CardPatient 
              pacienteId={consulta.pacienteId}
              id={consulta.id} 
              dataConsulta={consulta.dataConsulta} 
              nomePaiente={consulta.nomePaiente}
              idadePaciente={consulta.idadePaciente}
              medicoSolicitante={consulta.medicoSolicitante}
              dataNascPaciente={consulta.dataNascPaciente} 
              removePatient={removeConsulta}
              updatePatients={updateConsulta}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
