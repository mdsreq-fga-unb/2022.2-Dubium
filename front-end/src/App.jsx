import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Forum from "./pages/Forum";
import About from "./pages/About";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormularioPergunta from "./pages/Forum/FormularioPergunta";
import ForumBody from "./pages/Forum/ForumBody";

function App() {
  return (
    <div className="body-app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Forum />} />
          <Route path="/formulario-pergunta" element={<FormularioPergunta />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/inicio" element={<ForumBody indexSideBar={0} />} />
          <Route path="/engenharias" element={<ForumBody indexSideBar={1} />} />
          <Route
            path="/aeroespacial"
            element={<ForumBody indexSideBar={2} />}
          />
          <Route path="/automotiva" element={<ForumBody indexSideBar={3} />} />
          <Route path="/eletronica" element={<ForumBody indexSideBar={4} />} />
          <Route path="/energia" element={<ForumBody indexSideBar={5} />} />
          <Route path="/software" element={<ForumBody indexSideBar={6} />} /> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
