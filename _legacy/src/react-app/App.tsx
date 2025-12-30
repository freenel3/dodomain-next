import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import Domains from "@/react-app/pages/Domains";
import DomainDetail from "@/react-app/pages/DomainDetail";
import DomainSell from "@/react-app/pages/DomainSell";
import Blog from "@/react-app/pages/Blog";
import BlogPost from "@/react-app/pages/BlogPost";
import Contact from "@/react-app/pages/Contact";
import About from "@/react-app/pages/About";
import NotFound from "@/react-app/pages/NotFound";
import ScrollToTop from "@/react-app/components/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/domains" element={<Domains />} />
        <Route path="/domains/:domain" element={<DomainDetail />} />
        <Route path="/sell-domain" element={<DomainSell />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
