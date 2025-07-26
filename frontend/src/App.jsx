import React from 'react';
import './App.css';
import Chat from './components/Chat';

function App() {
  const openForm = () => {
    window.open('https://forms.gle/UMeJsyRY8hi2v8MJ7', '_blank');
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1>KARSA PROJECT</h1>
      </header>

      {/* Section 1: INtro */}
      <section className="intro-section">
        <h2 className="intro-title">Apa itu Karsa?</h2>
        <p className="intro-text">Karsa adalah sebuah proyek ide inovasi dalam pengembangan kompetensi ASN berbasis AI. pada proyek ini, kami membuat sebuah chatbot yang berfungsi sebagai asisten ASN. <span/> Kami juga membuat sebuah assesment yang terintegrasi dengan gemini untuk memberikan rekomendasi materi yang cocok sesuai dengan preferensi belajar peserta. </p>
      </section>

      {/* Section 2: Chatbot */}
      <section className="chat-section">
        <h2>Chatbot Asisten Belajar</h2>
        <Chat />
      </section>

      {/* Section 3: Assessment Button */}
      <section className="cta-section">
        <h2>Siap Memulai Jalur Belajar?</h2>
        <p>Klik tombol di bawah untuk mengisi asesmen awal Anda.</p>
        <button className="cta-button" onClick={openForm}>
          Mulai Asesmen
        </button>
      </section>

      <footer className="footer">
        © 2025 KARSA PROJECT
      </footer>
    </div>
  );
}

export default App;