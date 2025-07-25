import React from "react";
import clientsImage from "@/assets/clients.jpg"; // Adjust the alias or use relative path if not using alias

const Certifications = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary mb-6">
          Our Trusted Partners
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
          We proudly collaborate with government bodies, energy corporations, and global solar technology leaders.
        </p>

        <div className="flex justify-center">
          <img
            src={clientsImage}
            alt="Partner and Certification Logos"
            className="rounded-xl shadow-lg max-w-full w-full md:max-w-4xl object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Certifications;
