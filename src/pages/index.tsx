import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { MobileApp, Navbar, Sidebar } from "@/components";
import DragAndDropBoard from "@/components/DragAndDropBoard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // State variables for sidebar and mobile menu
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="w-screen h-screen overflow-y-scroll flex relative bg-default">
      {/* Desktop Sidebar */}
      <div
        className={`hidden overflow-y-scroll overflow-x-hidden lg:inline-block ${
          sidebarOpen ? "w-72" : "w-0 opacity-0"
        } h-[100%] duration-500`}
      >
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          mobile={mobileMenuOpen}
          setMobile={setMobileMenuOpen}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`z-20 w-[100%] overflow-y-scroll overflow-x-hidden absolute h-[100%] ease-in-out duration-500 ${
          mobileMenuOpen
            ? "top-0 left-[0%] w-[80%] sm:w-[60%] md:w-[40%]"
            : "top-0 -left-full"
        }`}
      >
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          mobile={mobileMenuOpen}
          setMobile={setMobileMenuOpen}
        />
      </div>
      {mobileMenuOpen && (
        <div
          className="w-screen ease-in-out duration-500 h-screen z-10 absolute bg-opacity-70 bg-borderColor"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="w-[100%] h-[100%] overflow-y-scroll overflow-x-hidden">
        <Navbar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          mobile={mobileMenuOpen}
          setMobile={setMobileMenuOpen}
        />
        <MobileApp />
        <DragAndDropBoard />
      </div>
    </div>
  );
}
