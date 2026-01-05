import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Users, 
  Stethoscope, 
  BookOpen, 
  LineChart, 
  Globe, 
  ArrowRight,
  Mail,
  Instagram,
  Twitter,
  Smartphone,
  CheckCircle2,
  Sparkles,
  Loader2,
  AlertCircle,
  Megaphone,
  Download
} from 'lucide-react';
// Import GoogleGenAI and Type following the latest SDK guidelines
import { GoogleGenAI, Type } from "@google/genai";
import { TeamMember, Partner, Feature } from './types';

// --- Components ---
const Badge = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border ${className}`}>
    {children}
  </span>
);

const AppStoreBadge = () => (
  <div className="bg-brand-dark text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-brand-purple transition-all cursor-pointer shadow-xl hover:-translate-y-1 w-fit group">
    <svg className="w-7 h-7 group-hover:scale-110 transition-transform" viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
    <div className="text-left leading-tight">
      <div className="text-[10px] uppercase font-bold opacity-70">Download on the</div>
      <div className="text-lg font-bold">App Store</div>
    </div>
  </div>
);

const PlayStoreBadge = () => (
  <div className="bg-brand-dark text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-brand-purple transition-all cursor-pointer shadow-xl hover:-translate-y-1 w-fit group">
    <svg className="w-7 h-7 group-hover:scale-110 transition-transform" viewBox="0 0 512 512" fill="currentColor">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-127.3-60.1-60.1L104.6 499z"/>
    </svg>
    <div className="text-left leading-tight">
      <div className="text-[10px] uppercase font-bold opacity-70">Get it on</div>
      <div className="text-lg font-bold">Google Play</div>
    </div>
  </div>
);

const SectionHeading = ({ badge, title, subtitle, light = false }: { badge: string; title: string; subtitle?: string; light?: boolean }) => (
  <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
    <Badge className={light ? "border-brand-soft text-brand-soft" : "border-brand-purple text-brand-purple"}>
      {badge}
    </Badge>
    <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${light ? "text-white" : "text-brand-dark"}`}>
      {title}
    </h2>
    {subtitle && <p className={`text-lg font-medium ${light ? "text-brand-soft/90" : "text-gray-600"}`}>{subtitle}</p>}
  </div>
);

const AIDemoSection = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{en: string, ur: string} | null>(null);
  const [loading, setLoading] = useState(false);

  // Updated generateInsight to use the recommended responseSchema for structured output
  const generateInsight = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY }); 
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide a compassionate, bilingual (English and Urdu) explanation for: "${input}". Context: She Deserves Care Pakistan (Endometriosis/PCOS support).`,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING, description: "Compassionate explanation in English" },
              ur: { type: Type.STRING, description: "Compassionate explanation in Urdu" }
            },
            required: ["en", "ur"],
            propertyOrdering: ["en", "ur"]
          }
        }
      });
      const content = JSON.parse(response.text || "{}");
      setResult(content);
    } catch (e) {
      setResult({ en: "Error generating insight. Please try again.", ur: "معذرت، کچھ غلط ہو گیا۔" });
    } finally { setLoading(false); }
  };

  return (
    <div id="ai-hub" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-soft/30 rounded-[3rem] p-8 lg:p-16 border border-brand-soft shadow-sm hover:shadow-xl transition-shadow">
          <div className="text-center mb-10 space-y-4">
            <Badge className="border-brand-purple text-brand-purple bg-white">Experience The Hub</Badge>
            <h3 className="text-3xl font-extrabold text-brand-dark tracking-tight">AI-Powered Bilingual Clarity</h3>
            <p className="text-gray-700 font-medium">Complex health information, simplified for you in English & Urdu.</p>
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Endometriosis, PCOS, or any symptom..."
                className="w-full h-36 px-6 py-5 rounded-[2rem] border-2 border-brand-soft focus:border-brand-purple transition-all outline-none text-brand-dark font-medium resize-none bg-white/80 placeholder:text-gray-400"
              />
              <button
                onClick={generateInsight}
                disabled={loading || !input}
                className="absolute bottom-4 right-4 bg-brand-purple text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-brand-dark disabled:opacity-50 transition-all shadow-lg"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Analyze
              </button>
            </div>

            {result && !loading && (
              <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-8 rounded-3xl border border-brand-soft shadow-sm">
                  <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-4">English Hub</div>
                  <p className="text-brand-dark leading-relaxed text-sm font-medium">{result.en}</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-brand-soft shadow-sm text-right">
                  <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-4 text-left">اردو ہب</div>
                  <p className="urdu-text text-xl text-brand-dark leading-[2.5] font-bold">{result.ur}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Data ---
const problemPoints = [
  { icon: <AlertCircle />, title: "Lack of Information", text: "Reproductive health info is scarce or culturally disconnected in Pakistan." },
  { icon: <Globe />, title: "Language Gaps", text: "Medical information is mostly in English, excluding millions of women." },
  { icon: <Users />, title: "Pain Normalization", text: "Symptoms are often dismissed, leading to years of delayed diagnosis." },
  { icon: <Megaphone />, title: "Broken Communication", text: "Strained dialogue between patients and doctors affects care quality." }
];

const features: Feature[] = [
  { title: "Education & Awareness", titleUrdu: "تعلیم اور آگاہی", description: "Bilingual health resources simplified by Gemini AI for instant clarity.", icon: <BookOpen className="w-6 h-6" /> },
  { title: "Health Empowerment", titleUrdu: "صحت کی بااختیار بنانا", description: "Deep tracking for pain and cycles with compassionate AI pattern analysis.", icon: <LineChart className="w-6 h-6" /> },
  { title: "Community Forum", titleUrdu: "کمیونٹی فورم", description: "Safe, moderated 'Warrior Forum' for shared lived experiences.", icon: <Users className="w-6 h-6" /> },
  { title: "Care Navigation", titleUrdu: "دیکھ بھال کی رہنمائی", description: "Directory of vetted specialists and curated reproductive health products.", icon: <Stethoscope className="w-6 h-6" /> }
];

const differentiation = [
  { title: "Built for Pakistan", text: "Native Urdu support and cultural relevance are baked into our DNA." },
  { title: "Empathetic AI", text: "We use technology not just for data, but to listen and validate." },
  { title: "High-Contrast UI", text: "Minimalist, classy design optimized for non-tech-savvy users." }
];

// Defined the missing collaborators data to fix the reference error
const collaborators: Partner[] = [
  { name: "PCOS Awareness Pakistan", role: "Advocacy Partner" },
  { name: "Women's Health Initiative", role: "Clinical Advisor" },
  { name: "Endo Warriors PK", role: "Community Hub" },
  { name: "Maternal Health Collective", role: "Policy Partner" }
];

// --- Main App ---
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-soft selection:text-brand-purple">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4 border-b border-gray-100 shadow-sm' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
              <Heart className="text-white w-6 h-6 fill-current" />
            </div>
            <span className="text-xl font-extrabold text-brand-dark tracking-tight">She Deserves Care</span>
          </div>
          
          <div className="hidden md:flex gap-10 text-sm font-bold text-gray-600">
            <a href="#problem" className="hover:text-brand-purple transition-colors">The Problem</a>
            <a href="#solution" className="hover:text-brand-purple transition-colors">Our Approach</a>
            <a href="#team" className="hover:text-brand-purple transition-colors">Team</a>
            <a href="#impact" className="hover:text-brand-purple transition-colors">Impact</a>
          </div>
          
          <a href="https://chat.whatsapp.com/CCgMJuGwTyd9pl3x1bSaUj" target="_blank" className="bg-brand-purple text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-lg hover:bg-brand-dark transition-all transform hover:scale-105">
            Join WhatsApp Community
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-48 pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-brand-soft/30 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="space-y-6">
                <Badge className="border-brand-purple text-brand-purple">Introducing She Deserves Care Pakistan</Badge>
                <h1 className="text-6xl md:text-8xl font-extrabold text-brand-dark leading-[1.1] tracking-tight">
                  Empowering <br />
                  <span className="text-brand-purple">Her Journey.</span>
                </h1>
                <p className="text-xl text-gray-600 font-medium max-w-lg leading-relaxed">
                  A bilingual digital health platform designed for Pakistani women managing Endometriosis, PCOS, and reproductive health challenges.
                </p>
                <div className="border-l-4 border-brand-purple pl-6 py-2 bg-brand-soft/20 rounded-r-xl">
                  <p className="urdu-text text-2xl text-brand-dark font-bold">خواتین کی صحت، ہماری ترجیح</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <AppStoreBadge />
                <PlayStoreBadge />
              </div>
              
              <div className="flex items-center gap-8 pt-6">
                <a href="mailto:partnerships@shedeservescare.com" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-purple transition-colors">
                  <Mail className="w-4 h-4" /> Partner With Us
                </a>
                <div className="h-4 w-px bg-gray-200" />
                <a href="#impact" className="text-sm font-bold text-gray-500 hover:text-brand-purple transition-colors flex items-center gap-2">
                  Learn About Our Impact <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
              <div className="relative z-10 w-full aspect-square max-w-lg mx-auto bg-brand-soft rounded-[3rem] overflow-hidden shadow-2xl group border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105"
                  alt="Care & Dignity"
                />
                <div className="absolute inset-0 bg-brand-purple/10" />
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 glass p-6 rounded-3xl shadow-xl flex items-center gap-5 backdrop-blur-md">
                  <div className="w-12 h-12 bg-brand-purple rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                    <Globe className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-brand-dark text-lg">Urdu + English Hub</h5>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Bridging the Language Gap</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* The Problem */}
      <section id="problem" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            badge="The Gap" 
            title="Why She Deserves Care Exists" 
            subtitle="The silent struggle in Pakistan's women's healthcare landscape."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problemPoints.map((point, i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="w-14 h-14 bg-brand-soft rounded-2xl flex items-center justify-center text-brand-purple mb-8 group-hover:scale-110 transition-transform">
                  {React.cloneElement(point.icon as React.ReactElement, { size: 28, strokeWidth: 2.5 })}
                </div>
                <h4 className="text-xl font-extrabold text-brand-dark mb-4">{point.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section id="solution" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <Badge className="border-brand-purple text-brand-purple">Our Approach</Badge>
                <h3 className="text-5xl font-extrabold text-brand-dark tracking-tight">A Holistic Care Architecture</h3>
                <p className="text-lg text-gray-600 font-medium">Built on four core pillars to ensure every woman's health journey is supported by technology, community, and clinical excellence.</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                  <div key={i} className="p-8 rounded-[2rem] bg-brand-soft/20 border border-brand-soft/50 hover:bg-white hover:shadow-2xl transition-all group">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-purple mb-6 shadow-sm group-hover:rotate-6 transition-transform">
                      {feature.icon}
                    </div>
                    <h5 className="font-bold text-brand-dark mb-1 text-lg">{feature.title}</h5>
                    <div className="urdu-text text-sm text-brand-purple font-bold mb-3">{feature.titleUrdu}</div>
                    <p className="text-gray-600 text-xs font-medium leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1000" className="w-full grayscale hover:grayscale-0 transition-all duration-700" alt="Support" />
              <div className="absolute inset-0 bg-brand-purple/20 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>

      {/* AI Hub Demo */}
      <AIDemoSection />

      {/* Differentiation */}
      <section className="py-32 bg-brand-dark text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading badge="Differentiation" title="What Sets Us Apart" light />
          
          <div className="grid md:grid-cols-3 gap-10">
            {differentiation.map((item, i) => (
              <div key={i} className="p-12 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center">
                <div className="w-16 h-16 bg-brand-purple rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <ShieldCheck className="text-brand-soft w-8 h-8" strokeWidth={2.5} />
                </div>
                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                <p className="text-brand-soft/80 text-sm leading-relaxed font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-16 rounded-[3rem] bg-brand-soft/30 border border-brand-soft flex flex-col justify-center text-center">
              <h3 className="text-3xl font-extrabold text-brand-purple mb-8">Our Mission</h3>
              <p className="text-2xl text-brand-dark font-medium italic leading-relaxed">
                "To empower women with accessible, culturally relevant reproductive healthcare tools and knowledge."
              </p>
            </div>
            <div className="p-16 rounded-[3rem] bg-brand-purple text-white shadow-2xl flex flex-col justify-center text-center">
              <h3 className="text-3xl font-extrabold text-brand-soft mb-8">Our Vision</h3>
              <p className="text-2xl font-medium italic leading-relaxed text-white/90">
                "A Pakistan where women’s pain is heard, understood, and treated with dignity."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading badge="The User Journey" title="Simple. Private. Empowering." />
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Download", desc: "Available on App Store & Play Store for free." },
              { title: "Choose Language", desc: "Toggle between English & Urdu effortlessly." },
              { title: "Track & Learn", desc: "Log symptoms and access AI health summaries." },
              { title: "Expert Support", desc: "Connect with doctors and join the Warrior Forum." }
            ].map((step, i) => (
              <div key={i} className="p-10 bg-white rounded-[2rem] border border-gray-100 shadow-sm text-center relative group hover:-translate-y-2 transition-transform duration-300">
                <span className="absolute top-4 right-8 text-6xl font-extrabold text-brand-soft/50 group-hover:text-brand-purple/20 transition-colors">0{i+1}</span>
                <h5 className="text-xl font-bold text-brand-dark mb-3 relative z-10">{step.title}</h5>
                <p className="text-sm text-gray-600 font-medium leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading badge="Our People" title="The Faces Behind the Movement" />
          
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div className="p-12 rounded-[3rem] bg-gray-50 border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" className="w-48 h-48 rounded-full mb-10 border-8 border-white shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500" alt="Natasha Mehmood" />
              <div className="space-y-4">
                <h4 className="text-3xl font-extrabold text-brand-dark">Natasha Mehmood</h4>
                <Badge className="border-brand-purple text-brand-purple bg-brand-soft/30">Founder</Badge>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  Natasha Mehmood is the Founder of She Deserves Care, a purpose-driven initiative working at the intersection of women’s health, technology, and advocacy. Driven by the urgent need for better awareness and support around endometriosis and other under-recognized conditions, her work focuses on building accessible, stigma-free care pathways. With a background in human rights, Natasha is committed to transforming lived experiences into meaningful solutions.
                </p>
              </div>
            </div>
            
            <div className="p-12 rounded-[3rem] bg-gray-50 border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all">
              <img src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&q=80&w=400" className="w-48 h-48 rounded-full mb-10 border-8 border-white shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500" alt="Aiman Mubasher" />
              <div className="space-y-4">
                <h4 className="text-3xl font-extrabold text-brand-dark">Aiman Mubasher</h4>
                <Badge className="border-brand-purple text-brand-purple bg-brand-soft/30">Core Team</Badge>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  Aiman brings a deep passion for digital health accessibility and community engagement. She ensures that the platform remains grounded in the cultural realities of Pakistani women while maintaining global standards of data privacy and medical accuracy.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-16 border-t border-gray-100 text-center">
            <h5 className="text-xs font-extrabold text-gray-400 uppercase tracking-[0.3em] mb-12">Our Growing Network</h5>
            <div className="flex flex-wrap justify-center gap-16">
              {collaborators.map((c, i) => (
                <div key={i} className="text-center group cursor-default">
                  <div className="font-extrabold text-brand-dark text-lg group-hover:text-brand-purple transition-colors">{c.name}</div>
                  <div className="text-xs text-brand-purple uppercase font-bold tracking-widest mt-1">{c.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Advocacy */}
      <section id="impact" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-brand-purple rounded-[4rem] p-16 lg:p-24 text-white overflow-hidden relative shadow-2xl">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-lightPurple/50 blur-[120px] rounded-full" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <div className="space-y-6">
                  <Badge className="border-white/20 text-brand-soft bg-white/10">Advocacy First</Badge>
                  <h3 className="text-5xl font-extrabold tracking-tight">Beyond the Screen</h3>
                  <p className="text-xl text-brand-soft/90 font-medium leading-relaxed">
                    We aren't just an app; we are a catalyst for systemic change. From awareness walks to policy discussions, we ensure women's health is heard.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {[
                    "National Awareness Campaigns",
                    "Policy Advocacy for Menstrual Health",
                    "Vetted Medical Expert Collaborations",
                    "Bilingual Educational Outreach"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-brand-purple transition-all">
                        <CheckCircle2 className="w-5 h-5" strokeWidth={3} />
                      </div>
                      <span className="font-bold text-lg text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-2xl -rotate-2 hover:rotate-0 transition-all duration-500" alt="Impact 1" />
                <img src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-2xl rotate-2 mt-12 hover:rotate-0 transition-all duration-500" alt="Impact 2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-32 text-center bg-white relative">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="w-24 h-24 bg-brand-soft rounded-3xl mx-auto flex items-center justify-center shadow-xl rotate-3">
            <Download className="w-10 h-10 text-brand-purple" strokeWidth={3} />
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-brand-dark leading-tight tracking-tight">
            Start Your Journey <br /> <span className="text-brand-purple">With Us Today.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Download the app now and join thousands of women across Pakistan taking charge of their health.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-6">
            <AppStoreBadge />
            <PlayStoreBadge />
          </div>
          <p className="text-xs text-gray-400 font-extrabold uppercase tracking-[0.2em]">Free to download • Private • Built with care</p>
        </div>
      </section>

      {/* Contact & Collaborate */}
      <section id="contact" className="py-32 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-24">
            <div className="space-y-10">
              <div className="space-y-6">
                <Badge className="border-brand-purple text-brand-purple">Get In Touch</Badge>
                <h3 className="text-4xl font-extrabold text-brand-dark">Collaborate with She Deserves Care</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Whether you're a healthcare provider, an NGO, or a researcher, we want to hear from you. Let's work together for Pakistani women's health.
                </p>
              </div>
              <div className="flex gap-6">
                <a href="#" className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all shadow-sm">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all shadow-sm">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="mailto:natasha@shedeservescare.com" className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all shadow-sm">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Partnerships", desc: "For NGO and Institutional collaborations." },
                { title: "For Doctors", desc: "Join our directory of vetted specialists." },
                { title: "Media", desc: "Press inquiries and awareness features." },
                { title: "Community", desc: "Inquiries about the Warrior Forum." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:border-brand-purple transition-all group cursor-pointer hover:shadow-lg">
                  <h5 className="font-bold text-brand-dark mb-2 flex items-center justify-between text-lg">
                    {item.title}
                    <ArrowRight className="w-5 h-5 text-brand-purple opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h5>
                  <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-20 mb-24">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="text-white w-6 h-6 fill-current" />
                </div>
                <span className="text-2xl font-extrabold tracking-tight">She Deserves Care</span>
              </div>
              <p className="text-brand-soft/80 text-sm leading-relaxed font-medium">
                A purpose-driven digital platform for women's reproductive health in Pakistan. We bridge the gap between pain and care through language, technology, and community.
              </p>
            </div>
            
            <div className="space-y-8">
              <h5 className="font-bold uppercase tracking-widest text-[11px] text-brand-soft">Navigation</h5>
              <ul className="space-y-5 text-sm font-bold text-brand-soft/60">
                <li><a href="#problem" className="hover:text-white transition-colors">The Problem</a></li>
                <li><a href="#solution" className="hover:text-white transition-colors">Our Solution</a></li>
                <li><a href="#ai-hub" className="hover:text-white transition-colors">The Hub (AI)</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">Meet the Team</a></li>
              </ul>
            </div>
            
            <div className="space-y-8">
              <h5 className="font-bold uppercase tracking-widest text-[11px] text-brand-soft">Stay Connected</h5>
              <p className="text-sm text-brand-soft/60 font-medium">Join our growing community and stay updated with the latest in women's health.</p>
              <div className="flex gap-4">
                <a href="https://chat.whatsapp.com/CCgMJuGwTyd9pl3x1bSaUj" className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-2xl text-xs font-bold transition-all border border-white/5">
                  Join the Community Hub
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left space-y-4">
              <p className="text-[10px] text-brand-soft/40 max-w-2xl uppercase tracking-widest leading-relaxed font-bold">
                Medical Disclaimer: She Deserves Care is an educational and supportive platform. It does not provide medical diagnosis or treatment. Always consult with a qualified professional.
              </p>
              <p className="text-xs text-brand-soft/40 font-bold">© {new Date().getFullYear()} She Deserves Care Pakistan. All Rights Reserved.</p>
            </div>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-brand-soft/40">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}