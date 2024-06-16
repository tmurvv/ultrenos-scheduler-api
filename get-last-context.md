2023-11-19

NEXT

- [x] Enhance user schema
- [x] Set up real Mongo Db
- [x] Hash Password
- [x] Get Signup and Login Working with postman
- [x] Add confirm password (happens on FE)
- [x] Get JWT returned on login working (https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs)
- [ ] Start on timesheets - save done

- [ ] Once FE is sending JWT, get Login accepts JWT working (see below for hints)

---
- JWT get secret from .env

---

Automatic login with a JWT typically happens on the frontend:

- When a user logs in, the backend generates a JWT and sends it to the frontend.
- The frontend stores the JWT in localStorage or a cookie.
- On subsequent requests, the frontend automatically sends the JWT in the Authorization header.
- The backend verifies the JWT signature and payload to authenticate the user and allow access.

So in summary:

- Backend generates and sends JWT on login
- Frontend stores and automatically sends JWT on future requests
- Backend verifies JWT to allow access

The frontend handles automatically sending the JWT with requests. The backend verifies the JWT is valid and allows access.
Let me know if you need any clarification or have additional questions! Since I don't have context into your specific application, I've provided a general overview of how JWT login flow works between frontend and backend.

- Some best practices:
- Verify the JWT in a middleware function
- Check the request headers for the token
- Use jwt.verify() to validate the signature and payload
- If invalid, return 401 unauthorized
- If valid, extract user info and pass to next middleware
  This allows reusable JWT authentication logic on any routes. The verification happens before your route handlers, ensuring only valid requests get through.
  Let me know if you need any clarification or have additional questions!

```// Express route handler example

const jwt = require('jsonwebtoken');

app.get('/api/users', verifyJWT, (req, res) => {
  // Handle request here
});

function verifyJWT(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({message: 'No token provided'});
  }

  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(401).json({message: 'Failed to authenticate token'});
    }

    // Add user info to request
    req.userId = decoded.id;
    next();
  });
}
```

--
