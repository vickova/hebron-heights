import { Box } from "@mui/material";

import HeroSection from "@/components/HeroSection/HeroSection";
import Navbar from "@/components/Navbar/Navbar";
import GastronomySection from "@/components/GastronomySection/GastronomySection"
import PropertiesSection from "@/components/PropertiesSection/PropertiesSection";
import AutomobilesSection from "@/components/AutomobilesSection/AutomobilesSection";
import Footer from "@/components/Footer/Footer";

export default function HomePage() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <HeroSection />
      <PropertiesSection />
      <AutomobilesSection />
      <GastronomySection />
      <Footer />
      {/* <FloatingWhatsApp /> */}
    </Box>
  );
}