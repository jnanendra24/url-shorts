import "./App.css";
import { Toaster } from "@/components/ui/toaster";
// import AuthTabs from "@/components/AuthTabs";
import ShortenerCard from "@/components/ShortenerCard";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import RecentShortens from "@/components/RecentShortens";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ShortenerCard />} />
        <Route path="/recents" element={<RecentShortens />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
