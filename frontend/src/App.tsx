import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import ConsultationChat from "./pages/ConsultationChat";
import PRDPage from "./pages/PRDPage";
<<<<<<< Updated upstream
import Dashboard from "./pages/Dashboard";
=======
import DashboardPage from "./pages/DashboardPage";
>>>>>>> Stashed changes

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/consult" element={<ConsultationChat />} />
          <Route path="/prd" element={<PRDPage />} />
<<<<<<< Updated upstream
          <Route path="/dashboard" element={<Dashboard />} />
=======
          <Route path="/dashboard" element={<DashboardPage />} />
>>>>>>> Stashed changes
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
