
import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Play, X, Menu, Star, Globe, Shield, Zap, BarChart3, Truck, FileCheck, Users, Phone, Mail, MessageCircle, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const BharatBridge = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [counters, setCounters] = useState({ msmes: 0, opportunity: 0, delivery: 0 });
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const start = Date.now();
    const targets = { msmes: 63, opportunity: 400, delivery: 40 };
    
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      
      setCounters({
        msmes: Math.floor(targets.msmes * progress),
        opportunity: Math.floor(targets.opportunity * progress),
        delivery: Math.floor(targets.delivery * progress)
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === 'mission-section') {
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    const missionSection = document.getElementById('mission-section');
    if (missionSection) {
      observer.observe(missionSection);
    }

    return () => observer.disconnect();
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsWaitlistOpen(false);
    toast({
      title: "You're in! 🎉",
      description: "Check your email for confirmation and next steps.",
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactOpen(false);
    toast({
      title: "Message sent! 📧",
      description: "We'll get back to you within 24 hours.",
    });
  };

  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Zero-Code Storefront",
      description: "Drag-drop templates with multilingual UX. Build your global store in minutes.",
      demo: "Live template builder with 12+ themes"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Market-Match",
      description: "Smart region, price & promotion engine powered by global trade data.",
      demo: "AI suggests optimal pricing for 190+ countries"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Blockchain Provenance",
      description: "QR-code traceability from farm to shelf. Build trust globally.",
      demo: "Scan QR to see complete journey"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Logistics & Warehousing",
      description: "On-demand micro-fulfillment with 3-day global delivery promise.",
      demo: "Real-time tracking across 40+ countries"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Tiered Analytics",
      description: "Real-time sales, forecasts, inventory alerts with actionable insights.",
      demo: "Live dashboard with predictive metrics"
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Compliance Wizard",
      description: "Auto-generate export documents step-by-step. No paperwork hassles.",
      demo: "One-click document generation"
    }
  ];

  const testimonials = [
    {
      name: "Lakshmi R.",
      business: "Kanchipuram Weaves",
      quote: "Orders tripled within weeks! The AI recommendations are spot-on for my silk sarees.",
      rating: 5
    },
    {
      name: "Rohit S.",
      business: "Kumaon Spices",
      quote: "No more customs confusion—my first European export took just 3 days from order to delivery!",
      rating: 5
    },
    {
      name: "Ayesha M.",
      business: "Lucknow Chikan",
      quote: "My first USA shipment sold out in 48 hours. The blockchain trust feature is a game-changer!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-deep-black text-bright-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-deep-black/80 backdrop-blur-md border-b border-neon-saffron/20' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-orbitron text-2xl font-bold neon-glow-saffron">
            BharatBridge
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="hover-glow-teal">About</a>
            <a href="#features" className="hover-glow-teal">Features</a>
            <a href="#demo" className="hover-glow-teal">Demo</a>
            <a href="#contact" className="hover-glow-teal">Contact</a>
          </div>
          <Button className="md:hidden" variant="ghost" size="sm">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-saffron/10 via-transparent to-electric-teal/10"></div>
          {/* Animated Trade Routes */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-neon-saffron to-transparent animate-pulse"
              style={{
                top: `${20 + i * 10}%`,
                left: `-50%`,
                width: `200%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
                transform: `rotate(${-30 + i * 10}deg)`
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-6 animate-counter-up">
            <span className="neon-glow-saffron">BharatBridge</span>
          </h1>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-6 text-electric-teal">
            India's Gateway to the World
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
            Empower your MSME with <span className="text-neon-saffron font-semibold">zero-code export</span>, 
            <span className="text-electric-teal font-semibold"> AI insights</span>, and 
            <span className="text-neon-saffron font-semibold"> blockchain trust</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-saffron text-deep-black font-bold text-lg px-8 py-4 hover-glow-saffron">
                  Join the Waitlist
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-deep-black border-neon-saffron">
                <DialogHeader>
                  <DialogTitle className="text-neon-saffron font-orbitron">Join the Waitlist</DialogTitle>
                  <DialogDescription>
                    Be among the first to access BharatBridge when we launch.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your full name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                  <div>
                    <Label htmlFor="business">Business Name</Label>
                    <Input id="business" placeholder="Your business name" required />
                  </div>
                  <div>
                    <Label htmlFor="category">Product Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="textiles">Textiles & Garments</SelectItem>
                        <SelectItem value="spices">Spices & Food</SelectItem>
                        <SelectItem value="handicrafts">Handicrafts</SelectItem>
                        <SelectItem value="jewelry">Jewelry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full gradient-saffron text-deep-black font-bold">
                    Secure My Spot
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              className="border-electric-teal text-electric-teal hover:bg-electric-teal hover:text-deep-black font-bold text-lg px-8 py-4"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-2 w-5 h-5" />
              See Dashboard Demo
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-electric-teal" />
        </div>
      </section>

      {/* About & Founders */}
      <section id="about" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-saffron/5 via-transparent to-neon-saffron/5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-saffron to-electric-teal p-1">
                    <div className="w-full h-full rounded-full bg-deep-black flex items-center justify-center">
                      <Users className="w-8 h-8 text-neon-saffron" />
                    </div>
                  </div>
                  <div className="absolute -inset-2 rounded-full border border-neon-saffron/30 animate-pulse"></div>
                </div>
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-electric-teal to-neon-saffron p-1">
                    <div className="w-full h-full rounded-full bg-deep-black flex items-center justify-center">
                      <Users className="w-8 h-8 text-electric-teal" />
                    </div>
                  </div>
                  <div className="absolute -inset-2 rounded-full border border-electric-teal/30 animate-pulse"></div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm text-electric-teal font-semibold mb-2">FOUNDERS</p>
                <p className="text-lg font-semibold">Shourya Pant & Shivang Jagwan</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="font-orbitron text-4xl font-bold neon-glow-teal">
                Born from Passion
              </h2>
              <p className="text-lg leading-relaxed">
                Founded by <span className="text-neon-saffron font-semibold">Shourya Pant</span> and <span className="text-electric-teal font-semibold">Shivang Jagwan</span>—two engineers driven to shatter export barriers for India's 63 million micro-businesses.
              </p>
              <p className="text-lg leading-relaxed">
                From Uttarakhand's valleys to Tamil Nadu's spice markets, they saw first-hand the promise lost in paperwork. <span className="text-neon-saffron font-semibold">BharatBridge is their answer.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Aim */}
      <section id="mission-section" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 diagonal-stripes opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-5xl font-bold neon-glow-saffron mb-8">
              Our Aim
            </h2>
            <p className="text-2xl leading-relaxed max-w-4xl mx-auto">
              To unlock India's <span className="text-electric-teal font-bold">\$400 billion export potential</span> by delivering an end-to-end digital export super-app—
              <span className="text-neon-saffron font-bold"> zero code, zero confusion, zero counterfeits.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-deep-black/50 border-neon-saffron/30 text-center hover-glow-saffron">
              <CardContent className="p-8">
                <div className="text-5xl font-orbitron font-black text-neon-saffron mb-4 animate-counter-up">
                  {counters.msmes}M
                </div>
                <p className="text-lg font-semibold">MSMEs Waiting</p>
                <p className="text-sm text-gray-400">Micro, Small & Medium Enterprises</p>
              </CardContent>
            </Card>

            <Card className="bg-deep-black/50 border-electric-teal/30 text-center hover-glow-teal">
              <CardContent className="p-8">
                <div className="text-5xl font-orbitron font-black text-electric-teal mb-4 animate-counter-up">
                  \${counters.opportunity}B
                </div>
                <p className="text-lg font-semibold">Export Opportunity</p>
                <p className="text-sm text-gray-400">Untapped potential in global markets</p>
              </CardContent>
            </Card>

            <Card className="bg-deep-black/50 border-neon-saffron/30 text-center hover-glow-saffron">
              <CardContent className="p-8">
                <div className="text-5xl font-orbitron font-black text-neon-saffron mb-4 animate-counter-up">
                  {counters.delivery}%
                </div>
                <p className="text-lg font-semibold">Faster Delivery</p>
                <p className="text-sm text-gray-400">With our smart logistics network</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Deep-Dive */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="font-orbitron text-5xl font-bold text-center neon-glow-teal mb-16">
            Powerful Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-deep-black/70 border-electric-teal/30 hover-glow-teal group">
                <CardHeader>
                  <div className="text-neon-saffron mb-4 group-hover:animate-neon-glow">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-orbitron">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-electric-teal/10 p-3 rounded-lg mb-4">
                    <p className="text-sm text-electric-teal font-semibold">
                      ✨ {feature.demo}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="border-neon-saffron text-neon-saffron hover:bg-neon-saffron hover:text-deep-black">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="demo" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-neon-saffron rounded-full animate-particle-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-5xl font-bold neon-glow-saffron mb-8">
              Dashboard Preview
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get a glimpse of the powerful dashboard that will transform your export business
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="bg-deep-black/80 border-electric-teal/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-neon-saffron/20 to-electric-teal/20 p-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-deep-black/70 p-4 rounded-lg border border-neon-saffron/30">
                      <h4 className="text-neon-saffron font-semibold">Total Sales</h4>
                      <p className="text-2xl font-bold">₹2,45,680</p>
                      <p className="text-sm text-green-400">↗ +24% this month</p>
                    </div>
                    <div className="bg-deep-black/70 p-4 rounded-lg border border-electric-teal/30">
                      <h4 className="text-electric-teal font-semibold">Active Orders</h4>
                      <p className="text-2xl font-bold">47</p>
                      <p className="text-sm text-yellow-400">12 shipping today</p>
                    </div>
                    <div className="bg-deep-black/70 p-4 rounded-lg border border-neon-saffron/30">
                      <h4 className="text-neon-saffron font-semibold">Countries</h4>
                      <p className="text-2xl font-bold">23</p>
                      <p className="text-sm text-blue-400">New: Australia</p>
                    </div>
                    <div className="bg-deep-black/70 p-4 rounded-lg border border-electric-teal/30">
                      <h4 className="text-electric-teal font-semibold">AI Score</h4>
                      <p className="text-2xl font-bold">94%</p>
                      <p className="text-sm text-green-400">Excellent rating</p>
                    </div>
                  </div>
                  
                  <div className="bg-deep-black/70 p-6 rounded-lg border border-gray-600">
                    <h3 className="text-xl font-orbitron mb-4 text-electric-teal">Live Shipment Tracker</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Silk Sarees to California</span>
                        <span className="text-green-400">✈ In Transit</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Spice Mix to London</span>
                        <span className="text-yellow-400">📦 Customs</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Handicrafts to Sydney</span>
                        <span className="text-blue-400">🚛 Out for Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center mt-8">
              <Button className="gradient-teal text-deep-black font-bold text-lg px-8 py-4 hover-glow-teal">
                Request Live Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-electric-teal/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-orbitron text-5xl font-bold text-center neon-glow-electric-teal mb-16">
            Success Stories
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-deep-black/80 border-electric-teal/50 min-h-[300px] flex items-center">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-neon-saffron fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-2xl font-medium mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div>
                  <p className="text-neon-saffron font-semibold text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-electric-teal">
                    {testimonials[currentTestimonial].business}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-neon-saffron' : 'bg-gray-600'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Waitlist Re-emphasized */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-saffron/10 via-electric-teal/10 to-neon-saffron/10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="font-orbitron text-5xl font-bold neon-glow-saffron mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Join thousands of Indian MSMEs already on the waitlist. Be part of the export revolution.
          </p>
          
          <Card className="max-w-2xl mx-auto bg-deep-black/80 border-neon-saffron/50">
            <CardContent className="p-8">
              <form onSubmit={handleWaitlistSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" className="bg-deep-black/50 border-gray-600" />
                  <Input placeholder="Email" type="email" className="bg-deep-black/50 border-gray-600" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Business Name" className="bg-deep-black/50 border-gray-600" />
                  <Select>
                    <SelectTrigger className="bg-deep-black/50 border-gray-600">
                      <SelectValue placeholder="Product Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="textiles">Textiles & Garments</SelectItem>
                      <SelectItem value="spices">Spices & Food</SelectItem>
                      <SelectItem value="handicrafts">Handicrafts</SelectItem>
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="bg-electric-teal/10 p-4 rounded-lg">
                  <p className="text-sm text-electric-teal">
                    💡 <strong>Referral Bonus:</strong> Invite colleagues to climb higher in line!
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Input 
                      value="bharatbridge.in/ref/yourcode" 
                      readOnly 
                      className="bg-deep-black/50 border-gray-600 text-sm" 
                    />
                    <Button size="sm" variant="outline" className="text-electric-teal border-electric-teal">
                      Copy
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full gradient-saffron text-deep-black font-bold text-lg py-4 hover-glow-saffron">
                  Secure My Spot
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact & Support */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-neon-saffron rounded-full animate-particle-float opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-orbitron text-5xl font-bold text-center neon-glow-electric-teal mb-16">
            Get in Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="bg-deep-black/80 border-neon-saffron/50">
              <CardHeader>
                <CardTitle className="text-neon-saffron font-orbitron">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Name</Label>
                      <Input id="contact-name" placeholder="Your name" />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="topic">Topic</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="demo">Request Demo</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="press">Press & Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us how we can help..." rows={4} />
                  </div>
                  <Button type="submit" className="w-full gradient-saffron text-deep-black font-bold">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-8">
              <Card className="bg-deep-black/80 border-electric-teal/50">
                <CardHeader>
                  <CardTitle className="text-electric-teal font-orbitron">Contact Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-neon-saffron" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-300">support@bharatbridge.in</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-electric-teal" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-gray-300">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MessageCircle className="w-6 h-6 text-neon-saffron" />
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-gray-300">Chat with our team</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-deep-black/80 border-neon-saffron/50">
                <CardHeader>
                  <CardTitle className="text-neon-saffron font-orbitron">Office Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-electric-teal">9 AM - 7 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-electric-teal">10 AM - 4 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-gray-400">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-black border-t border-gray-800 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-orbitron text-xl font-bold text-neon-saffron mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-electric-teal">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-electric-teal">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-electric-teal">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-electric-teal">News</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-orbitron text-xl font-bold text-electric-teal mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-neon-saffron">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-neon-saffron">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-neon-saffron">Dashboard Demo</a></li>
                <li><a href="#" className="text-gray-400 hover:text-neon-saffron">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-orbitron text-xl font-bold text-neon-saffron mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-electric-teal">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-electric-teal">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-electric-teal">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-electric-teal">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-orbitron text-xl font-bold text-electric-teal mb-4">Legal</h3>
              <ul className="space-y-2 mb-6">
                <li><a href="#" className="text-gray-400 hover:text-neon-saffron">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-neon-saffron">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-neon-saffron">Cookie Policy</a></li>
              </ul>
              
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-neon-saffron">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-electric-teal">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-neon-saffron">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 BharatBridge. Empowering India's MSMEs. ❤️ Made in India
            </p>
          </div>
        </div>
      </footer>

      {/* Live Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          className="gradient-teal text-deep-black rounded-full w-16 h-16 hover-glow-teal group"
          onClick={() => setIsContactOpen(true)}
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        </Button>
      </div>
    </div>
  );
};

export default BharatBridge;
