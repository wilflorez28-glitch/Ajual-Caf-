# Ajualá Café Bar — sitio web

Sitio estático (HTML + CSS + JavaScript vanilla). **Sin build, sin npm.** Listo para subir a Hostinger por arrastrar y soltar.

## Subir a Hostinger (o cualquier hosting estático)
1. Entra al **Administrador de archivos** de Hostinger (o por FTP).
2. Sube **todo el contenido de esta carpeta** dentro de `public_html/` (incluyendo el archivo oculto `.htaccess`).
3. Abre tu dominio. Listo.

> El `.htaccess` ya está configurado para que el navegador no muestre versiones viejas del sitio tras cada actualización. Si cambias `styles.css` o `main.js`, sube también el `index.html` con el número `?v=` actualizado (cambia la fecha).

## Antes de publicar — REEMPLAZA estos placeholders
Busca la palabra `REEMPLAZAR` en `index.html`. Encontrarás:

- **Número de WhatsApp** (aparece varias veces): cambia `573000000000` por el número real con código de país (ej. `573001234567`). Está en: botón "Escríbenos", botón flotante verde, sección Ubicación y footer.
- **Dirección real** en la sección Ubicación.
- **Mapa de Google**: en la sección Ubicación, reemplaza el `src` del `<iframe>`.
  En Google Maps → busca tu local → **Compartir → Insertar un mapa** → copia el `src`.
- **Horario**: ajústalo si difiere del propuesto.

## Reemplazar las fotos por las reales
Todas las imágenes están en `assets/img/`. En el HTML, cada foto lleva un comentario
`<!-- FOTO: ... -->` indicando qué imagen real va en cada lugar. Para cambiarlas,
sustituye el archivo manteniendo **el mismo nombre** (o actualiza la ruta en el HTML).

Recomendado: fotos en horizontal para el menú/galería, y una vertical (4:5) para "Sobre nosotros".

## El video de portada
- Archivo: `assets/video/experiencia.mp4`.
- Es la **portada**: se reproduce solo, en **bucle** y **silenciado** (sin sonido), detrás
  del nombre y la frase.
- Si el visitante tiene activado *"reducir movimiento"* en su sistema, se muestra estático
  (el primer fotograma) en lugar de reproducirse.
- La foto `assets/img/portada.jpg` (tu imagen "Portada") va en la sección **"La experiencia"**,
  justo después del video.

## Tipografías y colores
- Tipografías: Playfair Display (títulos) + Nunito Sans (textos), vía Google Fonts.
- Paleta de marca aplicada con los hex exactos del manual.

---
Las fotos actuales son **placeholders** de Openverse (licencias Creative Commons / dominio público).
Ver `assets/img/credits.json`. Reemplázalas por las fotos reales de Ajualá antes de publicar.
