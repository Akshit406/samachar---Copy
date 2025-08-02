import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => res.send('Bot is alive!'));

app.listen(PORT, () => {
  console.log(`🌐 Keep-alive server running on port ${PORT}`);
});
