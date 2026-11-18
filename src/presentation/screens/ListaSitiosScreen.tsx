import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useSitios } from '../hooks/useSitios';
import { SitioCard } from '../components/SitioCard';

export function ListaSitiosScreen() {
  const router = useRouter();
  const { sitios, cargando, error, cargarSitios, eliminarSitio } = useSitios();

  useFocusEffect(
    useCallback(() => {
      cargarSitios();
    }, [cargarSitios])
  );

  const confirmarEliminacion = (id: string, nombre: string) => {
    Alert.alert(
      'Eliminar sitio',
      `¿Estás seguro de eliminar "${nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await eliminarSitio(id);
            } catch {
              Alert.alert('Error', 'No se pudo eliminar el sitio.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botonNuevo}
        onPress={() => router.push('/formulario')}
      >
        <Text style={styles.botonNuevoTexto}>+ Agregar Sitio Turístico</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {cargando ? (
        <ActivityIndicator size="large" color="#2563EB" style={styles.loader} />
      ) : (
        <FlatList
          data={sitios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SitioCard
              sitio={item}
              onEditar={(id) => router.push({ pathname: '/formulario', params: { id } })}
              onEliminar={confirmarEliminacion}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.vacioText}>
              No hay sitios turísticos registrados aún. ¡Agrega el primero!
            </Text>
          }
          contentContainerStyle={styles.lista}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  botonNuevo: {
    backgroundColor: '#16A34A',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  botonNuevoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: {
    marginTop: 40,
  },
  errorText: {
    color: '#DC2626',
    marginBottom: 12,
    textAlign: 'center',
  },
  vacioText: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 40,
    fontSize: 15,
  },
  lista: {
    paddingBottom: 24,
  },
});