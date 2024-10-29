import { spawn } from 'child_process';
import path from 'path';

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { substituicoes } = req.body;

    // Define o caminho relativo para o script Python
    const scriptPath = path.join(process.cwd(), 'src', 'app', 'consulta', '[title]', 'docs.py');

    console.log("Caminho do script Python:", scriptPath); // Log do caminho do script

    // Configura o comando para executar o script Python
    const pythonProcess = spawn('python', [scriptPath, JSON.stringify(substituicoes)]);

    // Lida com a saída do script Python
    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data.toString()}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data.toString()}`);  // Converte o Buffer para string
        res.status(500).json({ message: 'Erro ao executar o script Python: ' + data.toString() });
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            res.status(200).json({ message: 'Documento gerado com sucesso!' });
        } else {
            res.status(500).json({ message: 'Erro ao gerar o documento' });
        }
    });
}
