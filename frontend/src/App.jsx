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
import UserDashboard from "./pages/UserDashboard.jsx";

import UserPreviousRegistrations from "./pages/UserPreviousRegistrations.jsx";
import PublicHome from "./public-events/pages/PublicHome.jsx";
import VerifyCaptchaPage from "./public-events/pages/VerifyCaptchaPage.jsx";
import GlobalEventRegister from "./public-events/pages/GlobalEventRegister.jsx";
import RegistrationSuccess from "./public-events/pages/RegistrationSuccess.jsx";
import StatusCheck from "./public-events/pages/StatusCheck.jsx";
import RazorPayPage from "./pages/RazorPayPage.jsx";

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

        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-previous-registrations" element={<UserPreviousRegistrations/>}/>

        {/* Global Public Events section routes */}
        <Route path="/global-events" element={<PublicHome/>} />
        <Route path="/global-events/verify-captcha" element={<VerifyCaptchaPage/>}/>
        <Route path="/global-events/event-registration" element={<GlobalEventRegister/>}/>
        <Route path="/global-events/registration-success/:id" element={<RegistrationSuccess/>}/>
        <Route path="/global-events/status-check" element={<StatusCheck/>}/>
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="/razorpay/payment" element={<RazorPayPage/>} />

      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;