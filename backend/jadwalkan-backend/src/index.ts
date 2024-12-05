import { Hono } from 'hono'
import AdminRoutes from './routes/admin-routes';
import UserRoutes from './routes/user-routes';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.route('/admin', AdminRoutes);
app.route('/user', UserRoutes);

export default app
