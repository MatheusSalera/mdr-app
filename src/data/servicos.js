
export const servicos = [
  {
    id: 'portaria-presencial', nome: 'Portaria Presencial', tag: 'Popular', icone: 'people',
    resumo: 'Profissionais treinados para controle de acesso, recepção e segurança com cordialidade.',
    imagem: require('../../imagens/portaria-presencial.jpg'),
    descricao: [
      'Oferecemos um serviço de portaria presencial realizado por profissionais altamente treinados, preparados para garantir o controle de acesso, a recepção de moradores, visitantes e prestadores de serviço com total segurança e cordialidade. Nossa equipe atua de forma preventiva, seguindo protocolos rigorosos para assegurar a tranquilidade de todos os ocupantes do condomínio.',
      'Além do atendimento humanizado, nossos porteiros realizam o monitoramento constante das dependências, registro de ocorrências, conferência de entregas e suporte às rotinas diárias do empreendimento.',
    ],
  },
  {
    id: 'portaria-virtual', nome: 'Portaria Virtual', tag: 'Moderno', icone: 'videocam',
    resumo: 'Controle de acesso remoto, 24 horas por dia, com monitoramento em tempo real.',
    imagem: require('../../imagens/portaria-virtual.jpg'),
    descricao: [
      'A Portaria Virtual é a solução ideal para condomínios que buscam modernizar sua segurança e reduzir custos sem abrir mão da qualidade. O controle de acesso é realizado remotamente por uma central especializada, disponível 24 horas por dia, sete dias por semana.',
      'O sistema conta com monitoramento em tempo real, identificação de visitantes, liberação remota de acessos, gravação de imagens, atendimento de emergência e integração com câmeras, alarmes e dispositivos inteligentes.',
    ],
  },
  {
    id: 'limpeza', nome: 'Limpeza & Conservação', tag: '', icone: 'sparkles',
    resumo: 'Áreas comuns sempre impecáveis, com equipe capacitada e produtos de alta qualidade.',
    imagem: require('../../imagens/limpeza-conservacao.jpg'),
    descricao: [
      'Um ambiente limpo e organizado faz toda a diferença na valorização e no bem-estar dos moradores. Nossa equipe atua com profissionais capacitados, utilizando equipamentos e produtos de alta qualidade para manter todas as áreas comuns sempre impecáveis.',
      'Realizamos a limpeza de halls, corredores, elevadores, escadas, garagens, salões de festas, academias, áreas de lazer e demais dependências, além de serviços de conservação preventiva.',
    ],
  },
  {
    id: 'manutencao', nome: 'Manutenção Predial', tag: '', icone: 'construct',
    resumo: 'Serviços preventivos e corretivos com rapidez, eficiência e comprometimento.',
    imagem: require('../../imagens/manutencao-predial.jpg'),
    descricao: [
      'A manutenção predial é fundamental para preservar a estrutura do condomínio e evitar gastos inesperados. Nossa equipe realiza serviços preventivos e corretivos com rapidez, eficiência e total comprometimento.',
      'Atuamos na manutenção elétrica, hidráulica, civil, pintura, iluminação, pequenos reparos, inspeções técnicas e conservação dos equipamentos do condomínio.',
    ],
  },
  {
    id: 'seguranca', nome: 'Segurança Eletrônica', tag: '', icone: 'shield-checkmark',
    resumo: 'Projetos personalizados de CFTV, alarmes, cercas elétricas e controle de acesso.',
    imagem: require('../../imagens/seguranca-eletronica.jpg'),
    descricao: [
      'Desenvolvemos projetos completos de Segurança Eletrônica personalizados para cada tipo de empreendimento, com equipamentos modernos para proteger pessoas e patrimônios e controlar o acesso às dependências.',
      'Realizamos a instalação e manutenção de CFTV, alarmes, cercas elétricas, controle de acesso por biometria, cartão ou reconhecimento facial, interfones inteligentes e monitoramento integrado.',
    ],
  },
];
export const nomesServicos = servicos.map((x) => x.nome);
