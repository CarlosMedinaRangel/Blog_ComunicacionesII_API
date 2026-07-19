// src/seed/data/seed-data.ts
import * as bcrypt from 'bcrypt';
// Categorías válidas del blog — ajústalas a las que uses en tu proyecto
type ValidCategory =
  | 'Tecnología'
  | 'Programación'
  | 'Diseño'
  | 'Ciencia'
  | 'Entretenimiento'
  | 'Libros'
  | 'Videojuegos'
  | 'Música';

interface SeedPost {
  title: string;
  Content: string; // Respeta el PascalCase de tu entidad
  Category: ValidCategory;
  tags: string[];
}

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: string[];
}
interface SeedReply {
  content: string;
  authorIndex: number;
  replies?: SeedReply[];
}
interface SeedComment {
  content: string;
  postIndex: number;
  authorIndex: number;
  replies?: SeedReply[];
}

interface SeedData {
  users: SeedUser[];
  posts: SeedPost[];
  comments: SeedComment[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'test1@google.com',
      fullName: 'Alejandra Patino',
      password: bcrypt.hashSync('Abc123!', 10),
      roles: ['admin', 'user', 'super-user'],
    },
    {
      email: 'test2@google.com',
      fullName: 'Carlos Medina',
      password: bcrypt.hashSync('Abc123!', 10),
      roles: ['admin', 'user', 'super-user'],
    },
    {
      email: 'test3@google.com',
      fullName: 'Alfonso D Leon',
      password: bcrypt.hashSync('Abc123!', 10),
      roles: ['user'],
    },
  ],
  posts: [
    // ── PROGRAMACIÓN (3) ───────────────────────────────────────────────────
    {
      // postIndex: 0
      title: 'Cómo documentar APIs REST con NestJS y Swagger',
      Content:
        'Documentar una API es tan importante como construirla. En este post veremos cómo integrar Swagger (OpenAPI) en un proyecto NestJS desde cero. Instalaremos @nestjs/swagger, configuraremos el módulo en main.ts, y aprenderemos a usar decoradores como @ApiProperty, @ApiOperation y @ApiResponse para que nuestra documentación sea clara, precisa y automática.',
      Category: 'Programación',
      tags: ['nestjs', 'swagger', 'api', 'typescript', 'backend'],
    },
    {
      // postIndex: 1
      title: 'TypeORM: relaciones OneToMany y ManyToOne explicadas',
      Content:
        'Las relaciones entre entidades son el corazón de cualquier base de datos relacional. En este artículo explicamos la diferencia entre OneToMany y ManyToOne en TypeORM usando un blog como ejemplo práctico: un usuario puede tener muchos posts, y cada post pertenece a un único usuario.',
      Category: 'Programación',
      tags: ['typeorm', 'postgresql', 'backend', 'nestjs'],
    },
    {
      // postIndex: 2
      title: 'Optimizando Entity Framework Core en .NET',
      Content:
        'El rendimiento en bases de datos relacionales como SQL Server depende mucho de cómo uses tu ORM. Explicamos el uso de AsNoTracking() para consultas de lectura rápida, la gestión de transacciones concurrentes y cómo evitar el problema de consultas N+1 en tus repositorios.',
      Category: 'Programación',
      tags: ['dotnet', 'entity-framework', 'csharp', 'sql-server'],
    },

    // ── LIBROS (5 - Protagonismo) ──────────────────────────────────────────
    {
      // postIndex: 3
      title: 'El resplandor de Stephen King: terror psicológico',
      Content:
        'El resplandor (1977) es probablemente la novela más icónica de Stephen King. Jack Torrance acepta un trabajo como cuidador de invierno del hotel Overlook. Lo que diferencia esta novela del terror convencional es que el verdadero monstruo es el deterioro mental de un hombre amplificado por el aislamiento.',
      Category: 'Libros',
      tags: ['stephen-king', 'terror', 'novela', 'clasicos'],
    },
    {
      // postIndex: 4
      title: 'Dune: La obra cumbre de la ciencia ficción',
      Content:
        'Frank Herbert construyó en Arrakis un ecosistema perfecto. Dune no es solo una historia sobre gusanos de arena y batallas estelares, es un profundo ensayo sobre la ecología, la dependencia de los recursos naturales, la manipulación religiosa y los peligros de seguir ciegamente a líderes carismáticos.',
      Category: 'Libros',
      tags: ['dune', 'ciencia-ficcion', 'frank-herbert', 'clasicos'],
    },
    {
      // postIndex: 5
      title: '1984 de George Orwell: Una advertencia vigente',
      Content:
        'Publicada en 1949, esta novela distópica introdujo conceptos como el Gran Hermano, la Policía del Pensamiento y el Doblepensar. La genialidad de Orwell no fue predecir el futuro tecnológico, sino comprender cómo el lenguaje (Neolengua) puede ser utilizado para limitar el pensamiento humano.',
      Category: 'Libros',
      tags: ['orwell', 'distopia', 'clasicos', 'politica'],
    },
    {
      // postIndex: 6
      title: 'Cien años de soledad: El apogeo del realismo mágico',
      Content:
        'La obra maestra de Gabriel García Márquez narra la historia de la familia Buendía en el pueblo ficticio de Macondo. Es un viaje donde lo mítico y lo cotidiano se entrelazan de manera inseparable, creando una metáfora sobre el tiempo circular y la historia de América Latina.',
      Category: 'Libros',
      tags: ['garcia-marquez', 'realismo-magico', 'literatura', 'novela'],
    },
    {
      // postIndex: 7
      title: 'El Psicoanalista: Tensión desde la primera línea',
      Content:
        '"Feliz 53 cumpleaños, doctor. Bienvenido al primer día de su muerte." Con esta premisa, John Katzenbach arranca uno de los thrillers psicológicos más absorbentes de las últimas décadas, obligando a su protagonista a descubrir quién quiere destruirlo antes de que el tiempo se agote.',
      Category: 'Libros',
      tags: ['katzenbach', 'thriller', 'misterio', 'ficcion'],
    },

    // ── VIDEOJUEGOS (3) ────────────────────────────────────────────────────
    {
      // postIndex: 8
      title: 'Elden Ring y el diseño de mundo abierto',
      Content:
        'FromSoftware tomó su filosofía de diseño de niveles intrincados y la expandió a un mundo abierto sin perder lo que hace especiales a sus juegos: la sensación de descubrimiento genuino y la dificultad como lenguaje narrativo.',
      Category: 'Videojuegos',
      tags: ['elden-ring', 'fromsoft', 'mundo-abierto', 'rpg'],
    },
    {
      // postIndex: 9
      title: 'La interfaz revolucionaria de Persona 5',
      Content:
        'Mientras muchos JRPG optan por menús sobrios y minimalistas, Persona 5 convierte su interfaz de usuario (UI) en una explosión de estilo, color y dinamismo. Cada transición, desde la pantalla de victoria hasta el menú de objetos, rezuma personalidad sin sacrificar la legibilidad.',
      Category: 'Videojuegos',
      tags: ['persona-5', 'ui', 'rpg', 'atlus', 'diseño'],
    },
    {
      // postIndex: 10
      title: 'Cassette Beasts: Más allá de los monstruos, personas complejas',
      Content:
        'Es fácil centrarse en las fusiones de criaturas y mecánicas elementales, pero el valor real de Cassette Beasts está en sus compañeros. Si evaluamos a los personajes como personas, descubrimos narrativas profundas sobre miedos internos, crecimiento emocional y la importancia de los vínculos humanos en un mundo hostil.',
      Category: 'Videojuegos',
      tags: ['cassette-beasts', 'indie', 'rpg', 'narrativa'],
    },

    // ── MÚSICA (3) ─────────────────────────────────────────────────────────
    {
      // postIndex: 11
      title: 'El impacto de OK Computer de Radiohead',
      Content:
        'A finales de los 90, cuando el Britpop dominaba, Radiohead lanzó un álbum que predecía la alienación tecnológica del siglo XXI. Con texturas complejas, guitarras distorsionadas y letras melancólicas, OK Computer redefinió las fronteras del rock alternativo.',
      Category: 'Música',
      tags: ['radiohead', 'rock-alternativo', 'indie', 'clasicos'],
    },
    {
      // postIndex: 12
      title: 'Oasis y el himno de toda una generación',
      Content:
        'Con una actitud arrogante y melodías innegablemente pegadizas, los hermanos Gallagher llevaron el rock británico a su cúspide comercial. Discutimos la composición detrás de "(What\'s the Story) Morning Glory?" y su impacto cultural masivo.',
      Category: 'Música',
      tags: ['oasis', 'britpop', 'rock', '90s'],
    },
    {
      // postIndex: 13
      title: 'La energía frenética de Bloc Party',
      Content:
        'El álbum "Silent Alarm" es una clase magistral de post-punk revival. Combinando líneas de bajo rítmicas, baterías incansables y letras introspectivas, la banda logró capturar la ansiedad y la urgencia de la juventud a principios de los 2000.',
      Category: 'Música',
      tags: ['bloc-party', 'indie-rock', 'post-punk', 'musica'],
    },

    // ── DISEÑO (3) ─────────────────────────────────────────────────────────
    {
      // postIndex: 14
      title: 'Minimalismo y diseño Escandinavo en UI',
      Content:
        'Menos es más. El uso de espacios en blanco, tipografías sans-serif limpias y paletas de colores neutros inspiradas en el diseño escandinavo no solo hace que las interfaces sean visualmente atractivas, sino que mejoran drásticamente la experiencia de usuario (UX).',
      Category: 'Diseño',
      tags: ['minimalismo', 'ui', 'ux', 'tendencias'],
    },
    {
      // postIndex: 15
      title: 'Atomic Design: Construyendo sistemas escalables',
      Content:
        'La metodología de Brad Frost divide las interfaces en átomos, moléculas, organismos, plantillas y páginas. Esta estructura jerárquica es fundamental para mantener la consistencia en grandes proyectos utilizando librerías como React o Vue.',
      Category: 'Diseño',
      tags: ['atomic-design', 'sistemas-de-diseño', 'frontend', 'arquitectura'],
    },
    {
      // postIndex: 16
      title: 'El trazo amateur como recurso narrativo: El arte de Omori',
      Content:
        'A veces la perfección aleja al usuario. El uso de ilustraciones estilo sketch, con un acabado torpe y deliberadamente imperfecto, logra evocar nostalgia y melancolía. Analizamos cómo el estilo visual de Omori comunica estados emocionales complejos a través de su arte.',
      Category: 'Diseño',
      tags: ['omori', 'direccion-de-arte', 'sketch', 'emocion'],
    },

    // ── TECNOLOGÍA (3) ─────────────────────────────────────────────────────
    {
      // postIndex: 17
      title: 'Sandboxing local con Fedora y VirtualBox',
      Content:
        'Mantener tu sistema operativo anfitrión limpio es vital. Explicamos cómo configurar un entorno de desarrollo robusto montando máquinas virtuales con distribuciones basadas en Red Hat como Fedora, gestionando permisos y carpetas compartidas con fluidez.',
      Category: 'Tecnología',
      tags: ['linux', 'fedora', 'virtualbox', 'entorno-de-desarrollo'],
    },
    {
      // postIndex: 18
      title: 'PostgreSQL vs MongoDB: SQL vs NoSQL',
      Content:
        '¿Cuándo deberías usar un modelo relacional estricto frente a la flexibilidad de los documentos JSON? Comparamos casos de uso reales entre estas dos potencias del almacenamiento de datos, analizando escalabilidad, consistencia y soporte para transacciones complejas.',
      Category: 'Tecnología',
      tags: ['postgresql', 'mongodb', 'bases-de-datos', 'comparativa'],
    },
    {
      // postIndex: 19
      title: 'Docker: Contenedores para principiantes',
      Content:
        'El problema de "funciona en mi máquina" se soluciona con contenedores. Aprende los fundamentos de Docker, cómo escribir un Dockerfile eficiente y levantar entornos multi-contenedor con Docker Compose en pocos minutos.',
      Category: 'Tecnología',
      tags: ['docker', 'devops', 'contenedores', 'backend'],
    },

    // ── CIENCIA (3) ────────────────────────────────────────────────────────
    {
      // postIndex: 20
      title: 'El principio de incertidumbre de Heisenberg',
      Content:
        'Una mirada a la física cuántica: por qué es físicamente imposible conocer la posición y el momento exacto de una partícula al mismo tiempo. No es una limitación de nuestra tecnología, sino una propiedad fundamental del universo.',
      Category: 'Ciencia',
      tags: ['fisica-cuantica', 'heisenberg', 'ciencia', 'divulgacion'],
    },
    {
      // postIndex: 21
      title: 'La paradoja de Fermi: ¿Dónde está todo el mundo?',
      Content:
        'Dada la inmensidad del universo observable y los miles de millones de años que tiene, la probabilidad de vida extraterrestre es altísima. Sin embargo, no hemos encontrado nada. Analizamos las posibles respuestas, incluido el aterrador concepto del Gran Filtro.',
      Category: 'Ciencia',
      tags: ['paradoja-fermi', 'astronomia', 'espacio', 'misterio'],
    },
    {
      // postIndex: 22
      title: 'CRISPR y el futuro de la edición genética',
      Content:
        'La herramienta de "cortar y pegar" ADN ha revolucionado la biología molecular. Exploramos cómo funciona el sistema CRISPR-Cas9, sus aplicaciones para curar enfermedades hereditarias y los profundos dilemas éticos que plantea.',
      Category: 'Ciencia',
      tags: ['biotecnologia', 'crispr', 'genetica', 'etica'],
    },

    // ── ENTRETENIMIENTO (3) ────────────────────────────────────────────────
    {
      // postIndex: 23
      title: 'El renacimiento de los juegos de mesa',
      Content:
        'Más allá de Monopoly o Risk, la era moderna ha traído títulos con mecánicas profundas como Catan, Ticket to Ride o Gloomhaven. Analizamos por qué el entretenimiento analógico está ganando tanto terreno en una era digital.',
      Category: 'Entretenimiento',
      tags: ['juegos-de-mesa', 'hobbies', 'social', 'analogo'],
    },
    {
      // postIndex: 24
      title: 'El impacto del streaming en el cine tradicional',
      Content:
        '¿Estamos presenciando el fin de las salas de cine? Con plataformas produciendo películas con presupuestos de superproducciones, debatimos el cambio de paradigma en la distribución y el consumo del séptimo arte.',
      Category: 'Entretenimiento',
      tags: ['cine', 'streaming', 'cultura', 'peliculas'],
    },
    {
      // postIndex: 25
      title: 'La evolución de la animación: del 2D tradicional al 3D',
      Content:
        'Desde los cuadros dibujados a mano de la época dorada de Disney hasta las complejas simulaciones de partículas en Pixar y el reciente resurgimiento de estilos híbridos como el visto en Spider-Verse.',
      Category: 'Entretenimiento',
      tags: ['animacion', 'cine', 'arte', 'historia'],
    },
  ],

  // ── COMENTARIOS (Nuevos y variados) ──────────────────────────────────────────
  comments: [
    // ── Post 0: NestJS y Swagger ──
    {
      postIndex: 0,
      authorIndex: 1, // Carlos
      content: 'Excelente artículo! Justo lo que necesitaba para mi proyecto.',
      replies: [
        {
          authorIndex: 0, // Admin
          content: 'Gracias Carlos! Si tienes dudas con algún decorador específico, pregunta sin problema.',
          replies: [
            {
              authorIndex: 1,
              content: 'Perfecto, tengo una duda con @ApiResponse, ¿puedo usarlo múltiples veces en el mismo endpoint?',
            },
          ],
        },
        {
          authorIndex: 2, // Alfonso
          content: 'Yo también lo encontré muy útil. Añadiría que conviene versionar la API desde el inicio.',
        },
      ],
    },
    
    // ── Post 2: EF Core en .NET ──
    {
      postIndex: 2,
      authorIndex: 1, // Carlos
      content: 'AsNoTracking es un salvavidas de rendimiento. Muy buena explicación de cuándo no usarlo.',
      replies: [
        {
          authorIndex: 0, // Admin
          content: 'Así es. He visto bases de datos caerse solo por mantener el tracking en consultas de reportes gigantes.',
        }
      ],
    },

    // ── Post 3: El Resplandor ──
    {
      postIndex: 3,
      authorIndex: 1, // Carlos
      content: 'Una de mis novelas favoritas. King logra que sientas claustrofobia sin salir de casa.',
      replies: [
        {
          authorIndex: 2, // Alfonso
          content: '¿Lo viste también adaptado por Kubrick? La película es muy diferente al libro.',
          replies: [
            {
              authorIndex: 1,
              content: 'Sí! King odiaba la adaptación de Kubrick, lo cual es irónico porque la película es magnífica.',
            },
          ],
        },
      ],
    },

    // ── Post 4: Dune ──
    {
      postIndex: 4,
      authorIndex: 2, // Alfonso
      content: 'El nivel de construcción del mundo (worldbuilding) de Herbert no tiene comparación.',
      replies: [
        {
          authorIndex: 0, // Admin
          content: 'Totalmente. Incluso los apéndices ecológicos sobre Arrakis son fascinantes de leer.',
        }
      ]
    },

    // ── Post 8: Elden Ring ──
    {
      postIndex: 8,
      authorIndex: 0, // Admin
      content: 'Lo que más me impresionó fue que el mundo abierto no tiene viaje rápido obligatorio. Te obliga a explorarlo.',
      replies: [
        {
          authorIndex: 1, // Carlos
          content: 'Exacto, y cada zona tiene su propia identidad visual. Nunca se siente repetitivo.',
          replies: [
            {
              authorIndex: 2, // Alfonso
              content: 'Caelid me traumatizó la primera vez que entré sin estar preparado 😅',
            },
          ],
        },
      ],
    },

    // ── Post 10: Cassette Beasts ──
    {
      postIndex: 10,
      authorIndex: 1, // Carlos
      content: 'Me encanta que resaltes esto. Evaluar a los personajes como personas y no como simples NPCs cambia toda la experiencia del juego.',
      replies: [
        {
          authorIndex: 0, // Admin
          content: 'Esa es la clave del indie moderno, usar el RPG como vehículo para contar historias íntimas y humanas.',
        }
      ]
    },

    // ── Post 16: Omori ──
    {
      postIndex: 16,
      authorIndex: 2, // Alfonso
      content: 'Es increíble cómo un estilo de ilustración tan simple te puede transmitir tanta ansiedad.',
      replies: [
        {
          authorIndex: 1, // Carlos
          content: 'Eso es lo brillante. Los trazos irregulares reflejan perfectamente el estado mental fracturado del protagonista.',
        }
      ]
    },
    
    // ── Post 17: Fedora y VirtualBox ──
    {
      postIndex: 17,
      authorIndex: 1, // Carlos
      content: 'Llevo tiempo queriendo aislar mis entornos. ¿Es complicado configurar las guest additions en Fedora?',
      replies: [
        {
          authorIndex: 0, // Admin
          content: 'Para nada, solo asegúrate de instalar primero los headers del kernel y dkms, luego el instalador corre sin problema.',
        }
      ]
    }
  ],
};
