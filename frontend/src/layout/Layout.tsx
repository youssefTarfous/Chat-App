import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = { children: React.ReactNode };

function Layout({ children }: Props) {
    const [scrolling, setScrolling] = React.useState(false);
    
        useEffect(() => {
            // Define the event handler function
            const handleScroll = () => {
                if (window.scrollY > 50) {
                    setScrolling(true);
                } else {
                    setScrolling(false);
                }
            };
    
            // Attach the event listener for scroll event
            document.addEventListener('scroll', handleScroll);
    
            // Cleanup event listener on component unmount
            return () => {
                document.removeEventListener('scroll', handleScroll);
            };
        }, []);
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <div className={`w-full h-20 sticky top-0 z-50 ${scrolling ? "bg-base-300" : ""}`}>
        <Header />
      </div>
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
