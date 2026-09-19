import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import ClientsPage from './pages/ClientsPage';
import TeamPage from './pages/TeamPage';
import LibraryPage from './pages/LibraryPage';
import CareerPage from './pages/CareerPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import StatutoryCommandWidget from './components/StatutoryCommandWidget';

function AppContent({ firmInfo, services, portfolio, clients, team, libraryResources, vacancies }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/cms');

  useEffect(() => {
    // Secret hotkey for administrators: Ctrl + Shift + A or Ctrl + Alt + A
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.ctrlKey && e.altKey && (e.key === 'A' || e.key === 'a'))
      ) {
        e.preventDefault();
        window.location.href = '/admin';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-500 selection:text-white">
      {/* Hide public Navbar on CMS Admin routes */}
      {!isAdminRoute && <Navbar />}

      {/* Dynamic Route Pages */}
      <main className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                firmInfo={firmInfo}
                services={services}
                portfolio={portfolio}
                clients={clients}
                team={team}
                libraryResources={libraryResources}
              />
            } 
          />
          
          <Route 
            path="/about" 
            element={<AboutPage firmInfo={firmInfo} />} 
          />
          
          <Route 
            path="/services" 
            element={<ServicesPage services={services} />} 
          />
          
          <Route 
            path="/services/:serviceId" 
            element={<ServiceDetailPage services={services} />} 
          />
          
          <Route 
            path="/portfolio" 
            element={<PortfolioPage portfolio={portfolio} />} 
          />
          
          <Route 
            path="/clients" 
            element={<ClientsPage clients={clients} />} 
          />
          
          <Route 
            path="/team" 
            element={<TeamPage team={team} />} 
          />
          
          <Route 
            path="/library" 
            element={<LibraryPage resources={libraryResources} />} 
          />
          
          <Route 
            path="/career" 
            element={<CareerPage vacancies={vacancies} />} 
          />
          
          <Route 
            path="/contact" 
            element={<ContactPage />} 
          />

          {/* Hidden CMS Management Console */}
          <Route 
            path="/admin" 
            element={<AdminPage />} 
          />
          <Route 
            path="/cms" 
            element={<Navigate to="/admin" replace />} 
          />

          <Route 
            path="*" 
            element={<NotFoundPage />} 
          />
        </Routes>
      </main>
      {/* Global Interactive Statutory Compliance Desk */}
      {!isAdminRoute && <StatutoryCommandWidget />}

      {/* Hide public Footer on CMS Admin routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  // Global API states
  const [firmInfo, setFirmInfo] = useState(null);
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [clients, setClients] = useState([]);
  const [team, setTeam] = useState([]);
  const [libraryResources, setLibraryResources] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [
          firmRes, 
          servicesRes, 
          portfolioRes, 
          clientsRes, 
          teamRes, 
          libraryRes, 
          vacanciesRes
        ] = await Promise.all([
          fetch('/api/firm'),
          fetch('/api/services'),
          fetch('/api/portfolio'),
          fetch('/api/clients'),
          fetch('/api/team'),
          fetch('/api/library'),
          fetch('/api/vacancies')
        ]);

        const [
          firmData, 
          servicesData, 
          portfolioData, 
          clientsData, 
          teamData, 
          libraryData, 
          vacanciesData
        ] = await Promise.all([
          firmRes.json(),
          servicesRes.json(),
          portfolioRes.json(),
          clientsRes.json(),
          teamRes.json(),
          libraryRes.json(),
          vacanciesRes.json()
        ]);

        if (firmData.success) setFirmInfo(firmData.data);
        if (servicesData.success) setServices(servicesData.data);
        if (portfolioData.success) setPortfolio(portfolioData.data);
        if (clientsData.success) setClients(clientsData.data);
        if (teamData.success) setTeam(teamData.data);
        if (libraryData.success) setLibraryResources(libraryData.data);
        if (vacanciesData.success) setVacancies(vacanciesData.data);
      } catch (err) {
        console.error('Error fetching global data from API:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AppContent
        firmInfo={firmInfo}
        services={services}
        portfolio={portfolio}
        clients={clients}
        team={team}
        libraryResources={libraryResources}
        vacancies={vacancies}
      />
    </Router>
  );
}
