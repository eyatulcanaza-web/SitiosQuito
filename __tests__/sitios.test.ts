import { ValidadorSitio, NuevoSitio } from '../src/domain/sitios';
import { SitioService } from '../src/infrastructure/sitioService';
import { supabase } from '../src/infrastructure/supabaseClient';

jest.mock('../src/infrastructure/supabaseClient', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe('Pruebas unitarias - Dominio ValidadorSitio', () => {
  test('debe aprobar un sitio turístico con datos válidos', () => {
    const sitioValido: NuevoSitio = {
      nombre: 'Basílica del Voto Nacional',
      descripcion: 'Iglesia neogótica emblemática ubicada en el centro de Quito.',
      categoria: 'Iglesia',
      ubicacion: 'Centro Histórico, Quito',
    };

    const resultado = ValidadorSitio.validar(sitioValido);
    expect(resultado.valido).toBe(true);
    expect(Object.keys(resultado.errores)).toHaveLength(0);
  });

  test('debe rechazar un sitio cuando faltan campos o son muy cortos', () => {
    const sitioInvalido: NuevoSitio = {
      nombre: 'AB',
      descripcion: 'Corta',
      categoria: '',
      ubicacion: '',
    };

    const resultado = ValidadorSitio.validar(sitioInvalido);
    expect(resultado.valido).toBe(false);
    expect(resultado.errores.nombre).toBeDefined();
    expect(resultado.errores.descripcion).toBeDefined();
    expect(resultado.errores.categoria).toBeDefined();
    expect(resultado.errores.ubicacion).toBeDefined();
  });
});

describe('Pruebas unitarias - Infraestructura SitioService (CRUD)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('obtenerTodos debe retornar la lista de sitios desde Supabase', async () => {
    const mockSitios = [
      {
        id: '1',
        nombre: 'El Panecillo',
        descripcion: 'Mirador natural con la Virgen de Quito.',
        categoria: 'Mirador',
        ubicacion: 'Centro de Quito',
      },
    ];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        order: jest.fn().mockResolvedValue({ data: mockSitios, error: null }),
      }),
    });

    const resultado = await SitioService.obtenerTodos();
    expect(supabase.from).toHaveBeenCalledWith('sitios');
    expect(resultado).toEqual(mockSitios);
  });

  test('crear debe insertar un sitio y devolver el registro creado', async () => {
    const nuevo: NuevoSitio = {
      nombre: 'TelefériQo',
      descripcion: 'Teleférico que sube hasta Cruz Loma en el volcán Pichincha.',
      categoria: 'Aventura',
      ubicacion: 'Av. Occidental, Quito',
    };

    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: { id: '2', ...nuevo },
            error: null,
          }),
        }),
      }),
    });

    const creado = await SitioService.crear(nuevo);
    expect(creado.id).toBe('2');
    expect(creado.nombre).toBe('TelefériQo');
  });

  test('eliminar debe borrar un sitio por su id sin lanzar errores', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ error: null }),
      }),
    });

    await expect(SitioService.eliminar('1')).resolves.toBeUndefined();
    expect(supabase.from).toHaveBeenCalledWith('sitios');
  });
});