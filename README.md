# ReviewPatterns Analytics

## Descripción del Proyecto

ReviewPatterns Analytics es una plataforma profesional de análisis de reseñas de competidores. Descubre insights, puntos de dolor y oportunidades estratégicas a partir del feedback de competidores en múltiples plataformas.

## Características

- **Análisis de Sentimiento**: Análisis avanzado de sentimientos en reseñas de competidores
- **Mapa de Calor de Puntos de Dolor**: Visualización interactiva de problemas identificados
- **Dashboard Analítico**: Panel completo con métricas y KPIs
- **Análisis de Experiencia Móvil**: Insights específicos para aplicaciones móviles
- **Oportunidades de Innovación**: Identificación de áreas de mejora y oportunidades
- **Tabla de Peores Reseñas**: Análisis detallado de feedback negativo

## Tecnologías Utilizadas

Este proyecto está construido con:

- **Vite** - Build tool y dev server
- **TypeScript** - Tipado estático
- **React** - Framework de UI
- **shadcn/ui** - Componentes de UI modernos
- **Tailwind CSS** - Framework de CSS utility-first
- **React Router** - Enrutamiento
- **Recharts** - Gráficos y visualizaciones
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

## Instalación y Desarrollo

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

```sh
# Paso 1: Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# Paso 2: Navegar al directorio del proyecto
cd ReviewPatterns-demo

# Paso 3: Instalar dependencias
npm install

# Paso 4: Iniciar el servidor de desarrollo
npm run dev
```

El servidor de desarrollo se ejecutará en `http://localhost:8080`

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run build:dev` - Construye la aplicación en modo desarrollo
- `npm run lint` - Ejecuta el linter
- `npm run preview` - Previsualiza la build de producción

## Estructura del Proyecto

```
src/
├── components/
│   ├── analytics/     # Componentes específicos de análisis
│   └── ui/           # Componentes de UI reutilizables
├── hooks/            # Custom hooks
├── lib/              # Utilidades y configuraciones
├── pages/            # Páginas de la aplicación
└── main.tsx          # Punto de entrada
```

## Despliegue

Para desplegar la aplicación:

```sh
# Construir para producción
npm run build

# Los archivos de producción estarán en la carpeta dist/
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
