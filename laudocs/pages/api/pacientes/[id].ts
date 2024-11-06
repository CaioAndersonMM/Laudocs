import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '../../../services/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!database) {
    console.error('Database not initialized');
    return res.status(500).json({ error: 'Database not initialized' });
  }

  const pacienteRef = doc(database, 'pacientes', id as string);

  try {
    if (req.method === 'GET') {
      const snapshot = await getDoc(pacienteRef);
      if (!snapshot.exists()) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      return res.status(200).json({ id: snapshot.id, ...snapshot.data() });
    }

    if (req.method === 'PUT') {
      const novosDados = req.body;
      await updateDoc(pacienteRef, novosDados);
      return res.status(200).json({ message: 'Paciente atualizado com sucesso' });
    }

    if (req.method === 'DELETE') {
      await deleteDoc(pacienteRef);
      return res.status(200).json({ message: 'Paciente excluído com sucesso' });
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Método ${req.method} não permitido`);
    
  } catch (error: unknown) {
    console.error('Erro ao processar a requisição:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return res.status(500).json({ error: 'Erro interno do servidor', details: errorMessage });
  }
}
