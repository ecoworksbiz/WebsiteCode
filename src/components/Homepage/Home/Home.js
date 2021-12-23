import React from "react";
import FindYourBestWorkspace from "../FindYourBestWorkspace/FindYourBestWorkspace";
import BookingOptions from "../BookingOptions/BookingOptions";
import EcoworkAppSection from "../EcoworkAppSection/EcoworkAppSection";
import InstagramAndNewsletterSection from "../InstagramAndNewsletterSection/InstagramAndNewsletterSection";
import Layout from "../Layout/Layout";
import WhyEcoworksSection from "../WhyEcoworksSection/WhyEcoworksSection";
import TestimonialSection from "../TestimonialSection/TestimonialSection";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Homepage = () => {
  return (
    <div >
      <Header/>
      <FindYourBestWorkspace />
      <BookingOptions />
      <WhyEcoworksSection />
      {/* <TestimonialSection /> */}
      <EcoworkAppSection />
      {/* <InstagramAndNewsletterSection /> */}
      <Footer/>
    </div>
  );
};

export default Homepage;
