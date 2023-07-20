List contacts with authenticate, work with MongoDB and handler with errors.

Models:
- User:
  - name;
  - email;
  - password;
  - subscription;
  - token;
- Contact:
  - name;
  - phone;
  - email;
  - favorite;
  - owner: user;

Route:
- User:
  - POST /api/auth/register Request { email, password, name, subscription } Response { user: { email, subscription };
  - POST /api/auth/login Request {email, password } Response { token, user: { email, subscription }};
  - GET /api/auth/current Authenticate { Token } Request { email, password, name, subscription } Response {};
  - POST /api/auth/logout Authenticate { Token } Request { } Response { email, subscription };
  - PATCH /api/auth/:id/subscription Authenticate { Token } Request { subscription } Response { message };
- Contact:
  - GET /api/contacts Authenticate { Token } Request { page, limit, favorite } Response { listContacts }
  - GET /api/contacts/:id Authenticate { Token } Request { } Response { contact }
  - POST /api/contacts Authenticate { Token } Request { name, email, phone, favorite } Response { data }
  - PUT /api/contacts/:id Authenticate { Token } Request { name, email, phone, favorite } Response { data }
  - DELETE /api/contacts/:id Authenticate { Token } Request { } Response { message }
  - PATCH /api/contacts/:id/favorite Authenticate { Token } Request { favorite } Response { contact }

Links mongodb:
- https://contacts-reader-backend-wbuu.onrender.com/