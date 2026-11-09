import React from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, sombra } from '../theme';
import { Botao } from '../ui';

const abrir = (url) => Linking.openURL(url).catch(() => Alert.alert('Ops', 'Não foi possível abrir o link neste dispositivo.'));

export default function Contato() {
  return (
    <ScrollView style={{ backgroundColor: cores.fundo }} contentContainerStyle={{ padding: 16 }}>
      <View style={[s.card, sombra]}>
        <Text style={s.titulo}>MDR Serviços LTDA</Text>
        <Text style={s.txt}>Soluções completas em serviços condominiais, segurança e manutenção para o seu imóvel.</Text>
        <Linha icone="call" texto="(11) 96537-9971" />
        <Linha icone="mail" texto="contato@mdrservicos.com.br" />
        <Linha icone="location" texto="Campos Elíseos – SP" />
      </View>
      <Botao titulo="Falar no WhatsApp" icone="logo-whatsapp" tipo="verde" onPress={() => abrir('https://wa.me/5511965379971')} style={s.gap} />
      <Botao titulo="Ligar agora" icone="call" onPress={() => abrir('tel:+5511965379971')} style={s.gap} />
      <Botao titulo="Enviar e-mail" icone="mail" tipo="contorno" onPress={() => abrir('mailto:contato@mdrservicos.com.br')} style={s.gap} />
    </ScrollView>
  );
}

const Linha = ({ icone, texto }) => (
  <View style={s.linha}><Ionicons name={icone} size={18} color={cores.primaria} /><Text style={s.linhaTxt}>{texto}</Text></View>
);

const s = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 18 },
  titulo: { fontSize: 20, fontWeight: '800', color: cores.primaria },
  txt: { color: cores.suave, marginVertical: 10, lineHeight: 20 },
  linha: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  linhaTxt: { marginLeft: 10, fontSize: 15, color: cores.texto },
  gap: { marginTop: 12 },
});
