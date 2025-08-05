import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Is solar energy suitable for all parts of India?",
    answer:
      "Yes, most parts of India receive ample sunlight throughout the year, making solar a viable energy option. Regions like Rajasthan, Gujarat, Maharashtra, and Tamil Nadu are especially ideal.",
  },
  {
    question: "How much can I save on electricity bills with solar panels?",
    answer:
      "Savings vary based on system size and location, but homeowners typically save 70–90% on their monthly electricity bills after installing solar panels.",
  },
  {
    question: "What is the average cost of installing a solar system in India?",
    answer:
      "A residential solar system in India costs around ₹50,000 to ₹75,000 per kW. Prices vary based on panel type, inverter quality, and installation charges.",
  },
  {
    question: "Are there any government subsidies available for solar installations?",
    answer:
      "Yes. Under the MNRE (Ministry of New and Renewable Energy), residential users can avail subsidies of up to 40% for rooftop solar systems up to 3kW. Larger systems also get reduced rates.",
  },
  {
    question: "What is net metering and how does it benefit me?",
    answer:
      "Net metering allows you to export unused solar power to the grid. Your electricity bill is adjusted based on how much you send vs. consume, leading to significant savings.",
  },
  {
    question: "Do solar panels work during monsoons or cloudy days?",
    answer:
      "Yes, but efficiency is reduced during cloudy weather or rain. However, the overall annual generation is still sufficient to cover most energy needs.",
  },
  {
    question: "How long do solar panels last?",
    answer:
      "Most solar panels come with a warranty of 25 years and can function efficiently for even longer with minimal degradation.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 text-gray-800">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-4">
    <span className="text-black">Frequently Asked</span> <span className="text-amber-500">Questions</span>
</h2>
<p className="text-center text-gray-700 mb-10">
    Answers to common questions about solar energy, government support, savings, and more.
</p>

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-xl p-5 shadow-sm transition-all duration-300 ${
                  isOpen ? "bg-white border-primary/30" : "bg-white/70"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <span className="font-semibold text-lg text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : "text-gray-500"
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[200px] mt-3 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 text-base">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
