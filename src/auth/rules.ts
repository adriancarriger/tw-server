import { rule } from 'graphql-shield';

export const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  return ctx.user !== null;
});

export const isAdmin = rule()(async (parent, args, ctx, info) => {
  return ctx.user.role === 'admin';
});

export const isEditor = rule()(async (parent, args, ctx, info) => {
  return ctx.user.role === 'editor';
});
