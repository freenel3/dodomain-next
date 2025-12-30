import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Env }>();

app.use("/api/*", cors());

// Known valid routes for 200 status
const validRoutes = [
  '/',
  '/domains',
  '/sell-domain',
  '/blog',
  '/contact',
  '/about'
];

// Check if route is valid (including dynamic routes)
function isValidRoute(pathname: string): boolean {
  // Exact match
  if (validRoutes.includes(pathname)) return true;
  
  // Domain detail pages: /domains/:domain
  if (pathname.startsWith('/domains/') && pathname.split('/').length === 3) return true;
  
  // Blog post pages: /blog/:slug
  if (pathname.startsWith('/blog/') && pathname.split('/').length === 3) return true;
  
  return false;
}

// Get all active domains
app.get("/api/domains", async (c) => {
  try {
    const db = c.env.DB;
    const result = await db.prepare(`
      SELECT 
        name, 
        price, 
        category, 
        extension, 
        description,
        registered_year as registered,
        traffic,
        registration_date as registrationDate,
        first_registration_date as firstRegistrationDate,
        listed_date as listedDate
      FROM domains 
      WHERE is_active = 1
      ORDER BY price DESC
    `).all();
    
    return c.json(result.results || []);
  } catch (error) {
    console.error("Error fetching domains:", error);
    return c.json({ error: "Ошибка загрузки доменов" }, 500);
  }
});

// Get single domain by name
app.get("/api/domains/:name", async (c) => {
  try {
    const name = decodeURIComponent(c.req.param("name"));
    const db = c.env.DB;
    
    const result = await db.prepare(`
      SELECT 
        name, 
        price, 
        category, 
        extension, 
        description,
        registered_year as registered,
        traffic,
        registration_date as registrationDate,
        first_registration_date as firstRegistrationDate,
        listed_date as listedDate
      FROM domains 
      WHERE name = ? AND is_active = 1
    `).bind(name).first();
    
    if (!result) {
      return c.json({ error: "Домен не найден" }, 404);
    }
    
    return c.json(result);
  } catch (error) {
    console.error("Error fetching domain:", error);
    return c.json({ error: "Ошибка загрузки домена" }, 500);
  }
});

// Get all published blog posts
app.get("/api/blog", async (c) => {
  try {
    const db = c.env.DB;
    const result = await db.prepare(`
      SELECT 
        slug,
        title,
        excerpt,
        category,
        read_time as readTime,
        published_date as date
      FROM blog_posts 
      WHERE is_published = 1
      ORDER BY published_date DESC
    `).all();
    
    return c.json(result.results || []);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return c.json({ error: "Ошибка загрузки статей" }, 500);
  }
});

// Get single blog post by slug
app.get("/api/blog/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const db = c.env.DB;
    
    const result = await db.prepare(`
      SELECT 
        slug,
        title,
        excerpt,
        content,
        category,
        read_time as readTime,
        published_date as date
      FROM blog_posts 
      WHERE slug = ? AND is_published = 1
    `).bind(slug).first();
    
    if (!result) {
      return c.json({ error: "Статья не найдена" }, 404);
    }
    
    return c.json(result);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return c.json({ error: "Ошибка загрузки статьи" }, 500);
  }
});

// Contact form endpoint
app.post("/api/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, message, domainName, type } = body;

    // Validate required fields
    if (!name || !email || !domainName) {
      return c.json({ error: "Необходимо заполнить все обязательные поля" }, 400);
    }

    const resendApiKey = c.env.RESEND_API_KEY;
    const adminEmail = c.env.ADMIN_EMAIL;

    if (!resendApiKey || !adminEmail) {
      console.error("Missing RESEND_API_KEY or ADMIN_EMAIL");
      return c.json({ error: "Ошибка конфигурации сервера" }, 500);
    }

    // Prepare email content
    const typeText = type === 'buy' ? 'Покупка домена' : 'Предложение по домену';
    const subject = `${typeText}: ${domainName}`;
    
    const htmlContent = `
      <h2>${typeText}</h2>
      <p><strong>Домен:</strong> ${domainName}</p>
      <hr />
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Телефон:</strong> ${phone}</p>` : ''}
      ${message ? `<p><strong>Сообщение:</strong><br />${message.replace(/\n/g, '<br />')}</p>` : ''}
    `;

    // Send email via Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "dodomain <onboarding@resend.dev>", // Use verified domain in production
        to: [adminEmail],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Resend API error:", errorData);
      return c.json({ error: "Ошибка отправки email" }, 500);
    }

    const result = await response.json();
    console.log("Email sent successfully:", result);

    return c.json({ success: true, message: "Заявка успешно отправлена" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return c.json({ error: "Произошла ошибка при обработке заявки" }, 500);
  }
});

// Handle all other routes - serve React app with appropriate status code
app.get("*", async (c) => {
  const pathname = new URL(c.req.url).pathname;
  
  // Skip API routes and assets (but not robots.txt which is handled separately)
  if (pathname.startsWith('/api/') || pathname.startsWith('/assets/') || (pathname.includes('.') && pathname !== '/robots.txt')) {
    return c.notFound();
  }
  
  // Determine if this is a valid route
  const statusCode = isValidRoute(pathname) ? 200 : 404;
  
  // Return HTML with appropriate status code
  // In production, Cloudflare Pages will handle this
  return c.text('', statusCode);
});

export default app;
