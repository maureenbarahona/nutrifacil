# ==========================================================================
# Dockerfile optimizado para Google Cloud Run (Nginx Alpine)
# Escucha dinámicamente en la variable de entorno $PORT (por defecto 8080)
# ==========================================================================
FROM nginx:1.27-alpine

# Puerto por defecto requerido por Google Cloud Run
ENV PORT=8080

# Eliminar configuración por defecto de Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf /usr/share/nginx/html/*

# Copiar plantilla de configuración que procesa ${PORT} automáticamente al iniciar
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Copiar archivos estáticos del sitio web
COPY index.html /usr/share/nginx/html/
COPY manifest.webmanifest /usr/share/nginx/html/
COPY robots.txt /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/

# Ajustar permisos para ejecución limpia
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
