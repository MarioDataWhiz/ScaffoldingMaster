
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MemberManagement from './components/MemberManagement';
import Home from './components/Home'; 

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/member-management" element={<MemberManagement />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;