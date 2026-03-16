import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";
import Events from "./pages/Events.jsx";
import Registrations from "./pages/Registrations.jsx";
import Revenue from "./pages/Revenue.jsx";

import EventsPage from "./pages/EventsPage.jsx";
import EventRegisterPage from "./pages/EventRegisterPage.jsx";
import RegistrationStatusPage from "./pages/RegistrationStatusPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistrationSuccessPage from "./pages/RegistrationSuccessPage";
import RegisterPage from "./pages/RegisterPage.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route path="/" element={<Index />} />

        {/* Existing Dashboard Pages */}
        <Route path="/events-dashboard" element={<Events />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/registrations" element={<Registrations />} />
        <Route path="/revenue" element={<Revenue />} />

        {/* New Event Portal Pages */}
        <Route path="/events" element={<EventsPage />} />
        <Route path="/register/:id" element={<EventRegisterPage />} />
        <Route path="/registration-status" element={<RegistrationStatusPage />} />
        <Route path="/registration-success/:id" element={<RegistrationSuccessPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;