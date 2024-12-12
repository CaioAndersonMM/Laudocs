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
  [key: string]: string | boolean | FormState;
}

interface Substituicoes {
  [key: string]: string | { [key: string]: string };
}

export const noduleQuestions = [
  { mark: 'isoecogenio', label: 'Isoecogênico às hs', options: ['Sim', 'Não'] },
  { mark: 'position', label: 'Paralelo', options: ['Sim', 'Não'] },
  { mark: 'reforcoacustico', label: 'Reforço acústico posterior', options: ['Com', 'Sem'] },
  { mark: 'sombra', label: 'Sombra', options: ['Sem', 'Com'] },
  { mark: 'margens', label: 'Margens circunstritas', options: ['Sim', 'Não'] },
  { mark: 'tecido', label: 'Tecido vizinho', options: ['Não comprometido', 'Comprometido'] },
  { mark: 'vascuintranodal', label: 'Vascularização intranodal', options: ['Sim', 'Não'] },
  { mark: 'medida', label: 'Medida em cm:', options: ['Sim', 'Não'], isNumberInput: true },
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

  const noduleInfoEsquerdo: string[] = [];
  const noduleInfoDireito: string[] = [];

  if (noduleLocation === 'Direita' || noduleLocation === 'Ambas') {
    for (let i = 0; i < noduleQuestions.length; i++) {
      const question = noduleQuestions[i];
      const questionAnswer = formState['direita_' + question.mark];
      console.log(`Question: ${question.label}, Answer: ${questionAnswer}`);
      if (questionAnswer === 'Sim') {
        noduleInfoEsquerdo.push(question.label);
      } else if (questionAnswer === 'Não') {
      } else if ((questionAnswer === 'Com') || (questionAnswer === 'Sem')) {
        noduleInfoEsquerdo.push(questionAnswer + ' ' + question.label);
      } 
      else {
        noduleInfoEsquerdo.push(question.label + ' ' + questionAnswer);
      }
    }
  }

  if (noduleLocation === 'Esquerda' || noduleLocation === 'Ambas') {
    for (let i = 0; i < noduleQuestions.length; i++) {
      const question = noduleQuestions[i];
      const questionAnswer = formState['esquerda_' + question.mark];
      console.log(`Question: ${question.label}, Answer: ${questionAnswer}`);
      if (questionAnswer === 'Sim') {
        noduleInfoDireito.push(question.label);
      } else if (questionAnswer === 'Não') {
      } else if ((questionAnswer === 'Com') || (questionAnswer === 'Sem')) {
        noduleInfoDireito.push(questionAnswer + ' ' + question.label);
      } 
      else {
        noduleInfoDireito.push(question.label + ' ' + questionAnswer);
      }
    }
  }

  let noduleInfoDireitoString = noduleInfoDireito.join(', ');
  noduleInfoDireitoString = noduleInfoDireitoString.toLowerCase();
  noduleInfoDireitoString = noduleInfoDireitoString.charAt(0).toUpperCase() + noduleInfoDireitoString.slice(1);

  let noduleInfoEsquerdoString = noduleInfoEsquerdo.join(', ');
  noduleInfoEsquerdoString = noduleInfoEsquerdoString.toLowerCase();
  noduleInfoEsquerdoString = noduleInfoEsquerdoString.charAt(0).toUpperCase() + noduleInfoEsquerdoString.slice(1);

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

  substituicoes['noduleinfodireita'] = hasNodule ? noduleInfoDireitoString : '';
  substituicoes['noduleinfoesquerda'] = hasNodule ? noduleInfoEsquerdoString : '';

  substituicoes['conclusao'] =
    hasNodule || hasAbnormalLymphNodes
      ? 'Alterações identificadas em ultrassom.'
      : 'Sem alterações significativas.';

  return substituicoes;
};

export default Questions;
