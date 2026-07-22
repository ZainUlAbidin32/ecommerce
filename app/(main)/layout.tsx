import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <CartProvider>
      <Navbar />
      {children}
      <Footer/>
    </CartProvider>
  );
}