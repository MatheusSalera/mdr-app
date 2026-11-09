import React, { useCallback, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { cores, sombra, statusCor, STATUS } from '../theme';
import { Botao } from '../ui';
import { contarPorStatus } from '../db/database';

export default function Inicio({ navigation }) {
  const [tot, setTot] = useState({ total: 0 });
  useFocusEffect(useCallback(() => { contarPorStatus().then(setTot).catch(() => {}); }, []));

  return (
    <ScrollView style={{ backgroundColor: cores.fundo }} contentContainerStyle={{ paddingBottom: 24 }}>
      <ImageBackground source={require('../../imagens/portaria-presencial.jpg')} style={s.hero}>
        <View style={s.overlay}>
          <Text style={s.titulo}>Excelência em serviços condominiais</Text>
          <Text style={s.sub}>Portaria, limpeza, manutenção e segurança para o seu condomínio.</Text>
        </View>
      </ImageBackground>

      <View style={s.corpo}>
        <Text style={s.secao}>Suas propostas</Text>
        <View style={s.linha}>
          <View style={[s.stat, sombra]}>
            <Text style={s.num}>{tot.total}</Text><Text style={s.rot}>Total</Text>
          </View>
          {STATUS.filter((x) => x !== 'Cancelada').map((st) => (
            <View key={st} style={[s.stat, sombra]}>
              <Text style={[s.num, { color: statusCor[st] }]}>{tot[st] || 0}</Text>
              <Text style={s.rot}>{st}</Text>
            </View>
          ))}
        </View>

        <Botao titulo="Solicitar proposta" icone="add-circle" tipo="verde" onPress={() => navigation.navigate('PropostaForm')} style={s.gap} />
        <Botao titulo="Conhecer os serviços" icone="construct" onPress={() => navigation.navigate('Servicos')} style={s.gap} />
        <Botao titulo="Medir nível (vistoria)" icone="speedometer" tipo="contorno" onPress={() => navigation.navigate('Vistoria')} style={s.gap} />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  hero: { height: 210 },
  overlay: { flex: 1, backgroundColor: 'rgba(11,61,145,0.72)', justifyContent: 'flex-end', padding: 20 },
  titulo: { color: '#fff', fontSize: 24, fontWeight: '800' },
  sub: { color: '#E2E8F0', fontSize: 14, marginTop: 6 },
  corpo: { padding: 16 },
  secao: { fontSize: 17, fontWeight: '700', color: cores.texto, marginBottom: 10 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  stat: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 10, marginHorizontal: 3, alignItems: 'center' },
  num: { fontSize: 24, fontWeight: '800', color: cores.primaria },
  rot: { fontSize: 10, color: cores.suave, textAlign: 'center', marginTop: 2 },
  gap: { marginTop: 10 },
});
