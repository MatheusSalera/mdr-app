import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { cores } from './src/theme';
import Inicio from './src/screens/Inicio';
import Servicos from './src/screens/Servicos';
import ServicoDetalhe from './src/screens/ServicoDetalhe';
import Propostas from './src/screens/Propostas';
import PropostaForm from './src/screens/PropostaForm';
import Vistoria from './src/screens/Vistoria';
import Contato from './src/screens/Contato';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const icones = { Inicio: 'home', Servicos: 'construct', Propostas: 'document-text', Vistoria: 'speedometer', Contato: 'call' };
const cabecalho = { headerStyle: { backgroundColor: cores.primaria }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: '700' } };

function Abas() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...cabecalho,
        tabBarActiveTintColor: cores.primaria,
        tabBarIcon: ({ color, size }) => <Ionicons name={icones[route.name]} size={size} color={color} />,
      })}>
      <Tab.Screen name="Inicio" component={Inicio} options={{ title: 'MDR Serviços', tabBarLabel: 'Início' }} />
      <Tab.Screen name="Servicos" component={Servicos} options={{ title: 'Nossos serviços', tabBarLabel: 'Serviços' }} />
      <Tab.Screen name="Propostas" component={Propostas} options={{ title: 'Minhas propostas' }} />
      <Tab.Screen name="Vistoria" component={Vistoria} options={{ title: 'Nível de vistoria' }} />
      <Tab.Screen name="Contato" component={Contato} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={cabecalho}>
          <Stack.Screen name="Principal" component={Abas} options={{ headerShown: false }} />
          <Stack.Screen name="ServicoDetalhe" component={ServicoDetalhe} options={{ title: 'Detalhes do serviço' }} />
          <Stack.Screen name="PropostaForm" component={PropostaForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
