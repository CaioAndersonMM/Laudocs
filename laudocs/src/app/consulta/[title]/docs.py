import sys
import json
import os
from docx import Document

def substituir_campos(substituicoes):
    # Define o caminho relativo para o documento base
    doc_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', 'public', 'docs', 'axila.docx'))
    # print(f"Path to document: {doc_path}")
    
    if not os.path.exists(doc_path):
        raise FileNotFoundError(f"Documento não encontrado: {doc_path}")

    doc = Document(doc_path)
    
    def substituir_texto(paragrafo, campo, valor):
        campo_formatado = f'{{{campo}}}'
        
        # Exibir mensagem de depuração
        if campo_formatado in paragrafo.text:
            # print(f"Substituindo {campo_formatado} por {valor} no parágrafo: {paragrafo.text}")
            # Substituição direta no texto do parágrafo
            paragrafo.text = paragrafo.text.replace(campo_formatado, valor)

    for paragrafo in doc.paragraphs:
        for campo, valor in substituicoes.items():
            substituir_texto(paragrafo, campo, valor)
    
    # Define o caminho para o arquivo gerado
    output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', 'public', 'docs', 'arquivo_gerado.docx'))
    print(f"Saving generated document to: {output_path}")  # Caminho do arquivo gerado
    doc.save(output_path)

if __name__ == "__main__":
    substituicoes = json.loads(sys.argv[1])  # Recebe o JSON como argumento
    substituir_campos(substituicoes)
