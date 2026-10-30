# Hoja de ruta — Web personal y portafolio

Fecha de creación: 30 de octubre de 2026.
Estado: librerías instaladas, Tailwind integrado y Paraglide configurado para español e inglés. Dirección visual pendiente.

## 1. Objetivo

Crear una web personal para presentar los sistemas desarrollados personalmente, explicar qué resuelven y facilitar que los visitantes conozcan al autor y exploren sus proyectos.

La experiencia debe ser dinámica, amigable, rápida y adaptable a teléfonos, tabletas y computadoras. Primero se construirá una página con información de prueba para evaluar los estilos. Una vez aprobados, se incorporarán los textos, imágenes y proyectos personales, con los ajustes que estos requieran.

## 2. Alcance

- Proyecto exclusivamente frontend, con contenido local y navegación e interacciones en el navegador.
- Disponible inicialmente en español (`es`) e inglés (`en`), incluyendo la página de prueba.
- Primera versión como una página con secciones; las páginas individuales de proyectos podrán evaluarse después.
- Sin backend, base de datos, autenticación ni panel de administración.
- Contacto mediante enlaces a correo o perfiles, cuando se proporcionen. Un formulario con envío real requeriría ampliar el alcance con un servicio externo.
- Datos ficticios claramente identificados durante la etapa de prueba.
- Las demostraciones de los sistemas serán enlaces externos cuando existan; esta web no ejecutará sus servicios de backend.

## 3. Punto de partida del proyecto

La revisión inicial encontró:

| Elemento | Estado actual |
| --- | --- |
| Framework | SvelteKit, rango `^3.0.0` declarado en `package.json` |
| Interfaz | Svelte, rango `^5.57.1` declarado |
| Lenguaje | TypeScript |
| Herramienta de desarrollo | Vite |
| Estilos e iconos | Sin librerías específicas declaradas |
| Página inicial | Contenido de bienvenida de SvelteKit |
| Adaptador | `@sveltejs/adapter-auto` |
| Dependencias | Existe `yarn.lock`; se propone continuar con Yarn |

Los rangos anteriores son los declarados, no una comprobación de las versiones instaladas. Se conservará la base existente y se verificará la compatibilidad al incorporar dependencias.

## 4. Propuesta de herramientas

La siguiente selección es una recomendación para revisar antes de comenzar la implementación.

| Necesidad | Herramienta propuesta | Uso y motivo |
| --- | --- | --- |
| Estilos y diseño adaptable | Tailwind CSS 4 con `@tailwindcss/vite` | Construir la composición y los estados visuales con una escala consistente. Cuenta con una guía oficial de integración con SvelteKit. |
| Identidad visual | Variables CSS y estilos locales de Svelte | Definir colores, tipografía, espaciados, radios y sombras compartidos, y resolver detalles particulares de los componentes. |
| Iconos | Lucide para Svelte, paquete `@lucide/svelte` | Usar iconos SVG consistentes, importando únicamente los necesarios. |
| Internacionalización (i18n) | Paraglide JS, paquete `@inlang/paraglide-js` | Gestionar los textos en español e inglés con mensajes tipados e integración con SvelteKit y generación estática. |
| Movimiento e interacción | CSS y transiciones nativas de Svelte | Dar respuesta a botones, tarjetas, menús y cambios de contenido con movimiento breve y discreto. |
| Componentes | Componentes propios de Svelte | Crear botones, tarjetas, etiquetas y navegación acordes con la identidad del portafolio. |
| Publicación estática | `@sveltejs/adapter-static`, al preparar el despliegue | Generar archivos estáticos para publicar la web sin un servidor de aplicación propio. |

**Selección inicial recomendada:** Tailwind CSS + Lucide + Paraglide JS + componentes y transiciones de Svelte. El adaptador estático se incorporará al preparar la publicación.

Por ahora no se propone añadir un catálogo completo de componentes ni otra librería de animaciones: la primera página permite evaluar las necesidades con esta base. Si aparece una interacción compleja, se documentará el requisito y se revisará una herramienta específica antes de incorporarla.

Librerías instaladas con Yarn: `tailwindcss` y `@tailwindcss/vite` 4.3.3, `@lucide/svelte` 1.65.0 y `@inlang/paraglide-js` 2.29.3. Las dependencias quedaron registradas en `package.json` y `yarn.lock`. La integración de estilos y la configuración de idiomas corresponden a los siguientes pasos.

Verificación posterior a la instalación: `yarn run check` terminó con 0 errores y 0 advertencias; `yarn run build` completó correctamente. El adaptador de publicación sigue pendiente de la etapa prevista. Con Yarn 1 se usará `yarn run check` para ejecutar el script del proyecto, evitando el comando interno `yarn check`.

Fuentes oficiales consultadas el 30 de octubre de 2026:

- [Integración de Tailwind CSS con SvelteKit](https://tailwindcss.com/docs/installation/framework-guides/sveltekit).
- [Instalación de Lucide para Svelte](https://lucide.dev/guide/svelte/getting-started).
- [Transiciones de Svelte y movimiento reducido](https://svelte.dev/docs/svelte/transition).
- [Generación estática con SvelteKit](https://svelte.dev/docs/kit/adapter-static).
- [Paraglide en la CLI oficial de Svelte](https://svelte.dev/docs/cli/paraglide).
- [Integración de Paraglide con SvelteKit y generación estática](https://paraglidejs.com/sveltekit).

### Internacionalización desde la primera demo

Se propone Paraglide JS porque ofrece una integración documentada con SvelteKit, mensajes tipados y soporte de generación estática. La configuración se verificará con las versiones del proyecto durante la implementación. Véanse la [guía oficial de Svelte](https://svelte.dev/docs/cli/paraglide) y la [integración de Paraglide](https://paraglidejs.com/sveltekit).

- **Idiomas iniciales:** español (`es`) e inglés (`en`), con español como idioma base confirmado.
- **Selector visible:** opciones «Español» y «English» en escritorio y móvil, con el idioma activo identificado y acceso por teclado. Los idiomas se identificarán con texto.
- **URLs por idioma:** `/` para español y `/en/` para inglés, confirmadas y configuradas. La URL determina el idioma. El selector abre la versión equivalente con recarga completa y conserva los parámetros y el ancla en el navegador.
- **Contenido traducible:** navegación, presentación, biografía, proyectos, botones, etiquetas de accesibilidad, textos alternativos y metadatos. Los nombres propios, marcas y tecnologías conservarán su nombre cuando corresponda.
- **Mensajes separados:** archivos `messages/es.json` y `messages/en.json` con las mismas claves, separados de los componentes. Los datos comunes de los proyectos, como imágenes, enlaces e identificadores, no se duplicarán por idioma.
- **Traducciones revisadas:** la librería gestiona los mensajes; los textos de ambos idiomas se redactarán y revisarán como parte del contenido. No se dependerá de un servicio de traducción durante la visita.
- **Publicación estática:** generar y verificar ambas versiones como archivos estáticos, con `lang`, títulos, descripciones y enlaces alternativos `hreflang` coherentes. Esto mantiene el alcance exclusivamente frontend.
- **Ampliación futura:** la estructura permitirá añadir otros idiomas sin duplicar los componentes de la página.

La primera versión usará selección manual mediante la URL, sin detección automática del idioma del navegador. Recordar una preferencia entre visitas independientes podrá evaluarse después.

## 5. Dirección visual inicial

Esta dirección es un punto de partida para la página de prueba; todavía no representa un estilo aprobado.

- **Personalidad:** profesional, cercana y centrada en mostrar el trabajo realizado.
- **Composición:** jerarquía clara, espacio entre secciones y proyectos con protagonismo visual.
- **Color:** fondo negro, primario verde turquesa y secundario plateado, definidos por el propietario como base provisional sujeta a cambios.
- **Tipografía:** una familia legible con pocos pesos y una jerarquía clara entre títulos y texto. Se puede comenzar con la pila del sistema y decidir después si se necesita una fuente propia.
- **Componentes:** tarjetas de proyectos, botones, etiquetas de tecnologías y navegación con estados coherentes.
- **Movimiento:** transiciones breves como propuesta inicial, sin dificultar la lectura ni retrasar la interacción.
- **Tema:** elegir un tema principal en la primera revisión; el modo claro/oscuro queda como mejora opcional.
- **Accesibilidad:** navegación por teclado, foco visible, contraste suficiente, etiquetas comprensibles e información disponible sin depender del cursor.

Se respetará la preferencia de movimiento reducido tanto en CSS como en las transiciones de Svelte; estas últimas necesitan su propio ajuste y no deben depender únicamente de una regla CSS.

## 6. Contenido de la página de prueba

| Sección | Contenido provisional | Qué permite evaluar |
| --- | --- | --- |
| Encabezado | Nombre de prueba, enlaces a las secciones y selector Español/English | Navegación, identidad, cambio de idioma y menú móvil |
| Presentación | Descripción ficticia y llamada a ver los proyectos | Primera impresión, tipografía y botones |
| Sobre mí | Biografía breve de ejemplo | Lectura, espaciado y distribución |
| Proyectos | Entre 3 y 6 sistemas ficticios con imágenes provisionales | Tarjetas, proporciones de imágenes y jerarquía |
| Tecnologías | Conjunto de tecnologías de ejemplo | Etiquetas, iconos y consistencia |
| Contacto y pie | Datos de ejemplo identificados como tales | Cierre de la página y presentación de enlaces |

Cada proyecto de prueba tendrá nombre, descripción, problema que resuelve, tecnologías e imagen provisional. Se usarán textos de distintas longitudes para detectar problemas de distribución. Los enlaces sin destino real se mostrarán como no disponibles, sin simular que abren una demostración.

La demo incluirá navegación móvil y respuesta visual al interactuar. Un filtro de proyectos se evaluará si la cantidad de ejemplos permite que aporte utilidad.

Los textos de prueba estarán disponibles en ambos idiomas desde esta etapa para evaluar diferencias de longitud en títulos, botones y tarjetas.

## 7. Etapas y entregables

### Etapa 0 — Acordar herramientas y dirección visual

- [x] Revisar la estructura actual del proyecto.
- [x] Documentar el objetivo, el alcance y la propuesta de herramientas.
- [x] Revisar y aprobar la selección de librerías.
- [x] Confirmar Paraglide JS, español como idioma base y la propuesta de URLs por idioma.
- [ ] Definir paleta, tema principal, referencias visuales y nivel de movimiento.
- [ ] Confirmar las secciones de la página de prueba.

**Entregable:** selección técnica y dirección visual registradas en este documento.

**Condición para avanzar:** acuerdo sobre las herramientas y la dirección inicial antes de desarrollar la página.

### Etapa 1 — Preparar la base visual

- [x] Instalar las dependencias acordadas usando Yarn y actualizar su archivo de bloqueo.
- [x] Integrar Tailwind en Vite y cargar el archivo de estilos globales.
- [x] Configurar Paraglide JS para `es` y `en`, sus catálogos de mensajes y las URLs localizadas.
- [x] Definir variables de color, tipografía, espaciados, radios y sombras.
- [x] Crear los componentes básicos necesarios y sus estados de interacción.
- [x] Organizar el contenido de prueba separado de los componentes.

**Entregable:** base de estilos reutilizable lista para construir la demo.

Avance del punto 6: tipos de proyectos y filtros en `src/lib/types/portfolio.ts`; ejemplos y opciones de filtro en `src/lib/data/portfolio.ts`. Los textos se mantienen en los catálogos de Paraglide y se resuelven mediante `getContent()` y `getLabel()` durante el renderizado, sin fijar el idioma al importar el módulo. La página consume los datos y pasa imágenes y enlaces opcionales a las tarjetas. Se conserva la presentación anterior. Verificación: tipos sin errores ni advertencias, compilación bilingüe y comprobación directa de títulos y filtros en ambos idiomas (3 proyectos: 2 web y 1 móvil).

Avance del punto 5: componentes `Button`, `Badge`, `SectionHeading`, `FilterTabs`, `ProjectCard` y `SiteHeader` en `src/lib/components`. Referencia conceptual: vista previa de «Portfolio Website Design» incluida en el HTML de Figma facilitado por el propietario. Se adaptan sus títulos con acento turquesa, botones redondeados, superficies oscuras y tarjetas a la paleta acordada. La página inicial muestra los componentes con datos ficticios en ambos idiomas, filtros funcionales y menú móvil. Incluye estados hover, foco, selección y deshabilitado, con movimiento reducido. Imágenes y contenido personal siguen pendientes. La revisión visual e interactiva en navegador queda pendiente; se realizó comprobación de tipos y compilación.

Avance del punto 4: variables centralizadas en `src/app.css`, disponibles como utilidades de Tailwind. Paleta provisional: fondo `#080A0B`, primario turquesa `#2DD4BF`, secundario plateado `#C0C7CE` y texto principal `#F1F5F4`; incluye superficies, bordes, foco y estados hover. Usar `on-primary` para texto sobre el turquesa. Tipografía del sistema con base de 16 px y título adaptable; espaciado en múltiplos de 4 px, márgenes y secciones adaptables, ancho de contenido de 72 rem, radios de 6–24 px y sombras discretas. Se aplica el fondo oscuro y texto global, con foco visible. Las duraciones CSS respetan movimiento reducido; las transiciones futuras de Svelte necesitarán su ajuste específico. La paleta sigue abierta a cambios durante la demo.

Avance del punto 2: plugin `@tailwindcss/vite` incorporado en `vite.config.ts`, importación de Tailwind en `src/app.css` y carga global desde `src/routes/+layout.svelte`. Verificado con `yarn run check` (0 errores y 0 advertencias) y `yarn run build` (correcto, con CSS generado).

### Etapa 2 — Construir la página con información de prueba

La base bilingüe ya incluye catálogos en `messages/es.json` y `messages/en.json`, integración con Vite, rutas localizadas y una página provisional con enlaces para cambiar de idioma. `yarn run check` genera las declaraciones antes de comprobar tipos; los archivos generados se excluyen de la revisión directa de TypeScript, conservando los tipos de sus importaciones. La compilación genera HTML para `/` y `/en/`. Se verificaron los idiomas y títulos en ambos archivos; la revisión interactiva del selector queda para la demo.

- [ ] Implementar las secciones acordadas con textos e imágenes provisionales.
- [ ] Adaptar el diseño a móvil, tableta y escritorio.
- [ ] Implementar navegación móvil e interacciones acordadas.
- [ ] Incorporar el selector de idioma y los textos de prueba en español e inglés.
- [ ] Incorporar movimiento y su alternativa de movimiento reducido.
- [ ] Revisar estados de foco, interacción, imágenes y textos extensos.

**Entregable:** página de prueba navegable para evaluar el diseño completo.

### Etapa 3 — Revisar y aprobar los estilos

- [ ] Revisar colores, tipografía, distribución y apariencia de las tarjetas.
- [ ] Evaluar la comodidad de la navegación y la intensidad de las animaciones.
- [ ] Revisar el selector de idioma y la composición visual con textos en ambos idiomas.
- [ ] Registrar observaciones concretas y aplicar ajustes.
- [ ] Volver a revisar los tamaños de pantalla afectados.
- [ ] Registrar la aprobación del diseño y cualquier pendiente aceptado.

**Entregable:** estilo visual aprobado y observaciones resueltas o documentadas.

**Condición para avanzar:** aprobación explícita de los estilos antes de reemplazar los ejemplos por información e imágenes personales.

### Etapa 4 — Incorporar contenido personal

- [ ] Recibir el nombre público, presentación, biografía y medios de contacto.
- [ ] Reunir los sistemas que se mostrarán, sus descripciones y las tecnologías utilizadas.
- [ ] Redactar y revisar las versiones en español e inglés del contenido personal y de los proyectos.
- [ ] Incorporar capturas e imágenes personales con tamaños adecuados y textos alternativos.
- [ ] Añadir enlaces reales a demos, repositorios y perfiles cuando estén disponibles.
- [ ] Ajustar la composición a la longitud y proporciones del contenido definitivo.
- [ ] Retirar todos los datos y recursos ficticios.

**Entregable:** portafolio con contenido personal revisado.

### Etapa 5 — Verificación y preparación para publicar

- [ ] Ejecutar `yarn run check` y `yarn run build` y resolver los errores.
- [ ] Revisar el resultado con `yarn preview` y comprobar la consola del navegador.
- [ ] Verificar navegación por teclado, foco, movimiento reducido y menú móvil.
- [ ] Revisar enlaces, imágenes, textos y ausencia de desbordamiento horizontal.
- [ ] Configurar título, descripción, favicon y datos para compartir en redes.
- [ ] Comprobar las traducciones, el atributo `lang` y los metadatos y enlaces alternativos por idioma.
- [ ] Abrir directamente y recargar ambas URLs en la versión estática, verificando que conservan el idioma y cargan los recursos correctamente.
- [ ] Optimizar las imágenes y cargar de forma diferida las que estén fuera de la vista inicial.
- [ ] Configurar y validar la generación estática según el alojamiento elegido.
- [ ] Elegir alojamiento y dominio, y confirmar cuándo publicar la versión final.

**Entregable:** compilación estática verificada y lista para publicar.

## 8. Criterios para aprobar la demo visual

- [ ] Las secciones se distinguen y el visitante puede encontrar los proyectos fácilmente.
- [ ] Los colores, fuentes y componentes mantienen una identidad coherente.
- [ ] La página se puede usar a 360, 768 y 1440 píxeles de ancho, sin cortes ni desplazamiento horizontal accidental.
- [ ] Los textos largos y las imágenes de distintas proporciones no rompen las tarjetas.
- [ ] El menú funciona con teclado y pantalla táctil; el foco siempre es visible.
- [ ] Las acciones importantes tienen etiquetas claras y los enlaces de prueba no resultan engañosos.
- [ ] El movimiento es discreto y respeta la preferencia de movimiento reducido.
- [ ] El contenido ficticio está identificado y permite valorar el diseño.
- [ ] El selector de idioma funciona en móvil y escritorio y conserva la selección al recargar la URL.
- [ ] Los textos de ambos idiomas están completos y no rompen botones, tarjetas ni navegación.
- [ ] El propietario aprueba expresamente el resultado visual.

## 9. Organización propuesta para la implementación

La estructura siguiente combina los archivos ya creados con los componentes y datos previstos para las siguientes etapas:

```text
messages/
  es.json                     # Textos en español
  en.json                     # Textos en inglés
project.inlang/
  settings.json               # Configuración de idiomas y mensajes
src/
  app.css                     # Tailwind y variables visuales compartidas
  lib/
    components/
      layout/                 # Encabezado, navegación y pie
      ui/                     # Botones, tarjetas y etiquetas reutilizables
      sections/               # Secciones de la página
    data/
      portfolio.ts            # Datos de prueba; después, contenido definitivo
    paraglide/                # Archivos generados por Paraglide; no editar a mano
    types/
      portfolio.ts            # Tipos para proyectos y contenido
  routes/
    +layout.svelte            # Estilos y estructura global
    +page.svelte              # Composición de la página
static/
  images/
    projects/                 # Imágenes provisionales y luego capturas reales
```

Se conservará la convención de importaciones `#lib` del proyecto. Se crearán los componentes que hagan falta conforme avance la implementación, sin generar archivos vacíos de antemano.

## 10. Registro de decisiones

| Decisión | Estado |
| --- | --- |
| Web personal para mostrar sistemas desarrollados personalmente | Definido por el propietario |
| Alcance exclusivamente frontend | Definido por el propietario |
| Español e inglés como idiomas iniciales | Definido por el propietario |
| Paraglide JS para internacionalización | Aprobado, instalado y configurado |
| Español como idioma base y URLs `/` y `/en/` | Confirmado e implementado |
| Primera página con información de prueba | Definido por el propietario |
| Contenido e imágenes personales después de aprobar estilos | Definido por el propietario |
| Mantener SvelteKit, Svelte y TypeScript existentes | Propuesto |
| Tailwind CSS y Lucide como dependencias visuales iniciales | Aprobados e instalados; Tailwind integrado, uso de iconos pendiente |
| Componentes propios y transiciones nativas de Svelte | Pendiente de aprobación |
| Paleta, tema y tipografía definitivos | Pendiente de revisión |
| Modo claro/oscuro y páginas individuales de proyectos | Opcionales, por evaluar |
| Alojamiento y dominio | Pendiente para la etapa de publicación |

**Siguiente paso:** revisar la muestra visual y concretar las decisiones pendientes de la etapa 0 antes de desarrollar las secciones completas de la etapa 2. Los seis puntos de la etapa 1 están completados.
