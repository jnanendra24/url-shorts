import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-background p-3 mb-8 border-b-2 text-foreground">
        <div className="grid grid-cols-2 place-items-center md:mx-auto md:flex md:justify-between md:items-center">
          <div>
            <h1 className=" text-xl">Url Shorts</h1>
          </div>
          <div className="md:hidden place-self-end">
            <Button onClick={toggleMenu}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
          <div
            className={`md:flex col-span-2 justify-center items-center ${
              isMenuOpen ? "flex" : "hidden"
            }`}
          >
            <Button variant="link">
              <Link to="/" className="">
                Home
              </Link>
            </Button>
            <Button variant="link">
              <Link to="/recents" className="">
                Recents
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}
