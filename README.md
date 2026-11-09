# MDR Serviços – App Móvel (React Native / Expo)

Projeto final da disciplina **CCP150 – Desenvolvimento de Aplicativos Móveis** (FEI, Prof. Vinicius).

## 1. Visão Geral e Requisitos

MDR: aplicativo de uma empresa de serviços condominiais (MDR Serviços LTDA) para o síndico/morador conhecer os serviços e solicitar propostas, acompanhando o andamento de cada solicitação.

Motivação: a MDR já possui um site institucional; o app leva o catálogo e o fluxo de solicitação de proposta para o celular, com protocolo, histórico e contato rápido.

Objetivo: permitir solicitar, acompanhar, editar e cancelar/excluir propostas de serviço de forma simples, com ferramenta de apoio à vistoria (nível digital).


## 2. Tecnologias Utilizadas
React Native, Expo, JavaScript, React Navigation (bottom-tabs e native-stack), expo-sqlite, expo-sensors, @expo/vector-icons, react-native-safe-area-context, react-native-screens.

## 3. Funcionalidades
- **Início:** painel com total de propostas e contagem por status (consulta agregada no banco).
- **Serviços:** catálogo com busca por texto; toque abre o **Detalhe** com foto e descrição.
- **Nova proposta (Create):** formulário com validação, máscara de telefone, escolha do serviço, aceite de privacidade (LGPD), geração de protocolo `MDR-ANO-0001` e **proteção contra duplicidade** (mesmo telefone + condomínio + serviço ativos).
- **Minhas propostas (Read):** lista com busca por nome/condomínio/protocolo e filtro por status.
- **Editar (Update):** altera os dados e o status (Recebida, Em análise, Proposta enviada, Cancelada).
- **Excluir (Delete):** com confirmação e vibração.
- **Vistoria:** nível de bolha usando o acelerômetro; vibra ao nivelar; botão para travar a medição; mostra a inclinação em graus.
- **Contato:** WhatsApp, ligação e e-mail via `Linking`.


## 4. Uso de IA (conforme guia de ética da disciplina)
Uma IA (Claude) foi usada para gerar a parte de telas onde nao estava funcionando, entao foram feitas revisoes basicas 
