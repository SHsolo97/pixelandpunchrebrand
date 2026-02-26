import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Terminal, Menu, X, ArrowUpRight, MousePointer2, ExternalLink, ShieldCheck, Activity, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MagneticButton = ({ children, className = '', onClick }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        let ctx = gsap.context(() => { }, button);

        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(button, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.6,
                ease: 'power3.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
            ctx.revert();
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={`relative overflow-hidden transition-all duration-300 transform group ${className}`}
        >
            <span className="absolute inset-0 w-full h-full bg-accent/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] pointer-events-none"></span>
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        </button>
    );
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] w-[95%] max-w-5xl rounded-full transition-all duration-500 flex items-center justify-between px-6 py-4 ${isScrolled || menuOpen
                    ? 'bg-[#FAF8F5]/90 backdrop-blur-xl border border-primary/10 text-[#0D0D12] shadow-sm'
                    : 'bg-transparent text-[#FAF8F5]'
                    }`}
            >
                <div className="font-bold tracking-tighter text-xl flex items-center gap-2">
                    <img src={isScrolled || menuOpen ? "/logoInvertedLong.png" : "/logoInverted.png"} alt="Pixel & Punch Logo" className="h-8 md:h-10 transition-all duration-300" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm font-medium hover:-translate-y-[1px] transition-transform">Expertise</a>
                    <a href="#philosophy" className="text-sm font-medium hover:-translate-y-[1px] transition-transform">Philosophy</a>
                    <a href="#protocol" className="text-sm font-medium hover:-translate-y-[1px] transition-transform">Process</a>
                </div>

                <div className="hidden md:block">
                    <MagneticButton
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium ${isScrolled || menuOpen ? 'bg-primary text-[#FAF8F5]' : 'bg-[#FAF8F5] text-primary'}`}
                    >
                        Book Discovery <ArrowRight className="w-4 h-4 ml-1" />
                    </MagneticButton>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden p-1 transition-transform active:scale-95" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-[#FAF8F5] z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex flex-col items-center justify-center space-y-10 md:hidden ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-10'}`}>
                <a href="#features" onClick={() => setMenuOpen(false)} className="text-3xl font-bold text-primary hover:text-accent transition-colors">Expertise</a>
                <a href="#philosophy" onClick={() => setMenuOpen(false)} className="text-3xl font-bold text-primary hover:text-accent transition-colors">Philosophy</a>
                <a href="#protocol" onClick={() => setMenuOpen(false)} className="text-3xl font-bold text-primary hover:text-accent transition-colors">Process</a>
                <button
                    onClick={() => {
                        setMenuOpen(false);
                        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-4 bg-primary text-[#FAF8F5] px-8 py-4 rounded-full text-lg font-bold flex items-center gap-2"
                >
                    Book Discovery <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </>
    );
};

const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.hero-text', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.08,
                ease: 'power3.out',
                delay: 0.2
            });
            gsap.from('.hero-btn', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.6
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden bg-primary flex items-end">
            {/* Background Spline */}
            <div className="absolute inset-0 w-full h-full opacity-90">
                <Spline scene="/scene.splinecode" />
            </div>
            {/* Heavy primary-to-black gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/60 to-transparent pointer-events-none" />

            {/* Content pinned to bottom-left third */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 lg:w-2/3 ml-auto mr-auto lg:ml-0 lg:pl-24">
                <p className="hero-text text-accent font-data uppercase tracking-widest text-xs md:text-sm mb-6">Pixel & Punch • AI Growth Partners</p>
                <h1 className="hero-text text-[#FAF8F5] leading-[1.1] mb-6 md:mb-8">
                    <span className="block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">Your vision, our mission,</span>
                    <span className="block text-5xl md:text-8xl lg:text-9xl font-drama text-accent pr-4 md:pr-10">Pixel Perfect.</span>
                </h1>
                <p className="hero-text text-[#FAF8F5]/80 text-base md:text-xl max-w-xl mb-8 md:mb-10 font-light pr-4 md:pr-6">
                    Reclaim your time and accelerate your bottom line with intelligent marketing and automation systems. Simple, scalable, and beautifully efficient.
                </p>
                <div className="hero-btn">
                    <MagneticButton
                        onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                        className="bg-accent text-primary px-8 py-4 rounded-full text-base font-semibold hover:bg-[#FAF8F5]"
                    >
                        Explore Your Systems <ArrowUpRight className="w-5 h-5 ml-2" />
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
};

/**
 * FEATURES: Diagnostic Shuffler
 */
function ShufflerCard() {
    const [items, setItems] = useState([
        { id: 1, text: 'Invitation-Only Roster', color: 'bg-primary text-background' },
        { id: 2, text: 'Dedicated Resources', color: 'bg-slate text-background' },
        { id: 3, text: 'Absolute Focus', color: 'bg-accent text-primary' }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems(prev => {
                const copy = [...prev];
                const last = copy.pop();
                copy.unshift(last);
                return copy;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-background border border-slate/10 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-96 flex flex-col relative overflow-hidden group">
            <div className="font-data text-xs uppercase tracking-widest text-slate/50 mb-4 flex items-center gap-2">
                <ShieldCheck size={14} /> Private Roster
            </div>
            <h3 className="font-sans font-bold text-2xl text-primary mb-2">Exclusive Access</h3>
            <p className="font-sans text-sm text-slate mb-8">Invitation-only partnership ensuring dedicated resources. We limit our client roster to guarantee absolute focus.</p>

            <div className="relative flex-1 mt-4">
                {items.map((item, i) => {
                    const isTop = i === 0;
                    return (
                        <div
                            key={item.id}
                            className={`absolute left-0 right-0 p-4 rounded-xl flex items-center justify-between transition-all duration-700 font-sans font-medium text-sm
                ${item.color}`}
                            style={{
                                transform: `translateY(${i * 20}px) scale(${1 - i * 0.05})`,
                                zIndex: 10 - i,
                                opacity: 1 - i * 0.2,
                                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                        >
                            <span>{item.text}</span>
                            {isTop && <ShieldCheck size={16} className="opacity-70" />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * FEATURES: Telemetry Typewriter
 */
function TypewriterCard() {
    const fullText = ">> IDENTIFYING MANUAL TASKS...\n>> DEPLOYING DIGITAL LABOR...\n>> ELIMINATING ERRORS...\n>> AUTOMATION ONLINE.";
    const [text, setText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, i));
            i++;
            if (i > fullText.length) i = 0; // loop
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-background border border-slate/10 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-96 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div className="font-data text-xs uppercase tracking-widest text-slate/50 flex items-center gap-2">
                    <Cpu size={14} /> Workflow Engine
                </div>
                <div className="flex items-center gap-2 text-[10px] font-data text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live Feed
                </div>
            </div>
            <h3 className="font-sans font-bold text-2xl text-primary mb-2">AI Automation</h3>
            <p className="font-sans text-sm text-slate mb-6">Free your team from repetitive manual workflows. Watch silent, error-free digital labor take over the heavy lifting.</p>

            <div className="bg-primary flex-1 rounded-xl p-4 overflow-hidden relative border border-slate/20 flex flex-col">
                <div className="w-full flex gap-1.5 mb-3 border-b border-white/10 pb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                </div>
                <div className="font-data text-xs text-accent whitespace-pre-line leading-relaxed">
                    {text}<span className="inline-block w-2 h-3 bg-accent animate-pulse ml-0.5 align-middle"></span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-80 pointer-events-none"></div>
            </div>
        </div>
    );
}

/**
 * FEATURES: Cursor Protocol Scheduler
 */
function SchedulerCard() {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const gridRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            tl.set('.anim-cursor', { x: 20, y: 150, opacity: 0 })
                .to('.anim-cursor', { opacity: 1, duration: 0.3 })
                .to('.anim-cursor', { x: 120, y: 30, duration: 1, ease: 'power2.inOut' })
                .to('.anim-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
                .set('.cell-3', { backgroundColor: '#C9A84C', color: '#0D0D12' }, "<0.1")
                .to('.anim-cursor', { x: 180, y: 100, duration: 0.8, ease: 'power2.inOut' })
                .to('.anim-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
                .set('.save-btn', { backgroundColor: '#C9A84C' }, "<0.1")
                .to('.anim-cursor', { x: 250, y: 150, opacity: 0, duration: 0.8, ease: 'power2.in' })
                .set('.cell-3', { backgroundColor: 'transparent', color: '#2A2A35' })
                .set('.save-btn', { backgroundColor: '#FAF8F5' });

        }, gridRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-background border border-slate/10 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-96 flex flex-col">
            <div className="font-data text-xs uppercase tracking-widest text-slate/50 mb-4 flex items-center gap-2">
                <Activity size={14} /> Scalable Architecture
            </div>
            <h3 className="font-sans font-bold text-2xl text-primary mb-2">Custom Solutions</h3>
            <p className="font-sans text-sm text-slate mb-6">Unlock bespoke revenue engines designed precisely around your growth goals, backed by proven industry frameworks.</p>

            <div ref={gridRef} className="relative flex-1 bg-white border border-slate/5 rounded-xl p-4 flex flex-col justify-center overflow-hidden">
                <div className="flex justify-between px-1 mb-2">
                    {days.map((d, i) => (
                        <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center font-data text-[10px] cell-${i} text-slate transition-colors duration-300`}>
                            {d}
                        </div>
                    ))}
                </div>
                <div className="h-16 border border-dashed border-slate/20 rounded-lg flex items-center justify-center font-data text-xs text-slate/40 text-center px-4 leading-tight">
                    Custom Engine Configured
                </div>
                <div className="mt-4 flex justify-end">
                    <div className="save-btn px-4 py-1.5 rounded-full font-sans text-xs font-semibold bg-background border border-slate/10 transition-colors duration-300">
                        Launch
                    </div>
                </div>

                {/* Animated Cursor */}
                <svg className="anim-cursor absolute left-0 top-0 w-6 h-6 text-primary filter drop-shadow-md z-10 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 2l6.86 19.46c.32.9 1.62.9 1.94 0l2.76-7.85 7.85-2.76c.9-.32.9-1.62 0-1.94L4 2z" />
                </svg>
            </div>
        </div>
    );
}

/**
 * 3. FEATURES SECTION
 */
function Features() {
    return (
        <section id="services" className="py-32 px-6 md:px-16 bg-background relative z-10 rounded-t-[3rem] -mt-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-primary tracking-tight mb-4">Value Embedded.</h2>
                    <p className="font-serif italic text-2xl text-slate text-center mx-auto max-w-xl">Every interaction configured to convert, scale, and perform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <ShufflerCard />
                    <TypewriterCard />
                    <SchedulerCard />
                </div>
            </div>
        </section>
    );
}

const Philosophy = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.phil-line-1', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
            gsap.from('.phil-line-2', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%',
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.2
            });

            gsap.to('.parallax-bg', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: 100,
                ease: 'none'
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="philosophy" ref={sectionRef} className="relative w-full py-40 overflow-hidden bg-primary text-[#FAF8F5]">
            {/* Dark Texture Parallax */}
            <div className="absolute inset-0 w-full h-[120%] -top-[10%] parallax-bg pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2674&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%)'
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <h3 className="phil-line-1 text-lg md:text-2xl text-[#FAF8F5]/60 mb-6 md:mb-8 font-light tracking-wide">
                    Most agencies focus on: checking boxes and delivering outputs.
                </h3>
                <h2 className="phil-line-2 text-4xl md:text-7xl lg:text-8xl font-drama leading-[1.1]">
                    We focus on: <br />
                    <span className="text-accent italic">actual revenue growth.</span>
                </h2>
            </div>
        </section>
    );
};

// SVG Anim Components for Protocol
const MotifAnimation = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 animate-[spin_30s_linear_infinite]">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#FAF8F5" strokeWidth="1" />
        <path d="M50 10 L50 90 M10 50 L90 50" stroke="#FAF8F5" strokeWidth="0.5" opacity="0.5" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#C9A84C" strokeWidth="2" />
    </svg>
);

const LaserAnimation = () => {
    return (
        <div className="relative w-full h-full flex flex-col justify-center gap-4 opacity-40 px-10">
            <div className="w-full h-[1px] bg-[#FAF8F5]/20" />
            <div className="w-full h-[1px] bg-[#FAF8F5]/20" />
            <div className="w-full h-[1px] bg-[#FAF8F5]/20" />
            {/* Laser line */}
            <div className="absolute top-0 bottom-0 w-1 bg-accent/80 blur-[2px] shadow-[0_0_15px_#C9A84C] animate-[pingpong_3s_ease-in-out_infinite]"
                style={{
                    animation: 'laser 4s ease-in-out infinite alternate',
                }}
            />
            <style>{`
        @keyframes laser {
          0% { left: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 90%; opacity: 0; }
        }
      `}</style>
        </div>
    );
}

const WaveformAnimation = () => {
    const pathRef = useRef();
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(pathRef.current, {
                strokeDashoffset: 0,
                duration: 2,
                ease: 'none',
                repeat: -1
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <svg viewBox="0 0 200 100" className="w-full h-full opacity-40 px-10">
            <path
                ref={pathRef}
                d="M0 50 L40 50 L50 20 L60 80 L70 10 L80 90 L90 50 L200 50"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="250"
                strokeDashoffset="250"
            />
        </svg>
    );
}

const Protocol = () => {
    // Uses a specific pinning mechanic
    return (
        <section id="protocol" className="bg-[#111116] py-20 px-4 md:px-0">
            <div className="max-w-4xl mx-auto mb-16 px-6 text-center">
                <h2 className="text-[#FAF8F5] text-4xl md:text-5xl font-bold mb-4">The Methodology</h2>
                <p className="text-[#FAF8F5]/60 text-lg">Rigorous phases to ensure absolute outcome certainty.</p>
            </div>

            <div className="flex flex-col gap-10 max-w-5xl mx-auto px-6 mb-32 relative">
                {/* We use a simple vertical layout since standard scrollTrigger pinning inside React takes more careful layout management. A pure sticky CSS approach works beautifully for stacked cards. */}
                {[
                    { num: '01', title: 'Consulting Stack', desc: 'We use a proprietary, AI-driven consulting stack to dive deep into the heart of your business.', Anim: MotifAnimation },
                    { num: '02', title: 'Generative Edge', desc: 'As AI-natives since 2020, we use proven systems to optimise and scale marketing, sales and operations rapidly and effectively.', Anim: LaserAnimation },
                    { num: '03', title: 'Revenue Deployment', desc: 'We fix real, practical problems and build actual ways to drive revenue & grow.', Anim: WaveformAnimation },
                ].map((step, i) => (
                    <div
                        key={i}
                        className="sticky top-24 md:top-32 w-full h-auto min-h-[500px] md:h-[70vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-[#FAF8F5]/10"
                        style={{
                            backgroundColor: '#0D0D12',
                            marginTop: i > 0 ? '0' : '0',
                        }}
                    >
                        {/* Animation Side */}
                        <div className="w-full md:w-1/2 h-48 md:h-full bg-black/40 relative overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-[#FAF8F5]/5 shrink-0">
                            <step.Anim />
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center flex-1">
                            <span className="font-data text-accent text-sm md:text-lg mb-4 tracking-widest block">{step.num} /</span>
                            <h3 className="text-2xl md:text-4xl text-[#FAF8F5] font-bold mb-4">{step.title}</h3>
                            <p className="text-[#FAF8F5]/70 text-base md:text-xl leading-relaxed">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Founder Section
const Founder = () => {
    return (
        <section id="founder" className="py-24 md:py-32 bg-background relative z-10 border-t border-slate/5">
            <div className="max-w-7xl mx-auto px-6 md:px-16">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                    {/* Image Side */}
                    <div className="w-full lg:w-5/12 relative">
                        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative group shadow-2xl">
                            <img
                                src="/suhail.png"
                                alt="Suhail Haroon"
                                className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-[#FAF8F5] font-bold text-3xl mb-1">Suhail Haroon</h3>
                                <p className="text-accent font-data text-xs tracking-widest uppercase">Founder & CEO</p>
                            </div>
                        </div>
                        {/* Decorative accents */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-slate/10 rounded-[2rem] -z-10 hidden md:block"></div>
                        <div className="absolute -top-6 -left-6 w-32 h-32 border border-accent/20 rounded-[2rem] -z-10 hidden md:block"></div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-7/12">
                        <div className="font-data text-xs uppercase tracking-widest text-slate/50 mb-6 flex items-center gap-2">
                            <ShieldCheck size={14} /> Leadership
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8 leading-tight">
                            Behind every scalable architecture is a <span className="font-drama italic text-accent font-normal block mt-2 whitespace-nowrap">precise engineering foundation.</span>
                        </h2>

                        <div className="space-y-6 text-slate/80 text-base md:text-lg font-light leading-relaxed">
                            <p>
                                With a background rooted in India’s premier technical institutions and capped by a Master’s in Computer Science, the approach here is strictly analytical.
                            </p>
                            <p>
                                Before limiting our private roster, I engineered and deployed AI automation and marketing protocols within the sales infrastructure of Solwearth. By replacing repetitive manual workflows with silent, error-free digital labor, operations were optimized and customer experience was elevated. The system proved so effective that Solwearth transitioned from my employer to a foundational client.
                            </p>
                            <p>
                                Today, my focus is singular: leveraging an AI-native background to fix practical bottlenecks, deploy generative edge systems, and drive actual revenue growth for a strictly limited clientele.
                            </p>
                        </div>

                        <div className="mt-12 pt-10 border-t border-slate/10">
                            <img src="/pixel--punch-high-resolution-logo-grayscale-punch.png" alt="Pixel & Punch" className="h-8 opacity-40 hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Lead Gen Form 
const ContactForm = () => {
    return (
        <section id="contact" className="py-32 bg-background relative z-10">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">Initiate Protocol</h2>
                    <p className="text-textDark/70 text-lg md:text-xl max-w-2xl mx-auto">
                        Book Your 20‑Minute Protocol Call – we’ll map 3 AI plays to add pipeline or remove manual work in the next 90 days
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-primary/5 max-w-2xl mx-auto flex flex-col items-center">
                    <MagneticButton
                        className="w-full bg-primary text-[#FAF8F5] py-5 rounded-full text-lg font-bold hover:bg-black group"
                        onClick={() => window.open('https://cal.com/suhailharoon007/30min?overlayCalendar=true', '_blank')}
                    >
                        <span className="flex items-center justify-center gap-2">
                            Map Your 3 AI Plays <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </MagneticButton>
                    <p className="mt-8 text-xs text-textDark/50 font-data tracking-widest uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                        Secure connection via Cal.com
                    </p>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-[#0A0A0F] text-[#FAF8F5] rounded-t-[4rem] px-8 py-20 mt-[-4rem] relative z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-2">
                    <div className="font-bold tracking-tighter text-3xl mb-4 flex items-center gap-3">
                        <img src="/pixel--punch-high-resolution-logo-grayscale-transparent-punch.png" alt="Pixel & Punch Logo" className="h-10 opacity-90" />
                    </div>
                    <p className="text-[#FAF8F5]/60 max-w-sm mb-12">Reclaim your time and accelerate your bottom line with intelligent marketing and automation systems. Simple, scalable, and beautifully efficient.</p>

                    <div className="inline-flex items-center gap-3 bg-[#FAF8F5]/5 px-4 py-2 rounded-full border border-[#FAF8F5]/10 font-data text-xs tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        SYSTEM OPERATIONAL
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-xl">Index</h4>
                    <ul className="space-y-4 text-[#FAF8F5]/70">
                        <li><a href="#features" className="hover:text-accent transition-colors">Expertise</a></li>
                        <li><a href="#philosophy" className="hover:text-accent transition-colors">Philosophy</a></li>
                        <li><a href="#protocol" className="hover:text-accent transition-colors">Methodology</a></li>
                        <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-xl">Legal</h4>
                    <ul className="space-y-4 text-[#FAF8F5]/70">
                        <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Cookie Preferences</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#FAF8F5]/10 text-center md:text-left text-sm text-[#FAF8F5]/40 flex flex-col md:flex-row justify-between items-center">
                <p>&copy; {new Date().getFullYear()} Pixel & Punch. All rights reserved.</p>
                <p className="font-data text-xs mt-4 md:mt-0">V 1.0.4</p>
            </div>
        </footer>
    );
};

function App() {
    return (
        <div className="font-sans antialiased bg-[#FAF8F5]">
            <Navbar />
            <Hero />
            <Features />
            <Philosophy />
            <Protocol />
            <Founder />
            <ContactForm />
            <Footer />
        </div>
    );
}

export default App;
