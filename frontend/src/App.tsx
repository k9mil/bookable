import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import ConsultationChat from "./pages/ConsultationChat";
import PRDPage from "./pages/PRDPage";
import Dashboard from "./pages/Dashboard";
import PRDList from "./pages/PRDList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/samaltman/chat" element={<ConsultationChat />} />
          <Route path="/prd" element={<PRDPage />} />
          <Route path="/summary" element={<Dashboard />} />
          <Route path="/customers" element={<PRDList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
