# AK Consulting Group

## Collaborators
- Kelley Castillo — GitHub: kacastillo
- Kate Nguyen — GitHub: meomeodestroyer
- Adam Kurfurst — GitHub: akurfurst

**AK Office Supplies Retailer**\
Web Frameworks Capstone Project

---

## Project Overview

AK Office Supplies is a professional e-commerce application focused on supplying businesses, education, and industrial companies with high-quality office supplies. The purpose of this project is to demonstrate full-stack web application architecture using:

- Server-Side Rendering (SSR)
- Express.js
- MVC architecture
- MySQL database integration
- REST-style API endpoints
- Secure session-based state management

This project serves as a portfolio-ready example of structured, maintainable web application development.

---

## Architecture (MVC)

Every request flows through a clean, layered MVC structure. No SQL lives in routes, and no database calls live in views.

```
Route  →  Controller  →  Service  →  Data access (Model)  →  MySQL
src/routers/   src/controllers/   src/services/   src/model/
```

- **Routers** map URLs to controller functions.
- **Controllers** handle the request/response and choose a view or JSON payload.
- **Services** hold application logic (filtering, featured selection).
- **Model / data access** owns all SQL via a `mysql2` connection pool.

---

## Database Diagram

![Database Diagram](AK-Office_Supplies/public/images/db_diagram.png)

---

## Routes (SSR)

| Method | Path            | Description                                                     |
|--------|-----------------|-----------------------------------------------------------------|
| GET    | `/`             | Landing page with featured products                             |
| GET    | `/login`        | Login page                                                      |
| GET    | `/register`     | Registration page                                               |
| GET    | `/products`     | Renders the full product catalog from the database              |
| GET    | `/products/:id` | Renders a single product by id; shows a 404 page for unknown ids|
| GET    | `/success`      | Success confirmation page                                       |
| *all*  | *(unmatched)*   | Falls through to a 404 page                                     |

The catalog renders server-side on first load, then supports client-side filtering via the REST API below.

---

## REST API

| Method | Path            | Returns              |
|--------|-----------------|----------------------|
| GET    | `/api/products` | Product list as JSON |

**Supported query parameters**

| Parameter  | Description                            | Example                          |
|------------|----------------------------------------|----------------------------------|
| `category` | Filter products by category            | `/api/products?category=Writing Supplies` |
| `search`   | Match against the product name         | `/api/products?search=pen`       |

Parameters can be combined: `/api/products?category=Paper Products&search=paper`.

Filtering is applied in the service / data-access layer using parameterized SQL — never in the route. Behavior:

- Returns `200` with a JSON array of matching products.
- An empty result set returns `200` with an empty array `[]`.
- Invalid requests return an appropriate error status.

---

## Filtering (SSR + REST hybrid)

The `/products` page renders its initial product grid via server-side rendering. After load, the filter controls call `/api/products` with the query parameters above using `fetch()`, and the product grid is re-rendered client-side from the returned JSON — no full page reload. This keeps initial render fast and SEO-friendly while making filtering responsive.

---
