import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import {

    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

const socialLinks = [
  { name: "GitHub", icon: FaGithub, url: "https://github.com/YATHARTH-Sriv/viewbooster", class:" rounded-md p-2 m-2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12  hover:bg-black" },
  { name: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/in/yatharth-srivastava-0b0382261/" , class:" rounded-md p-2 m-2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue hover:bg-black" },
  { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/yatharth_sriv/" , class:" rounded-md p-2 m-2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-purple hover:bg-black" },
  { name: "Twitter", icon: FaTwitter, url: "https://twitter.com/yatharth_sriv", class:" rounded-md p-2 m-2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue hover:bg-black" },
];


const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a wide range of offers",
    },
    {
      question: "How can it help?",
      answer:
        " It can help you to get more views and subscribers",
    },
    {
      question: "Do you provide ongoing support?",
      answer:
        "Yes, we offer various support and maintenance packages to ensure your website or application continues to run smoothly after launch.",
    },
    {
      question: "What is your pricing structure?",
      answer:
        "Our pricing is project-based and depends on the specific requirements. We provide detailed quotes after an initial consultation to understand your needs.",
    },
  ];

function Footer() {
  return (
    <footer className="bg-[#030303] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 lg:space-x-8">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
              aria-label={`Visit our ${link.name} page`}
            >
              <link.icon
                className= {link.class}
              />
              <span className="sr-only">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
export default function Questions(){
    return(
     <div className=" mt-7 pt-4">
        <section className="py-8 md:py-12 px-4 md:px-6  bg-[#030303]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* FAQ Header */}
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-5xl font-bold px-5 text-white tracking-tight">
                FAQ's
              </h2>
              <p className="text-base md:text-lg px-4 text-gray-400">
                👋 Get Answers To Your Queries?
              </p>
            </div>

            {/* FAQ Accordion */}
            <Accordion type="single" collapsible className="w-full ">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-base md:text-lg font-semibold text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    )
}