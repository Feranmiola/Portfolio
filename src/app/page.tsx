import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import { ContactFormProvider } from "@/components/contact/ContactFormProvider";

export default function Home() {
  return (
    <ContactFormProvider>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <Services />
        <Contact />
      </main>
      <Footer />
    </ContactFormProvider>
  );
}
