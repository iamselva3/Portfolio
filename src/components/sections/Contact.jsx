import { useState } from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';
import { Code2, Briefcase, Globe, Phone, Send } from 'lucide-react';

export default function Contact() {
  const { github, linkedin, twitter, whatsapp } = portfolioData.contact;
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  return (
    <AnimatedSection id="contact" className="py-24 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-start bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2rem] p-8 md:p-12 shadow-xl">
        
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
          
          <input type="hidden" name="access_key" value="c6bb1600-b4e5-4863-8e25-50a07a1b4ca4" />
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
          
          <div className="space-y-4">
            <div>
              <input type="text" name="fullname" required placeholder="Full Name" className="w-full px-5 py-4 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400" />
            </div>
            <div>
              <input type="email" name="email" required placeholder="Email Address" className="w-full px-5 py-4 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400" />
            </div>
            <div>
              <textarea name="message" required placeholder="Your Message" rows={4} className="w-full px-5 py-4 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none placeholder:text-gray-400"></textarea>
            </div>
          </div>
          
          <button type="submit" disabled={status === "submitting"} className="gravity-target w-full inline-flex justify-center items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1">
            <Send size={18} /> {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
          
          {status === "success" && <p className="text-green-600 dark:text-green-500 text-sm font-medium text-center">Message submitted successfully!</p>}
          {status === "error" && <p className="text-red-600 dark:text-red-500 text-sm font-medium text-center">Submission failed. Please try again.</p>}
        </form>

        {/* Socials & Info */}
        <div className="flex flex-col h-full justify-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Or reach out via</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Prefer to connect directly? Feel free to reach out through any of my social profiles or drop me a direct message on WhatsApp!
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <a href={github} className="gravity-target p-4 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all hover:-translate-y-1" aria-label="GitHub">
              <Code2 size={24} />
            </a>
            <a href={linkedin} className="gravity-target p-4 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all hover:-translate-y-1" aria-label="LinkedIn">
              <Briefcase size={24} />
            </a>
            <a href={twitter} className="gravity-target p-4 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all hover:-translate-y-1" aria-label="Twitter">
              <Globe size={24} />
            </a>
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="gravity-target p-4 bg-green-50 text-green-600 border border-green-200 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400 rounded-2xl hover:bg-green-100 dark:hover:bg-green-900/40 transition-all hover:-translate-y-1" aria-label="WhatsApp">
                <Phone size={24} />
              </a>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
