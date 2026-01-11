import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Patterns from "./pages/Patterns";
import PatternDetail from "./pages/PatternDetail";
import Algorithms from "./pages/Algorithms";
import AlgorithmDetail from "./pages/AlgorithmDetail";
import Syntax from "./pages/Syntax";
import Complexity from "./pages/Complexity";
import NotFound from "./pages/NotFound";
import useScrollToTop from "./hooks/use-scroll-top";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/algorithms" element={<Algorithms />} />
          <Route path="/algorithms/:category/:id" element={<AlgorithmDetail />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/patterns/:id" element={<PatternDetail />} />
          <Route path="/syntax" element={<Syntax />} />
          <Route path="/complexity" element={<Complexity />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
