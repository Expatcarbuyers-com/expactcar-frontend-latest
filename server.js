const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Google tag (gtag.js) — injected here as a raw string, not via React/JSX.
// React's server renderer always quotes boolean attributes (async="") and
// Next.js always interleaves its own framework <script> tags inside <head>,
// so it's impossible to produce a byte-exact match of Google's snippet from
// inside the app. Splicing it in here, after Next has already rendered the
// page, is the only way to get the literal tag the client asked for.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GA_SNIPPET = GA_ID
  ? `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_ID}');
</script>`
  : null;

function injectGaTag(req, res, next) {
  if (!GA_SNIPPET) return next();

  const chunks = [];
  const originalWrite = res.write.bind(res);
  const originalEnd = res.end.bind(res);
  let passthrough = false;

  res.write = (chunk, ...args) => {
    if (passthrough) return originalWrite(chunk, ...args);
    if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    return true;
  };

  res.end = (chunk, ...args) => {
    if (passthrough) return originalEnd(chunk, ...args);
    if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));

    const contentType = res.getHeader('content-type');
    const isHtml = typeof contentType === 'string' && contentType.includes('text/html');
    let body = Buffer.concat(chunks);

    if (isHtml) {
      const html = body.toString('utf8');
      if (html.includes('<head>') && !html.includes('googletagmanager.com/gtag/js')) {
        body = Buffer.from(html.replace('<head>', `<head>${GA_SNIPPET}`), 'utf8');
        if (res.getHeader('content-length')) {
          res.setHeader('content-length', Buffer.byteLength(body));
        }
      }
    }

    passthrough = true;
    return originalEnd(body);
  };

  next();
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await new Promise((resolve) => injectGaTag(req, res, resolve));
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
