import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PersonalPage from './pages/PersonalPage';
import MyListingsPage from './pages/MyListingsPage';
import AddListingsPage from './pages/AddListingPage';
import HousePage from './pages/HousePage';
import SearchResultsPage from './pages/SearchResultsPage';
import AboutUs from './pages/AboutUs';
import FeedbackForm from './pages/FeedbackForm';
import PrivateRoute from './utils/PrivateRoute';
import ViewTracker from './utils/ViewTracker';

function App() {
  return (
    <BrowserRouter>
      <ViewTracker />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/house/:id" element={<HousePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/feedback" element={<FeedbackForm />} />

            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<PersonalPage />} />
              <Route path="/listings" element={<MyListingsPage />} />
              <Route path="/add-listing" element={<AddListingsPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;