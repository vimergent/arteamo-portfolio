// Netlify Edge Function for Dynamic Image Optimization
// Serves optimized images based on device capabilities

export default async (request, context) => {
  const url = new URL(request.url);
  
  // Only process image requests
  if (!url.pathname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return context.next();
  }
  
  // Get device hints
  const viewport = request.headers.get('viewport-width');
  const dpr = request.headers.get('dpr') || '1';
  const saveData = request.headers.get('save-data') === 'on';
  const accept = request.headers.get('accept') || '';
  
  // Build Cloudinary-style transformation URL
  // (In production, you'd use Netlify's Image CDN or similar)
  const transformations = [];
  
  // 1. Format conversion
  if (accept.includes('image/avif')) {
    transformations.push('f_avif');
  } else if (accept.includes('image/webp')) {
    transformations.push('f_webp');
  }
  
  // 2. Responsive sizing
  if (viewport) {
    const width = Math.min(parseInt(viewport), 2000);
    transformations.push(`w_${width}`);
  }
  
  // 3. Quality adjustment
  if (saveData) {
    transformations.push('q_60');
  } else {
    transformations.push('q_auto:good');
  }
  
  // 4. Device pixel ratio
  if (parseFloat(dpr) > 1) {
    transformations.push(`dpr_${dpr}`);
  }
  
  // Return optimized image URL
  const optimizedUrl = url.pathname + '?' + transformations.join(',');
  
  // Add caching headers
  const headers = new Headers({
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Vary': 'Accept, Viewport-Width, DPR, Save-Data',
    'X-Optimized': 'true'
  });
  
  return new Response(null, {
    status: 302,
    headers: {
      'Location': optimizedUrl,
      ...Object.fromEntries(headers)
    }
  });
};

export const config = {
  path: "/images/*"
};