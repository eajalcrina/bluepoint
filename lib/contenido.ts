// Contenido del sitio de Grupo BluePoint. Fuente única: los componentes no llevan textos escritos dentro.
// Textos de servicios, sectores, «Dos miradas» y la bio de Aníbal: documento de Aníbal del 22-nov-2026.
import fichasData from '@/data/fichas.json'

export const SITIO = {
  nombre: 'Grupo BluePoint',
  respaldo: 'Ambiental y regulatorio',
  url: 'https://grupobluepoint.pe',
  correo: 'contacto@grupobluepoint.pe',
  telefono: '+51 955 123 231',
  whatsappNumero: '51955123231',
  whatsappTexto: 'Hola, quiero agendar una reunión con Grupo BluePoint.',
  // Enlace de reservas de Aníbal (Google Calendar). Mientras falte, los botones de agenda abren WhatsApp.
  reservas: '',
  linkedin: 'https://www.linkedin.com/company/grupobluepoint',
  facebook: 'https://www.facebook.com/grupobluepoint',
  ciudad: 'Lima, Perú',
  descripcionCorta:
    'Asesoría técnica y legal para que tu planta cumpla la normativa ambiental: fiscalizaciones, instrumentos de gestión ambiental, efluentes y permisos.',
  descripcionLarga:
    'Grupo BluePoint es una consultora ambiental y regulatoria con sede en Lima, Perú. Brinda asesoría técnica y legal para que las plantas industriales identifiquen sus obligaciones ambientales, prevengan incumplimientos y atiendan fiscalizaciones sin detener sus operaciones. La dirige Aníbal Boca Acosta, ingeniero pesquero con más de 18 años de trayectoria entre la industria y la gestión pública.',
  revisadoTexto: '22 de noviembre de 2026',
  // Fecha de la última revisión del contenido (sitemap y llms.txt usan esta fecha, no la de compilación).
  revisado: '2026-11-22',
}

// Imagen para compartir del sitio (app/opengraph-image.tsx). Las páginas que definen su openGraph la repiten.
export const OG_IMAGEN = { url: '/opengraph-image/', width: 1200, height: 630, alt: 'Grupo BluePoint, ambiental y regulatorio' }

export const whatsappUrl = `https://wa.me/${SITIO.whatsappNumero}?text=${encodeURIComponent(SITIO.whatsappTexto)}`
export const agendaUrl = SITIO.reservas || whatsappUrl
export const agendaTexto = SITIO.reservas ? 'Agenda una reunión' : 'Agenda una reunión por WhatsApp'

export const MENU = [
  { href: '/#planta', texto: 'Planta' },
  { href: '/#nosotros', texto: 'Nosotros' },
  { href: '/#servicios', texto: 'Servicios' },
  { href: '/#sectores', texto: 'Sectores' },
  { href: '/#equipo', texto: 'Equipo' },
]

export const HERO = {
  estado: 'Gestión ambiental y cumplimiento normativo en el Perú',
  titulo: 'Cumple la normativa sin detener tus operaciones',
  bajada:
    'Brindamos asesoría técnica y legal para identificar tus obligaciones ambientales, prevenir incumplimientos y atender fiscalizaciones.',
  bajada2:
    'Acompañamos a empresas de diversos sectores con soluciones prácticas, respaldadas por los más de 18 años de experiencia de nuestro director en la industria y la gestión pública.',
  secundario: { href: '#planta', texto: 'Explora la planta' },
}

// Cifras de la trayectoria de Aníbal Boca Acosta. Pendientes de su visto bueno antes de publicar.
export const CIFRAS = {
  nota: 'Trayectoria profesional de Aníbal Boca Acosta. Periodo 2022 a 2024, salvo la trayectoria total.',
  items: [
    { rotulo: 'Trayectoria', valor: '+18 años', texto: 'entre la industria y la gestión pública', barra: null },
    { rotulo: 'Cumplimiento', valor: '98 %', texto: 'de más de 1,500 obligaciones ambientales en diez plantas, cumplimiento al que contribuyó', barra: 98 },
    { rotulo: 'Reportes', valor: '+400', texto: 'informes ante PRODUCE, OEFA, ANA y DICAPI en los que participó', barra: null },
    { rotulo: 'Efluentes', valor: '−25 %', texto: 'en costos del tratamiento en proyectos en los que participó, manteniendo los LMP', barra: 25 },
  ],
}

export const ETAPAS = [
  { n: 0, nombre: 'Vista general', corto: 'General', titulo: 'El complejo completo', bajada: 'Elige una etapa o toca un punto para acercarte.', bajadaCelular: 'Elige una etapa para acercarte.' },
  { n: 1, bajadaCelular: '', nombre: 'Entradas', corto: 'Entradas', titulo: 'Agua, energía y materia prima', bajada: 'Lo que entra a la planta y lo que exige cada recurso.' },
  { n: 2, bajadaCelular: '', nombre: 'Proceso', corto: 'Proceso', titulo: 'Planta productiva y servicios industriales', bajada: 'Donde el recurso se transforma y se generan las cargas.' },
  { n: 3, bajadaCelular: '', nombre: 'Salidas', corto: 'Salidas', titulo: 'Efluentes, emisiones y residuos', bajada: 'Lo que sale de la planta y lo que se fiscaliza.' },
  { n: 4, bajadaCelular: '', nombre: 'Gestión', corto: 'Gestión', titulo: 'Cumplimiento ante la autoridad', bajada: 'Donde todo lo anterior se vuelve evidencia.' },
]

export const PLANTA = {
  rotulo: 'Dónde intervenimos',
  titulo: 'Recorremos tu planta y evaluamos cada etapa de tus operaciones',
  bajada:
    'Desde el ingreso de materias primas hasta el producto final, identificamos los aspectos ambientales de tu proceso: agua, energía, efluentes, emisiones y residuos.',
  bajada2: 'Conectamos ese diagnóstico con tus obligaciones normativas para prevenir incumplimientos y proponer mejoras concretas.',
  nota: 'Las autoridades de cada punto son referenciales, dependen de la actividad y de la competencia en cada caso, y están en validación técnica.',
  ejes: { O: 'Operación', A: 'Ambiental', R: 'Regulatorio' } as Record<string, string>,
}

export type Ficha = {
  n: number
  etapa: number
  slug: string
  titulo: string
  ejes: string[]
  autoridades: string
  opera: string
  exige: string
  pin: [number, number]
}
export const FICHAS = fichasData as Ficha[]
export const fichaPorSlug = (slug: string) => FICHAS.find((f) => f.slug === slug)
export const nn = (n: number) => (n < 10 ? `0${n}` : `${n}`)

export const PASOS = {
  rotulo: 'Cómo trabajamos',
  titulo: 'Del hallazgo a la evidencia',
  bajada: 'Atención directa, recomendaciones adaptadas a cada planta y seguimiento con responsables, plazos y evidencias.',
  items: [
    { nombre: 'Diagnóstico', texto: 'Identificamos necesidades, riesgos y oportunidades de mejora.' },
    { nombre: 'Evaluación', texto: 'Analizamos la viabilidad técnica, legal, ambiental, económica y operativa.' },
    { nombre: 'Plan de acción', texto: 'Definimos soluciones, plazos, responsables y recursos.' },
    { nombre: 'Implementación', texto: 'Ejecutamos las acciones con acompañamiento técnico y coordinación permanente.' },
    { nombre: 'Seguimiento', texto: 'Medimos resultados, verificamos avances y detectamos oportunidades de mejora.' },
  ],
}

export const MIRADAS = {
  rotulo: 'Las dos miradas',
  titulo: 'Entendemos tu operación y cómo se evalúa ante la autoridad',
  bajada:
    'Integramos experiencia en el sector privado y la gestión pública para conectar tus desafíos operativos con las exigencias técnicas y legales de tu sector.',
  items: [
    {
      rotulo: 'En la industria',
      titulo: 'Experiencia en la industria',
      texto:
        'Más de 18 años de trayectoria profesional, con experiencia en calidad, gestión ambiental, tratamiento de efluentes, monitoreos y auditorías ISO 14001. Conocimiento operativo para proponer soluciones aplicables a tu empresa.',
      glifo: 'planta',
    },
    {
      rotulo: 'En el Estado',
      titulo: 'Experiencia en la gestión pública',
      texto:
        'Experiencia en el Ministerio de la Producción, brindando asistencia técnica y participando en la evaluación de expedientes y propuestas normativas. Conocimiento de los procedimientos administrativos para orientar una gestión documentada y oportuna.',
      glifo: 'autoridad',
    },
  ],
}

export const SERVICIOS = {
  rotulo: 'Servicios',
  titulo: 'Servicios para fortalecer la continuidad de tus operaciones',
  bajada: 'Integramos soluciones técnicas y legales para prevenir riesgos, mejorar procesos y acompañar el cumplimiento de tu organización.',
  items: [
    {
      titulo: 'Gestión ambiental y sostenibilidad',
      texto:
        'Fortalecemos el desempeño ambiental de tu organización mediante el seguimiento de compromisos, la gestión de residuos y la coordinación de monitoreos. Identificamos oportunidades de eficiencia hídrica, energética y economía circular.',
      puntos: [4, 7, 16, 17, 20],
    },
    {
      titulo: 'Cumplimiento normativo y permisos',
      texto:
        'Identificamos las obligaciones aplicables a tu actividad y organizamos su seguimiento. Te acompañamos en la gestión de permisos, autorizaciones y expedientes, con vigilancia normativa y atención de observaciones.',
      puntos: [1, 12, 19, 22],
    },
    {
      titulo: 'Asesoría técnica y legal ante fiscalizaciones',
      texto:
        'Preparamos a tu organización para atender supervisiones y requerimientos de las autoridades. Integramos análisis técnico y legal, revisión de evidencias y elaboración de descargos para acompañarte durante procedimientos sancionadores y medidas correctivas.',
      puntos: [18, 21],
    },
    {
      titulo: 'Estudios e instrumentos de gestión ambiental',
      texto:
        'Evaluamos las necesidades ambientales de tu proyecto y coordinamos la elaboración o actualización de los instrumentos correspondientes. Integramos especialistas y consultoras habilitadas, según corresponda, y acompañamos la evaluación y atención de observaciones.',
      puntos: [18],
    },
    {
      titulo: 'Agua, efluentes y optimización de procesos',
      texto:
        'Evaluamos el uso del agua y el desempeño de los sistemas de tratamiento. Proponemos alternativas para reducir pérdidas, mejorar la calidad de los efluentes y desarrollar proyectos de tratamiento y reúso.',
      puntos: [1, 2, 6, 10, 11, 12],
    },
    {
      titulo: 'Auditorías y diagnósticos',
      texto:
        'Evaluamos el cumplimiento y la eficacia de tus sistemas de gestión. Identificamos brechas, priorizamos acciones de mejora y verificamos su implementación para fortalecer el control de tus operaciones.',
      puntos: [23],
    },
    {
      titulo: 'Capacitación y fortalecimiento de capacidades',
      texto:
        'Desarrollamos programas adaptados a las funciones y necesidades de tu equipo. Combinamos contenidos técnicos, casos prácticos y evaluaciones para mejorar la aplicación de los procedimientos y las obligaciones de tu organización.',
      puntos: [24],
    },
  ],
}

export const SECTORES = {
  rotulo: 'Sectores',
  titulo: 'Cada sector tiene sus particularidades',
  bajada: 'Nuestro enfoque conecta experiencia, cumplimiento y eficiencia.',
  bajada2: 'Adaptamos nuestras soluciones a los procesos, riesgos y necesidades de cada organización.',
  items: [
    { nombre: 'Pesca industrial', proceso: 'Harina, aceite, congelado y conservas', criticos: 'Efluentes de proceso, emisiones de secadores y olores' },
    { nombre: 'Acuicultura', proceso: 'Centros de cultivo y plantas de proceso', criticos: 'Calidad de agua, efluentes y permisos acuícolas' },
    { nombre: 'Alimentos y bebidas', proceso: 'Cacao, frutas y procesados', criticos: 'Efluentes orgánicos, residuos y eficiencia hídrica' },
    { nombre: 'Agroindustria y agroexportación', proceso: 'Empacadoras y procesadoras', criticos: 'Agua, residuos orgánicos y compostaje' },
    { nombre: 'Manufactura', proceso: 'Plantas de transformación', criticos: 'Emisiones, residuos peligrosos y ruido' },
  ],
  otros: 'También atendemos minería, hidrocarburos y comercio y servicios, con especialistas según el proyecto.',
}

export const DIRECTOR = {
  rotulo: 'Quién dirige',
  nombre: 'Aníbal Boca Acosta',
  cargo: 'Director de Grupo BluePoint',
  foto: '/equipo/anibal-boca-vertical.webp',
  bio: [
    'Cuenta con más de 18 años de trayectoria en el sector privado y la gestión pública, con experiencia en gestión ambiental, cumplimiento normativo, auditorías y mejora de procesos. Su recorrido integra conocimiento operativo, coordinación de equipos y atención de procedimientos ante entidades del Estado.',
    'Al frente de Grupo BluePoint, dirige una propuesta de consultoría que combina análisis técnico, visión empresarial y acompañamiento especializado para ayudar a las organizaciones a gestionar riesgos, fortalecer el cumplimiento y mejorar su desempeño.',
  ],
  formacion: [
    'Ingeniero pesquero',
    'Diplomado en Gerencia Ambiental (ESAN y Universidad de los Andes)',
    'Auditor interno ISO 14001 e ISO 45001',
  ],
  linkedin: 'https://www.linkedin.com/in/anibalboca/',
  modalidades: {
    titulo: 'Modalidades',
    items: ['Por proyecto', 'Asesoría permanente', 'Casos específicos'],
    nota: 'Cada modalidad con alcance, entregables y plazos definidos.',
  },
}

export const EQUIPO = {
  rotulo: 'Expertos asociados',
  titulo: 'Especialistas que conocen la norma desde el Estado y la empresa',
  bajada: 'Según el proyecto, sumamos especialistas en asuntos regulatorios, sanidad e infraestructura.',
  personas: [
    {
      nombre: 'Melissa Flores Morales',
      area: 'Asuntos regulatorios y legales',
      foto: '/equipo/melissa-flores',
      bio: [
        'Abogada senior con más de 15 años en sectores altamente regulados, entre instituciones públicas y empresa privada. Su trayectoria en el SERNANP, el Ministerio de la Producción y la gerencia legal y de asuntos corporativos de una de las mayores empresas pesqueras del país le permite entender tanto la lógica de la administración pública como las necesidades del sector empresarial.',
        'Hace seguimiento y análisis normativo, evalúa proyectos de ley y propuestas regulatorias, prepara informes de sustento y coordina con autoridades y actores de interés. Traduce normativa compleja en recomendaciones ejecutivas y anticipa riesgos regulatorios.',
      ],
      instituciones: ['SERNANP', 'PRODUCE'],
      linkedin: 'https://www.linkedin.com/in/melissafloresmorales/',
    },
    {
      nombre: 'Germán Torres Vértiz',
      area: 'Sanidad pesquera e infraestructura',
      foto: '/equipo/german-torres',
      bio: [
        'Ingeniero pesquero titulado por la Universidad Nacional del Callao y colegiado en el CIP, con más de 20 años en el sector pesquero industrial y artesanal. Fue inspector y evaluador del SANIPES y especialista en el Ministerio de la Producción, el FONDEPES y el MTC.',
        'Acompaña habilitaciones sanitarias, planes HACCP, autorizaciones de instalación, licencias de operación y estudios de impacto ambiental. Tiene formación en ISO 22000, HACCP y auditoría ISO/IEC 17020.',
      ],
      instituciones: ['SANIPES', 'PRODUCE', 'FONDEPES'],
      linkedin: '',
    },
  ],
}

export const CLIENTES = {
  rotulo: 'Clientes',
  titulo: 'Organizaciones que trabajan con nosotros',
  items: [
    { nombre: 'Congeladora Industrial Ilo', logo: '/clientes/congeladora-industrial-ilo.webp', ancho: 1053, alto: 220 },
    { nombre: 'Moca Cacao', logo: '/clientes/moca-cacao.webp', ancho: 307, alto: 409 },
    { nombre: 'Don Ricardo', logo: '/clientes/don-ricardo.webp', ancho: 150, alto: 120 },
    { nombre: 'La Vela Verde', logo: '/clientes/la-vela-verde.webp', ancho: 261, alto: 235 },
    { nombre: 'Fisio Integral', logo: '/clientes/fisio-integral.webp', ancho: 547, alto: 175 },
  ],
}

export const ALIANZA = {
  rotulo: 'Alianza',
  titulo: 'Trabajamos con la división de consultoría en sostenibilidad de Redesign Lab',
  texto1:
    'Redesign Lab es un impact venture studio latinoamericano especializado en bioeconomía, cofundado y dirigido por Eddie Ajalcriña. Desde 2021 acompaña a empresas industriales y agroindustriales en economía circular, financiamiento sostenible y nuevos modelos de negocio.',
  texto2:
    'Con esta alianza, a la asesoría ambiental y regulatoria que hacemos en planta se suma la estrategia de sostenibilidad y el acceso a financiamiento.',
  eddie: 'https://www.linkedin.com/in/eddieajalcrina',
  enlace: { href: 'https://redesignlab.org/consultoria-sostenibilidad', texto: 'Consultoría en sostenibilidad de Redesign Lab' },
}

export const FAQ = {
  rotulo: 'Preguntas frecuentes',
  titulo: '¿Qué suelen preguntarnos?',
  items: [
    {
      p: '¿Qué hace Grupo BluePoint?',
      r: 'Somos una consultora ambiental y regulatoria con sede en Lima. Ayudamos a plantas industriales a identificar sus obligaciones ambientales, cumplirlas sin detener la operación y atender supervisiones y fiscalizaciones con asesoría técnica y legal.',
    },
    {
      p: '¿En qué se diferencian de una consultora ambiental tradicional?',
      r: 'Antes de revisar el expediente recorremos la planta para entender cómo el proceso genera efluentes, emisiones y residuos, y conectamos ese diagnóstico con lo que exige la autoridad. Nuestro director suma más de 18 años entre la industria y el Ministerio de la Producción.',
    },
    {
      p: 'Tenemos una supervisión o un procedimiento sancionador del OEFA. ¿Pueden ayudarnos?',
      r: 'Sí. Preparamos la supervisión, revisamos las evidencias, elaboramos los descargos técnicos y legales dentro de los plazos y acompañamos el cumplimiento de las medidas correctivas o administrativas que se dicten.',
    },
    {
      p: '¿Elaboran instrumentos de gestión ambiental?',
      r: 'Diagnosticamos qué instrumento necesita la planta, coordinamos su elaboración o actualización con equipos y consultoras habilitados, hacemos la revisión técnica y acompañamos el levantamiento de observaciones ante la autoridad.',
    },
    {
      p: '¿Qué autoridades fiscalizan a una planta industrial en el Perú?',
      r: 'Depende de la actividad y del componente. En general, el OEFA fiscaliza el cumplimiento ambiental, la autoridad sectorial aprueba los instrumentos, la ANA otorga los derechos de uso de agua y las autorizaciones de vertimiento y reúso, y SANIPES o DIGESA ven lo sanitario. En cada caso hay que revisar la competencia específica.',
    },
    {
      p: '¿Con qué sectores trabajan?',
      r: 'Pesca industrial, acuicultura, alimentos y bebidas, agroindustria y agroexportación, y manufactura. En minería, hidrocarburos y comercio y servicios trabajamos con especialistas según el proyecto.',
    },
    {
      p: '¿Cómo empezamos?',
      r: 'Con una reunión de 30 minutos para entender la necesidad. Luego trabajamos por etapas, del diagnóstico al seguimiento, por proyecto, en asesoría permanente o en casos específicos, cada uno con alcance, entregables y plazos definidos.',
    },
  ],
}

export const CONTACTO = {
  rotulo: 'Contacto',
  titulo: '¿Tu empresa necesita gestionar permisos, atender una fiscalización o desarrollar un proyecto?',
  bajada: 'Conversemos sobre tus necesidades. Te ayudamos a definir los próximos pasos con asesoría técnica y legal adaptada a tu sector.',
}

export const PIE = {
  credito: { texto: 'Diseño e implementación:', marca: 'ThousandFold Studio', href: 'https://thousandfold.la' },
  alianza: { texto: 'En alianza con', marca: 'Redesign Lab', href: 'https://redesignlab.org' },
}
