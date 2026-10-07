import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BookIntro from './components/book/BookIntro';
import ChapterPage from './pages/ChapterPage';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Interests from './components/Interests';
import Contact from './components/Contact';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookIntro />} />
        <Route path="/hello" element={<ChapterPage><Hero /></ChapterPage>} />
        <Route path="/about-me" element={<ChapterPage><About /></ChapterPage>} />
        <Route path="/projects" element={<ChapterPage><Projects /></ChapterPage>} />
        <Route path="/skills" element={<ChapterPage><Skills /></ChapterPage>} />
        <Route path="/interests" element={<ChapterPage><Interests /></ChapterPage>} />
        <Route path="/contact" element={<ChapterPage><Contact /></ChapterPage>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
