export interface Sitio {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  ubicacion: string;
  created_at?: string;
}

export type NuevoSitio = Omit<Sitio, 'id' | 'created_at'>;

export class ValidadorSitio {
  static validar(datos: NuevoSitio): { valido: boolean; errores: Record<string, string> } {
    const errores: Record<string, string> = {};

    if (!datos.nombre || datos.nombre.trim().length < 3) {
      errores.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }
    if (!datos.descripcion || datos.descripcion.trim().length < 10) {
      errores.descripcion = 'La descripción debe tener al menos 10 caracteres.';
    }
    if (!datos.categoria || datos.categoria.trim().length === 0) {
      errores.categoria = 'La categoría es obligatoria.';
    }
    if (!datos.ubicacion || datos.ubicacion.trim().length === 0) {
      errores.ubicacion = 'La ubicación es obligatoria.';
    }

    return {
      valido: Object.keys(errores).length === 0,
      errores,
    };
  }
}