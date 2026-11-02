# Hoja de ruta — Web personal y portafolio

Fecha de creación: 30 de octubre de 2026.
Estado: etapa 3 completada y base visual aprobada para incorporar contenido personal. Etapas 0 y 1 completadas; etapa 2 con pasos 1–4 completados y pasos 5 y 6 aplazados por el propietario. Etapa 4 pendiente de comenzar.

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

Esta dirección corresponde a la base visual aplicada y aprobada al cierre de la etapa 3. Los ajustes necesarios al incorporar contenido personal se realizarán en la etapa 4.

- **Personalidad:** profesional, cercana y centrada en mostrar el trabajo realizado.
- **Composición:** jerarquía clara, espacio entre secciones y proyectos con protagonismo visual.
- **Color:** fondo negro, primario verde turquesa y secundario plateado, definidos por el propietario como base provisional sujeta a cambios.
- **Tipografía:** una familia legible con pocos pesos y una jerarquía clara entre títulos y texto. Se puede comenzar con la pila del sistema y decidir después si se necesita una fuente propia.
- **Componentes:** tarjetas de proyectos, botones, etiquetas de tecnologías y navegación con estados coherentes.
- **Movimiento:** transiciones breves como propuesta inicial, sin dificultar la lectura ni retrasar la interacción.
- **Tema:** oscuro aprobado como tema principal; el modo claro/oscuro queda como mejora opcional.
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
- [x] Definir paleta, tema principal, referencias visuales y nivel de movimiento.
- [x] Confirmar las secciones de la página de prueba.

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

La base bilingüe incluye catálogos en `messages/es.json` y `messages/en.json`, integración con Vite y rutas localizadas. `yarn run check` genera las declaraciones antes de comprobar tipos; los archivos generados se excluyen de la revisión directa de TypeScript, conservando los tipos de sus importaciones. La compilación genera HTML para `/` y `/en/`. Se verificaron idiomas, títulos, cambio a inglés en navegador y composición en ambos idiomas a varios anchos. La revisión exhaustiva de teclado y recarga con anclas y parámetros sigue pendiente.

- [x] Implementar las secciones acordadas con textos e imágenes provisionales.
- [x] Adaptar el diseño a móvil, tableta y escritorio.
- [x] Implementar navegación móvil e interacciones acordadas.
- [x] Incorporar el selector de idioma y los textos de prueba en español e inglés.
- [ ] Incorporar movimiento y su alternativa de movimiento reducido.
- [ ] Revisar estados de foco, interacción, imágenes y textos extensos.

**Entregable:** página de prueba navegable para evaluar el diseño completo.

#### Comparación del plan con el estado real

La implementación de algunos puntos se adelantó al construir los componentes y las secciones. La tabla conserva la distinción entre implementación y verificación pendiente; la base visual se aprobó posteriormente en la etapa 3.

| Paso | Estado real | Trabajo que queda |
| --- | --- | --- |
| 1. Secciones y contenido provisional | Completado | Los cambios de apariencia se tratarán en la etapa 3. |
| 2. Diseño adaptable | Completado | Repetir la revisión únicamente tras ajustes que afecten la composición. |
| 3. Navegación e interacciones | Implementado y marcado como completado | Ya existen menú desplegable, enlaces a secciones, botones de desplazamiento y filtros. Se verificaron apertura/cierre del menú de tableta y filtro móvil de proyectos. La prueba integral por teclado corresponde al paso 6. |
| 4. Selector y contenido bilingüe | Completado | Selector, textos y atributos de imágenes traducidos; cambio de idioma, recarga, parámetros y anclas comprobados en los casos documentados de la etapa 3. |
| 5. Movimiento y alternativa reducida | Implementado; verificación reducida aplazada | Fade con desplazamiento y estados hover implementados y revisados; intensidad aceptada en la etapa 3. Sigue pendiente la prueba de la preferencia de movimiento reducido activada en navegador. |
| 6. Revisión de estados y contenido | Pendiente de revisión integral | Recorrer la página con teclado, verificar foco y activación de acciones, imágenes cargadas y alternativas, textos largos, y los estados de interacción. Las revisiones visuales ya realizadas sirven de base. |

**Separación de etapas:** la etapa 2 comprueba que la demo funciona; la etapa 3 recoge las mejoras de diseño del propietario, las aplica y obtiene su aprobación. La etapa 3 está cerrada y la etapa 4 puede comenzar. Las comprobaciones previas de tipos y compilación son avances técnicos, pero no cierran la etapa 5 de publicación sobre contenido definitivo.

**Cierre de la etapa 0:** la paleta, el tema oscuro, la referencia conceptual, el nivel de movimiento ajustado y las secciones implementadas quedan confirmados con la aceptación de la demo en la etapa 3.

Avance del paso 2: navegación compacta por debajo de 1024 px para dar espacio al encabezado en tableta; ilustración de presentación centrada y limitada a 24 rem en móvil; tarjetas con ancho flexible, espaciado adaptable y notas alineadas. Verificación en navegador de ambos idiomas a 320, 360, 768, 1024 y 1440 px: sin desplazamiento horizontal; proyectos en una, dos y tres columnas según el tamaño. Menú de tableta verificado al abrir y al elegir una sección. Capturas en `demo-mobile.png`, `demo-tablet.png` y `demo-desktop.png`. Comprobación de tipos y compilación completadas correctamente. La verificación general de teclado, foco y demás interacciones continúa en los pasos posteriores.

Avance del paso 1: encabezado, presentación ilustrada, biografía ficticia, tres proyectos conceptuales (Nexo, Pulso y Prisma), tecnologías, contacto de prueba y pie de página. Textos en español e inglés mediante Paraglide; información común centralizada en `src/lib/data/portfolio.ts`. Nuevas secciones reutilizables en `src/lib/components/sections`. Cuatro imágenes creadas con la herramienta integrada ImageGen, guardadas en `static/images`; sus prompts finales se documentan en `static/images/README.md`. Las imágenes de proyectos son conceptos y no capturas de productos reales. El contacto muestra datos ficticios sin enlaces de envío. Verificado: `yarn run check` sin errores ni advertencias, compilación de ambos idiomas, revisión visual de escritorio y comprobación en navegador del cambio a inglés y filtro móvil. Captura de escritorio en `demo-preview.png`. La revisión de tamaños móvil/tableta y de los demás estados sigue pendiente en los próximos pasos.

### Etapa 3 — Revisar y aprobar los estilos

El propietario indicó avanzar a esta etapa dejando pendientes los pasos 5 y 6 de la etapa 2. Tras revisar la demo y aplicar sus observaciones, se registra la etapa 3 como completada y la base visual como aprobada. Los pasos aplazados de la etapa 2 permanecen abiertos y no se consideran verificados por esta aprobación.

- [x] Revisar colores, tipografía, distribución y apariencia de las tarjetas.
- [x] Evaluar la comodidad de la navegación y la intensidad de las animaciones.
- [x] Revisar el selector de idioma y la composición visual con textos en ambos idiomas.
- [x] Registrar observaciones concretas y aplicar ajustes.
- [x] Volver a revisar los tamaños de pantalla afectados.
- [x] Registrar la aprobación del diseño y cualquier pendiente aceptado.

**Entregable:** estilo visual aprobado y observaciones resueltas o documentadas.

**Cierre de etapa — 2 de noviembre de 2026:** revisión de los seis puntos frente a las implementaciones y comprobaciones registradas, junto con la aceptación del propietario. Sin nuevas correcciones detectadas en esta revisión.

| Punto | Evidencia de cierre |
| --- | --- |
| 1. Colores, tipografía, distribución y tarjetas | Aprobación previa del propietario y revisión de coherencia visual y contrastes documentada. |
| 2. Navegación y animaciones | Header fijo con blur; separación de anclas; fade ajustado en textos, tarjetas y filtros; parallax descartado; enlace y URL activos según scroll. |
| 3. Idiomas y composición | Español e inglés, selector que conserva sección y parámetros; revisión de ambas versiones. |
| 4. Observaciones y correcciones | Ajustes registrados y aplicados: altura de la presentación, navegación fija, intensidad del fade, estado al saltar entre secciones y recarga sin destello del inicio. |
| 5. Tamaños afectados | Nueva verificación en navegador de ambos idiomas a 320, 360, 768, 1024 y 1440 px: sin desplazamiento horizontal, header fijo, tres tarjetas presentes y About después de la primera pantalla. |
| 6. Aprobación y pendientes aceptados | Base visual aceptada para la etapa 4. Quedan aplazadas la prueba en navegador de movimiento reducido y la revisión integral de teclado/foco y estados de la etapa 2. |

Las siete pruebas automáticas y las comprobaciones de tipos/compilación de la última implementación pasaron; no se repitieron por este cambio documental. Esta aprobación no equivale a publicar la web ni a aprobar contenido personal todavía no incorporado.

**URL vinculada al scroll:** el encabezado identifica la sección que cruza la zona de lectura bajo el header fijo y actualiza el fragmento de la URL y el enlace activo en turquesa (`aria-current="location"`). Utiliza navegación superficial de SvelteKit 3 con reemplazo del historial, sin reiniciar scroll ni foco, conservando ruta, parámetros e idioma. Espera a que finalice la restauración inicial antes de sincronizar y no cambia de sección por abrir el menú móvil. La detección incluye el final de página para secciones cortas. Pruebas de selección en `tests/activeSection.test.mjs`.

Verificación de seguimiento: recorrido manual descendente por About, Projects, Technologies y Contact, y ascendente hacia Technologies; los hashes y el enlace activo coinciden. Se conservó el parámetro de prueba de la URL. La recarga mantuvo el scroll a 2073 px y la sección Technologies. Tras una navegación explícita y varios desplazamientos, Atrás volvió a la posición anterior a esa navegación sin recorrer los cambios automáticos. El cambio a inglés mantuvo la sección y los parámetros. Verificación móvil a 360 px sin desbordamiento horizontal. Siete pruebas automáticas pasaron. Captura en `demo-active-section.png`.

**Recarga sin destello del inicio:** se añadió una protección previa al primer render en `src/app.html` para recargas, restauración del historial y enlaces a secciones. El layout muestra el contenido tras inicializar el router, restaurar el scroll y esperar dos frames de renderizado. La posición se guarda al salir en sessionStorage y solo se reutiliza al recargar exactamente la misma URL; los enlaces directos nuevos usan su ancla. La entrada normal al inicio permanece visible. Hay una salida de respaldo a los 5 segundos y tratamiento de páginas restauradas desde caché para evitar ocultación indefinida si falla la hidratación. Verificado en navegador: scroll manual a 1070 px conservado al recargar; Contacto a 2594 px antes y después; Proyectos restaurado y ancla inglesa About a 541 px conservada. Cinco pruebas automáticas, tipos sin errores ni advertencias y compilación correcta. Pruebas: `node --test tests/initialScroll.test.mjs tests/scrollFade.test.mjs`. Captura en `demo-reload-restored.png`.

**Separación de la presentación:** la sección inicial ocupa como mínimo el alto visible de pantalla menos los 92 px del encabezado. De este modo, «Sobre mí» comienza después de la primera pantalla al cargar desde el inicio. La altura puede crecer si el contenido lo necesita y se utiliza la unidad estable svh para evitar saltos por las barras del navegador móvil.

**Encabezado fijo:** posición fija superior con fondo oscuro translúcido, blur de 12 px, sombra discreta y borde inferior en degradado difuminado. Se reserva su altura de 92 px en el flujo y se añade separación de scroll para no tapar las secciones al navegar. El menú desplegado tiene altura máxima de pantalla y desplazamiento interno. Fondo más opaco como alternativa cuando no hay soporte de blur. Verificado en escritorio y móvil: header en coordenada superior 0 al navegar, secciones a 108 px frente al borde inferior del header a 92 px, apertura/cierre del menú y ausencia de desbordamiento horizontal. Tipos y compilación correctos. Captura en `demo-fixed-header.png`.

**Corrección de saltos entre secciones:** se reprodujo que Proyectos conservaba el estado visible al volver de una sección inferior a Sobre mí. Se sustituyó la dependencia de cambios de intersección por una actualización de todos los elementos ante scroll, cambios de ancla, redimensionamiento y restauración de página. Las lecturas se agrupan antes de escribir estados y se descuenta la traslación del propio fade para evitar que interfiera con su umbral. Los ajustes personales de scroll-margin se conservan. Verificado en navegador el estado oculto del título, filtros y tarjetas al volver a Sobre mí, incluida la ruta móvil Proyectos → Contacto → Sobre mí; se comprobó que Proyectos vuelve a aparecer al navegar a él. Prueba de regresión en tests/scrollFade.test.mjs: node --test tests/scrollFade.test.mjs. Tipos sin errores ni advertencias. Captura en demo-about-fade-fixed.png.

**Fade al hacer scroll:** se añadió la acción reutilizable `src/lib/actions/scrollFade.ts` con un cálculo compartido de visibilidad sincronizado mediante requestAnimationFrame, sin dependencias. Títulos, descripciones, biografía, tarjetas y el grupo de botones de filtro de proyectos aparecen al entrar desde abajo y se desvanecen al salir por abajo al volver hacia arriba. El contenido que ya pasó por la parte superior permanece visible para evitar destellos. Transición reforzada de 1100 ms con opacidad y desplazamiento vertical: sube desde 64 px hasta su posición al aparecer, y baja hasta 64 px al desaparecer (36 px en móvil). Curva de aceleración y desaceleración suave; la activación se calcula al 82 % de la altura visible para que la entrada y la salida sean perceptibles dentro de la pantalla. La traslación del fade es independiente de la elevación hover de las tarjetas. Con movimiento reducido se anula el desplazamiento y la transición. Con movimiento reducido o sin JavaScript, el contenido permanece visible; el foco dentro del elemento fuerza su visibilidad. Verificado en navegador el ciclo de oculto → visible → oculto de tarjetas y encabezado de proyectos. Tipos sin errores ni advertencias y compilación correcta. Verificado también el recorrido de entrada (opacidad parcial y traslación descendiendo a cero), posición visible final y salida con traslación hacia abajo. Captura actual en `demo-fade-slide.png`. La comprobación de la preferencia reducida en navegador sigue aplazada; este ajuste no cierra los puntos pendientes ni implica aprobación de la intensidad final.

**Decisión sobre el movimiento:** el propietario descartó el parallax tras revisarlo. Se retiraron el componente y sus importaciones, y se restauraron la ilustración, el adorno de «Sobre mí» y las imágenes de proyectos sin desplazamiento ligado al scroll ni ampliación adicional. Las capturas demo-parallax.png y demo-parallax-v2.png corresponden a pruebas anteriores y no representan el estado actual. Se conservan las interacciones hover previas. Las verificaciones aplazadas de la etapa 2 mantienen su estado.

**Revisión del punto 1:** aprobado expresamente por el propietario. Revisión adicional del código de estilos y componentes, y de las capturas existentes de escritorio, tableta y móvil: paleta coherente, jerarquía tipográfica clara, espaciado consistente, imágenes de tarjetas con proporción 16:9 y notas alineadas. No se encontraron correcciones necesarias dentro de este punto. Contrastes calculados para pares de colores sólidos: texto principal/fondo 18,05:1; plateado/superficie 10,58:1; texto tenue/superficie 8,05:1; turquesa/fondo 10,66:1; texto/botón primario 9,16:1. Esta comprobación no equivale a una auditoría completa de accesibilidad ni a una nueva prueba interactiva. La aprobación corresponde a colores, tipografía, distribución y tarjetas; los otros puntos de esta etapa y los pasos aplazados conservan su estado.

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
- [x] El propietario aprueba expresamente el resultado visual.

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
| Mantener SvelteKit, Svelte y TypeScript existentes | Confirmado en la base implementada |
| Tailwind CSS y Lucide como dependencias visuales iniciales | Aprobados e instalados; Tailwind integrado, uso de iconos pendiente |
| Componentes propios de Svelte y animaciones CSS | Aprobados al cerrar la etapa 3 |
| Paleta, tema oscuro y tipografía de la demo | Aprobados como base para el contenido personal |
| Modo claro/oscuro y páginas individuales de proyectos | Opcionales, por evaluar |
| Alojamiento y dominio | Pendiente para la etapa de publicación |

**Siguiente paso:** etapa 4: reunir e incorporar el nombre público, presentación, biografía, contacto, proyectos reales e imágenes personales, con sus versiones en español e inglés. Los pasos 5 y 6 de la etapa 2 siguen aplazados por indicación del propietario y conservan sus casillas pendientes.
