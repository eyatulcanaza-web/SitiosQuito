import { useState } from 'react';
import { NuevoSitio, ValidadorSitio } from '../../domain/sitios';
import { SitioService } from '../../infrastructure/sitioService';

export function useFormularioSitio(id?: string) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [guardando, setGuardando] = useState(false);

  const cargarDatosParaEditar = async (sitioId: string) => {
    try {
      setGuardando(true);
      const sitio = await SitioService.obtenerPorId(sitioId);
      if (sitio) {
        setNombre(sitio.nombre);
        setDescripcion(sitio.descripcion);
        setCategoria(sitio.categoria);
        setUbicacion(sitio.ubicacion);
      }
    } finally {
      setGuardando(false);
    }
  };

  const guardar = async (): Promise<boolean> => {
    const datos: NuevoSitio = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      categoria: categoria.trim(),
      ubicacion: ubicacion.trim(),
    };

    const validacion = ValidadorSitio.validar(datos);
    setErrores(validacion.errores);

    if (!validacion.valido) {
      return false;
    }

    try {
      setGuardando(true);
      if (id) {
        await SitioService.actualizar(id, datos);
      } else {
        await SitioService.crear(datos);
      }
      return true;
    } catch (err: any) {
      setErrores({ general: err.message || 'Error al guardar en Supabase' });
      return false;
    } finally {
      setGuardando(false);
    }
  };

  return {
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
  };
}