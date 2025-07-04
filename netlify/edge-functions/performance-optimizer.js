// Netlify Edge Function for Performance Optimization
// This runs at the edge, close to users, for maximum speed

export default async (request, context) => {
  const url = new URL(request.url);
  
  // 1. Serve language-specific content based on location
  const country = context.geo?.country?.code || 'US';
  const languageMap = {
    'BG': 'bg',
    'RU': 'ru',
    'ES': 'es',
    'IL': 'he',
    'CN': 'zh',
    'US': 'en',
    'GB': 'en'
  };
  
  // Set preferred language based on country
  const preferredLang = languageMap[country] || 'en';
  
  // 2. Image optimization based on device
  if (url.pathname.match(/\.(jpg|jpeg|png)$/i)) {
    const accept = request.headers.get('accept') || '';
    const saveData = request.headers.get('save-data') === 'on';
    const connection = request.headers.get('connection') || '';
    
    // Determine quality based on connection
    let quality = 85;
    if (saveData || connection.includes('2g')) {
      quality = 60;
    } else if (connection.includes('3g')) {
      quality = 70;
    }
    
    // Add image transformation parameters
    const imageUrl = new URL(request.url);
    imageUrl.searchParams.set('q', quality);
    
    // Serve WebP if supported
    if (accept.includes('image/webp')) {
      imageUrl.searchParams.set('fm', 'webp');
    }
    
    return Response.redirect(imageUrl.toString(), 302);
  }
  
  // 3. Add performance headers to HTML responses
  const response = await context.next();
  
  if (response.headers.get('content-type')?.includes('text/html')) {
    const newHeaders = new Headers(response.headers);
    
    // Add language hint
    newHeaders.set('Content-Language', preferredLang);
    
    // Add performance hints
    newHeaders.set('X-Preferred-Language', preferredLang);
    
    // Add server timing
    const processingTime = Date.now() - request.time;
    newHeaders.set('Server-Timing', `edge;dur=${processingTime}`);
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
  
  return response;
};

export const config = {
  path: "/*"
};