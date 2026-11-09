import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, Vibration, View } from 'react-native';
import { cores, statusCor, STATUS } from '../theme';
import { Botao, Campo, Chip } from '../ui';
import { nomesServicos } from '../data/servicos';
import { atualizarProposta, criarProposta, existeDuplicada, obterProposta } from '../db/database';

const soDigitos = (t) => t.replace(/\D/g, '').slice(0, 11);
const mascara = (d) => {
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};
const ERRO_VIB = [0, 80, 60, 80];

export default function PropostaForm({ route, navigation }) {
  const { id, servico: servicoInicial } = route.params || {};
  const editando = !!id;
  const [f, setF] = useState({ nome: '', condominio: '', telefone: '', unidades: '', servico: servicoInicial || '', mensagem: '', status: 'Recebida' });
  const [aceite, setAceite] = useState(false);
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);
  const set = (k, v) => setF((a) => ({ ...a, [k]: v }));

  useEffect(() => {
    navigation.setOptions({ title: editando ? 'Editar proposta' : 'Nova proposta' });
    if (editando) obterProposta(id).then((p) => p && setF({ ...p, unidades: p.unidades ? String(p.unidades) : '', mensagem: p.mensagem || '' }));
  }, [id]);

  function validar() {
    const e = {};
    if (f.nome.trim().length < 3) e.nome = 'Informe seu nome completo.';
    if (f.condominio.trim().length < 3) e.condominio = 'Informe o nome do condomínio.';
    const tel = f.telefone.replace(/\D/g, '');
    if (tel.length < 10) e.telefone = 'Telefone inválido (DDD + número).';
    if (!f.servico) e.servico = 'Escolha um serviço.';
    if (!editando && !aceite) e.aceite = 'É necessário aceitar a Política de Privacidade (LGPD).';
    setErros(e);
    return Object.keys(e).length === 0;
  }

  async function salvar() {
    if (!validar()) { Vibration.vibrate(ERRO_VIB); return; }
    setSalvando(true);
    try {
      if (editando) {
        await atualizarProposta(id, f);
        Vibration.vibrate(50);
        Alert.alert('Atualizada', 'Proposta atualizada com sucesso.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
      } else {
        if (await existeDuplicada(f)) {
          Vibration.vibrate(ERRO_VIB);
          Alert.alert('Solicitação duplicada', 'Já existe uma proposta ativa para este condomínio, serviço e telefone. Edite a existente em "Propostas".');
          return;
        }
        const protocolo = await criarProposta(f);
        Vibration.vibrate(50);
        Alert.alert('Proposta enviada!', `Seu protocolo é ${protocolo}.`, [
          { text: 'Ver propostas', onPress: () => navigation.navigate('Principal', { screen: 'Propostas' }) },
        ]);
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={{ backgroundColor: cores.fundo }} contentContainerStyle={s.corpo} keyboardShouldPersistTaps="handled">
        <Campo label="Nome completo *" value={f.nome} onChangeText={(v) => set('nome', v)} erro={erros.nome} placeholder="Seu nome" />
        <Campo label="Condomínio *" value={f.condominio} onChangeText={(v) => set('condominio', v)} erro={erros.condominio} placeholder="Nome do condomínio" />
        <Campo label="Telefone / WhatsApp *" value={mascara(f.telefone.replace(/\D/g, ''))} onChangeText={(v) => set('telefone', soDigitos(v))}
          keyboardType="phone-pad" erro={erros.telefone} placeholder="(11) 90000-0000" />
        <Campo label="Nº de unidades" value={f.unidades} onChangeText={(v) => set('unidades', v.replace(/\D/g, ''))} keyboardType="number-pad" placeholder="Ex.: 120" />

        <Text style={s.label}>Serviço *</Text>
        <View style={s.chips}>
          {nomesServicos.map((n) => <Chip key={n} texto={n} ativo={f.servico === n} onPress={() => set('servico', n)} />)}
        </View>
        {erros.servico ? <Text style={s.erro}>{erros.servico}</Text> : null}

        <Campo label="Mensagem" value={f.mensagem} onChangeText={(v) => set('mensagem', v)} multiline placeholder="Conte o que o condomínio precisa" />

        {editando ? (
          <>
            <Text style={s.label}>Status (atendimento)</Text>
            <View style={s.chips}>
              {STATUS.map((st) => <Chip key={st} texto={st} cor={statusCor[st]} ativo={f.status === st} onPress={() => set('status', st)} />)}
            </View>
          </>
        ) : (
          <View style={s.aceite}>
            <Switch value={aceite} onValueChange={setAceite} trackColor={{ true: cores.verde }} />
            <Text style={s.aceiteTxt}>Li e aceito a Política de Privacidade (LGPD): meus dados serão usados apenas para contato sobre esta proposta.</Text>
          </View>
        )}
        {erros.aceite ? <Text style={s.erro}>{erros.aceite}</Text> : null}

        <Botao titulo={salvando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Enviar solicitação'} icone="checkmark-circle"
          tipo="verde" onPress={salvar} desabilitado={salvando} style={{ marginTop: 16 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  corpo: { padding: 16, paddingBottom: 40 },
  label: { fontSize: 13, fontWeight: '600', color: cores.texto, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  erro: { color: cores.erro, fontSize: 12, marginBottom: 8 },
  aceite: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  aceiteTxt: { flex: 1, marginLeft: 10, fontSize: 13, color: cores.suave, lineHeight: 18 },
});
