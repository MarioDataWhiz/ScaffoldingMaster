
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home'; 
import EnrollmentForm from './pages/EnrollmentForm'; 
import NewMember from './pages/NewMember';
import CourseMan from './pages/CourseMan'; // Import the NewMember page 
import CustomerMemberManagement from './pages/CustomerMemberManagement';
import { UserProvider } from './context/UserContext'; // I
import AiInsightsPage from './pages/AiInsights'; // Import the AI insights page

const App = () => {
  return (
    <UserProvider>
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/customer-management" element={<CustomerMemberManagement />} />
            <Route path="/courseman" element={<CourseMan />} />
            <Route path="/new-member" element={<NewMember />} />
            <Route path="/form" element={<EnrollmentForm />} />
            <Route path="/courses" element={<CoursesPage />} />

            <Route path="/ai-insights" element={<AiInsightsPage />} />
          </Routes>
        </main> 
        <Footer />
      </div>
    </Router>
    </UserProvider>
  );
};

export default App;