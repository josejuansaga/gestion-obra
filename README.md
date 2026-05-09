# Gestor de Obra

Aplicación local en HTML para organizar una obra por proyectos, estancias, oficios, tareas, documentación y fotos.

## Qué se ha hecho

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
- [obra.html](C:/Users/JoseJuanSaGa/.codex/worktrees/9408/Construccion/obra.html) contiene la app completa.
- [data/README.md](C:/Users/JoseJuanSaGa/.codex/worktrees/9408/Construccion/data/README.md) documenta la estructura prevista por proyecto.

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

## Calendario de obra

- Puedes asignar fecha de inicio y fin previsto dentro de cada tarea.
- Puedes crear hitos manuales desde la pestaña `Calendario`.
- El calendario mensual mezcla hitos y tareas para ver la planificación de la obra.

## Oficios

- Cada oficio puede tener su propio inicio previsto, fin previsto y duración estimada.
- También tiene un campo de `Configuración de tiempos` para anotar orden, dependencias o condiciones de ejecución.

## Documentación

- Puedes añadir documentos con el botón de subida.
- También puedes arrastrar uno o varios archivos directamente dentro de cada categoría.

## Siguiente paso recomendado

Si quieres dar otro salto de calidad, lo siguiente sería sacar el JavaScript y el CSS de `obra.html` a carpetas separadas:

- `src/js/`
- `src/css/`
- `data/proyectos/`

Así será más fácil mantener la app cuando empiece a crecer.
