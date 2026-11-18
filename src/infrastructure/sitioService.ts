import { supabase } from './supabaseClient';
import { NuevoSitio, Sitio } from '../domain/sitios';

export class SitioService {
  static async obtenerTodos(): Promise<Sitio[]> {
    const { data, error } = await supabase
      .from('sitios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data ?? [];
  }

  static async obtenerPorId(id: string): Promise<Sitio | null> {
    const { data, error } = await supabase
      .from('sitios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async crear(sitio: NuevoSitio): Promise<Sitio> {
    const { data, error } = await supabase
      .from('sitios')
      .insert([sitio])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async actualizar(id: string, sitio: NuevoSitio): Promise<Sitio> {
    const { data, error } = await supabase
      .from('sitios')
      .update(sitio)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async eliminar(id: string): Promise<void> {
    const { error } = await supabase
      .from('sitios')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
}