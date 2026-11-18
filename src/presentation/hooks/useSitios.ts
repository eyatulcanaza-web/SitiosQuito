import { useState, useCallback } from 'react';
import { Sitio } from '../../domain/sitios';
import { SitioService } from '../../infrastructure/sitioService';

export function useSitios() {
  const [sitios, setSitios] = useState<Sitio[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const cargarSitios = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await SitioService.obtenerTodos();
      setSitios(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los sitios');
    } finally {
      setCargando(false);
    }
  }, []);

  const eliminarSitio = async (id: string) => {
    try {
      setError(null);
      await SitioService.eliminar(id);
      setSitios((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el sitio');
      throw err;
    }
  };

  return {
    sitios,
    cargando,
    error,
    cargarSitios,
    eliminarSitio,
  };
}