
import React from "react";
import clientsImage from "@/assets/clients.jpg";

const Certifications = () => {
  return (
    <section className="py-16 bg-yellow-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-6 md:text-5xl">
          <span className="text-black">Our Trusted </span>
          <span className="text-yellow-500">Partners</span>
        </h2>
        <p className="text-black mb-10 max-w-2xl mx-auto">
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