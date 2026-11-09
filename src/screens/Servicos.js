import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, sombra } from '../theme';
import { Chip } from '../ui';
import { servicos } from '../data/servicos';

export default function Servicos({ navigation }) {
  const [busca, setBusca] = useState('');
  const lista = servicos.filter((x) => (x.nome + x.resumo).toLowerCase().includes(busca.toLowerCase()));

  return (
    <View style={{ flex: 1, backgroundColor: cores.fundo }}>
      <View style={s.busca}>
        <Ionicons name="search" size={18} color={cores.suave} />
        <TextInput style={s.input} placeholder="Buscar serviço..." value={busca} onChangeText={setBusca} />
      </View>
      <FlatList
        data={lista} keyExtractor={(i) => i.id} contentContainerStyle={{ padding: 16, paddingTop: 4 }}
        ListEmptyComponent={<Text style={s.vazio}>Nenhum serviço encontrado.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} style={[s.card, sombra]} onPress={() => navigation.navigate('ServicoDetalhe', { id: item.id })}>
            <Image source={item.imagem} style={s.img} />
            <View style={s.info}>
              <View style={s.topo}>
                <Ionicons name={item.icone} size={18} color={cores.primaria} />
                <Text style={s.nome}>{item.nome}</Text>
                {item.tag ? <Chip texto={item.tag} cor={cores.amarelo} /> : null}
              </View>
              <Text style={s.resumo}>{item.resumo}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  busca: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 16, marginBottom: 8, borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: cores.borda },
  input: { flex: 1, paddingVertical: 10, paddingLeft: 8, fontSize: 15 },
  card: { backgroundColor: '#fff', borderRadius: 16, marginTop: 12, overflow: 'hidden' },
  img: { width: '100%', height: 150 },
  info: { padding: 14 },
  topo: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  nome: { fontSize: 17, fontWeight: '700', color: cores.texto, marginHorizontal: 8 },
  resumo: { color: cores.suave, marginTop: 6, fontSize: 14, lineHeight: 20 },
  vazio: { textAlign: 'center', color: cores.suave, marginTop: 40 },
});
