import React from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from './theme';

const variantes = {
  primario: { bg: cores.primaria, fg: '#fff' },
  verde: { bg: cores.verde, fg: '#fff' },
  contorno: { bg: 'transparent', fg: cores.primaria, borda: cores.primaria },
  perigo: { bg: '#FEE2E2', fg: cores.erro },
};

export function Botao({ titulo, onPress, tipo = 'primario', icone, desabilitado, style }) {
  const v = variantes[tipo];
  return (
    <TouchableOpacity
      activeOpacity={0.8} disabled={desabilitado} onPress={onPress}
      style={[s.botao, { backgroundColor: v.bg, borderColor: v.borda || 'transparent', opacity: desabilitado ? 0.5 : 1 }, style]}>
      {icone ? <Ionicons name={icone} size={18} color={v.fg} style={{ marginRight: 8 }} /> : null}
      <Text style={[s.botaoTxt, { color: v.fg }]}>{titulo}</Text>
    </TouchableOpacity>
  );
}

export function Campo({ label, erro, ...props }) {
  return (
    <View style={s.campo}>
      <Text style={s.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#94A3B8" {...props}
        style={[s.input, props.multiline && { height: 96, textAlignVertical: 'top' }, erro && { borderColor: cores.erro }]}
      />
      {erro ? <Text style={s.erro}>{erro}</Text> : null}
    </View>
  );
}

export function Chip({ texto, ativo = true, cor = cores.primaria, onPress }) {
  const Comp = onPress ? TouchableOpacity : View;
  return (
    <Comp onPress={onPress} style={[s.chip, { borderColor: cor, backgroundColor: ativo ? cor : 'transparent' }]}>
      <Text style={{ color: ativo ? '#fff' : cor, fontSize: 12, fontWeight: '600' }}>{texto}</Text>
    </Comp>
  );
}

const s = StyleSheet.create({
  botao: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 13, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1.5 },
  botaoTxt: { fontSize: 15, fontWeight: '700' },
  campo: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', color: cores.texto, marginBottom: 6 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: cores.borda, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, color: cores.texto },
  erro: { color: cores.erro, fontSize: 12, marginTop: 4 },
  chip: { borderWidth: 1.5, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, marginRight: 8, marginBottom: 8 },
});
