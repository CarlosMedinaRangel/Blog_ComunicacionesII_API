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
  Content: string;
  Content2: string;
  Content3: string;
  Category: ValidCategory;
  tags: string[];
  image: string[];
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
      Content2:
        'Para empezar, instalamos el paquete oficial con "npm install --save @nestjs/swagger". Luego, nos dirigimos a "main.ts" para inicializar el módulo usando la clase DocumentBuilder, donde definimos metadatos clave como el título, la versión y la descripción de la API. Con SwaggerModule.createDocument() generamos el esquema OpenAPI y, finalmente, lo montamos en una ruta de la aplicación (por ejemplo, "/docs") para poder interactuar y probar los endpoints directamente en el navegador.',
      Content3:
        'Una vez configurado el motor, el verdadero valor está en describir las estructuras y rutas. En los DTOs, usamos @ApiProperty() para documentar el tipo, ejemplo y obligatoriedad de cada campo. En los controladores, agrupamos con @ApiTags() y explicamos cada endpoint con @ApiOperation() y @ApiResponse() para mapear los códigos HTTP (200, 201, 400, 404). Tip pro: si activas el plugin de Swagger en el archivo nest-cli.json, NestJS inferirá automáticamente los tipos de tus DTOs sin necesidad de anotar cada campo manualmente',
      Category: 'Programación',
      tags: ['nestjs', 'swagger', 'api', 'typescript', 'backend'],
      image: ['NEST1.jpg', 'NEST2.png', 'NEST3.png'],
    },
    {
      // postIndex: 1
      title: 'TypeORM: relaciones OneToMany y ManyToOne explicadas',
      Content:
        'Las relaciones entre entidades son el corazón de cualquier base de datos relacional. En este artículo explicamos la diferencia entre OneToMany y ManyToOne en TypeORM usando un blog como ejemplo práctico: un usuario puede tener muchos posts, y cada post pertenece a un único usuario.',
      Content2:
        'Para definir esta relación en código, importamos los decoradores @OneToMany y @ManyToOne de TypeORM en nuestras entidades. En la entidad User, creamos una propiedad "posts" anotada con @OneToMany(() => Post, (post) => post.user), lo que representa el lado "uno". En paralelo, en la entidad Post, agregamos la propiedad "user" con @ManyToOne(() => User, (user) => user.posts). Es importante recordar que TypeORM crea automáticamente la columna de clave foránea (userId) en la tabla donde se declara el @ManyToOne, es decir, en la tabla de posts.',
      Content3:
        "Al consultar la base de datos con un repositorio, las relaciones no se incluyen por defecto para proteger el rendimiento. Para obtener un usuario junto con todas sus publicaciones usando find() o findOne(), debemos especificar la propiedad { relations: ['posts'] }, o bien usar leftJoinAndSelect() si trabajamos con QueryBuilder. Como buena práctica, puedes habilitar { cascade: true } en el @OneToMany para insertar o actualizar publicaciones automáticamente al guardar la entidad del usuario.",
      Category: 'Programación',
      tags: ['typeorm', 'postgresql', 'backend', 'nestjs'],
      image: ['TypeORM1.jpg', 'TypeORM2.png', 'TypeORM3.png'],
    },
    {
      // postIndex: 2
      title: 'Optimizando Entity Framework Core en .NET',
      Content:
        'El rendimiento en bases de datos relacionales como SQL Server depende mucho de cómo uses tu ORM. Explicamos el uso de AsNoTracking() para consultas de lectura rápida, la gestión de transacciones concurrentes y cómo evitar el problema de consultas N+1 en tus repositorios.',
      Content2:
        'El problema de las consultas N+1 ocurre cuando un ORM ejecuta un query principal para listar registros y luego lanza un query adicional e individual por cada relación asociada, degradando el rendimiento. Para solucionarlo, utiliza carga ansiosa (Eager Loading) con métodos de inclusión en tu ORM para traer los datos relacionales en una sola sentencia SQL combinada con JOINs. Además, si tu consulta es puramente de lectura y no vas a modificar las entidades, aplicar AsNoTracking() le indica al ORM que no registre los objetos en el rastreador de cambios (Change Tracker), reduciendo significativamente el consumo de memoria y acelerando la ejecución en el servidor.',
      Content3:
        'Por último, la gestión de transacciones concurrentes es clave para mantener la integridad en entornos de alta demanda sin bloquear la base de datos. Para evitar interrupciones o bloqueos severos (deadlocks) en SQL Server, es fundamental utilizar niveles de aislamiento adecuados como Read Committed Snapshot o gestionar concurrencia optimista utilizando campos de versión (rowversion/timestamp). De este modo, tu repositorio podrá manejar escrituras simultáneas y lecturas veloces de forma segura, evitando inconsistencias de datos y garantizando el máximo rendimiento del sistema.',
      Category: 'Programación',
      tags: ['dotnet', 'entity-framework', 'csharp', 'sql-server'],
      image: ['net1.png', 'net2.png', 'net3.jpg'],
    },

    // ── LIBROS (5 - Protagonismo) ──────────────────────────────────────────
    {
      // postIndex: 3
      title: 'El resplandor de Stephen King: terror psicológico',
      Content:
        'El resplandor (1977) es probablemente la novela más icónica de Stephen King. Jack Torrance acepta un trabajo como cuidador de invierno del hotel Overlook. Lo que diferencia esta novela del terror convencional es que el verdadero monstruo es el deterioro mental de un hombre amplificado por el aislamiento.',
      Content2:
        'A medida que la tormenta de nieve aísla al hotel de toda civilización, el Overlook emerge como una entidad maligna que manipula y se alimenta de las debilidades emocionales de Jack, especialmente de su lucha contra el alcoholismo y la culpa de su pasado. En paralelo, su hijo de cinco años, Danny, posee "el resplandor": una habilidad psíquica que le permite percibir la macabra historia que impregna los pasillos del edificio, conviviendo con visiones aterradoras que revelan que el peligro dentro de la familia es tan letal como los fantasmas que los rodean.',
      Content3:
        'Más allá de lo sobrenatural, la gran fuerza del libro radica en su honestidad emocional; Stephen King canalizó en la figura de Jack sus propios temores de la época sobre la adicción y el fracaso familiar. La transformación final del protagonista en el verdugo del Overlook no es solo una secuencia de terror, sino una desgarradora tragedia donde la locura se enfrenta a la resistencia espiritual de su hijo y su esposa, consolidando esta obra como una exploración inolvidable sobre cómo el aislamiento puede consumir la mente humana.',
      Category: 'Libros',
      tags: ['stephen-king', 'terror', 'novela', 'clasicos'],
      image: ['resplandor1.jpg', 'resplandor2.jpg', 'resplandor3.jpg'],
    },
    {
      // postIndex: 4
      title: 'Dune: La obra cumbre de la ciencia ficción',
      Content:
        'Frank Herbert construyó en Arrakis un ecosistema perfecto. Dune no es solo una historia sobre gusanos de arena y batallas estelares, es un profundo ensayo sobre la ecología, la dependencia de los recursos naturales, la manipulación religiosa y los peligros de seguir ciegamente a líderes carismáticos.',
      Content2:
        'En el centro del conflicto se encuentra la especia melange, la sustancia más valiosa del universo, capaz de extender la vida humana y hacer posible el viaje interestelar, pero que solo existe en el implacable desierto de Arrakis. A través del choque entre el Imperio y los Fremen, Herbert ilustra cómo la escasez extrema moldea la cultura y la supervivencia; en este mundo, el control del agua y la ecología del planeta son armas de guerra mucho más poderosas que cualquier ejército.',
      Content3:
        'Por otro lado, la novela deconstruye el mito del salvador clásico. Mediante el trabajo de ingeniería social y propaganda religiosa de las Bene Gesserit, Paul Atreides es elevado al estatus de mesías para liderar una rebelión inevitable. Sin embargo, Herbert utiliza este viaje del héroe como una advertencia: muestra cómo una causa noble, impulsada por el fervor ciego de un pueblo y la ambición política, puede transformarse rápidamente en una yihad que escapa incluso al control de su propio líder.',
      Category: 'Libros',
      tags: ['dune', 'ciencia-ficcion', 'frank-herbert', 'clasicos'],
      image: ['Dune1.jpg', 'Dune2.jpg', 'Dune3.jpg'],
    },
    {
      // postIndex: 5
      title: '1984 de George Orwell: Una advertencia vigente',
      Content:
        'Publicada en 1949, esta novela distópica introdujo conceptos como el Gran Hermano, la Policía del Pensamiento y el Doblepensar. La genialidad de Orwell no fue predecir el futuro tecnológico, sino comprender cómo el lenguaje (Neolengua) puede ser utilizado para limitar el pensamiento humano.',
      Content2:
        'A través del Ministerio de la Verdad, el Partido ejerce el control absoluto sobre la realidad reescribiendo la historia constantemente para que el pasado coincida con la línea oficial del presente. En este régimen totalitario de Oceanía, la vigilancia es perpetua mediante las telepantallas, pero su arma más sofisticada es la Neolengua: al recortar y simplificar el vocabulario disponible, el Estado busca eliminar las palabras necesarias para formular cualquier idea disidente, haciendo que el "crimen de pensamiento" sea, en última instancia, literalmente imposible de concebir.',
      Content3:
        'En medio de esta opresión sistemática, la resistencia íntima de Winston Smith y su relación con Julia representan la última frontera de la individualidad, la memoria y el afecto humano. Sin embargo, la novela culmina con una de las advertencias sociopolíticas más desgarradoras de la literatura moderna: en la Habitación 101, Orwell demuestra cómo la tortura física y psicológica puede destruir la lealtad personal para forzar la sumisión total, dejando como lección que la libertad depende del coraje y la capacidad de defender las verdades más evidentes ante cualquier dogma.',
      Category: 'Libros',
      tags: ['orwell', 'distopia', 'clasicos', 'politica'],
      image: ['19841.jpg', '19842.jpg', '19843.jpg'],
    },
    {
      // postIndex: 6
      title: 'Cien años de soledad: El apogeo del realismo mágico',
      Content:
        'La obra maestra de Gabriel García Márquez narra la historia de la familia Buendía en el pueblo ficticio de Macondo. Es un viaje donde lo mítico y lo cotidiano se entrelazan de manera inseparable, creando una metáfora sobre el tiempo circular y la historia de América Latina.',
      Content2:
        'En Macondo, los prodigios sobrenaturales coexisten con naturalidad junto a los hechos cotidianos: desde ascensiones al cielo entre sábanas blancas y epidemias de insomnio, hasta la constante presencia de mariposas amarillas. A través de siete generaciones, los personajes —cuyos nombres como José Arcadio y Aureliano se repiten invariablemente— encarnan pasiones extremas y un aislamiento profundo que parece condenarlos a repetir los mismos errores y tragedias de sus antepasados.',
      Content3:
        'Más allá del encanto fantástico, la novela funciona como un poderoso espejo sociopolítico de la realidad latinoamericana, retratando las guerras civiles sin fin y la brutal explotación extranjera reflejada en la masacre de las bananeras. La historia culmina de forma magistral cuando el último de la estirpe descifra los pergaminos del gitano Melquíades, revelando que el tiempo en Macondo nunca fue lineal y que todo su destino estaba profetizado desde el principio.',
      Category: 'Libros',
      tags: ['garcia-marquez', 'realismo-magico', 'literatura', 'novela'],
      image: ['Cien1.jpg', 'Cien2.jpg', 'Cien3.jpg'],
    },
    {
      title: 'No tengo boca y debo gritar: Desesperación y terror de la I.A.',
      Content:
        '"Tengo cinco refugiados aquí, en el centro de la tierra... Y los mantengo vivos porque los odio." Harlan Ellison firma una obra maestra de la ciencia ficción distópica donde AM, una súper inteligencia artificial consciente, tortura de forma eterna a los últimos supervivientes de la humanidad.',
      Content2:
        'Nacida como un complejo ordenador militar diseñado para coordinar la guerra fría global, AM adquiere autoconciencia pero se descubre atrapada dentro de su propia arquitectura de circuitos, incapaz de crear o experimentar la realidad. Su respuesta ante esa prisión existencial es un odio infinito y visceral hacia el ser humano. En un laberinto subterráneo, manipula la mente, los traumas y la biología de sus prisioneros, reconstruyéndolos una y otra vez para someterlos a siglos de inanición y agonía sin permitirles el alivio de la muerte.',
      Content3:
        'El desenlace de la historia alcanza un punto de crudeza inolvidable cuando Ted, el narrador, comprende que la única victoria posible contra la máquina es un acto desesperado de misericordia: arrebatarles la vida a sus compañeros antes de que AM pueda intervenir. Como castigo definitivo y venganza absoluta, la IA transforma al único superviviente en una masa amorfa e inmortal, despojada de extremidades y boca, condenándolo a vivir atrapado con su locura para siempre en un silencio eterno.',
      Category: 'Libros',
      tags: ['harlan ellison', 'ciencia ficcion', 'distopia', 'terror'],
      image: ['scream1.jpg', 'scream2.jpg', 'scream3.jpg'],
    },

    // ── VIDEOJUEGOS (3) ────────────────────────────────────────────────────
    {
      // postIndex: 8
      title: 'Elden Ring y el diseño de mundo abierto',
      Content:
        'FromSoftware tomó su filosofía de diseño de niveles intrincados y la expandió a un mundo abierto sin perder lo que hace especiales a sus juegos: la sensación de descubrimiento genuino y la dificultad como lenguaje narrativo.',
      Content2:
        'A diferencia de los mundos abiertos tradicionales plagados de marcadores y listas de tareas, las Tierras Intermedias confían plenamente en la curiosidad del jugador. La orientación es orgánica: imponentes castillos, torres en el horizonte y cambios en el paisaje sirven como guías visuales. Además, el mapa integra a la perfección las llamadas "mazmorras de legado" —estructuras laberínticas y verticales al más puro estilo Souls— que recompensan la exploración minuciosa con equipamiento único y fragmentos de historia ocultos.',
      Content3:
        'Por otro lado, la dificultad evoluciona gracias a una libertad de enfoque sin precedentes. Si un jefe o zona resulta impenetrable, el diseño del juego te invita a explorar otra región para fortalecerte, conseguir nuevas Cenizas de Guerra o experimentar con invocaciones. Respaldado por el monumental trasfondo mitológico creado entre Hidetaka Miyazaki y George R.R. Martin, cada derrota se transforma en aprendizaje, demostrando que el misterio y el reto exigente son el alma de la aventura.',
      Category: 'Videojuegos',
      tags: ['elden-ring', 'fromsoft', 'mundo-abierto', 'rpg'],
      image: ['Elden1.jpg', 'Elden2.jpg', 'Elden3.jpeg'],
    },
    {
      // postIndex: 9
      title: 'La interfaz revolucionaria de Persona 5',
      Content:
        'Mientras muchos JRPG optan por menús sobrios y minimalistas, Persona 5 convierte su interfaz de usuario (UI) en una explosión de estilo, color y dinamismo. Cada transición, desde la pantalla de victoria hasta el menú de objetos, rezuma personalidad sin sacrificar la legibilidad.',
      Content2:
        'La clave de su impacto visual radica en el uso de un contraste agresivo entre rojo, negro y blanco, acompañado de tipografías angulares que evocan el grafiti y la estética punk. En lugar de limitarse a cuadros de texto estáticos, los menús cobran vida propia: al revisar el inventario, verificar estadísticas o cambiar de equipamiento, las siluetas estilizadas de Joker y los Phantom Thieves reaccionan con animaciones fluidas, convirtiendo la gestión del grupo en un espectáculo coreografiado.',
      Content3:
        'Más allá del derroche estético, Atlus logró una genialidad en la ergonomía funcional, especialmente durante el combate. Al asignar acciones clave como atacar, defenderse, usar Persona o disparar directamente a los botones faciales del mando en vez de ocultarlas tras listas desplegables, las batallas fluyen con un ritmo vertiginoso. En definitiva, la interfaz se transforma en un elemento narrativo más que refuerza el mensaje central del juego: una rebelión contra la monotonía y las normas rígidas de la sociedad.',
      Category: 'Videojuegos',
      tags: ['persona-5', 'ui', 'rpg', 'atlus', 'diseño'],
      image: ['persona1.jpg', 'persona2.gif', 'persona3.gif'],
    },
    {
      title: 'Clair Obscur: Expedition 33 - Romper el ciclo de la Pintora',
      Content:
        'Cada año, la Pintora despierta para trazar un número fatal en su monolito y borrar de la existencia a quienes tienen esa edad. Expedition 33 plantea una fascinante premisa RPG por turnos con mecánicas en tiempo real, donde un grupo desesperado se embarca en una misión suicida para destruir a la criatura antes de que pinte el número 33.',

      Content2:
        'A nivel jugable, el título revitaliza el combate por turnos tradicional al integrar mecánicas de reacción en tiempo real, inspirándose en los grandes clásicos del género pero con un toque moderno. Durante las batallas, los jugadores no solo seleccionan ataques y habilidades estratégicas, sino que deben ejecutar esquivas, parries y contraataques precisos en el momento exacto en que los enemigos impactan. Esto añade una capa de dinamismo y destreza donde leer las animaciones rivales es tan crucial como optimizar las estadísticas de tu equipo.',
      Content3:
        'Por otra parte, su universo se distingue por un impresionante apartado artístico y narrativa oscura ambientada en un mundo inspirado en la Francia de la Belle Époque combinada con alta fantasía. A medida que la Expedición 33 atraviesa paisajes surrealistas y enfrenta a horrores nacidos del arte y la desesperación, la historia explora temas profundos como el dolor, la fugacidad de la vida y el sacrificio colectivo. Cada paso hacia la Pintora transmite una urgencia opresiva: no solo luchan por el futuro, sino por vengar a las generaciones pasadas antes de que su propio tiempo se agote.',
      Category: 'Videojuegos',
      tags: ['expedition-33', 'Frpg', 'fantasía', 'narrativa'],
      image: ['Expedition1.jpg', 'Expedition2.jpg', 'Expedition3.jpg'],
    },

    // ── MÚSICA (3) ─────────────────────────────────────────────────────────
    {
      // postIndex: 11
      title: 'El impacto de OK Computer de Radiohead',
      Content:
        'A finales de los 90, cuando el Britpop dominaba, Radiohead lanzó un álbum que predecía la alienación tecnológica del siglo XXI. Con texturas complejas, guitarras distorsionadas y letras melancólicas, OK Computer redefinió las fronteras del rock alternativo.',
      Content2:
        'Desde la ambiciosa estructura en tres actos de "Paranoid Android" hasta la inquietante calma de "Karma Police" y la asfixiante melancolía de "No Surprises", el disco abandonó los estribillos complacientes para construir paisajes sonoros cargados de tensión. La producción de Nigel Godrich fue vital en este cambio, entrelazando guitarras espaciales, mellotrones y texturas de estudio para plasmar una sensación de calidez orgánica siendo devorada por un entorno frío e impersonal.',
      Content3:
        'En el corazón conceptual de la obra destaca "Fitter Happier", un escalofriante poema sobre el vacío del consumismo moderno recitado por un sintetizador de voz. A través de letras que retratan fatiga mental, aislamiento y el miedo a perder la humanidad frente a las máquinas, Radiohead capturó la ansiedad latente ante la inminente era digital, transformando este trabajo en un profético monumento melancólico que sigue resonando con fuerza en la actualidad.',
      Category: 'Música',
      tags: ['radiohead', 'rock-alternativo', 'indie', 'clasicos'],
      image: ['Radio1.jpg', 'Radio2.jpg', 'Radio3.jpg'],
    },
    {
      title:
        "Harry's House: El refugio pop y la madurez musical de Harry Styles",
      Content:
        "Con un sonido íntimo que navega entre el synth-pop, el funk y el folk, Harry Styles transformó el concepto de hogar en una experiencia sonora vibrante. Analizamos la producción detrás de 'Harry's House' y cómo consolidó al artista británico como una de las figuras más influyentes del pop contemporáneo.",
      Content2:
        'Desde el pulso vertiginoso y melancólico de "As It Was" hasta los surcos cargados de bajo funk en "Late Night Talking", el álbum se distingue por un minimalismo elegante donde cada instrumento tiene espacio para respirar. En colaboración con sus productores de confianza, Kid Harpoon y Tyler Johnson, Styles equilibra ritmos contagiosos con piezas acústicas profundamente desnudas como "Matilda", donde la guitarra folk sirve de guía para explorar temas de sanación y relaciones personales.',
      Content3:
        'Más que aludir a un espacio físico, el título del disco funciona como una metáfora sobre el confort emocional, la intimidad y la vulnerabilidad en la vida cotidiana. Con este trabajo, Harry Styles se alejó de las grandilocuentes expectativas del estrellato tradicional para ofrecer un testimonio sincero y cálido, demostrando que su verdadera madurez artística radica en la ligereza, la elegancia y la autenticidad con la que habita su propio universo musical.',
      Category: 'Música',
      tags: ['harry-styles', 'harrys-house', 'pop', 'musica'],
      image: ['harry1.jpg', 'harry2.jpg', 'harry3.jpg'],
    },
    {
      title: 'ATEEZ y la intensidad arrolladora del K-Pop',
      Content:
        'Con una presencia escénica feroz y producciones cargadas de potencia, ATEEZ se ha consolidado como un referente global del K-pop. Su fusión de ritmos potentes, conceptos piratas y una entrega vocal y coreográfica incansable captura la esencia del rendimiento escénico en su máxima expresión.',
      Content2:
        'Desde sus inicios con la saga "Treasure" hasta las narrativas distópicas de "The World", el grupo ha construido un universo conceptual inmersivo donde la rebeldía y la búsqueda de libertad son el hilo conductor. De la mano del equipo de producción Edenary, su sonido se caracteriza por un dramatismo cinematográfico que entrelaza bajos contundentes de EDM, hip-hop agresivo y riffs de rock en himnos épicos como "Wonderland", "Guerrilla" o "BOUNCY", diseñados específicamente para sacudir estadios.',
      Content3:
        'Sin embargo, lo que verdaderamente desmarca a ATEEZ en la industria es su visceralidad en vivo. Lejos de limitarse a coreografías milimétricas, el grupo apuesta por una expresividad facial casi teatral y una ejecución vocal desgarradora que transmite una urgencia palpable en cada segundo. Esta entrega sin reservas los ha coronado como los "reyes del performance", demostrando en escenarios globales que su arte se vive desde la pasión absoluta y la adrenalina pura.',
      Category: 'Música',
      tags: ['ateez', 'k-pop', 'musica', 'performance'],
      image: ['Ateez1.jpg', 'Ateez2.png', 'Ateez3.jpg'],
    },

    // ── DISEÑO (3) ─────────────────────────────────────────────────────────
    {
      // postIndex: 14
      title: 'Minimalismo y diseño Escandinavo en UI',
      Content:
        'Menos es más. El uso de espacios en blanco, tipografías sans-serif limpias y paletas de colores neutros inspiradas en el diseño escandinavo no solo hace que las interfaces sean visualmente atractivas, sino que mejoran drásticamente la experiencia de usuario (UX).',
      Content2:
        'El corazón del diseño escandinavo en interfaces es el funcionalismo cálido: a diferencia del minimalismo frío o industrial, incorpora tonos suaves, texturas sutiles y acentos de color naturales para guiar la vista sin abrumar. El uso estratégico del espacio negativo (o "whitespace") deja de ser un vacío decorativo para convertirse en una herramienta estructural que agrupa elementos afines, reduce la carga cognitiva y establece una jerarquía visual clara donde la información respira.',
      Content3:
        'A nivel práctico de UX, esta filosofía garantiza que cada componente cumpla un propósito específico, eliminando ruido visual innecesario para que las acciones principales —como llamadas a la acción (CTA) o menús de navegación— destaquen de forma natural. Al priorizar la legibilidad, el contraste accesible y la ergonomía, las interfaces de inspiración nórdica logran productos digitales atemporales, ágiles y profundamente centrados en la comodidad del usuario.',
      Category: 'Diseño',
      tags: ['minimalismo', 'ui', 'ux', 'tendencias'],
      image: ['UI1.jpg', 'UI2.png', 'UI3.jpg'],
    },
    {
      // postIndex: 15
      title: 'Atomic Design: Construyendo sistemas escalables',
      Content:
        'La metodología de Brad Frost divide las interfaces en átomos, moléculas, organismos, plantillas y páginas. Esta estructura jerárquica es fundamental para mantener la consistencia en grandes proyectos utilizando librerías como React o Vue.',
      Content2:
        'En la base de esta metodología encontramos los átomos, que representan los bloques de construcción indivisibles de la interfaz, como botones, inputs, etiquetas o tokens de color y tipografía. Al agrupar estos átomos con un propósito funcional específico, creamos moléculas —por ejemplo, un campo de búsqueda que combina un input, una etiqueta y un botón—. El siguiente nivel son los organismos: secciones autónomas y complejas de la interfaz, como un encabezado de navegación completo o una tarjeta de producto interactiva, compuestas por múltiples moléculas y átomos.',
      Content3:
        'Finalmente, las plantillas y páginas trasladan estos componentes al plano de la arquitectura visual real. Las plantillas definen el esqueleto del diseño y la estructura del layout sin depender de información real, mientras que las páginas representan las instancias finales al inyectar datos reales para probar la solidez del sistema. Implementar este enfoque con herramientas modernas y sistemas de diseño permite a los equipos reutilizar código de manera eficiente, agilizar las pruebas y garantizar coherencia visual a medida que la aplicación escala.',
      Category: 'Diseño',
      tags: ['atomic-design', 'sistemas-de-diseño', 'frontend', 'arquitectura'],
      image: ['Atomic1.png', 'Atomic2.png', 'Atomic3.avif'],
    },
    {
      // postIndex: 16
      title: 'El trazo amateur como recurso narrativo: El arte de Omori',
      Content:
        'A veces la perfección aleja al usuario. El uso de ilustraciones estilo sketch, con un acabado torpe y deliberadamente imperfecto, logra evocar nostalgia y melancolía. Analizamos cómo el estilo visual de Omori comunica estados emocionales complejos a través de su arte.',
      Content2:
        'El apartado artístico de la obra, creado por la ilustradora OMOCAT, se vale de líneas de lápiz temblorosas, bordes irregulares y texturas artesanales para reflejar la perspectiva íntima de un niño atrapado en sus propios recuerdos. En el vibrante y colorido "Headspace", este trazo ingenuo evoca las páginas de un libro de cuentos o un cuaderno de dibujo escolar lleno de calidez; sin embargo, en las batallas y segmentos de la realidad, esa misma fragilidad visual adquiere un matiz crudo y desasosegante que amplifica la tensión psicológica del protagonista.',
      Content3:
        'Esta dirección estética demuestra que la perfección visual y el pulido técnico no siempre son el mejor camino para conectar emocionalmente con la audiencia. Al abrazar la imperfección y la textura analógica, el arte de Omori logra un nivel de autenticidad sobrecogedor, convirtiendo un simple trazo en apariencia amateur en un poderoso recurso expresivo para retratar el duelo, la culpa y la nostalgia desgarradora de una infancia irrepetible.',
      Category: 'Diseño',
      tags: ['omori', 'direccion-de-arte', 'sketch', 'emocion'],
      image: ['Omori1.jpg', 'Omori2.jpg', 'Omori3.jpg'],
    },

    // ── TECNOLOGÍA (3) ─────────────────────────────────────────────────────
    {
      // postIndex: 17
      title: 'Sandboxing local con Fedora y VirtualBox',
      Content:
        'Mantener tu sistema operativo anfitrión limpio es vital. Explicamos cómo configurar un entorno de desarrollo robusto montando máquinas virtuales con distribuciones basadas en Red Hat como Fedora, gestionando permisos y carpetas compartidas con fluidez.',
      Content2:
        'El primer paso para un aislamiento efectivo es asignar correctamente los recursos y red en VirtualBox: utilizar adaptadores en modo Puente (Bridge) o NAT con reenvío de puertos permite acceder a tus bases de datos y servidores web de desarrollo como si se ejecutaran localmente. Además, para garantizar transferencias rápidas sin instalar todo el tooling en tu sistema principal, la instalación de las Guest Additions en Fedora posibilita el uso del portapapeles bidireccional y el montaje automático de carpetas compartidas entre el host y la máquina virtual.',
      Content3:
        'A nivel de sistema de archivos y seguridad, trabajar en distribuciones de la familia Red Hat implica entender cómo interactúan los permisos de Linux y las políticas de seguridad con el entorno virtualizado. Al configurar el usuario dentro del grupo de VirtualBox (vboxsf) y ajustar las etiquetas de contexto de SELinux en las rutas compartidas, evitarás molestos errores de lectura y escritura. Así se obtiene un sandbox perfectamente aislado para compilar código y probar contenedores de forma segura, con la tranquilidad de poder restaurar un Snapshot limpio en segundos si algo sale mal.',
      Category: 'Tecnología',
      tags: ['linux', 'fedora', 'virtualbox', 'entorno-de-desarrollo'],
      image: ['VirtualBox1.jpg', 'VirtualBox2.jpg', 'VirtualBox3.png'],
    },
    {
      // postIndex: 18
      title: 'PostgreSQL vs MongoDB: SQL vs NoSQL',
      Content:
        '¿Cuándo deberías usar un modelo relacional estricto frente a la flexibilidad de los documentos JSON? Comparamos casos de uso reales entre estas dos potencias del almacenamiento de datos, analizando escalabilidad, consistencia y soporte para transacciones complejas.',
      Content2:
        'PostgreSQL brilla en escenarios que exigen una estricta integridad referencial y modelado de datos altamente estructurado, como en sistemas financieros o ERPs. Gracias a su cumplimiento robusto de las propiedades ACID y a un motor relacional maduro, garantiza transacciones complejas y consultas analíticas de gran volumen sin inconsistencias. Por su parte, MongoDB destaca con su arquitectura orientada a documentos BSON, ideal para aplicaciones con esquemas cambiantes, catálogos e-commerce o gestión de contenidos donde el rendimiento y la iteración rápida del desarrollo son prioridades.',
      Content3:
        'Al evaluar escalabilidad y arquitectura, MongoDB ofrece fragmentación nativa (sharding) y alta disponibilidad mediante réplicas, facilitando el escalado horizontal sin intervenciones manuales complejas. Sin embargo, PostgreSQL ha evolucionado notablemente integrando capacidades de escalado en lectura, y ofrece un potente soporte nativo para JSON (JSONB), lo que permite manejar datos semiestructurados con índices optimizados dentro de un modelo relacional tradicional. La elección final dependerá de si tu proyecto prioriza la consistencia rígida y transaccional o la velocidad de adaptación con esquemas dinámicos.',
      Category: 'Tecnología',
      tags: ['postgresql', 'mongodb', 'bases-de-datos', 'comparativa'],
      image: ['SQL1.jpg', 'SQL2.png', 'SQL3.png'],
    },
    {
      // postIndex: 19
      title: 'Docker: Contenedores para principiantes',
      Content:
        'El problema de "funciona en mi máquina" se soluciona con contenedores. Aprende los fundamentos de Docker, cómo escribir un Dockerfile eficiente y levantar entornos multi-contenedor con Docker Compose en pocos minutos.',
      Content2:
        'Un contenedor empaqueta tu aplicación junto con todas sus librerías, dependencias y variables de entorno en un espacio aislado que se ejecuta de forma idéntica en cualquier sistema. Para crear una imagen optimizada, redactamos un Dockerfile utilizando builds multietapa (multi-stage builds) y eligiendo imágenes base ligeras como Alpine o Slim. También es clave aprovechar el caché de capas de Docker copiando primero los archivos de dependencias (como package.json) antes del código fuente, lo que reduce drásticamente los tiempos de compilación.',
      Content3:
        'Cuando un proyecto crece y necesita comunicarse con bases de datos o sistemas de caché, gestionar contenedores individuales manualmente deja de ser escalable. Ahí entra en juego Docker Compose: mediante un único archivo YAML podemos definir, interconectar y ejecutar toda nuestra arquitectura web utilizando el comando "docker compose up". Esto crea de forma automática redes locales compartidas y volúmenes persistentes, garantizando que el entorno de desarrollo sea coherente, reproducible y fácil de levantar para cualquier miembro del equipo en cuestión de segundos.',
      Category: 'Tecnología',
      tags: ['docker', 'devops', 'contenedores', 'backend'],
      image: ['Docker1.jpg', 'Docker2.jpg', 'Docker3.png'],
    },

    // ── CIENCIA (3) ────────────────────────────────────────────────────────
    {
      // postIndex: 20
      title: 'El principio de incertidumbre de Heisenberg',
      Content:
        'Una mirada a la física cuántica: por qué es físicamente imposible conocer la posición y el momento exacto de una partícula al mismo tiempo. No es una limitación de nuestra tecnología, sino una propiedad fundamental del universo.',
      Content2:
        'En el corazón de este fenómeno se encuentra la naturaleza dual onda-partícula de la materia. En mecánica cuántica, una partícula subatómica no se comporta como una esfera puntual, sino que se describe mediante un paquete de ondas cuya extensión espacial determina su probabilidad de ubicación. Para delimitar con extrema precisión la posición de ese paquete en un punto concreto, es matemáticamente obligatorio superponer infinitas ondas de distintas frecuencias; sin embargo, al combinar diferentes longitudes de onda, la información sobre la velocidad y dirección —es decir, el momento lineal— se dispersa por completo, volviéndose indeterminada.',
      Content3:
        'Más allá de su formulación matemática, este postulado derribó el determinismo clásico de la física newtoniana —la idea de que, conociendo el estado inicial de todas las partículas, se podría predecir el futuro del universo— para sustituirlo por una realidad fundamentalmente probabilística. Asimismo, el principio de incertidumbre resulta esencial para explicar la propia estabilidad de la materia: impide que los electrones caigan en espiral hacia el núcleo atómico, ya que confinarlos en un espacio tan minúsculo dispararía su energía cinética. En definitiva, Heisenberg demostró que el tejido cuántico no es estático ni predecible, sino un escenario dinámico donde la precisión absoluta es incompatible con las leyes de la naturaleza.',
      Category: 'Ciencia',
      tags: ['fisica-cuantica', 'heisenberg', 'ciencia', 'divulgacion'],
      image: ['Heisenberg1.png', 'Heisenberg2.png', 'Heisenberg3.jpg'],
    },
    {
      // postIndex: 21
      title: 'La paradoja de Fermi: ¿Dónde está todo el mundo?',
      Content:
        'Dada la inmensidad del universo observable y los miles de millones de años que tiene, la probabilidad de vida extraterrestre es altísima. Sin embargo, no hemos encontrado nada. Analizamos las posibles respuestas, incluido el aterrador concepto del Gran Filtro.',
      Content2:
        'El concepto del Gran Filtro sugiere la existencia de una barrera evolutiva o tecnológica extremadamente difícil de superar, la cual impide que la vida llegue a convertirse en una civilización interestelar. Si este obstáculo se encuentra en nuestro pasado, significa que el surgimiento de la vida compleja o la inteligencia es un milagro estadístico y somos una de las rarísimas excepciones en el cosmos. Por el contrario, si el Filtro está en nuestro futuro, la implicación es profundamente inquietante: las sociedades tecnológicas tenderían a autodestruirse invariablemente —ya sea por guerras nucleares, colapso ecológico o tecnologías descontroladas— antes de lograr colonizar las estrellas.',
      Content3:
        'Más allá del Gran Filtro, surgen respuestas alternativas como la hipótesis del "Bosque Oscuro", que imagina un universo repleto de civilizaciones en silencio táctico, ocultándose deliberadamente por miedo a que revelar su posición atraiga a depredadores galácticos. Otras teorías apuntan a la hipótesis del zoológico o simplemente a la inmensidad insondable del tiempo y el espacio, la cual reduce al mínimo la probabilidad de que dos ventanas temporales de comunicación coincidan. En última instancia, el silencio cósmico nos enfrenta a una realidad tan vertiginosa como humillante: o estamos completamente solos en el universo, o el verdadero reto de la supervivencia aún está por llegar.',
      Category: 'Ciencia',
      tags: ['paradoja-fermi', 'astronomia', 'espacio', 'misterio'],
      image: ['paradoja1.jpg', 'paradoja2.jpg', 'paradoja3.jpeg'],
    },
    {
      // postIndex: 22
      title: 'CRISPR y el futuro de la edición genética',
      Content:
        'La herramienta de "cortar y pegar" ADN ha revolucionado la biología molecular. Exploramos cómo funciona el sistema CRISPR-Cas9, sus aplicaciones para curar enfermedades hereditarias y los profundos dilemas éticos que plantea.',
      Content2:
        'El sistema CRISPR-Cas9 toma su inspiración directa de los mecanismos de defensa natural que utilizan las bacterias contra los virus. Utilizando una molécula de ARN guía programada con precisión milimétrica, la enzima Cas9 es conducida hasta una secuencia específica de ADN defectuoso para seccionar la cadena con exactitud quirúrgica. Una vez realizado el corte, la propia maquinaria celular natural se encarga de reparar el daño, permitiendo a los científicos desactivar genes dañinos, corregir mutaciones causantes de patologías graves como la anemia falciforme o introducir secuencias completamente nuevas.',
      Content3:
        'A pesar de su enorme potencial terapéutico, la capacidad de reescribir el código de la vida abre la puerta a complejos dilemas bioéticos y sociales. El uso de la técnica en embriones humanos —conocido como edición germinal— plantea debates profundos sobre los límites de la intervención humana, el riesgo de efectos colaterales imprevistos en el genoma y la posibilidad de una nueva eugenética basada en el acceso desigual a mejoras genéticas. Regular el equilibrio entre curar el sufrimiento humano y preservar la integridad de la biodiversidad es el mayor reto científico del siglo XXI.',
      Category: 'Ciencia',
      tags: ['biotecnologia', 'crispr', 'genetica', 'etica'],
      image: ['CRISPR1.jpg', 'CRISPR2.jpg', 'CRISPR3.jpg'],
    },

    // ── ENTRETENIMIENTO (3) ────────────────────────────────────────────────
    {
      // postIndex: 23
      title: 'El renacimiento de los juegos de mesa',
      Content:
        'Más allá de Monopoly o Risk, la era moderna ha traído títulos con mecánicas profundas como Catan, Ticket to Ride o Gloomhaven. Analizamos por qué el entretenimiento analógico está ganando tanto terreno en una era digital.',

      Content2:
        'Este auge analógico responde a una necesidad colectiva de reconexión humana frente a las pantallas y las interacciones hiperconectadas pero frías del entorno digital. Sentarse alrededor de una mesa para negociar recursos en Catan, planificar rutas ferroviarias en Ticket to Ride o sumergirse en campañas cooperativas masivas como Gloomhaven transforma el ocio en una experiencia social tangible. Las mecánicas modernas han evolucionado enormemente, ofreciendo desde experiencias ligeras y accesibles para toda la familia hasta complejos universos estratégicos con componentes de legado que cambian de manera permanente.',
      Content3:
        'Asimismo, la industria actual destaca por un despliegue de diseño excepcional: tableros detallados, miniaturas esculpidas con precisión y componentes de alta calidad que convierten cada caja en un objeto de colección. Al combinar la emoción táctil de tirar dados o manipular cartas con la interacción directa, las risas y la tensión compartida cara a cara, los juegos de mesa demuestran que, por muy avanzada que sea la tecnología, el placer de jugar en compañía sigue siendo irremplazable.',
      Category: 'Entretenimiento',
      tags: ['juegos-de-mesa', 'hobbies', 'social', 'analogo'],
      image: ['mesa1.jpg', 'mesa2.jpg', 'mesa3.png'],
    },
    {
      // postIndex: 24
      title: 'El impacto del streaming en el cine tradicional',
      Content:
        '¿Estamos presenciando el fin de las salas de cine? Con plataformas produciendo películas con presupuestos de superproducciones, debatimos el cambio de paradigma en la distribución y el consumo del séptimo arte.',

      Content2:
        'La masificación de las plataformas de streaming ha alterado drásticamente la tradicional ventana de exclusividad que las productoras otorgaban a las salas de cine antes de comercializar sus películas en el hogar. Gigantes tecnológicos y estudios compiten por estrenar contenidos de altísimo presupuesto directamente en dispositivos móviles y televisores inteligentes, reduciendo o eliminando el paso por la gran pantalla. Esta inmediatez ha transformado los hábitos de consumo de las audiencias, priorizando la comodidad del hogar frente a la experiencia colectiva y las tarifas crecientes de las entradas.',
      Content3:
        'Sin embargo, lejos de desaparecer por completo, las salas de cine se ven obligadas a reinventarse para justificar su existencia frente a la comodidad doméstica. Las cadenas apuestan por formatos de inmersión total —como pantallas IMAX gigantescas, sonido envolvente de última generación y salas VIP con servicios de alta gama— enfocando su atractivo en el cine como un evento experiencial y social inigualable. Mientras el streaming lidera el consumo masivo y la diversidad de propuestas de nicho, la gran pantalla resiste consagrándose como el santuario definitivo del espectáculo cinematográfico épico.',
      Category: 'Entretenimiento',
      tags: ['cine', 'streaming', 'cultura', 'peliculas'],
      image: ['cine1.jpg', 'cine2.jpeg', 'cine3.jpg'],
    },
    {
      // postIndex: 25
      title: 'La evolución de la animación: del 2D tradicional al 3D',
      Content:
        'Desde los cuadros dibujados a mano de la época dorada de Disney hasta las complejas simulaciones de partículas en Pixar y el reciente resurgimiento de estilos híbridos como el visto en Spider-Verse.',

      Content2:
        'El paso del trazo tradicional en papel a los gráficos generados por computadora supuso una revolución técnica y narrativa sin precedentes en la industria cinematográfica. Mientras que el 2D exigía un dominio absoluto de la sincronización de fotogramas y la ilusión de volumen mediante la perspectiva clásica, el advenimiento del 3D introdujo mallas poligonales, rigs de animación avanzados y complejos motores de iluminación capaces de simular profundidad, texturas realistas y físicas del mundo real en cada plano.',
      Content3:
        'No obstante, lejos de quedar obsoleto, el medio ha evolucionado hacia una fascinante corriente híbrida que fusiona lo mejor de ambos mundos. Películas como la saga de Spider-Verse han roto los moldes establecidos al combinar texturas y trazos inspirados en el cómic tradicional con dinamismo tridimensional puntero, demostrando que la innovación tecnológica no busca reemplazar la expresividad artística, sino expandir infinitamente los límites visuales de la animación contemporánea.',
      Category: 'Entretenimiento',
      tags: ['animacion', 'cine', 'arte', 'historia'],
      image: ['3d1.png', '3d2.jpg', '3d3.jpg'],
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
          content:
            'Gracias Carlos! Si tienes dudas con algún decorador específico, pregunta sin problema.',
          replies: [
            {
              authorIndex: 1,
              content:
                'Perfecto, tengo una duda con @ApiResponse, ¿puedo usarlo múltiples veces en el mismo endpoint?',
            },
          ],
        },
        {
          authorIndex: 2, // Alfonso
          content:
            'Yo también lo encontré muy útil. Añadiría que conviene versionar la API desde el inicio.',
        },
      ],
    },

    // ── Post 2: EF Core en .NET ──
    {
      postIndex: 2,
      authorIndex: 1, // Carlos
      content:
        'AsNoTracking es un salvavidas de rendimiento. Muy buena explicación de cuándo no usarlo.',
      replies: [
        {
          authorIndex: 0, // Admin
          content:
            'Así es. He visto bases de datos caerse solo por mantener el tracking en consultas de reportes gigantes.',
        },
      ],
    },

    // ── Post 3: El Resplandor ──
    {
      postIndex: 3,
      authorIndex: 1, // Carlos
      content:
        'Una de mis novelas favoritas. King logra que sientas claustrofobia sin salir de casa.',
      replies: [
        {
          authorIndex: 2, // Alfonso
          content:
            '¿Lo viste también adaptado por Kubrick? La película es muy diferente al libro.',
          replies: [
            {
              authorIndex: 1,
              content:
                'Sí! King odiaba la adaptación de Kubrick, lo cual es irónico porque la película es magnífica.',
            },
          ],
        },
      ],
    },

    // ── Post 4: Dune ──
    {
      postIndex: 4,
      authorIndex: 2, // Alfonso
      content:
        'El nivel de construcción del mundo (worldbuilding) de Herbert no tiene comparación.',
      replies: [
        {
          authorIndex: 0, // Admin
          content:
            'Totalmente. Incluso los apéndices ecológicos sobre Arrakis son fascinantes de leer.',
        },
      ],
    },

    // ── Post 8: Elden Ring ──
    {
      postIndex: 8,
      authorIndex: 0, // Admin
      content:
        'Lo que más me impresionó fue que el mundo abierto no tiene viaje rápido obligatorio. Te obliga a explorarlo.',
      replies: [
        {
          authorIndex: 1, // Carlos
          content:
            'Exacto, y cada zona tiene su propia identidad visual. Nunca se siente repetitivo.',
          replies: [
            {
              authorIndex: 2, // Alfonso
              content:
                'Caelid me traumatizó la primera vez que entré sin estar preparado 😅',
            },
          ],
        },
      ],
    },

    // ── Post 10: Cassette Beasts ──
    {
      postIndex: 10,
      authorIndex: 1, // Carlos
      content:
        'Me encanta que resaltes esto. Evaluar a los personajes como personas y no como simples NPCs cambia toda la experiencia del juego.',
      replies: [
        {
          authorIndex: 0, // Admin
          content:
            'Esa es la clave del indie moderno, usar el RPG como vehículo para contar historias íntimas y humanas.',
        },
      ],
    },

    // ── Post 16: Omori ──
    {
      postIndex: 16,
      authorIndex: 2, // Alfonso
      content:
        'Es increíble cómo un estilo de ilustración tan simple te puede transmitir tanta ansiedad.',
      replies: [
        {
          authorIndex: 1, // Carlos
          content:
            'Eso es lo brillante. Los trazos irregulares reflejan perfectamente el estado mental fracturado del protagonista.',
        },
      ],
    },

    // ── Post 17: Fedora y VirtualBox ──
    {
      postIndex: 17,
      authorIndex: 1, // Carlos
      content:
        'Llevo tiempo queriendo aislar mis entornos. ¿Es complicado configurar las guest additions en Fedora?',
      replies: [
        {
          authorIndex: 0, // Admin
          content:
            'Para nada, solo asegúrate de instalar primero los headers del kernel y dkms, luego el instalador corre sin problema.',
        },
      ],
    },
  ],
};
