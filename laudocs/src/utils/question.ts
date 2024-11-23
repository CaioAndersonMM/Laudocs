const Questions: Record<string, {
  Selects: { label: string; options: string[] }[];
  Checkbox: { label: string }[];
  Markers: { [key: string]: string }
}> = {
  Mamas: {
    Selects: [
      {
        label: 'Tem nódulo?',
        options: ['Não', 'Sim'],
      },
      {
        label: 'Onde está o Nódulo?',
        options: ['Esquerda', 'Direita', 'Ambas'],
      },
      {
        label: 'Linfonodos axilares têm aspecto não habitual?',
        options: ['Sim', 'Não'],
      },
      {
        label: 'Onde está o Linfonodo?',
        options: ['Esquerda', 'Direita', 'Ambas'],
      },
    ],
    Checkbox: [],
    Markers: {
      noduledireita: 'Nódulo na Direita',
      noduleesquerda: 'Nódulo na Esquerda',
      linfonododireito: 'Linfonodo na Direita',
      linfonodoesquerdo: 'Linfonodo na Esquerda',
      conclusao: 'Conclusão sobre o exame',
    },
  },
  Axila: {
    Selects: [
      {
        label: 'Tem nódulo?',
        options: ['Não', 'Sim'],
      },
      {
        label: 'Onde está o Nódulo?',
        options: ['Esquerda', 'Direita', 'Ambas'],
      },
    ],
    Checkbox: [],
    Markers: {
      noduledireita: 'Nódulo na Direita',
      noduleesquerda: 'Nódulo na Esquerda',
      conclusao: 'Conclusão do diagnóstico',
    },
  },
};

interface FormState {
  [key: string]: string | boolean;
}

interface Substituicoes {
  [key: string]: string;
}

export const noduleQuestions = [
  { label: 'Isoecogênico às hs?', options: ['Sim', 'Não'] },
  { label: 'Posição', options: ['Paralelo', 'Não paralelo'] },
  { label: 'Reforço acústico posterior', options: ['Com reforço', 'Sem reforço'] },
  { label: 'Sombra', options: ['Sem', 'Com'] },
  { label: 'Margens circunstritas', options: ['Sim', 'Não'] },
  { label: 'Tecido vizinho', options: ['Não comprometido', 'Comprometido'] },
  { label: 'Vascularização intranodal', options: ['Com vascularização', 'Sem vascularização'] },
  { label: 'Medida em cm:', options: ['Sim', 'Não'], isNumberInput: true },
  // { label: 'Distante em X cm da pele e cm do mamilo (caso mama)', options: [] },
];

export const preencherSubstituicoes = (formState: FormState, tipo: string, patient: string, age: string, data: string, doctor: string): Substituicoes => {
  const substituicoes: Substituicoes = {
    typeUltrassom: tipo,
    patient,
    age,
    data,
    doctor,
    ...formState,
  };

  if (formState['Onde está o Nódulo?'] === 'Direita') {
    substituicoes['noduledireita'] = 'Nódulo encontrado na axila direita.';
    substituicoes['noduleesquerda'] = '';
  } else if (formState['Onde está o Nódulo?'] === 'Esquerda') {
    substituicoes['noduledireita'] = '';
    substituicoes['noduleesquerda'] = 'Nódulo encontrado na axila esquerda.';
  } else if (formState['Onde está o Nódulo?'] === 'Ambas') {
    substituicoes['noduledireita'] = 'Nódulo encontrado na axila direita.';
    substituicoes['noduleesquerda'] = 'Nódulo encontrado na axila esquerda.';
  } else {
    substituicoes['noduledireita'] = '';
    substituicoes['noduleesquerda'] = '';
  }

  if(formState['Onde está o Linfonodo?'] === 'Direita') {
    substituicoes['linfonododireito'] = 'Linfonodo axilar direito com aspecto não habitual.';
    substituicoes['linfonodoesquerdo'] = '';
  } else if (formState['Onde está o Linfonodo?'] === 'Esquerda') {
    substituicoes['linfonododireito'] = '';
    substituicoes['linfonodoesquerdo'] = 'Linfonodo axilar esquerdo com aspecto não habitual.';
  }
  else if (formState['Onde está o Linfonodo?'] === 'Ambas') {
    substituicoes['linfonododireito'] = 'Linfonodo axilar direito com aspecto não habitual.';
    substituicoes['linfonodoesquerdo'] = 'Linfonodo axilar esquerdo com aspecto não habitual.';
  } else {
    substituicoes['linfonododireito'] = '';
    substituicoes['linfonodoesquerdo'] = '';
  }

  // Avaliar depois como será a conclusão
  if (formState['Tem nódulo?'] === 'Sim' || formState['Linfonodos axilares têm aspecto não habitual?'] === 'Sim') {
    substituicoes['conclusao'] = 'Alterações identificadas em ultrassom.';
  } else {
    substituicoes['conclusao'] = 'Conclusão do exame, sem alterações significativas.';
  }

  return substituicoes;
};

export default Questions;