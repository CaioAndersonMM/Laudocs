const Questions: Record<string, {
  Selects: { label: string; options: string[]; mark: string; isNumberInput?: boolean; isTextInput?: boolean; isDateInput?: boolean }[];
  Checkbox: { label: string; mark: string }[];
  ConditionalSections?: { 
    [key: string]: { 
      condition: string; 
      fields: { 
        label: string; 
        options: string[]; 
        mark: string; 
        isNumberInput?: boolean; 
        isTextInput?: boolean; 
        isDateInput?: boolean; 
        questions?: { 
          label: string; 
          options: string[]; 
          mark: string; 
          isNumberInput?: boolean; 
          isTextInput?: boolean; 
          isDateInput?: boolean; 
        }[] 
      }[] 
    } 
  }
}> = {
  Mamas: {
    Selects: [
      {
        label: 'Tem nódulo?',
        options: ['Não', 'Sim'],
        mark: 'mamas_nodulo',
      },
      {
        label: 'Onde está o Nódulo?',
        options: ['Esquerda', 'Direita', 'Ambas'],
        mark: 'mamas_local_nodulo',
      },
      {
        label: 'Linfonodos têm aspecto não habitual?',
        options: ['Não', 'Sim'],
        mark: 'mamas_linfonodo',
      },
      {
        label: 'Onde está o Linfonodo?',
        options: ['Esquerda', 'Direita', 'Ambas'],
        mark: 'mamas_local_linfonodo',
      },
      {
        label: 'Medida em cm:',
        options: [],
        isNumberInput: true,
        mark: 'mamas_medida',
      },
    ],
    Checkbox: [],
  },
  Axila: {
    Selects: [
      {
        "label": "Há Doppler?",
        "options": ["Não", "Sim"],
        "mark": "condicional_axila_doppler"
      },
      // {
      //   "label": "Qual Axila?",
      //   "options": ["Esquerda", "Direita", "Ambas"],
      //   "mark": "axila_lado"
      // },
      {
        "label": "Tem nódulo?",
        "options": ["Não", "Sim"],
        "mark": "axila_nodulo"
      },
      {
        "label": "Onde está o Nódulo?",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "axila_local_nodulo"
      },
    ],
    Checkbox: [],
    ConditionalSections: {
      "condicional_axila_doppler": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Artéria axilar com fluxo pulsátil",
            "options": ["Sim", "Não"],
            "mark": "arteria_axilar_fluxo_normal_doppler"
          },
          {
            "label": "Veia axilar com fluxo fásico",
            "options": ["Sim", "Não"],
            "mark": "veia_axilar_fluxo_normal_doppler"
          }
        ]
      },
    }
  },
  Escrotal: {
    Selects: [
      {
        label: 'Tem nódulo?',
        options: ['Não', 'Sim'],
        mark: 'escrotal_nodulo',
      },
      {
        label: 'Onde está o Nódulo?',
        options: ['Esquerda', 'Direita', 'Ambas'],
        mark: 'escrotal_local_nodulo',
      },
      {
        label: 'Pele tem aspecto característico',
        options: ['Sim', 'Não'],
        mark: 'escrotal_pele',
      },
      {
        label: 'Sinais flogísticos',
        options: ['Sem', 'Com'],
        mark: 'escrotal_flogisticos',
      },
      {
        label: 'Topografia habitável',
        options: ['Sim', 'Não'],
        mark: 'escrotal_topografia',
      },
      {
        label: 'Forma, tamanho e aspecto',
        options: ['Normal', 'Alterado'],
        mark: 'escrotal_forma',
      },
      {
        label: 'Testículo Esquerdo em cm:',
        options: [],
        isNumberInput: true,
        mark: 'escrotal_testiculo_esquerdo',
      },
      {
        label: 'Testículo Direito em cm:',
        options: [],
        isNumberInput: true,
        mark: 'escrotal_testiculo_direito',
      },
    ],
    Checkbox: [],
  },
  Pelvis: {
    Selects: [
      {
        label: 'Tem nódulo?',
        options: ['Não', 'Sim'],
        mark: 'pelvis_nodulo',
      },
      {
        label: 'Onde está o Nódulo?',
        options: ['Esquerda', 'Direita', 'Ambas'],
        mark: 'pelvis_local_nodulo',
      },
      {
        label: 'Próstata em localização habitual',
        options: ['Sim', 'Não'],
        mark: 'prostata_localizacao',
      },
      {
        label: 'Próstata com limites precisos',
        options: ['Sim', 'Não'],
        mark: 'prostata_limites',
      },
      {
        label: 'Próstata com contornos regulares',
        options: ['Sim', 'Não'],
        mark: 'prostata_contornos',
      },
      {
        label: 'Próstata com nódulos ou cistos',
        options: ['Sim', 'Não'],
        mark: 'prostata_nodulos_cistos',
      },
      {
        label: 'Volume da próstata (em cm³)',
        options: [],
        isNumberInput: true,
        mark: 'prostata_volume',
      },
      {
        label: 'Peso estimado da próstata (em g)',
        options: [],
        isNumberInput: true,
        mark: 'prostata_peso',
      },
      {
        label: 'Bexiga repleta',
        options: ['Sim', 'Não'],
        mark: 'bexiga_repleta',
      },
      {
        label: 'Paredes da bexiga normoespessas',
        options: ['Sim', 'Não'],
        mark: 'bexiga_paredes',
      },
      {
        label: 'Resíduo pós-miccional (em ml)',
        options: [],
        isNumberInput: true,
        mark: 'residuo_pos_miccional',
      },
      {
        label: 'Vasos pélvicos bem localizados',
        options: ['Sim', 'Não'],
        mark: 'vasos_pelvicos',
      },
      {
        label: 'Fluxo normal nos vasos pélvicos',
        options: ['Sim', 'Não'],
        mark: 'fluxo_vasos_pelvicos',
      },
      {
        label: 'Musculatura pélvica sem sinais de alterações',
        options: ['Sim', 'Não'],
        mark: 'musculatura_pelvica',
      },
    ],
    Checkbox: [],
  },
  Prostata: {
    Selects: [
      {
        label: 'Próstata em localização habitual',
        options: ['Sim', 'Não'],
        mark: 'prostata_localizacao',
      },
      {
        label: 'Próstata com limites precisos',
        options: ['Sim', 'Não'],
        mark: 'prostata_limites',
      },
      {
        label: 'Próstata com contornos regulares',
        options: ['Sim', 'Não'],
        mark: 'prostata_contornos',
      },
      {
        label: 'Próstata com nódulos ou cistos',
        options: ['Sim', 'Não'],
        mark: 'prostata_nodulos_cistos',
      },
      {
        label: 'Bexiga repleta',
        options: ['Sim', 'Não'],
        mark: 'bexiga_repleta',
      },
      {
        label: 'Bexiga com forma normal',
        options: ['Sim', 'Não'],
        mark: 'bexiga_forma',
      },
      {
        label: 'Paredes da bexiga normoespessas',
        options: ['Sim', 'Não'],
        mark: 'bexiga_paredes',
      },
      {
        label: 'Conteúdo da bexiga anecóico',
        options: ['Sim', 'Não'],
        mark: 'bexiga_conteudo',
      },
      {
        label: 'Medidas da próstata (em cm)',
        options: [],
        isNumberInput: true,
        mark: 'prostata_medidas',
      },
      {
        label: 'Volume da próstata (em cm³)',
        options: [],
        isNumberInput: true,
        mark: 'prostata_volume',
      },
      {
        label: 'Peso estimado da próstata (em g)',
        options: [],
        isNumberInput: true,
        mark: 'prostata_peso',
      },
      {
        label: 'Resíduo pós-miccional da bexiga (em ml)',
        options: [],
        isNumberInput: true,
        mark: 'residuo_pos_miccional',
      },
    ],
    Checkbox: [],
  },
  Transretal: {
    Selects: [
      {
        label: 'Próstata em localização habitual',
        options: ['Sim', 'Não'],
        mark: 'prostata_localizacao',
      },
      {
        label: 'Próstata com limites precisos',
        options: ['Sim', 'Não'],
        mark: 'prostata_limites',
      },
      {
        label: 'Próstata com contornos regulares',
        options: ['Sim', 'Não'],
        mark: 'prostata_contornos',
      },
      {
        label: 'Próstata com nódulos ou coleções líquidas',
        options: ['Sim', 'Não'],
        mark: 'prostata_nodulos_colecoes',
      },
      {
        label: 'Zona periférica dentro dos padrões de normalidade',
        options: ['Sim', 'Não'],
        mark: 'zona_periferica_normal',
      },
      {
        label: 'Medidas da próstata (em cm)',
        options: [],
        isNumberInput: true,
        mark: 'prostata_medidas',
      },
      {
        label: 'Volume da próstata (em cm³)',
        options: [],
        isNumberInput: true,
        mark: 'prostata_volume',
      },
      {
        label: 'Peso estimado da próstata (em g)',
        options: [],
        isNumberInput: true,
        mark: 'prostata_peso',
      },
      {
        label: 'Bexiga vazia',
        options: ['Sim', 'Não'],
        mark: 'bexiga_vazia',
      },
      {
        label: 'Vesículas seminais bem visualizadas',
        options: ['Sim', 'Não'],
        mark: 'vesiculas_seminais',
      },
      {
        label: 'Alterações visíveis nas vesículas seminais',
        options: ['Sim', 'Não'],
        mark: 'alteracoes_vesiculas',
      },
    ],
    Checkbox: [],
  },
  Obstetrica: {
    Selects: [
      {
        label: 'Gestação única',
        options: ['Sim', 'Gemelar', 'Trigamelar'],
        mark: 'gestacao_unica',
      },
      {
        label: 'Situação longitudinal',
        options: ['Sim', 'Não'],
        mark: 'situacao_longitudinal',
      },
      {
        label: 'Apresentação cefálica',
        options: ['Sim', 'Não'],
        mark: 'apresentacao_cefalica',
      },
      {
        label: 'Dorso à direita',
        options: ['Sim', 'Não'],
        mark: 'dorso_direita',
      },
      {
        label: 'Movimentos corporais visíveis',
        options: ['Sim', 'Não'],
        mark: 'movimentos_visiveis',
      },
      {
        label: 'Batimentos cardíacos visíveis (em bpm)',
        options: [],
        isNumberInput: true,
        mark: 'batimentos_cardiacos',
      },
      {
        label: 'Tônus preservado',
        options: ['Sim', 'Não'],
        mark: 'tonus_preservado',
      },
      {
        label: 'Relação ventrículo lateral/hemisfério cerebral normal',
        options: ['Sim', 'Não'],
        mark: 'relacao_ventriculo_hemisferio',
      },
      {
        label: 'Coração com 4 câmaras visíveis',
        options: ['Sim', 'Não'],
        mark: 'coracao_quatro_camaras',
      },
      {
        label: 'Estômago e bexiga contendo líquido',
        options: ['Sim', 'Não'],
        mark: 'estomago_bexiga_liquido',
      },
      {
        label: 'Rins tópicos',
        options: ['Sim', 'Não'],
        mark: 'rins_topicos',
      },
      {
        label: 'Genitália externa provável',
        options: [],
        isTextInput: true,
        mark: 'genitalia_externa',
      },
      {
        label: 'DBP (em mm)',
        options: [],
        isNumberInput: true,
        mark: 'dbp',
      },
      {
        label: 'CC (em mm)',
        options: [],
        isNumberInput: true,
        mark: 'cc',
      },
      {
        label: 'CA (em mm)',
        options: [],
        isNumberInput: true,
        mark: 'ca',
      },
      {
        label: 'CF (em mm)',
        options: [],
        isNumberInput: true,
        mark: 'cf',
      },
      {
        label: 'Peso fetal estimado (em g)',
        options: [],
        isNumberInput: true,
        mark: 'peso_fetal_estimado',
      },
      {
        label: 'Prega nucal (em mm)',
        options: [],
        isNumberInput: true,
        mark: 'prega_nucal',
      },
      {
        label: 'Ângulo OFM < 90 graus',
        options: ['Sim', 'Não'],
        mark: 'angulo_ofm',
      },
      {
        label: 'Placenta corporal de inserção anterior',
        options: ['Sim', 'Não'],
        mark: 'placenta_insercao_anterior',
      },
      {
        label: 'Ecogenicidade homogênea da placenta',
        options: ['Sim', 'Não'],
        mark: 'placenta_ecogenicidade',
      },
      {
        label: 'Grau de maturidade da placenta',
        options: [],
        isTextInput: true,
        mark: 'grau_maturidade_placenta',
      },
      {
        label: 'Líquido amniótico com volume normal',
        options: ['Sim', 'Não'],
        mark: 'liquido_amniotico_normal',
      },
      {
        label: 'Idade gestacional estimada (semanas e dias)',
        options: [],
        isTextInput: true,
        mark: 'idade_gestacional',
      },
      {
        label: 'Data provável do parto (DPP)',
        options: [],
        isDateInput: true,
        mark: 'dpp',
      },
    ],
    Checkbox: [],
  },
  Morfologicas: {
    "Selects": [
      {
        "label": "Feto único",
        "options": ["Sim", "Não"],
        "mark": "feto_unico"
      },
      {
        "label": "Situação longitudinal",
        "options": ["Sim", "Não"],
        "mark": "situacao_longitudinal"
      },
      {
        "label": "Apresentação cefálica",
        "options": ["Sim", "Não"],
        "mark": "apresentacao_cefalica"
      },
      {
        "label": "Dorso à esquerda",
        "options": ["Sim", "Não"],
        "mark": "dorso_esquerda"
      },
      {
        "label": "Movimentos corporais visíveis",
        "options": ["Sim", "Não"],
        "mark": "movimentos_visiveis"
      },
      {
        "label": "Batimentos cardíacos visíveis",
        "options": ["Sim", "Não"],
        "mark": "batimentos_visiveis"
      },
      {
        "label": "Tônus preservado",
        "options": ["Sim", "Não"],
        "mark": "tonus_preservado"
      },
      {
        "label": "Ventrículos cerebrais bem visualizados",
        "options": ["Sim", "Não"],
        "mark": "ventriculos_bem_visualizados"
      },
      {
        "label": "Cerebelo medindo",
        "options": [],
        "isNumberInput": true,
        "mark": "cerebelo_medindo"
      },
      {
        "label": "Relação ventrículo lateral/hemisfério cerebral",
        "options": [],
        "isNumberInput": true,
        "mark": "relacao_ventriculo_hemisferio"
      },
      {
        "label": "Átrio ventricular medindo",
        "options": [],
        "isNumberInput": true,
        "mark": "atrio_ventricular_medindo"
      },
      {
        "label": "Cisterna magna medindo",
        "options": [],
        "isNumberInput": true,
        "mark": "cisterna_magna_medindo"
      },
      {
        "label": "Lábios e narinas bem visualizados",
        "options": ["Sim", "Não"],
        "mark": "labios_narinas_bem_visualizados"
      },
      {
        "label": "Osso nasal medindo",
        "options": [],
        "isNumberInput": true,
        "mark": "osso_nasal_medindo"
      },
      {
        "label": "Pescoço sem circular de cordão",
        "options": ["Sim", "Não"],
        "mark": "pescoço_sem_circular"
      },
      {
        "label": "Coração com 4 câmaras visíveis",
        "options": ["Sim", "Não"],
        "mark": "coracao_4_camaras"
      },
      {
        "label": "Válvulas mitral e tricúspide visualizadas",
        "options": ["Sim", "Não"],
        "mark": "valvulas_mitral_tricuspide"
      },
      {
        "label": "Arco aórtico e aorta torácica bem visualizados",
        "options": ["Sim", "Não"],
        "mark": "arco_aortico_aorta_visualizados"
      },
      {
        "label": "Aorta abdominal visualizada até bifurcação",
        "options": ["Sim", "Não"],
        "mark": "aorta_abdominal_bifurcacao"
      },
      {
        "label": "Diafragma presente",
        "options": ["Sim", "Não"],
        "mark": "diafragma_presente"
      },
      {
        "label": "Estômago e bexiga com líquido em seu interior",
        "options": ["Sim", "Não"],
        "mark": "estomago_bexiga_com_liquido"
      },
      {
        "label": "Rins tópicos sem alterações morfológicas",
        "options": ["Sim", "Não"],
        "mark": "rins_topicos_sem_alteracoes"
      },
      {
        "label": "Fígado visualizado com ecotextura habitual",
        "options": ["Sim", "Não"],
        "mark": "figado_ecotextura"
      },
      {
        "label": "Genitália externa provável",
        "options": ["Sim", "Não"],
        "mark": "genitalia_externa"
      }
    ],
    "Checkbox": [],
  },
  Transvarginal: {
    "Selects": [
      {
        "label": "Bexiga",
        "options": ["Vazia", "Cheia"],
        "mark": "bexiga_vazia"
      },
      {
        "label": "Vagina no Exame?",
        "options": ["Não", "Sim"],
        "mark": "condicional_alteracoes_vagina"
      },
      {
        "label": "Utero no Exame?",
        "options": ["Não", "Sim"],
        "mark": "condicional_alteracoes_utero"
      },
      {
        "label": "Endométrio no Exame?",
        "options": ["Não", "Sim"],
        "mark": "condicional_alteracoes_endometrio"
      },
      {
        "label": "Ovario Esquerdo no Exame?",
        "options": ["Não", "Sim"],
        "mark": "condicional_alteracoes_OvarioEsquerdo"
      },
      {
        "label": "Ovario Direito no Exame?",
        "options": ["Não", "Sim"],
        "mark": "condicional_alteracoes_OvarioDireito"
      },
   
      {
        "label": "Transvaginal seriada",
        "options": ["Sim", "Não"],
        "mark": "transvaginal_seriada"
      },
      {
        "label": "Avaliação de cólon",
        "options": ["Sim", "Não"],
        "mark": "avaliacao_colon"
      },
      {
        "label": "Pós-histerectomia",
        "options": ["Sim", "Não"],
        "mark": "pos_histerectomia"
      },
      {
        "label": "Há Doppler",
        "options": ["Não", "Sim"],
        "mark": "condicional_transvarginal_doppler"
      },
      {
        "label": "Contagem de folículos",
        "options": ["Sim", "Não"],
        "mark": "contagem_foliculos"
      },
      {
        "label": "MUSA IETA FIGO",
        "options": ["Sim", "Não"],
        "mark": "musa_ieta_figo"
      }
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_transvarginal_doppler": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Artéria uterina com fluxo pulsátil",
            "options": ["Sim", "Não"],
            "mark": "arteria_uterina_fluxo_pulsatil"
          },
          {
            "label": "Veia uterina com fluxo fásico",
            "options": ["Sim", "Não"],
            "mark": "veia_uterina_fluxo_fasico"
          }
        ]
      },
      "condicional_alteracoes_vagina": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Alterações acústicas",
            "options": ["Sem", "Com"],
            "mark": "alteracoes_acusticas_vagina"
          },
        ]
      },
      "condicional_alteracoes_utero": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Medida do Útero:",
            "options": [''],
            "isTextInput": true,
            "mark": "medidas_utero_volume"
          },
          {
            "label": "Medida do Corpo:",
            "options": [''],
            "isTextInput": true,
            "mark": "medidas_corpo_volume"
          },
          {
            "label": "Alterações acústicas",
            "options": ["Sem", "Com"],
            "mark": "alteracoes_acusticas_vagina"
          },
          {
            "label": "Em AVF (Anteversoflexão)",
            "options": ["Sim", "Não"],
            "mark": "utero_avf"
          },
          {
            "label": "Centrado",
            "options": ["Sim", "Não"],
            "mark": "utero_centrado"
          },
          {
            "label": "Contornos da serosa",
            "options": ["Regulares", "Não Regulares"],
            "mark": "utero_contornos_regulares"
          },
          {
            "label": "Limites",
            "options": ["Precisos", "Imprecisos"],
            "mark": "utero_limites_precisos"
          },
          {
            "label": "Miométrio com ecotextura",
            "options": ["Homogênea", "Não Homogênea"],
            "mark": "miometrio_ecotextura"
          },
          {
            "label": "Lesões miometriais",
            "options": ["Ausentes", "Presentes"],
            "mark": "lesoes_miometriais",
            "questions": [
              {
                "label": "Quantidade lesões miometriais",
                "options": [],
                "isNumberInput": true,
                "mark": "quantidade_lesoes_miometriais"
            },
            {
                "label": "Hipoecogênica",
                "options": ["Sim", "Não"],
                "mark": "hipoecogenicidade_lesoes_miometriais"
            },
            {
                "label": "Parede",
                "options": ["Posterior", "Anterior", "Lateral", "Fundica"],
                "mark": "parede_lesoes_miometriais"
            },
            {
                "label": "Tipo",
                "options": ["2-5", "0", "1", "2", "3", "4", "5", "6", "7", "8"],
                "mark": "tipo_lesoes_miometriais"
            },
            {
                "label": "Medida das lesões",
                "options": [],
                "isTextInput": true,
                "mark": "medida_lesoes_miometriais"
            },
            {
                "label": "IC",
                "options": ["1", "2", "3", "4", "5"],
                "mark": "ic_utero"
            }
            ]
          },
        ]
      },
      "condicional_alteracoes_endometrio": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Medida: ",
            "options": [],
            "isNumberInput": true,
            "mark": "medida_endometrio"
          },
          {
            "label": "Ecotextura",
            "options": ["Isoecogênica", "Hipoecogênica", "Hiperecogênica"],
            "mark": "ecotextura_endometrio"
          },
          {
            "label": "Uniformidade",
            "options": ["Homogênea", "Não Homogênea"],
            "mark": "uniformidade_endometrio"
          },
          {
            "label": "Linha endometrial central",
            "options": ["Linear", "Ondulada"],
            "mark": "linha_endometrial"
          },
          {
            "label": "Junção endometrio-miométrio",
            "options": ["Regular", "Não regular"],
            "mark": "juncao_endometrio_miometrio"
          },
          {
            "label": "Líquido intra-cavitário",
            "options": ["Ausente", "Presente"],
            "mark": "liquido_intra_cavitario"
          },
          {
            "label": "Lesões intra-cavitárias",
            "options": ["Ausentes", "Presentes"],
            "mark": "lesoes_intra_cavitarias"
          },
          {
            "label": "IC",
            "options": ["1", "2", "3", "4", "5"],
            "mark": "ic"
          }
        ]
      },
      "condicional_alteracoes_OvarioDireito": {
        "condition": "Sim",
        "fields": [
         
      {
        "label": "Parauterino",
        "options": ["Sim", "Não"],
        "mark": "ovario_direito_parauterino"
      },
      {
        "label": "Contornos",
        "options": ["Regulares", "Não regulares"],
        "mark": "ovario_direito_contornos_regulares"
      },
      {
        "label": "Limites",
        "options": ["Precisos", "Imprecisos"],
        "mark": "ovario_direito_limites_precisos"
      },
      {
        "label": "Ecotextura",
        "options": ["Habitual", "Não habitual"],
        "mark": "ovario_direito_ecotextura"
      },
      {
        "label": "Medida",
        "options": [],
        "isNumberInput": true,
        "mark": "ovario_direito_medida"
      },
      {
        "label": "Volume",
        "options": [],
        "isNumberInput": true,
        "mark": "ovario_direito_volume"
      }

        ]
      },
      "condicional_alteracoes_OvarioEsquerdo": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Parauterino",
            "options": ["Sim", "Não"],
            "mark": "ovario_esquerdo_parauterino"
          },
          {
            "label": "Contornos",
            "options": ["Regulares", "Não regulares"],
            "mark": "ovario_esquerdo_contornos_regulares"
          },
          {
            "label": "Limites",
            "options": ["Precisos", "Imprecisos"],
            "mark": "ovario_esquerdo_limites_precisos"
          },
          {
            "label": "Ecotextura",
            "options": ["Habitual", "Não habitual"],
            "mark": "ovario_esquerdo_ecotextura"
          },
          {
            "label": "Medida",
            "options": [],
            "isNumberInput": true,
            "mark": "ovario_esquerdo_medida"
          },
          {
            "label": "Volume",
            "options": [],
            "isNumberInput": true,
            "mark": "ovario_esquerdo_volume"
          }
    
        ]
      }
      
    }
  },
  Parede: {
    "Selects": [
      {
        label: 'Tem nódulo?',
        options: ['Não', 'Sim'],
        mark: 'mamas_nodulo',
      },
      {
        label: 'Onde está o Nódulo?',
        options: ['Esquerda', 'Direita', 'Ambas'],
        mark: 'mamas_local_nodulo',
      },
      {
        "label": "Pele e camada subcutânea de espessura normal",
        "options": ["Sim", "Não"],
        "mark": "pele_subcutanea_normal"
      },
      {
        "label": "Pele e camada subcutânea sem nódulos e/ou reentrâncias",
        "options": ["Sim", "Não"],
        "mark": "nódulos_reentrancias_ausentes"
      },
      {
        "label": "Musculatura abdominal sem sinais de roturas e/ou nodulações",
        "options": ["Sim", "Não"],
        "mark": "musculatura_abdominal_normal"
      },
      {
        "label": "Ausência de sinais de outras herniações abdominais",
        "options": ["Sim", "Não"],
        "mark": "ausencia_hernioes_abdominais"
      }
    ],
    "Checkbox": [],

  },
  Superior: {
    "Selects": [
      {
        "label": "Fígado com topografia e dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "figado_topografia_dimensoes_normais"
      },
      {
        "label": "Fígado com contornos lisos e regulares",
        "options": ["Sim", "Não"],
        "mark": "figado_contornos_regulares"
      },
      {
        "label": "Parênquima hepático com ecotextura homogênea",
        "options": ["Sim", "Não"],
        "mark": "parenquima_eco_homogeneo"
      },
      {
        "label": "Ausência de dilatação das vias biliares intra e extra-hepáticas",
        "options": ["Sim", "Não"],
        "mark": "dilatacao_vias_biliares"
      },
      {
        "label": "Veias supra-hepáticas e porta com calibres normais e trajetos regulares",
        "options": ["Sim", "Não"],
        "mark": "veias_suprahepaticas_normais"
      },
      {
        "label": "Hepatocolédoco com medidas normais",
        "options": ["Sim", "Não"],
        "mark": "hepatocolecodo_medidas_normais"
      },
      {
        "label": "Vesícula biliar com topografia e dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "vesicula_biliar_topografia_dimensoes_normais"
      },
      {
        "label": "Vesícula biliar com paredes normoespessas",
        "options": ["Sim", "Não"],
        "mark": "vesicula_biliar_paredes_normoespessas"
      },
      {
        "label": "Vesícula biliar com conteúdo homogêneo e anecóico",
        "options": ["Sim", "Não"],
        "mark": "vesicula_biliar_conteudo_homogeneo"
      },
      {
        "label": "Pâncreas com topografia e dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "pancreas_topografia_dimensoes_normais"
      },
      {
        "label": "Pâncreas com limites precisos",
        "options": ["Sim", "Não"],
        "mark": "pancreas_limites_precisos"
      },
      {
        "label": "Ausência de dilatação do ducto de Wirsung",
        "options": ["Sim", "Não"],
        "mark": "dilatacao_wirsung"
      },
      {
        "label": "Baço com topografia normal",
        "options": ["Sim", "Não"],
        "mark": "baco_topografia_normal"
      },
      {
        "label": "Baço com limites precisos e regulares",
        "options": ["Sim", "Não"],
        "mark": "baco_limites_precisos"
      },
      {
        "label": "Baço com dimensões habituais",
        "options": ["Sim", "Não"],
        "mark": "baco_dimensoes_habituais"
      },
      {
        "label": "Baço com ecotextura homogênea",
        "options": ["Sim", "Não"],
        "mark": "baco_eco_homogeneo"
      },
      {
        "label": "Baço com trama vascular preservada",
        "options": ["Sim", "Não"],
        "mark": "baco_trama_vascular_preservada"
      }
    ],
    "Checkbox": [],
  },
  Total: {
    "Selects": [
      {
        "label": "É pedriático?",
        "options": ["Não", "Sim"],
        "mark": "condicional_pedriatico_total"
      },
      {
        "label": "Fígado com topografia e dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "figado_topografia_dimensoes_normais"
      },
      {
        "label": "Fígado com contornos lisos e regulares",
        "options": ["Sim", "Não"],
        "mark": "figado_contornos_regulares"
      },
      {
        "label": "Parênquima hepático com ecotextura homogênea",
        "options": ["Sim", "Não"],
        "mark": "parenquima_eco_homogeneo"
      },
      {
        "label": "Ausência de dilatação das vias biliares intra e extra-hepáticas",
        "options": ["Sim", "Não"],
        "mark": "dilatacao_vias_biliares"
      },
      {
        "label": "Veias supra-hepáticas e porta com calibres normais e trajetos regulares",
        "options": ["Sim", "Não"],
        "mark": "veias_suprahepaticas_normais"
      },
      {
        "label": "Hepatocolédoco com medidas normais",
        "options": ["Sim", "Não"],
        "mark": "hepatocolecodo_medidas_normais"
      },
      {
        "label": "Vesícula biliar com topografia e dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "vesicula_biliar_topografia_dimensoes_normais"
      },
      {
        "label": "Vesícula biliar com paredes normoespessas",
        "options": ["Sim", "Não"],
        "mark": "vesicula_biliar_paredes_normoespessas"
      },
      {
        "label": "Vesícula biliar com conteúdo homogêneo e anecóico",
        "options": ["Sim", "Não"],
        "mark": "vesicula_biliar_conteudo_homogeneo"
      },
      {
        "label": "Pâncreas com topografia e dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "pancreas_topografia_dimensoes_normais"
      },
      {
        "label": "Pâncreas com limites precisos",
        "options": ["Sim", "Não"],
        "mark": "pancreas_limites_precisos"
      },
      {
        "label": "Ausência de dilatação do ducto de Wirsung",
        "options": ["Sim", "Não"],
        "mark": "dilatacao_wirsung"
      },
      {
        "label": "Baço com topografia normal",
        "options": ["Sim", "Não"],
        "mark": "baco_topografia_normal"
      },
      {
        "label": "Baço com limites precisos e regulares",
        "options": ["Sim", "Não"],
        "mark": "baco_limites_precisos"
      },
      {
        "label": "Baço com dimensões habituais",
        "options": ["Sim", "Não"],
        "mark": "baco_dimensoes_habituais"
      },
      {
        "label": "Baço com ecotextura homogênea",
        "options": ["Sim", "Não"],
        "mark": "baco_eco_homogeneo"
      },
      {
        "label": "Baço com trama vascular preservada",
        "options": ["Sim", "Não"],
        "mark": "baco_trama_vascular_preservada"
      },
      {
        "label": "Rins com topografia, contornos, forma e mobilidade normais",
        "options": ["Sim", "Não"],
        "mark": "rins_topografia_contornos_normais"
      },
      {
        "label": "Espessura e ecogenicidade do parênquima renal preservadas bilateralmente",
        "options": ["Sim", "Não"],
        "mark": "rins_parenquima_preservado"
      },
      {
        "label": "Relação córtico-medular mantida de ambos os lados",
        "options": ["Sim", "Não"],
        "mark": "relacao_cortico_medular"
      },
      {
        "label": "Ausência de sinais de hidronefrose ou dilatação dos sistemas pielocaliciais",
        "options": ["Sim", "Não"],
        "mark": "hidronefrose_dilatacao"
      },
      {
        "label": "Espaços peri-renais livres",
        "options": ["Sim", "Não"],
        "mark": "espacos_peri_renais_livres"
      },
      {
        "label": "Aorta com calibre e contornos normais",
        "options": ["Sim", "Não"],
        "mark": "aorta_calibre_contornos_normais"
      },
      {
        "label": "Bexiga repleta, de forma normal, com paredes normoespessas e conteúdo anecóico",
        "options": ["Sim", "Não"],
        "mark": "bexiga_repleta_norma"
      },
      {
        "label": "Ausência de massas ou líquido livre na cavidade abdominal",
        "options": ["Sim", "Não"],
        "mark": "masse_liquido_abdominal"
      }
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_pedriatico_total": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Rins com topografia, contornos, forma e mobilidade normais",
            "options": ["Sim", "Não"],
            "mark": "rins_topografia_contornos_normais"
          },
          {
            "label": "Espessura e ecogenicidade do parênquima renal preservadas bilateralmente",
            "options": ["Sim", "Não"],
            "mark": "rins_parenquima_preservado"
          },
          {
            "label": "Relação córtico-medular mantida de ambos os lados",
            "options": ["Sim", "Não"],
            "mark": "relacao_cortico_medular"
          },
          {
            "label": "Ausência de sinais de hidronefrose ou dilatação dos sistemas pielocaliciais",
            "options": ["Sim", "Não"],
            "mark": "hidronefrose_dilatacao"
          },
          {
            "label": "Espaços peri-renais livres",
            "options": ["Sim", "Não"],
            "mark": "espacos_peri_renais_livres"
          },
          {
            "label": "Aorta com calibre e contornos normais",
            "options": ["Sim", "Não"],
            "mark": "aorta_calibre_contornos_normais"
          },
          {
            "label": "Bexiga repleta, de forma normal, com paredes normoespessas e conteúdo anecóico",
            "options": ["Sim", "Não"],
            "mark": "bexiga_repleta_norma"
          },
          {
            "label": "Ausência de massas ou líquido livre na cavidade abdominal",
            "options": ["Sim", "Não"],
            "mark": "masse_liquido_abdominal"
          }
        ]
      }
    }
  },
  RimEnxertado: {
    "Selects": [
      {
        "label": "Rim enxertado com topografia, forma, contornos, mobilidade e dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "rim_enxertado_topografia_forma_normais"
      },
      {
        "label": "Espessura e ecogenicidade do parênquima renal preservadas",
        "options": ["Sim", "Não"],
        "mark": "espessura_ecogenicidade_preservadas"
      },
      {
        "label": "Espessura do parênquima renal",
        "options": ["Sim", "Não"],
        "mark": "espessura_parenquima_renal"
      },
      {
        "label": "Relação córtico-medular mantida",
        "options": ["Sim", "Não"],
        "mark": "relacao_cortico_medular_mantida"
      },
      {
        "label": "Ausência de sinais de hidronefrose ou dilatação pielocalicial",
        "options": ["Sim", "Não"],
        "mark": "hidronefrose_dilatacao_pielocalicial"
      },
      {
        "label": "Espaços peri-renais livres",
        "options": ["Sim", "Não"],
        "mark": "espacos_peri_renais_livres"
      },
      {
        "label": "Ureteres não visualizados",
        "options": ["Sim", "Não"],
        "mark": "ureteres_nao_visualizados"
      },
      {
        "label": "Bexiga repleta, de paredes finas e lisas, conteúdo anecóico",
        "options": ["Sim", "Não"],
        "mark": "bexiga_repleta_paredes_finas_lisas"
      },
      {
        "label": "Aorta abdominal bem visualizada com fluxo pulsátil",
        "options": ["Sim", "Não"],
        "mark": "aorta_abdominal_fluxo_pulsatil"
      },
      {
        "label": "Aorta sem refluxo e sem sinais de aneurisma",
        "options": ["Sim", "Não"],
        "mark": "aorta_sem_refluxo_aneurisma"
      },
      {
        "label": "Pico de velocidade sistólica da aorta",
        "options": ["Sim", "Não"],
        "mark": "aorta_pico_velocidade_sistolica"
      },
      {
        "label": "Artéria renal de rim enxertado visualizada com fluxo presente",
        "options": ["Sim", "Não"],
        "mark": "arteria_renal_fluxo_presente"
      },
      {
        "label": "Pico de velocidade sistólica da artéria renal de rim enxertado",
        "options": ["Sim", "Não"],
        "mark": "arteria_renal_pico_velocidade_sistolica"
      },
      {
        "label": "Relação aorta/artéria renal de rim enxertado",
        "options": ["Sim", "Não"],
        "mark": "relacao_aorta_art_renal"
      }
    ],
    "Checkbox": [],
  },
  Hipocondrio: {
    "Selects": [
      {
        "label": "Hipocôndrio (esquerdo, direito ou ambos)",
        "options": ["Esquerdo", "Direito", "Ambos"],
        "mark": "hipocondrio_localizacao"
      },
      {
        "label": "Fígado no Exame?",
        "options": ["Não Visualizado", "Sim"],
        "mark": "condicional_alteracoes_fígado"
      },
      {
        "label": "Vesícula Biliar no Exame?",
        "options": ["Não", "Sim"],
        "mark": "condicional_alteracoes_VesículaBiliar"
      },
      {
        "label": "Pâncreas no Exame?",
        "options": ["Não", "Sim"],
        "mark": "condicional_alteracoes_Pancreas"
      },
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_alteracoes_fígado": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Topografia Normal",
            "options": ["Com", "Sem"],
            "mark": "figado_topografia_normal"
          },
          {
            "label": "Dimensões",
            "options": ["Normais", "Anormais"],
            "mark": "figado_dimensoes_normais"
          },
          {
            "label": "Contornos",
            "options": ["Lisos e regulares", "Não lisos e regulares"],
            "mark": "figado_contornos_regulares"
          },
          {
            "label": "Parênquima de ecotextura",
            "options": ["Homogênea", "Não homogênea"],
            "mark": "figado_parenquima_homogeneo"
          },
          {
            "label": "Dilatação das vias biliares intra e extra-hepáticas",
            "options": ["Ausência de", "Presença de"],
            "mark": "figado_vias_biliares_normais"
          },
          {
            "label": "Veias supra-hepáticas e porta com calibres",
            "options": ["Normais", "Anormais"],
            "mark": "veias_suprahepaticas_normais"
          },
          {
            "label": "Trajetos",
            "options": ["Regulares", "Não regulares"],
            "mark": "veias_suprahepaticas_trajetos_regulares"
          },
          {
            "label": "Hepatocolédoco medindo normalmente",
            "options": [],
            "isNumberInput": true,
            "mark": "hepatocolecodo_medindo_normal"
          },
        
         
        ]
      },
      "condicional_alteracoes_VesículaBiliar":{
        "condition": "Sim",
        "fields": [
          {
            "label": "Topografia Normal",
            "options": ["Com", "Sem"],
            "mark": "vesicula_topografia_normal"
          },
          {
            "label": "Dimensões",
            "options": ["Normais", "Anormais"],
            "mark": "vesicula_dimensoes_normais"
          },
          {
            "label": "Conteúdo",
            "options": ["Homogêneo", "Não Homogêneo"],
            "mark": "vesicula_biliar_conteudo_homogeneo"
          },
          {
            "label": "Paredes",
            "options": ["Normoespessas", "Não normoespessas"],
            "mark": "vesicula_biliar_paredes_normoespessas"
          },

        ]
      },
      "condicional_alteracoes_Pancreas":{
        "condition": "Sim",
        "fields": [
          {
            "label": "Topografia Normal",
            "options": ["Com", "Sem"],
            "mark": "pancreas_topografia_normal"
          },
          {
            "label": "Dimensões",
            "options": ["Normais", "Anormais"],
            "mark": "pancreas_dimensoes_normais"
          },
          {
            "label": "Limites",
            "options": ["Precisos", "Não Precisos"],
            "mark": "pancreas_limites_precisos"
          },
          {
            "label": "Dilatação do Wirsung",
            "options": ["Ausência de", "Presença de"],
            "mark": "pancreas_sem_dilatacao_wirsung"
          },
        ]
      }
    }
  },
  FigadoViaBilares: {
    "Selects": [
      {
        "label": "Há Doppler",
        "options": ["Não", "Sim"],
        "mark": "condicional_doppler_bilares"
      },
      {
        "label": "Fígado com topografia normal",
        "options": ["Sim", "Não"],
        "mark": "figado_topografia_normal"
      },
      {
        "label": "Fígado com dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "figado_dimensoes_normais"
      },
      {
        "label": "Fígado com contornos lisos e regulares",
        "options": ["Sim", "Não"],
        "mark": "figado_contornos_regulares"
      },
      {
        "label": "Fígado com parênquima de ecotextura homogênea",
        "options": ["Sim", "Não"],
        "mark": "figado_parenquima_homogeneo"
      },
      {
        "label": "Fígado com ausência de dilatação das vias biliares intra e extra-hepáticas",
        "options": ["Sim", "Não"],
        "mark": "figado_vias_biliares_normais"
      },
      {
        "label": "Veias supra-hepáticas e porta com calibres normais e trajetos regulares",
        "options": ["Sim", "Não"],
        "mark": "veias_suprahepaticas_normais"
      },
      {
        "label": "Hepatocolédoco medindo normalmente",
        "options": ["Sim", "Não"],
        "mark": "hepatocolecodo_medindo_normal"
      },
      {
        "label": "Vesícula biliar com topografia e dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "vesicula_biliar_topografia_dimensoes_normais"
      },
      {
        "label": "Vesícula biliar com paredes normoespessas",
        "options": ["Sim", "Não"],
        "mark": "vesicula_biliar_paredes_normoespessas"
      },
      {
        "label": "Vesícula biliar com conteúdo homogêneo",
        "options": ["Sim", "Não"],
        "mark": "vesicula_biliar_conteudo_homogeneo"
      },
      {
        "label": "Pâncreas com topografia e dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "pancreas_topografia_dimensoes_normais"
      },
      {
        "label": "Pâncreas com limites precisos",
        "options": ["Sim", "Não"],
        "mark": "pancreas_limites_precisos"
      },
      {
        "label": "Pâncreas sem dilatação do Wirsung",
        "options": ["Sim", "Não"],
        "mark": "pancreas_sem_dilatacao_wirsung"
      },
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_doppler_bilares": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Artéria hepática com fluxo presente",
            "options": ["Sim", "Não"],
            "mark": "arteria_hepatica_fluxo_presente"
          },
          {
            "label": "Pico de velocidade sistólica da artéria hepática",
            "options": ["Sim", "Não"],
            "mark": "arteria_hepatica_pico_velocidade_sistolica"
          },
          {
            "label": "Veia porta com fluxo presente",
            "options": ["Sim", "Não"],
            "mark": "veia_porta_fluxo_presente"
          },
          {
            "label": "Pico de velocidade sistólica da veia porta",
            "options": ["Sim", "Não"],
            "mark": "veia_porta_pico_velocidade_sistolica"
          }
        ]
      }
    }
  },
  FID: {
    "Selects": [
      {
        "label": "Fossa ilíaca bem visualizada",
        "options": ["Sim", "Não"],
        "mark": "fossa_iliaca_visualizada"
      },
      {
        "label": "Estruturas musculares sem alterações",
        "options": ["Sim", "Não"],
        "mark": "estruturas_musculares_sem_alteracoes"
      },
      {
        "label": "Alças intestinais sem alterações",
        "options": ["Sim", "Não"],
        "mark": "alcas_intestinais_sem_alteracoes"
      },
      {
        "label": "Vasos sem alterações",
        "options": ["Sim", "Não"],
        "mark": "vasos_sem_alteracoes"
      }
    ],
    "Checkbox": [],
    
  },
  AparelhoUrinario: {
    "Selects": [
      {
        "label": "É Pediátrico?",
        "options": ["Não", "Sim"],
        "mark": "condicional_urinario_Pediatrico"
      },
      {
        "label": "Há Doppler",
        "options": ["Não", "Sim"],
        "mark": "condicional_doppler_Urinário"
      },

      {
        "label": "Rim Direito no Exame?",
        "options": ["Não", "Sim"],
        "mark": "condicional_RimDireito"
      },
      {
        "label": "Rim Esquerdo no Exame?",
        "options": ["Não", "Sim"],
        "mark": "condicional_RimEsquerdo"
      },
      {
        "label": "Bexiga no Exame?",
        "options": ["Não", "Sim"],
        "mark": "condicional_Bexiga"
      },
      {
        "label": "Ureteres",
        "options": ["Não Visualizados", "Visualizados"],
        "mark": "ureteres_visualizados"
      },
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_doppler_Urinário": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Artéria renal direita com fluxo presente",
            "options": ["Sim", "Não"],
            "mark": "arteria_renal_direita_fluxo_presente"
          },
          {
            "label": "Pico de velocidade sistólica da artéria renal direita",
            "options": ["Sim", "Não"],
            "mark": "arteria_renal_direita_pico_velocidade_sistolica"
          },
          {
            "label": "Artéria renal esquerda com fluxo presente",
            "options": ["Sim", "Não"],
            "mark": "arteria_renal_esquerda_fluxo_presente"
          },
          {
            "label": "Pico de velocidade sistólica da artéria renal esquerda",
            "options": ["Sim", "Não"],
            "mark": "arteria_renal_esquerda_pico_velocidade_sistolica"
          },
          {
            "label": "Relação aorta/artéria renal direita",
            "options": ["Sim", "Não"],
            "mark": "relacao_aorta_art_renal_direita"
          },
          {
            "label": "Relação aorta/artéria renal esquerda",
            "options": ["Sim", "Não"],
            "mark": "relacao_aorta_art_renal_esquerda"
          }
        ]
      },
      "condicional_urinario_Pediatrico": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Rim direito com dimensões normais",
            "options": ["Sim", "Não"],
            "mark": "rim_direito_dimensoes_normais"
          },
          {
            "label": "Rim esquerdo com dimensões normais",
            "options": ["Sim", "Não"],
            "mark": "rim_esquerdo_dimensoes_normais"
          }
        ]
      },
      "condicional_RimDireito": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Topografia",
            "options": ["Normal", "Anormal"],
            "mark": "rim_direito_topografia_normal"
          },
          {
            "label": "Forma",
            "options": ["Normal", "Anormal"],
            "mark": "rim_direito_forma_normal"
          },
          {
           "label": "Contornos",
            "options": ["Normais", "Anormais"],
            "mark": "rim_direito_contornos_normais"
          },
          {
            "label": "Mobilidade",
            "options": ["Normal", "Anormal"],
            "mark": "rim_direito_mobilidade_normal"
          },
          {
            "label": "Dimensões",
            "options": ["Normais", "Anormais"],
            "mark": "rim_direito_dimensoes_normais"
          },
          {
            "label": "Medindo: ",
            "options": [],
            "isNumberInput": true,
            "mark": "rim_direito_medindo"
          },
          {
          "label": "Espessura do Parênquima",
          "options": ["Preservadas", "Não Preservadas"],
          "mark": "rim_direito_parenquima_preservado"
          },
          {
            "label": "Ecogenicidade do Parênquima",
            "options": ["Preservada", "Não Preservada"],
            "mark": "rim_direito_ecogenicidade_parenquima"
          },
          {
            "label": "Espessura do Parênquima:",
            "options": [],
            "isNumberInput": true,
            "mark": "rim_direito_espessura_parenquima"
          },
          {
            "label": "Relação córtico-medular",
            "options": ["Mantida", "Não Mantida"],
            "mark": "rim_direito_relacao_cortico_medular"
          },
          {
            "label": "Sinais de hidronefrose ou dilatação pielocalicial",
            "options": ["Ausência de", "Presença de"],
            "mark": "rim_direito_hidronefrose_dilatacao"
          },
          {
            "label": "Espaços peri-renais",
            "options": ["Livres", "Não Livres"],
            "mark": "rim_direito_espacos_peri_renais"
          }
        ]
      },
      "condicional_RimEsquerdo": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Topografia",
            "options": ["Normal", "Anormal"],
            "mark": "rim_esquerdo_topografia_normal"
          },
          {
            "label": "Forma",
            "options": ["Normal", "Anormal"],
            "mark": "rim_esquerdo_forma_normal"
          },
          {
           "label": "Contornos",
            "options": ["Normais", "Anormais"],
            "mark": "rim_esquerdo_contornos_normais"
          },
          {
            "label": "Mobilidade",
            "options": ["Normal", "Anormal"],
            "mark": "rim_esquerdo_mobilidade_normal"
          },
          {
            "label": "Dimensões",
            "options": ["Normais", "Anormais"],
            "mark": "rim_esquerdo_dimensoes_normais"
          },
          {
            "label": "Medindo: ",
            "options": [],
            "isNumberInput": true,
            "mark": "rim_esquerdo_medindo"
          },
          {
          "label": "Espessura do Parênquima",
          "options": ["Preservadas", "Não Preservadas"],
          "mark": "rim_esquerdo_parenquima_preservado"
          },
          {
            "label": "Ecogenicidade do Parênquima",
            "options": ["Preservada", "Não Preservada"],
            "mark": "rim_esquerdo_ecogenicidade_parenquima"
          },
          {
            "label": "Espessura do Parênquima:",
            "options": [],
            "isNumberInput": true,
            "mark": "espessura_parenquima"
          },
          {
            "label": "Relação córtico-medular",
            "options": ["Mantida", "Não Mantida"],
            "mark": "relacao_cortico_medular"
          },
          {
            "label": "Sinais de hidronefrose ou dilatação pielocalicial",
            "options": ["Ausência de", "Presença de"],
            "mark": "hidronefrose_dilatacao"
          },
          {
            "label": "Espaços peri-renais",
            "options": ["Livres", "Não Livres"],
            "mark": "espacos_peri_renais"
          }
        ]
      },
      "condicional_Bexiga":{
        "condition": "Sim",
        "fields": [
          {
            "label": "Repleta",
            "options": ["Sim", "Não"],
            "mark": "bexiga_repleta"
          },
          {
            "label": "Paredes",
            "options": ["Finas e Lisas", "Não Finas e Lisas"],
            "mark": "bexiga_paredes_normoespessas"
          },
          {
            "label": "Conteúdo",
            "options": ["Anecóico", "Não Anecóico"],
            "mark": "bexiga_conteudo_homogeneo"
          },
        ]
      }
    }
  },
  RegiaoSacrococigea: {
    "Selects": [
      {
        "label": "Tem nódulo?",
        "options": ["Não", "Sim"],
        "mark": "nodulo"
      },
      {
        "label": "Onde está o Nódulo?",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "nodulo_localizacao"
      },
      {
        "label": "Pele e camada subcutânea de espessura normal",
        "options": ["Sim", "Não"],
        "mark": "pele_subcutanea_espessura_normal"
      },
      {
        "label": "Ausência de nódulos e/ou cistos",
        "options": ["Sim", "Não"],
        "mark": "ausencia_nodulos_cistos"
      }
    ],
    "Checkbox": [],
    
  },
  Facial: {
    "Selects": [
      {
        label: 'Linfonodos têm aspecto não habitual?',
        options: ['Não', 'Sim'],
        mark: 'linfonodos_normais_facial',
      },
      {
        label: 'Onde está o Linfonodo?',
        options: ['Esquerda', 'Direita', 'Ambas'],
        mark: 'mamas_local_linfonodo',
      },
      {
        "label": "Pele e tecido subcutâneo bem visualizados na lateral esquerda",
        "options": ["Sim", "Não"],
        "mark": "pele_tecido_subcutaneo_bem_visualizados_esquerda"
      },
      {
        "label": "Pele e tecido subcutâneo bem visualizados na lateral direita",
        "options": ["Sim", "Não"],
        "mark": "pele_tecido_subcutaneo_bem_visualizados_direita"
      },
      {
        "label": "Ausência de alterações visíveis na pele e tecido subcutâneo na lateral esquerda",
        "options": ["Sim", "Não"],
        "mark": "ausencia_alteracoes_pele_subcutaneo_esquerda"
      },
      {
        "label": "Ausência de alterações visíveis na pele e tecido subcutâneo na lateral direita",
        "options": ["Sim", "Não"],
        "mark": "ausencia_alteracoes_pele_subcutaneo_direita"
      },
    ],
    "Checkbox": [],
    
  },
  Tireoide: {
    "Selects": [
      {
        "label": "Tireóide com topografia normal",
        "options": ["Sim", "Não"],
        "mark": "tireoide_topografia_normal"
      },
      {
        "label": "Tireóide com aspecto habitual",
        "options": ["Sim", "Não"],
        "mark": "tireoide_aspecto_habitual"
      },
      {
        "label": "Lobo direito da tireóide com dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "lobo_direito_dimensoes_normais"
      },
      {
        "label": "Lobo esquerdo da tireóide com dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "lobo_esquerdo_dimensoes_normais"
      },
      {
        "label": "Istmo da tireóide com medidas normais",
        "options": ["Sim", "Não"],
        "mark": "istmo_medidas_normais"
      },
      {
        "label": "Volume tireoidiano dentro dos parâmetros normais",
        "options": ["Sim", "Não"],
        "mark": "volume_tireoidiano_normal"
      },
      {
        "label": "Ecogenicidade da tireóide sólida e homogênea",
        "options": ["Sim", "Não"],
        "mark": "ecogenicidade_solida_homogenea"
      },
      {
        "label": "Paratireóides não visualizadas",
        "options": ["Sim", "Não"],
        "mark": "paratireoidese_nao_visualizadas"
      }
    ],
    "Checkbox": [],
    
  },
  Cervical: {
    "Selects": [
      {
        "label": "Há Doppler?",
        "options": ["Não", "Sim"],
        "mark": "condicional_doppler_cervical"
      },
      {
        "label": "Linfonodos têm aspecto não habitual?",
        "options": ["Não", "Sim"],
        "mark": "linfonodos_normais_cervical"
      },
      {
        "label": "Tem tireóide?",
        "options": ["Não", "Sim"],
        "mark": "condicional_tireoide_cervical"
      },
      {
        "label": "Tireóide Posterior?",
        "options": ["Não", "Sim"],
        "mark": "condicional_tireoide_posterior"
      },
      {
        "label": "Tireóide com topografia normal",
        "options": ["Sim", "Não"],
        "mark": "tireoide_topografia_normal"
      },
      {
        "label": "Tireóide com aspecto habitual",
        "options": ["Sim", "Não"],
        "mark": "tireoide_aspecto_habitual"
      },
      {
        "label": "Lobo direito da tireóide com dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "lobo_direito_dimensoes_normais"
      },
      {
        "label": "Lobo esquerdo da tireóide com dimensões normais",
        "options": ["Sim", "Não"],
        "mark": "lobo_esquerdo_dimensoes_normais"
      },
      {
        "label": "Istmo da tireóide com medidas normais",
        "options": ["Sim", "Não"],
        "mark": "istmo_medidas_normais"
      },
      {
        "label": "Volume tireoidiano dentro dos parâmetros normais",
        "options": ["Sim", "Não"],
        "mark": "volume_tireoidiano_normal"
      },
      {
        "label": "Ecogenicidade da tireóide sólida e homogênea",
        "options": ["Sim", "Não"],
        "mark": "ecogenicidade_solida_homogenea"
      },
      {
        "label": "Paratireóides não visualizadas",
        "options": ["Sim", "Não"],
        "mark": "paratireoidese_nao_visualizadas"
      },
      {
        "label": "Glândulas parótidas visualizadas sem alterações",
        "options": ["Sim", "Não"],
        "mark": "glândulas_parotidas_normal"
      },
      {
        "label": "Glândulas submandibulares visualizadas sem alterações",
        "options": ["Sim", "Não"],
        "mark": "glândulas_submandibulares_normal"
      },
      {
        "label": "Glândulas sublinguais visualizadas sem alterações",
        "options": ["Sim", "Não"],
        "mark": "glândulas_sublinguais_normal"
      },
      {
        "label": "Esôfago cervical visualizado sem alterações",
        "options": ["Sim", "Não"],
        "mark": "esofago_cervical_normal"
      },
      {
        "label": "Cordas vocais visualizadas sem alterações",
        "options": ["Sim", "Não"],
        "mark": "cordas_vocais_normais"
      },
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_tireoide_cervical": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Tireóide Posterior?",
            "options": ["Não", "Sim"],
            "mark": "condicional_tireoide_posterior"
          }
        ]
      },
      "condicional_tireoide_posterior": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Há Doppler?",
            "options": ["Não", "Sim"],
            "mark": "condicional_doppler_cervical"
          }
        ]
      },
      "condicional_doppler_cervical": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Artéria tireoidea superior com fluxo presente",
            "options": ["Sim", "Não"],
            "mark": "art_tireoidea_superior_fluxo_presente"
          },
          {
            "label": "Pico de velocidade sistólica da artéria tireoidea superior",
            "options": ["Sim", "Não"],
            "mark": "art_tireoidea_superior_pico_velocidade_sistolica"
          },
          {
            "label": "Artéria tireoidea inferior com fluxo presente",
            "options": ["Sim", "Não"],
            "mark": "art_tireoidea_inferior_fluxo_presente"
          },
          {
            "label": "Pico de velocidade sistólica da artéria tireoidea inferior",
            "options": ["Sim", "Não"],
            "mark": "art_tireoidea_inferior_pico_velocidade_sistolica"
          },
          {
            "label": "Relação aorta/artéria tireoidea superior",
            "options": ["Sim", "Não"],
            "mark": "relacao_aorta_art_tireoidea_superior"
          },
          {
            "label": "Relação aorta/artéria tireoidea inferior",
            "options": ["Sim", "Não"],
            "mark": "relacao_aorta_art_tireoidea_inferior"
          }
        ]
      }
    }
  },
  CouroCabeludo: {
    "Selects": [
      {
        "label": "Pele do couro cabeludo visível e sem alterações detectáveis",
        "options": ["Sim", "Não"],
        "mark": "pele_couro_cabeludo_normal"
      },
      {
        "label": "Tecido subcutâneo do couro cabeludo visível e sem alterações detectáveis",
        "options": ["Sim", "Não"],
        "mark": "tecido_subcutaneo_normal"
      }
    ],
    "Checkbox": [],
  },
  Glandulas: {
    "Selects": [
      {
        "label": "Tipo de glândulas",
        "options": ["Salivares", "Parótidas", "Submandibulares", "Sublinguais"],
        "mark": "tipo_glandulas"
      },
      {
        "label": "Glândulas submandibulares visualizadas, em sua localização habitual, sem alterações visíveis",
        "options": ["Sim", "Não"],
        "mark": "submandibulares_localizacao_habitual"
      },
      {
        "label": "Medidas das glândulas submandibulares - Direita",
        "options": ["Sim", "Não"],
        "mark": "submandibulares_direita_medidas"
      },
      {
        "label": "Medidas das glândulas submandibulares - Esquerda",
        "options": ["Sim", "Não"],
        "mark": "submandibulares_esquerda_medidas"
      },
      {
        "label": "Glândulas parótidas visualizadas, em sua localização habitual, sem alterações visíveis",
        "options": ["Sim", "Não"],
        "mark": "parotidas_localizacao_habitual"
      },
      {
        "label": "Medidas das glândulas parótidas - Direita",
        "options": ["Sim", "Não"],
        "mark": "parotidas_direita_medidas"
      },
      {
        "label": "Medidas das glândulas parótidas - Esquerda",
        "options": ["Sim", "Não"],
        "mark": "parotidas_esquerda_medidas"
      },
      {
        "label": "Glândulas sublinguais visualizadas, em sua localização habitual, sem alterações visíveis",
        "options": ["Sim", "Não"],
        "mark": "sublinguais_localizacao_habitual"
      }
    ],
    "Checkbox": [],
  },
  LateralPescoco: {
    "Selects": [
      {
        "label": "Estruturas superficiais sem alterações visíveis?",
        "options": ["Sim", "Não"],
        "mark": "estruturas_superficiais_sem_alteracoes_lateral_pescoco"
      },
      {
        "label": "Linfonodos têm aspecto não habitual?",
        "options": ["Não", "Sim"],
        "mark": "linfonodos_normais_lateral_pescoco"
      },
      {
        "label": "Onde está o Linfonodo?",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "condicional_linfonodo_localizacao_lateral_pescoco"
      },
    ],
    "Checkbox": [],
  },
  RegiaoParietal: {
    "Selects": [
      {
        "label": "Pele e tecido subcutâneo visíveis?",
        "options": ["Sim", "Não"],
        "mark": "pele_tecido_subcutaneo_visiveis_regiao_parietal"
      },
      {
        "label": "Sem alterações detectáveis?",
        "options": ["Sim", "Não"],
        "mark": "sem_alteracoes_detectaveis_regiao_parietal"
      },
    ],
    "Checkbox": [],
  },
  RegiaoAuricularSubmentoniana: {
    "Selects": [
      {
        "label": "Tipo de Auricular",
        "options": ["Periauricular", "Retroauricular", "Submentoniana"],
        "mark": "condicional_tipo_auricular"
      },
      {
        "label": "Estruturas superficiais sem alterações visíveis?",
        "options": ["Sim", "Não"],
        "mark": "estruturas_superficiais_sem_alteracoes_periauricular"
      },
      {
        "label": "Linfonodos têm aspecto não habitual?",
        "options": ["Não", "Sim"],
        "mark": "linfo_nodos_normais_periauricular"
      },
      {
        "label": "Onde está o Linfonodo?",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "condicional_linfonodo_localizacao_lateral_pescoco"
      },
    ],
    "Checkbox": [],
  },
  Transfontanelear: {
    "Selects": [
      {
        "label": "Parênquima encefálico com morfologia e ecotextura habitual",
        "options": ["Sim", "Não"],
        "mark": "parenquima_encefalico_habitual"
      },
      {
        "label": "Convexidade cerebral e cisternas apresentam aspecto anatômico preservado",
        "options": ["Sim", "Não"],
        "mark": "convexidade_cerebral_preservada"
      },
      {
        "label": "Linha média exibe estruturas de morfologia normal",
        "options": ["Sim", "Não"],
        "mark": "linha_media_normal"
      },
      {
        "label": "Sistema ventricular apresenta aspecto compatível com a normalidade",
        "options": ["Sim", "Não"],
        "mark": "sistema_ventricular_normal"
      },
      {
        "label": "Sistema ventricular apresenta simetria dos ventrículos laterais",
        "options": ["Sim", "Não"],
        "mark": "sistema_ventricular_simetria"
      },
      {
        "label": "Corpo caloso bem visualizado em suas três porções",
        "options": ["Sim", "Não"],
        "mark": "corpo_caloso_visualizado"
      },
      {
        "label": "Plexos coróides apresentam-se ecogênicos, regulares e simétricos",
        "options": ["Sim", "Não"],
        "mark": "plexos_corroides_normais"
      },
      {
        "label": "Terceiro e quarto ventrículos com aspecto ecográfico habitual",
        "options": ["Sim", "Não"],
        "mark": "terceiro_quarto_ventriculos_normais"
      },
      {
        "label": "Relação ventrículo/hemisfério direito",
        "options": [],
        "isNumberInput": true,
        "mark": "cerebelo_medindo"
      },
      {
        "label": "Relação ventrículo/hemisfério esquerdo",
        "options": [],
        "isNumberInput": true,
        "mark": "cerebelo_medindo"
      }
    ],
    "Checkbox": [],
  },
  Gluteos: {
    "Selects": [
      {
        "label": "Tem nódulo?",
        "options": ["Não", "Sim"],
        "mark": "nodulo_gluteos"
      },
      {
        "label": "Onde está o Nódulo?",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "nodulo_localizacao"
      },
      {
        "label": "Musculatura com aspecto normal",
        "options": ["Sim", "Não"],
        "mark": "musculatura_aspecto_normal"
      },
      {
        "label": "Inserções musculares bem visualizadas, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "insercoes_musculares_normais"
      }
    ],
    "Checkbox": [],
  },
  Coxa: {
    "Selects": [
      {
        "label": "Lateralidade",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "lateralidade_coxa"
      },
      {
        "label": "Tem nódulo?",
        "options": ["Não", "Sim"],
        "mark": "nodulo_coxa"
      },
      {
        "label": "Onde está o Nódulo?",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "nodulo_localizacao_coxa"
      },
      {
        "label": "Musculatura, tendões e ligamentos com aspecto normal",
        "options": ["Sim", "Não"],
        "mark": "musculatura_tendao_ligamento_normal"
      },
      {
        "label": "Inserções musculares bem visualizadas, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "insercoes_musculares_normais"
      },
      {
        "label": "Há botinha?",
        "options": ["Não", "Sim"],
        "mark": "condicional_botinha_coxa"
      },
      {
        "label": "Pele e tecido subcutâneo sem alterações",
        "options": ["Sim", "Não"],
        "mark": "pele_tecido_subcutaneo_normal"
      },
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_botinha_coxa": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Pergunta botinha coxa",
            "options": ["Sim", "Não"],
            "mark": "botinha_coxa"
          }
        ]
      }
    }
  },
  Panturrilha: {
    "Selects": [
      {
        "label": "Há Doppler?",
        "options": ["Não", "Sim"],
        "mark": "condicional_doppler_panturrilha"
      },
      {
        "label": "Lateralidade",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "lateralidade_panturrilha"
      },
      {
        "label": "Musculatura, tendões e ligamentos com aspecto normal",
        "options": ["Sim", "Não"],
        "mark": "musculatura_tendao_ligamento_normal"
      },
      {
        "label": "Inserções musculares bem visualizadas, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "insercoes_musculares_normais"
      },
      {
        "label": "Ausência de nodulações e/ou cistos",
        "options": ["Sim", "Não"],
        "mark": "ausencia_nodulos_cistos"
      }
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_doppler_panturrilha": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Veia poplítea visualizada até sua bifurcação, sem trombos em seu interior, com fluxo presente, sem refluxo às manobras de Valsalva",
            "options": ["Sim", "Não"],
            "mark": "veia_poplitea_normal"
          },
          {
            "label": "Veia tibial posterior visualizada, sem trombos em seu interior, com fluxo presente, sem refluxo às manobras de Valsalva",
            "options": ["Sim", "Não"],
            "mark": "veia_tibial_posterior_normal"
          }
        ]
      }
    }
  },
  Pe: {
    "Selects": [
      {
        "label": "Há Doppler?",
        "options": ["Não", "Sim"],
        "mark": "condicional_doppler_pe"
      },
      {
        "label": "Há botinha?",
        "options": ["Não", "Sim"],
        "mark": "condicional_botinha_pe"
      },
      {
        "label": "Lateralidade",
        "options": ["Esquerda", "Direita", "Ambos"],
        "mark": "lateralidade_pe"
      },
      {
        "label": "Musculatura, tendões e ligamentos com aspecto normal",
        "options": ["Sim", "Não"],
        "mark": "musculatura_tendao_ligamento_normal"
      },
      {
        "label": "Ausência de sinais flogísticos",
        "options": ["Sim", "Não"],
        "mark": "ausencia_flogisticos"
      }
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_doppler_pe": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Ausência de derrame articular e/ou sinais flogísticos",
            "options": ["Sim", "Não"],
            "mark": "ausencia_derrame_flogisticos_doppler"
          },
          {
            "label": "Artérias e veias com fluxo sem alterações visíveis",
            "options": ["Sim", "Não"],
            "mark": "fluxo_arterias_veias_normal"
          }
        ]
      },
      "condicional_botinha_pe": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Ausência de derrame articular e/ou sinais flogísticos",
            "options": ["Sim", "Não"],
            "mark": "ausencia_derrame_flogisticos_botinha"
          }
        ]
      }
    }
  },
  Perna: {
    "Selects": [
      {
        "label": "Tem nódulo?",
        "options": ["Não", "Sim"],
        "mark": "nodulo_perna"
      },
      {
        "label": "Onde está o Nódulo?",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "nodulo_localizacao_perna"
      },
      {
        "label": "Lateralidade",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "lateralidade_perna"
      },
      {
        "label": "Musculatura, tendões e ligamentos com aspecto normal",
        "options": ["Sim", "Não"],
        "mark": "musculatura_tendao_ligamento_normal_perna"
      },
      {
        "label": "Inserções musculares bem visualizadas, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "insercoes_musculares_normais"
      },
      {
        "label": "Ausência de nodulações e/ou cistos",
        "options": ["Sim", "Não"],
        "mark": "ausencia_nodulos_cistos"
      },
      {
        "label": "Há Botinha?",
        "options": ["Não", "Sim"],
        "mark": "condicional_botinha_perna"
      }
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_botinha_perna": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Ausência de derrame articular e/ou sinais flogísticos",
            "options": ["Sim", "Não"],
            "mark": "ausencia_derrame_flogisticos_botinha_perna"
          }
        ]
      }
    }
  },
  Punho: {
    "Selects": [
      {
        "label": "Tem nódulo?",
        "options": ["Não", "Sim"],
        "mark": "nodulo_punho"
      },
      {
        "label": "Onde está o Nódulo?",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "nodulo_localizacao_punho"
      },
      {
        "label": "Posição do Punho",
        "options": ["Direito", "Esquerdo", "Ambos"],
        "mark": "posicao_punho"
      },
      {
        "label": "Musculatura bem visualizada, sem sinais flogísticos, sem roturas",
        "options": ["Sim", "Não"],
        "mark": "musculatura_sem_flogisticos_punho"
      },
      {
        "label": "Tendões musculares bem visualizados, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "tendao_sem_rotura_punho"
      },
      {
        "label": "Ligamentos bem visualizados, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "ligamento_sem_rotura_punho"
      },
      {
        "label": "Túnel do carpo sem alterações visíveis",
        "options": ["Sim", "Não"],
        "mark": "tunel_carpo_sem_alteracoes"
      },
      {
        "label": "Ausência de nódulos e/ou cistos",
        "options": ["Sim", "Não"],
        "mark": "sem_nodulos_cistos_punho"
      },
      {
        "label": "Há Doppler?",
        "options": ["Não", "Sim"],
        "mark": "condicional_doppler_punho"
      },
      {
        "label": "Há Botinha?",
        "options": ["Não", "Sim"],
        "mark": "condicional_botinha_punho"
      }
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_doppler_punho": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Fluxo sanguíneo arterial e venoso sem alterações",
            "options": ["Sim", "Não"],
            "mark": "fluxo_sanguineo_normal_doppler"
          },
          {
            "label": "Ausência de sinais flogísticos",
            "options": ["Sim", "Não"],
            "mark": "ausencia_flogisticos_doppler"
          }
        ]
      },
      "condicional_botinha_punho": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Ausência de sinais flogísticos",
            "options": ["Sim", "Não"],
            "mark": "ausencia_flogisticos_botinha"
          }
        ]
      }
    }
  },
  Tornozelo: {
    "Selects": [
      {
        "label": "Lateralidade",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "lateralidade_tornozelo"
      },
      {
        "label": "Musculatura, tendões e ligamentos com aspecto normal",
        "options": ["Sim", "Não"],
        "mark": "musculatura_tendao_ligamento_normal"
      },
      {
        "label": "Tendão de Aquiles com aspecto, forma e tamanho normais, sem sinais flogísticos",
        "options": ["Sim", "Não"],
        "mark": "tendao_aquiles_normal"
      },
      {
        "label": "Há Botinha?",
        "options": ["Não", "Sim"],
        "mark": "condicional_botinha_tornozelo"
      }
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_botinha_tornozelo": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Ausência de sinais flogísticos",
            "options": ["Sim", "Não"],
            "mark": "ausencia_flogisticos_botinha"
          }
        ]
      }
    }
  },
  TendaoAquiles: {
    "Selects": [
      {
        "label": "Musculatura da perna com inserção em sua localização habitual",
        "options": ["Sim", "Não"],
        "mark": "musculatura_perna_insercao_habitual"
      },
      {
        "label": "Tendão de Aquiles com formato normal",
        "options": ["Sim", "Não"],
        "mark": "tendao_aquiles_formato_normal"
      },
      {
        "label": "Tendão de Aquiles sem rotura",
        "options": ["Sim", "Não"],
        "mark": "tendao_aquiles_sem_rotura"
      },
      {
        "label": "Tendão de Aquiles sem sinais flogísticos",
        "options": ["Sim", "Não"],
        "mark": "tendao_aquiles_sem_sinais_flogisticos"
      },
      {
        "label": "Tendão de Aquiles medindo (cm)",
        "options": [],
        "mark": "tendao_aquiles_medida_cm",
        "isNumberInput": true,
      }
    ],
    "Checkbox": [],
  },
  Quadril: {
    "Selects": [
      {
        "label": "É um exame de RN (Recém-nascido)?",
        "options": ["Sim", "Não"],
        "mark": "quadril_exame_rn"
      },
      {
        "label": "Tem nódulo?",
        "options": ["Não", "Sim"],
        "mark": "nodulo_quadril"
      },
      {
        "label": "Onde está o Nódulo?",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "nodulo_localizacao_quadril"
      },
      {
        "label": "Posição do quadril",
        "options": ["Esquerdo", "Direito", "Ambos"],
        "mark": "quadril_posicao"
      },
      {
        "label": "Musculatura, tendões e ligamentos com aspecto normal",
        "options": ["Sim", "Não"],
        "mark": "musculatura_tendoes_ligamentos_normais"
      },
      {
        "label": "Inserções musculares bem visualizadas, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "insercoes_musculares_visualizadas"
      },
      {
        "label": "Ângulo α",
        "options": [],
        "mark": "angulo_alpha_quadril",
        "isNumberInput": true,
      },
      {
        "label": "Ângulo β",
        "options": [],
        "mark": "angulo_beta_quadril",
        "isNumberInput": true,
      }
    ],
    "Checkbox": [],
  },
  Ombro: {
    Selects: [
      {
        "label": "Tendão da cabeça longa do bíceps bem visualizado, sem sinais de rotura e sinais flogísticos",
        "options": ["Sim", "Não"],
        "mark": "tendao_cabeca_longa_biceps"
      },
      {
        "label": "Bursa subdeltóidea e subacromial bem visualizadas, sem alterações",
        "options": ["Sim", "Não"],
        "mark": "bursa_subdeltóidea_subacromial"
      },
      {
        "label": "Tendão dos músculos infra-espinhal e supra-espinhal bem visualizados, sem sinais de rotura e sinais flogísticos",
        "options": ["Sim", "Não"],
        "mark": "tendao_musculos_infra_supra_espinhal"
      },
      {
        "label": "Há Doppler?",
        "options": ["Não", "Sim"],
        "mark": "condicional_doppler_ombro"
      },
      {
        "label": "Vascularização dentro dos padrões de normalidade, sem sinais inflamatórios",
        "options": ["Sim", "Não"],
        "mark": "vascularizacao_normal"
      }
    ],
    Checkbox: [],
    ConditionalSections: {
      "condicional_doppler_ombro": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Pergunta condicional ombro",
            "options": ["Sim", "Não"],
            "mark": "doppler_ombro"
          },
          {
            "label": "Pergunta condicional ombro",
            "options": ["Sim", "Não"],
            "mark": "doppler_ombro"
          },
        ]
      }
    }
  },
  Mao: {
    "Selects": [
      {
        "label": "Musculatura bem visualizada, sem sinais flogísticos e sem roturas",
        "options": ["Sim", "Não"],
        "mark": "musculatura_sinal_flogistico_rotura"
      },
      {
        "label": "Tendões musculares bem visualizados, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "tendoes_sinal_rotura"
      },
      {
        "label": "Ligamentos bem visualizados, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "ligamentos_sinal_rotura"
      },
      {
        "label": "Túnel do carpo sem alterações visíveis",
        "options": ["Sim", "Não"],
        "mark": "tunel_carpo_alteracoes"
      },
      {
        "label": "Espaços interósseos sem alterações visíveis",
        "options": ["Sim", "Não"],
        "mark": "espacos_interosseos_alteracoes"
      },
      {
        "label": "Há Doppler?",
        "options": ["Não", "Sim"],
        "mark": "condicional_doppler_mao"
      },
      {
        "label": "Há botinha?",
        "options": ["Não", "Sim"],
        "mark": "condicional_botinha_mao"
      }
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_doppler_mao": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Fluxo sanguíneo arterial e venoso sem alterações.",
            "options": ["Sim", "Não"],
            "mark": "fluxo_sanguineo_normal"
          }
        ]
      },
      "condicional_botinha_mao": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Pele e tecido subcutâneo bem visualizados, sem alterações",
            "options": ["Sim", "Não"],
            "mark": "pele_subcutaneo_visualizados"
          },
          {
            "label": "Musculatura bem visualizada, com sinais flogísticos, sem roturas",
            "options": ["Sim", "Não"],
            "mark": "musculatura_flogistica_sinal"
          },
          {
            "label": "Espaços interósseos sem alterações visíveis",
            "options": ["Sim", "Não"],
            "mark": "espacos_interosseos_visualizados"
          }
        ]
      }
    }
  },
  Joelho: {
    "Selects": [
      {
        "label": "Musculatura com aspecto normal",
        "options": ["Sim", "Não"],
        "mark": "musculatura_com_aspecto_normal"
      },
      {
        "label": "Tendão do quadríceps bem visualizado, sem sinais de rotura, sem sinais flogísticos",
        "options": ["Sim", "Não"],
        "mark": "tendao_quadriceps_normal"
      },
      {
        "label": "Tendão patelar bem visualizado, sem sinais de rotura, sem sinais flogísticos",
        "options": ["Sim", "Não"],
        "mark": "tendao_patelar_normal"
      },
      {
        "label": "Fossa poplítea bem visualizada, sem sinais flogísticos. Não visualiza-se cisto de Baker",
        "options": ["Sim", "Não"],
        "mark": "fossa_poplitea_normal"
      },
      {
        "label": "Ligamentos colaterais sem abaulamentos",
        "options": ["Sim", "Não"],
        "mark": "ligamentos_colaterais_normais"
      },
      {
        "label": "Trato ílio-tibial sem alterações",
        "options": ["Sim", "Não"],
        "mark": "trato_ilio_tibial_normal"
      },
      {
        "label": "Há Doppler?",
        "options": ["Não", "Sim"],
        "mark": "condicional_doppler_joelho"
      }
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_doppler_joelho": {
        condition: "Sim",
        "fields": [
          {
            "label": "Vascularização dentro dos padrões de normalidade, sem sinais inflamatórios",
            "options": ["Sim", "Não"],
            "mark": "vascularizacao_normal"
          }
        ]
      }
    }
  },
  Cotovelo: {
    "Selects": [
      {
        "label": "Tem nódulo?",
        "options": ["Não", "Sim"],
        "mark": "nodulo_cotovelo"
      },
      {
        "label": "Onde está o Nódulo?",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "nodulo_localizacao_cotovelo"
      },
      {
        "label": "Posição do cotovelo",
        "options": ["Esquerda", "Direita", "Ambos"],
        "mark": "posicao_cotovelo"
      },
      {
        "label": "Fossa do olecrano sem alterações",
        "options": ["Sim", "Não"],
        "mark": "fossa_olecrano_normal"
      },
      {
        "label": "Inserções musculares bem visualizadas, sem sinais de rotura, sem sinais flogísticos",
        "options": ["Sim", "Não"],
        "mark": "insercoes_musculares_normais"
      },
      {
        "label": "Ausência de nodulações e/ou cistos",
        "options": ["Sim", "Não"],
        "mark": "ausencia_nodulacoes_cistos"
      },
      {
        "label": "Há Botinha?",
        "options": ["Não", "Sim"],
        "mark": "condicional_botinha_cotovelo"
      }
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_botinha_cotovelo": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Pele e tecido subcutâneo bem visualizados, sem alterações",
            "options": ["Sim", "Não"],
            "mark": "pele_subcutaneo_normal"
          },
          {
            "label": "Musculatura bem visualizada, com sinais flogísticos, sem roturas",
            "options": ["Sim", "Não"],
            "mark": "musculatura_com_flogisticos"
          }
        ]
      }
    }
  },
  BracoAntebraco: {
    "Selects": [
      {
        "label": "Braço ou Antebraço?",
        "options": ["Braço", "Antebraço"],
        "mark": "braco_antebraco"
      },
      {
        "label": "Lateralidade",
        "options": ["Esquerda", "Direita", "Ambos"],
        "mark": "lateralidade_braco"
      },
      {
        "label": "Tem nódulo?",
        "options": ["Não", "Sim"],
        "mark": "nodulo_braco"
      },
      {
        "label": "Onde está o Nódulo?",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "nodulo_localizacao_braco"
      },
      {
        "label": "Musculatura, tendões e ligamentos com aspecto normal",
        "options": ["Sim", "Não"],
        "mark": "musculatura_normal"
      },
      {
        "label": "Inserções musculares bem visualizadas, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "insercoes_musculares_normais"
      },
      {
        "label": "Ausência de nodulações e/ou cistos",
        "options": ["Sim", "Não"],
        "mark": "ausencia_nodulacoes_cistos"
      },
      {
        "label": "Há Botinha?",
        "options": ["Não", "Sim"],
        "mark": "condicional_botinha_antebraco"
      }
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_botinha_antebraco": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Pele e tecido subcutâneo bem visualizados, sem alterações",
            "options": ["Sim", "Não"],
            "mark": "pele_subcutaneo_normal"
          },
          {
            "label": "Musculatura bem visualizada, com sinais flogísticos, sem roturas",
            "options": ["Sim", "Não"],
            "mark": "musculatura_com_flogisticos"
          }
        ]
      }
    }
  },
  Calcaneo: {
    "Selects": [
      {
        "label": "Musculatura bem visualizada, sem sinais flogísticos, sem roturas",
        "options": ["Sim", "Não"],
        "mark": "musculatura_normal"
      },
      {
        "label": "Tendões musculares bem visualizados, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "tendoes_musculares_normais"
      },
      {
        "label": "Tendão de Aquiles sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "tendao_aquiles_normal"
      },
      {
        "label": "Tendão de Aquiles medindo",
        "options": [],
        "isNumberInput": true,
        "mark": "tendao_aquiles_medindo_normal"
      }
    ],
    "Checkbox": [],
  },
  Dedo: {
    "Selects": [
      {
        "label": "Tem nódulo?",
        "options": ["Não", "Sim"],
        "mark": "nodulo_dedo"
      },
      {
        "label": "Onde está o Nódulo?",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "nodulo_localizacao_dedo"
      },
      {
        "label": "Polegar ou Outros Dedos?",
        "options": ["Polegar", "Outros Dedos"],
        "mark": "polegar_outros_dedos"
      },
      {
        "label": "Posição do dedo",
        "options": ["Esquerdo", "Direito", "Ambos"],
        "mark": "posicao_dedo"
      },
      {
        "label": "Musculatura bem visualizada, sem sinais flogísticos, sem roturas",
        "options": ["Sim", "Não"],
        "mark": "musculatura_normal"
      },
      {
        "label": "Tendões musculares bem visualizados, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "tendoes_normais"
      },
      {
        "label": "Ausência de nódulos e/ou cistos",
        "options": ["Sim", "Não"],
        "mark": "sem_nodulos_cistos"
      }
    ],
    "Checkbox": [],
  },
  FossaPoplitea: {
    "Selects": [
      {
        "label": "Lateralidade",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "lateralidade_fossa_poplitea"
      },
      {
        "label": "Musculatura da perna apresentando inserção em sua localização habitual",
        "options": ["Sim", "Não"],
        "mark": "musculatura_insercao_habitual"
      },
      {
        "label": "Fossa poplítea estruturalmente normal, sem cistos e/ou nódulos em seu interior",
        "options": ["Sim", "Não"],
        "mark": "fossa_poplitea_normal"
      },
      {
        "label": "Inserções musculares normais",
        "options": ["Sim", "Não"],
        "mark": "insercoes_musculares_normais"
      },
      {
        "label": "Há Doppler?",
        "options": ["Não", "Sim"],
        "mark": "condicional_doppler_fossapoplitea"
      }
    ],
    "Checkbox": [],
    "ConditionalSections": {
      "condicional_doppler_fossapoplitea": {
        "condition": "Sim",
        "fields": [
          {
            "label": "Vascularização presente, com fluxo normal ao Doppler, sem sinais de obstrução",
            "options": ["Sim", "Não"],
            "mark": "vascularizacao_normal"
          }
        ]
      }
    },
  },
  Deltoides: {
    "Selects": [
      {
        "label": "Posição do Deltóide",
        "options": ["Esquerdo", "Direito", "Ambos"],
        "mark": "posicao_deltoides"
      },
      {
        "label": "Tem nódulo?",
        "options": ["Não", "Sim"],
        "mark": "nodulo_deltoides"
      },
      {
        "label": "Onde está o Nódulo?",
        "options": ["Esquerda", "Direita", "Ambas"],
        "mark": "nodulo_localizacao_deltoides"
      },
      {
        "label": "Inserção muscular bem visualizada, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "insercao_muscular_normal"
      },
      {
        "label": "Ausência de nodulações e/ou cistos",
        "options": ["Sim", "Não"],
        "mark": "sem_nodulacoes_cistos"
      }
    ],
    "Checkbox": [],
  },
  BursasTrocantericas: {
    "Selects": [
      {
        "label": "Inserções musculares bem visualizadas, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "insercoes_musculares_normais"
      },
      {
        "label": "Bursas bem visualizadas, sem alterações visíveis",
        "options": ["Sim", "Não"],
        "mark": "bursas_sem_alteracoes"
      },
      {
        "label": "Fêmur proximal sem alterações visíveis",
        "options": ["Sim", "Não"],
        "mark": "femur_proximal_normal"
      }
    ],
    "Checkbox": [],
  },
  MusculaturaAbdominal: {
    "Selects": [
      {
        "label": "Músculos retos abdominais sem alterações",
        "options": ["Sim", "Não"],
        "mark": "musculos_ret_abdominais_sem_alteracoes"
      },
      {
        "label": "Inserções musculares bem visualizadas, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "insercoes_musculares_visiveis"
      },
      {
        "label": "Ausência de nodulações e/ou cistos",
        "options": ["Sim", "Não"],
        "mark": "ausencia_nodulacoes_cistos"
      },
      {
        "label": "Ílio-psoas bem visualizado, sem sinais de roturas",
        "options": ["Sim", "Não"],
        "mark": "ilio_psoas_normal"
      }
    ],
    "Checkbox": [],
  },
  TerceiroPododaclito: {
    "Selects": [
      {
        "label": "Tem nódulo?",
        "options": ["Não", "Sim"],
        "mark": "nodulo_terceiro_pododactilo"
      },
      {
        "label": "Onde está o Nódulo?",
        "options": ["Esquerdo", "Direito", "Ambos"],
        "mark": "nodulo_localizacao_terceiro_pododactilo"
      },
      {
        "label": "Posição do Terceiro Pododáctilo",
        "options": ["Esquerdo", "Direito", "Ambos"],
        "mark": "lateraliade_terceiro_pododactilo"
      },
      {
        "label": "Musculatura bem visualizada, sem sinais flogísticos, sem roturas",
        "options": ["Sim", "Não"],
        "mark": "musculatura_sem_alteracoes"
      },
      {
        "label": "Tendões musculares bem visualizados, sem sinais de rotura",
        "options": ["Sim", "Não"],
        "mark": "tendao_sem_roturas"
      },
      {
        "label": "Ausência de nódulos e/ou cistos",
        "options": ["Sim", "Não"],
        "mark": "ausencia_nodulos_cistos"
      }
    ],
    "Checkbox": [],
  }

};

export const noduleQuestions = [
  { mark: 'isoecogenio_nodulo', label: 'Isoecogênico às hs', options: ['Sim', 'Não'] },
  { mark: 'position_nodulo', label: 'Paralelo', options: ['Sim', 'Não'] },
  { mark: 'reforcoacustico_nodulo', label: 'Reforço acústico posterior', options: ['Com', 'Sem'] },
  { mark: 'sombra_nodulo', label: 'Sombra', options: ['Sem', 'Com'] },
  { mark: 'margens_nodulo', label: 'Margens circunstritas', options: ['Sim', 'Não'] },
  { mark: 'tecido_nodulo', label: 'Tecido vizinho', options: ['Não comprometido', 'Comprometido'] },
  { mark: 'vascuintranodal_nodulo', label: 'Vascularização intranodal', options: ['Sim', 'Não'] },
  { mark: 'medida_nodulo', label: 'Medida em cm:', options: [], isNumberInput: true },
  // { label: 'Distante em X cm da pele e cm do mamilo (caso mama)', options: [] },

];

export default Questions;
