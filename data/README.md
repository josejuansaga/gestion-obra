# Estructura de datos

Esta carpeta deja preparada la estructura objetivo del gestor de obra.

## Estructura prevista

```text
data/
  proyectos/
    <proyecto>/
      db/
      documentos/
      fotos/
      exportaciones/
```

## Estado actual

La app ya puede trabajar con una carpeta real elegida por el usuario desde el navegador.

Estructura real de guardado:

```text
<carpeta elegida>/
  index.json
  proyectos/
    <proyecto>/
      core.json
      docs.json
      photos.json
```

`localStorage` sigue existiendo como apoyo y copia rápida de trabajo, pero la carpeta conectada es la base robusta para no depender solo del navegador.
