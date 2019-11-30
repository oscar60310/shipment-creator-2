import { app } from './apollo-server';

const port = process.env.PORT || 3000;
app.listen({ port }, () => {
  console.log('lll');
});
