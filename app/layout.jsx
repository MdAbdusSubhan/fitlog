import "@fontsource-variable/inter";
import "@fontsource-variable/oswald";
import "./globals.css";
import PlanProvider from "@/components/PlanProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: { default: "FitLog | Workout Library", template: "%s | FitLog" },
  description: "A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and log every set.",
  icons: { icon: "/logo.png" },
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#0b0b0b" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
