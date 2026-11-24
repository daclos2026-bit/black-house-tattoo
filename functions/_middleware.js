// functions/_middleware.js
// Protege toda la web con usuario y contraseña mientras sea una demo.
// Para hacerla pública: borra este archivo y haz push.
export async function onRequest({ request, env, next }) {
  const auth = request.headers.get('Authorization') || '';
  const [scheme, encoded] = auth.split(' ');

  if (scheme === 'Basic' && encoded) {
    // El navegador manda usuario:contraseña en UTF-8. atob() solo da bytes sueltos,
    // así que se decodifican como UTF-8 para que funcionen la ñ, la ç y los acentos.
    const bytes = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes);
    const sep = decoded.indexOf(':');
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);
    // trim(): por si al pegar el valor en Cloudflare se coló un espacio o un salto de línea
    if (user === (env.DEMO_USER || '').trim() && pass === (env.DEMO_PASS || '').trim()) {
      return next(); // credenciales correctas: muestra la web
    }
  }

  return new Response('Acceso restringido', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Demo", charset="UTF-8"' },
  });
}