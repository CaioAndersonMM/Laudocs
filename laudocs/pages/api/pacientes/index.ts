import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '../../../services/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!database) {
    console.error('Database not initialized');
    return res.status(500).json({ error: 'Database not initialized' });
  }

  const pacientesRef = collection(database, 'pacientes');

  try {
    if (req.method === 'GET') {
      const snapshot = await getDocs(pacientesRef);
      const pacientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json(pacientes);
    }

    if (req.method === 'POST') {
      const dados = req.body;
      const novoPaciente = await addDoc(pacientesRef, dados);
      return res.status(201).json({ id: novoPaciente.id, ...dados });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  } catch (error: unknown) {
    console.error('Erro ao processar a requisição:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ error: 'Erro interno do servidor', details: errorMessage });
  }
}
