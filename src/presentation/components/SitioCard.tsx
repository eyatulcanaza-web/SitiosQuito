import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Sitio } from '../../domain/sitios';

interface SitioCardProps {
  sitio: Sitio;
  onEditar: (id: string) => void;
  onEliminar: (id: string, nombre: string) => void;
}

export function SitioCard({ sitio, onEditar, onEliminar }: SitioCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nombre}>{sitio.nombre}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{sitio.categoria}</Text>
        </View>
      </View>

      <Text style={styles.descripcion}>{sitio.descripcion}</Text>
      <Text style={styles.ubicacion}>📍 {sitio.ubicacion}</Text>

      <View style={styles.acciones}>
        <TouchableOpacity
          style={[styles.boton, styles.botonEditar]}
          onPress={() => onEditar(sitio.id)}
        >
          <Text style={styles.botonTexto}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.boton, styles.botonEliminar]}
          onPress={() => onEliminar(sitio.id, sitio.nombre)}
        >
          <Text style={styles.botonTexto}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
  },
  badge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '600',
  },
  descripcion: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 20,
  },
  ubicacion: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 12,
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  boton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  botonEditar: {
    backgroundColor: '#2563EB',
  },
  botonEliminar: {
    backgroundColor: '#DC2626',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});