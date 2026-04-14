import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { BottomNav } from "@/components/layout/BottomNav";

export default function StorefrontLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-full flex-col bg-[#F5F5F5]">
      <Header />
      <div className="flex-1 pb-20 md:pb-0">{children}</div>
      <Footer />
      <CartDrawer />
      <BottomNav />
    </div>
  );
}
