import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, Vibration, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Accelerometer } from 'expo-sensors';
import { cores } from '../theme';
import { Botao } from '../ui';

const RAIO = 100;      // raio do círculo (px)
const LIMITE = 0.04;   // tolerância (em g) para considerar nivelado

export default function Vistoria() {
  const [disponivel, setDisponivel] = useState(true);
  const [leitura, setLeitura] = useState({ x: 0, y: 0, z: -1 });
  const [travado, setTravado] = useState(false);
  const travadoRef = useRef(false);
  travadoRef.current = travado;

  // Sensor: assina o acelerômetro só enquanto a aba está em foco.
  useFocusEffect(useCallback(() => {
    let ativo = true; let sub = null;
    Accelerometer.isAvailableAsync().then((ok) => {
      if (!ativo) return;
      setDisponivel(ok);
      if (!ok) return;
      Accelerometer.setUpdateInterval(80);
      sub = Accelerometer.addListener((d) => { if (!travadoRef.current) setLeitura(d); });
    }).catch(() => setDisponivel(false));
    return () => { ativo = false; if (sub) sub.remove(); };
  }, []));

  const { x, y, z } = leitura;
  const nivelado = Math.abs(x) < LIMITE && Math.abs(y) < LIMITE;
  const inclinacao = (Math.atan2(Math.hypot(x, y), Math.abs(z)) * 180) / Math.PI;
  const clamp = (v) => Math.max(-RAIO + 24, Math.min(RAIO - 24, v));

  // Atuador: vibra uma vez ao atingir o nível.
  useEffect(() => { if (nivelado && !travado) Vibration.vibrate(40); }, [nivelado]);

  if (!disponivel) {
    return <View style={s.tela}><Text style={s.aviso}>Acelerômetro indisponível neste dispositivo. Teste em um celular com o Expo Go.</Text></View>;
  }

  return (
    <View style={s.tela}>
      <Text style={s.dica}>Apoie o celular sobre a superfície que deseja verificar (piso, bancada, tampo).</Text>
      <View style={[s.circulo, { borderColor: nivelado ? cores.verde : cores.primaria }]}>
        <View style={s.cruzV} /><View style={s.cruzH} />
        <View style={[s.bolha, { backgroundColor: nivelado ? cores.verde : cores.amarelo, transform: [{ translateX: clamp(x * 200) }, { translateY: clamp(-y * 200) }] }]} />
      </View>
      <Text style={[s.status, { color: nivelado ? cores.verde : cores.texto }]}>{nivelado ? 'Nivelado ✓' : 'Fora de nível'}</Text>
      <Text style={s.graus}>Inclinação: {inclinacao.toFixed(1)}°</Text>
      <Botao titulo={travado ? 'Retomar medição' : 'Travar medição'} icone={travado ? 'play' : 'pause'} tipo="contorno" onPress={() => setTravado(!travado)} style={{ marginTop: 18 }} />
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo, alignItems: 'center', justifyContent: 'center', padding: 24 },
  dica: { textAlign: 'center', color: cores.suave, marginBottom: 24, lineHeight: 20 },
  aviso: { textAlign: 'center', color: cores.suave, fontSize: 15 },
  circulo: { width: RAIO * 2, height: RAIO * 2, borderRadius: RAIO, borderWidth: 4, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  cruzV: { position: 'absolute', width: 1, height: '100%', backgroundColor: cores.borda },
  cruzH: { position: 'absolute', height: 1, width: '100%', backgroundColor: cores.borda },
  bolha: { width: 48, height: 48, borderRadius: 24 },
  status: { fontSize: 22, fontWeight: '800', marginTop: 24 },
  graus: { fontSize: 15, color: cores.suave, marginTop: 4 },
});
