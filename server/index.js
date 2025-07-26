import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Ganti dengan API key kamu dari https://makersuite.google.com/app/apikey
const genAI = new GoogleGenerativeAI("AIzaSyDcfXPO0g-klzjpwlY-jxGJD9LQi-kDaIE");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const { message, user } = req.body;

  if (!message || !user || !user.name || !user.preferensi_bahasa || !user.minat) {
    return res.status(400).json({ error: 'Bad Request: input tidak lengkap.' });
  }

  const prompt = `
Kamu adalah chatbot asisten pribadi.
Nama pengguna: ${user.name}
Gaya bahasa: ${user.preferensi_bahasa}
Topik minat: ${user.minat.join(', ')}
Pertanyaan pengguna: ${message}
Balas dengan profesional dan personal.
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // atau "gemini-pro"
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('❌ Terjadi error saat generateContent:', error);
    res.status(500).json({ error: 'Gagal memproses permintaan ke Gemini API.' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Gemini berjalan di port ${PORT}`);
});
