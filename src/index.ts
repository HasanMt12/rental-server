import 'dotenv/config';
import http from 'http';
import app from './app';
import connectDB from './config/db';

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database Error', error);
  }
})();
