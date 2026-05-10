# Gestor de Obra

Aplicación local en HTML para organizar una obra por proyectos, estancias, oficios, tareas, documentación y fotos.

## Qué se ha hecho

- Se ha añadido acceso con usuarios antes de entrar a la app.
- Se crea un usuario inicial `administrador`.
- Se ha creado una zona de `Administración` para usuarios, backup y personalización.
- La pantalla inicial de cada proyecto ahora es un resumen rápido con calendario, documentos, fotos, trabajos en curso y mensajes.
- Se mantiene una pantalla de proyectos para trabajar varias obras.
- Cada proyecto guarda su información por separado.
- Se han separado los datos en tres bloques por obra:
  - base principal: estancias, tareas, notas, empresas y progreso
  - base documental: metadatos y archivos de documentos
  - base fotográfica: imágenes de seguimiento y certificaciones
- Se ha añadido un calendario de obra con hitos y tareas fechadas.
- Se ha añadido una ficha de `Dirección` con ubicación e indicaciones de acceso.
- Se ha adaptado la interfaz para móvil y tablet con diseño responsive.
- Se ha añadido migración automática desde la estructura anterior para no perder datos ya guardados en el navegador.

## Estructura del proyecto

- [index.html](C:/Users/JoseJuanSaGa/.codex/worktrees/9408/Construccion/index.html) redirige a la aplicación.
- [obra.html](C:/Users/JoseJuanSaGa/.codex/worktrees/9408/Construccion/obra.html) contiene la estructura HTML principal.
- [src/css/app.css](C:/Users/JoseJuanSaGa/.codex/worktrees/9408/Construccion/src/css/app.css) contiene los estilos.
- [src/js/app.js](C:/Users/JoseJuanSaGa/.codex/worktrees/9408/Construccion/src/js/app.js) contiene la lógica de la app.
- [data/README.md](C:/Users/JoseJuanSaGa/.codex/worktrees/9408/Construccion/data/README.md) documenta la estructura prevista por proyecto.
- [docs/V2-ROADMAP.md](C:/Users/JoseJuanSaGa/.codex/worktrees/9408/Construccion/docs/V2-ROADMAP.md) resume la base de la segunda versiÃ³n.

## Cómo se guarda ahora

Cada obra genera un identificador propio y queda separada internamente con este criterio:

- `obra_index_v2`
- `obra_project_<proyecto>_core_v2`
- `obra_project_<proyecto>_docs_v2`
- `obra_project_<proyecto>_photos_v2`

Esto hace que documentos y fotos no se mezclen entre obras.

## Copias de seguridad

Para evitar perder todos los proyectos otra vez, la app ahora tiene 3 medidas:

- `Exportar copia`: descarga un `.json` con todos los proyectos y sus datos.
- `Importar copia`: recupera una copia exportada anteriormente.
- `Restaurar`: intenta recuperar la última copia local de emergencia del navegador.

Recomendación práctica:

- antes de cambios grandes, pulsa `Exportar copia`
- guarda ese `.json` fuera del navegador
- si un día falla algo, usa `Importar copia` o `Restaurar`

## Acceso inicial

Usuario inicial:

- usuario: `administrador`
- contraseña: `admin1234`

Al entrar, conviene cambiar esa clave desde `Administración`.

## Carpeta de datos real

La app ya puede trabajar con una carpeta real de datos usando navegadores compatibles como Chrome o Edge.

Desde la pantalla de proyectos:

- `Conectar carpeta`: eliges una carpeta donde guardar la base de datos de la app
- `Guardar carpeta`: fuerza un guardado manual
- `Recargar carpeta`: vuelve a leer los datos desde esa carpeta

Cuando la carpeta está conectada, la app sigue guardando en el navegador como apoyo, pero además escribe archivos reales por proyecto.

Estructura:

- `index.json`
- `proyectos/<proyecto>/core.json`
- `proyectos/<proyecto>/docs.json`
- `proyectos/<proyecto>/photos.json`

Esto permite que tus obras no dependan solo de `localStorage`.

## Docker

La app ya queda preparada para ejecutarse con Docker y un volumen de datos.

Archivos añadidos:

- [Dockerfile](C:/Users/JoseJuanSaGa/.codex/worktrees/9408/Construccion/Dockerfile)
- [docker-compose.yml](C:/Users/JoseJuanSaGa/.codex/worktrees/9408/Construccion/docker-compose.yml)
- [nginx/default.conf](C:/Users/JoseJuanSaGa/.codex/worktrees/9408/Construccion/nginx/default.conf)
- [runtime-data/README.md](C:/Users/JoseJuanSaGa/.codex/worktrees/9408/Construccion/runtime-data/README.md)

### Arranque

```bash
docker compose up --build
```

La app quedará en:

- [http://localhost:8080](http://localhost:8080)

### Cómo usar los datos con Docker

Con la arquitectura actual, Docker sirve la app y deja preparada la carpeta `runtime-data/`, pero el guardado sigue haciéndose desde el navegador con `Conectar carpeta`.

Flujo recomendado:

1. arranca Docker
2. abre `http://localhost:8080`
3. pulsa `Conectar carpeta`
4. selecciona la carpeta `runtime-data/` del proyecto

Así tendrás una URL local estable y una carpeta de datos preparada para el siguiente salto profesional.

## Calendario de obra

- Puedes asignar fecha de inicio y fin previsto dentro de cada tarea.
- Puedes crear hitos manuales desde la pestaña `Calendario`.
- El calendario mensual mezcla hitos y tareas para ver la planificación de la obra.

## Oficios

- Cada oficio puede tener su propio inicio previsto, fin previsto y duración estimada.
- También tiene un campo de `Configuración de tiempos` para anotar orden, dependencias o condiciones de ejecución.
- Cada oficio puede tener su propia documentación: presupuestos, PDFs, consultas o fichas técnicas.

## Documentación

- Puedes añadir documentos con el botón de subida.
- También puedes arrastrar uno o varios archivos directamente dentro de cada categoría.

## Estado técnico

- La app ya no depende de un único `obra.html` gigante para CSS y JS.
- Se ha limpiado la parte más conflictiva de funciones duplicadas para reducir errores al arrancar.
- La portada del proyecto incluye ahora avisos de tareas retrasadas.

## Navegacion actual

- `Panel de control`: usuarios, backup, importar, exportar, restaurar y personalizacion.
- `Obras`: solo para crear, editar y abrir proyectos.
- `Empresas`: directorio global compartido por todas las obras.

## Empresas

- Cada empresa guarda direccion fiscal, CIF/NIF y datos generales.
- Cada empresa puede tener varias personas de contacto: gerencia, administracion y trabajadores, con cargo, telefono, WhatsApp y email.
- Cada empresa muestra historial de trabajos realizados y notas enviadas con su estado.
