import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme';
import { Botao } from '../ui';
import { servicos } from '../data/servicos';

export default function ServicoDetalhe({ route, navigation }) {
  const sv = servicos.find((x) => x.id === route.params.id);
  return (
    <ScrollView style={{ backgroundColor: cores.fundo }} contentContainerStyle={{ paddingBottom: 28 }}>
      <Image source={sv.imagem} style={s.img} />
      <View style={s.corpo}>
        <Text style={s.nome}>{sv.nome}</Text>
        {sv.descricao.map((p, i) => <Text key={i} style={s.txt}>{p}</Text>)}
        <Botao titulo="Solicitar proposta deste serviço" icone="paper-plane" tipo="verde" style={{ marginTop: 18 }}
          onPress={() => navigation.navigate('PropostaForm', { servico: sv.nome })} />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  img: { width: '100%', height: 220 },
  corpo: { padding: 18 },
  nome: { fontSize: 24, fontWeight: '800', color: cores.primaria, marginBottom: 12 },
  txt: { fontSize: 15, lineHeight: 23, color: cores.texto, marginBottom: 12 },
});
