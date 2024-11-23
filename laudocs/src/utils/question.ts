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
  [key: string]: string | { [key: string]: string };
}

export const noduleQuestions = [
  { mark: 'isoecogenio', label: 'Isoecogênico às hs?', options: ['Sim', 'Não'] },
  { mark: 'position', label: 'Posição', options: ['Paralelo', 'Não paralelo'] },
  { mark: 'reforcoacustico',label: 'Reforço acústico posterior', options: ['Com reforço', 'Sem reforço'] },
  { mark: 'sombra',label: 'Sombra', options: ['Sem', 'Com'] },
  { mark: 'margens',label: 'Margens circunstritas', options: ['Sim', 'Não'] },
  { mark: 'tecido',label: 'Tecido vizinho', options: ['Não comprometido', 'Comprometido'] },
  { mark: 'vascuintranodal',label: 'Vascularização intranodal', options: ['Com vascularização', 'Sem vascularização'] },
  { mark: 'medida',label: 'Medida em cm:', options: ['Sim', 'Não'], isNumberInput: true },
    // { label: 'Distante em X cm da pele e cm do mamilo (caso mama)', options: [] },

];

export const preencherSubstituicoes = (
  formState: FormState,
  tipo: string,
  patient: string,
  age: string,
  data: string,
  doctor: string
): Substituicoes => {
  const substituicoes: Substituicoes = {
    typeUltrassom: tipo,
    patient,
    age,
    data,
    doctor,
  };

  const noduleLocation = formState['Onde está o Nódulo?'];
  substituicoes['noduledireita'] =
    noduleLocation === 'Direita' || noduleLocation === 'Ambas'
      ? 'Nódulo encontrado na axila direita.'
      : '';
  substituicoes['noduleesquerda'] =
    noduleLocation === 'Esquerda' || noduleLocation === 'Ambas'
      ? 'Nódulo encontrado na axila esquerda.'
      : '';

  const noduleInfo: { [key: string]: string } = {};
  noduleQuestions.forEach((question) => {
    const questionAnswer = formState[question.label];
    console.log(`Question: ${question.label}, Answer: ${questionAnswer}`);
    if (questionAnswer) {
      noduleInfo[question.mark] = typeof questionAnswer === 'string' ? questionAnswer : '';
    }
  });
  console.log('noduleInfo after loop:', noduleInfo);
  substituicoes['noduleInfo'] = noduleInfo;

  const lymphNodeLocation = formState['Onde está o Linfonodo?'];
  substituicoes['linfonododireito'] =
    lymphNodeLocation === 'Direita' || lymphNodeLocation === 'Ambas'
      ? 'Linfonodo axilar direito com aspecto não habitual.'
      : '';
  substituicoes['linfonodoesquerdo'] =
    lymphNodeLocation === 'Esquerda' || lymphNodeLocation === 'Ambas'
      ? 'Linfonodo axilar esquerdo com aspecto não habitual.'
      : '';

  const hasNodule = formState['Tem nódulo?'] === 'Sim';
  const hasAbnormalLymphNodes = formState['Linfonodos axilares têm aspecto não habitual?'] === 'Sim';

  substituicoes['conclusao'] =
    hasNodule || hasAbnormalLymphNodes
      ? 'Alterações identificadas em ultrassom.'
      : 'Conclusão do exame, sem alterações significativas.';

  return substituicoes;
};

export default Questions;
