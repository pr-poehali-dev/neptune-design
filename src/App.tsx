
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Project5628 from "./pages/Project5628";
import Project172 from "./pages/Project172";
import Project62 from "./pages/Project62";
import ProjectTsvetnaya2 from "./pages/ProjectTsvetnaya2";
import ProjectVyatlina from "./pages/ProjectVyatlina";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/project/5628" element={<Project5628 />} />
          <Route path="/project/172" element={<Project172 />} />
          <Route path="/project/62" element={<Project62 />} />
          <Route path="/project/tsvetnaya2" element={<ProjectTsvetnaya2 />} />
          <Route path="/project/vyatlina" element={<ProjectVyatlina />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;