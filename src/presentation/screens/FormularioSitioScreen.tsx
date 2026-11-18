import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFormularioSitio } from '../hooks/useFormularioSitio';

export function FormularioSitioScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const sitioId = params.id;

  const {
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    categoria,
    setCategoria,
    ubicacion,
    setUbicacion,
    errores,
    guardando,
    cargarDatosParaEditar,
    guardar,
  } = useFormularioSitio(sitioId);

  useEffect(() => {
    if (sitioId) {
      cargarDatosParaEditar(sitioId);
    }
  }, [sitioId]);

  const manejarGuardar = async () => {
    const exito = await guardar();
    if (exito) {
      Alert.alert(
        'Éxito',
        sitioId ? 'Sitio actualizado correctamente.' : 'Sitio guardado correctamente.'
      );
      router.back();
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.titulo}>
        {sitioId ? 'Editar Sitio Turístico' : 'Nuevo Sitio Turístico'}
      </Text>

      {errores.general && <Text style={styles.error}>{errores.general}</Text>}

      <Text style={styles.label}>Nombre del sitio *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Mitad del Mundo"
        value={nombre}
        onChangeText={setNombre}
      />
      {errores.nombre && <Text style={styles.error}>{errores.nombre}</Text>}

      <Text style={styles.label}>Descripción *</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe el lugar (mínimo 10 caracteres)"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
      />
      {errores.descripcion && <Text style={styles.error}>{errores.descripcion}</Text>}

      <Text style={styles.label}>Categoría *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Monumento, Parque, Iglesia, Mirador"
        value={categoria}
        onChangeText={setCategoria}
      />
      {errores.categoria && <Text style={styles.error}>{errores.categoria}</Text>}

      <Text style={styles.label}>Ubicación *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. San Antonio de Pichincha, Quito"
        value={ubicacion}
        onChangeText={setUbicacion}
      />
      {errores.ubicacion && <Text style={styles.error}>{errores.ubicacion}</Text>}

      <TouchableOpacity
        style={[styles.botonGuardar, guardando && styles.botonDeshabilitado]}
        onPress={manejarGuardar}
        disabled={guardando}
      >
        <Text style={styles.botonTexto}>
          {guardando ? 'Guardando...' : sitioId ? 'Actualizar Sitio' : 'Guardar Sitio'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  error: {
    color: '#DC2626',
    fontSize: 13,
    marginTop: 4,
  },
  botonGuardar: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});