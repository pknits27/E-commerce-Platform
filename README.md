# Full-Stack E-Commerce Platform

A portfolio-ready e-commerce application built with:

- Django
- Django REST Framework
- PostgreSQL
- JWT Authentication
- React + Vite
- Tailwind CSS
- Axios
- React Context API

## Features

- User registration and JWT login
- Product/category catalog
- Product images through Django media
- Shopping cart
- Cart quantity updates/removal
- Checkout and order creation
- Order history
- Protected frontend routes
- Django Admin
- PostgreSQL-ready configuration
- CORS configuration
- Environment variables

## Project structure

```text
ecommerce-platform/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── config/
│   ├── accounts/
│   ├── products/
│   ├── cart/
│   ├── orders/
│   └── media/
└── frontend/
    ├── package.json
    ├── .env.example
    ├── index.html
    └── src/
```

## 1. PostgreSQL

Create a PostgreSQL database:

```sql
CREATE DATABASE ecommerce_db;
```

Create `backend/.env` from `.env.example`.

Example:

```env
SECRET_KEY=change-me
DEBUG=True
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
FRONTEND_URL=http://localhost:5173
```

## 2. Backend

```bash
cd backend

python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend API: http://127.0.0.1:8000/

Admin: http://127.0.0.1:8000/admin/

## 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173/

Create `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_MEDIA_URL=http://127.0.0.1:8000
```

## Main API endpoints

### Authentication

- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/token/refresh/`

### Products

- `GET /api/products/`
- `GET /api/products/<id>/`
- `GET /api/categories/`

### Cart

- `GET /api/cart/`
- `POST /api/cart/items/`
- `PATCH /api/cart/items/<id>/`
- `DELETE /api/cart/items/<id>/`

### Orders

- `POST /api/orders/`
- `GET /api/orders/`

## GitHub

Do not commit `.env`, virtual environments, `node_modules`, or generated media.

```bash
git init
git add .
git commit -m "Initial full-stack ecommerce platform"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Production notes

For production, use a managed PostgreSQL database, HTTPS, secure cookies/token strategy, restricted CORS origins, proper static/media storage, and a production WSGI/ASGI server.
