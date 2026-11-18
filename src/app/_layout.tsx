import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1E293B' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Sitios Turísticos de Quito' }}
      />
      <Stack.Screen
        name="formulario"
        options={{ title: 'Gestionar Sitio' }}
      />
    </Stack>
  );
}