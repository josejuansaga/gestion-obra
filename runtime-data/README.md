# Carpeta de datos de trabajo

Esta carpeta queda preparada para trabajar con Docker y para futuras evoluciones con backend.

## Uso actual

1. Arranca la app con Docker.
2. Abre `http://localhost:8080`.
3. En la pantalla de proyectos, pulsa `Conectar carpeta`.
4. Selecciona esta carpeta `runtime-data`.

La app guardará aquí los archivos JSON de tus proyectos.

## Estructura esperada

```text
runtime-data/
  index.json
  proyectos/
    <proyecto>/
      core.json
      docs.json
      photos.json
```
