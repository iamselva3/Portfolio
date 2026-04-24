import { useState } from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';
import { Send } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
);

export default function Contact() {
  const { github, linkedin, instagram, whatsapp } = portfolioData.contact;
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
              <GithubIcon className="w-6 h-6" />
            </a>
            <a href={linkedin} className="gravity-target p-4 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all hover:-translate-y-1" aria-label="LinkedIn">
              <LinkedinIcon className="w-6 h-6" />
            </a>
            <a href={instagram} className="gravity-target p-4 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all hover:-translate-y-1" aria-label="Instagram">
              <InstagramIcon className="w-6 h-6" />
            </a>
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="gravity-target p-4 bg-green-50 text-green-600 border border-green-200 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400 rounded-2xl hover:bg-green-100 dark:hover:bg-green-900/40 transition-all hover:-translate-y-1" aria-label="WhatsApp">
                <WhatsAppIcon className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
