# Galactic Tournament UI

Frontend del torneo galactico construido con Angular 21. La aplicacion permite registrar especies, ejecutar combates, consultar el ranking global y cambiar el idioma entre español e ingles.

## Que hace la app

- Registra nuevas especies con nombre, nivel de poder y habilidad especial.
- Muestra el listado completo de especies registradas.
- Permite iniciar combates manuales o aleatorios.
- Presenta el ranking ordenado por victorias.
- Mantiene la UI sincronizada con el estado del backend usando un flujo reactivo.

## Stack principal

- Angular 21 con componentes standalone
- RxJS para manejo de flujos y estado compartido
- Angular Signals para reflejar cambios en pantalla inmediatamente
- Bootstrap 5 para estilos base
- `@ngx-translate/core` para internacionalizacion
- Vitest para pruebas unitarias
- Compodoc para documentacion tecnica

## Requisitos

- Node.js en una version par/LTS
- npm
- Backend disponible en local en `http://localhost:8080/api/species`

En produccion, la app usa:

- `https://galactic-repository-api.onrender.com/api/species`

## Instalacion y ejecucion local

```bash
npm install
npm start
```

Despues abre:

```text
http://localhost:4200/
```

## Scripts utiles

```bash
npm start
npm run build
npm test -- --watch=false
npm run docs
```

## Flujo de sincronizacion de datos

El frontend no consume WebSocket directamente en este repositorio. La sincronizacion actual funciona asi:

1. `SpeciesService` mantiene dos flujos reactivos internos:
   - `species$`
   - `ranking$`
2. Al iniciar la app, el servicio ejecuta `refreshAll()` para cargar especies y ranking.
3. Cuando se registra una especie o termina un combate, el servicio vuelve a consultar la API.
4. Los componentes consumen esos flujos con `toSignal(...)`, por lo que Angular vuelve a renderizar la vista apenas llegan nuevos datos.

Esto evita que la pantalla dependa de una interaccion del usuario para refrescarse.

## Endpoints esperados por el frontend

```text
GET    /api/species
GET    /api/species/ranking
POST   /api/species
POST   /api/species/battle?id1={id1}&id2={id2}
POST   /api/species/battle/randomBattle
```

## Estructura principal

```text
src/
  app/
    components/
      species-form/
      species-list/
      species-combat/
      tournament-ranking/
    services/
      species.service.ts
    models/
      species.model.ts
  environments/
    environment.ts
    environment.prod.ts
```

## Componentes clave

### `SpeciesForm`

Formulario para crear nuevas especies. Maneja validaciones y estado de carga.

### `SpeciesList`

Renderiza el listado completo de especies usando estado reactivo.

### `SpeciesCombat`

Permite elegir dos especies para pelear o lanzar un combate aleatorio. Tambien muestra al ganador mas reciente.

### `TournamentRanking`

Presenta la tabla de posiciones ordenada por victorias.

### `SpeciesService`

Centraliza las llamadas HTTP y la sincronizacion global de `species$` y `ranking$`.

## Internacionalizacion

La app carga textos desde:

```text
public/assets/i18n/es.json
public/assets/i18n/en.json
```

El idioma por defecto es `es`.

## Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm test -- --watch=false
```

La suite actual cubre:

- creacion de componentes
- carga reactiva de especies y ranking
- comportamiento base del servicio HTTP

## Documentacion tecnica

Para regenerar la documentacion de Compodoc:

```bash
npm run docs
```

Los archivos generados quedan en:

```text
documentation/
```

## Notas

- Si el backend cambia de host o puerto en desarrollo, actualiza `src/environments/environment.ts`.
- Si en el futuro integras WebSocket o SSE, el punto recomendado para enchufarlo es `SpeciesService`, publicando los nuevos datos a `species$` y `ranking$`.
