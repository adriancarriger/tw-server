import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';

process.env.CLIENT_ID = '4pHc0YjDT5imFYpAQp4ILKFmWAGviatA';
const { CLIENT_ID } = process.env;

export const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://adriancarriger.auth0.com/.well-known/jwks.json`
  }),
  audience: CLIENT_ID,
  issuer: `https://adriancarriger.auth0.com/`,
  algorithms: ['RS256']
});
