import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Play, X, Menu, Star, Globe, Shield, Zap, BarChart3, Truck, FileCheck, Users, Phone, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ThemeToggle from "@/components/ThemeToggle";

const BharatBridge = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [counters, setCounters] = useState({ msmes: 0, opportunity: 0, delivery: 0 });
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
            if (entry.target.id === 'mission-section') {
              animateCounters();
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
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

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsWaitlistOpen(false);
    toast({
      title: "Welcome aboard! 🎉",
      description: "Check your email for confirmation and next steps.",
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactOpen(false);
    toast({
      title: "Message received! 📧",
      description: "We'll respond within 24 hours.",
    });
  };

  const handleLearnMore = (feature) => {
    setSelectedFeature(feature);
    setIsLearnMoreOpen(true);
  };

  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Zero-Code Storefront",
      description: "Professional drag-drop templates with multilingual support. Build your global presence in minutes.",
      demo: "Live template builder with 20+ professional themes",
      details: "Create stunning, professional storefronts without any coding knowledge. Our drag-and-drop interface offers 20+ customizable templates optimized for global markets. Each template includes multilingual support, mobile responsiveness, and built-in SEO optimization to help your products reach international customers effectively.",
      gradient: "premium-card-1"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Market Intelligence",
      description: "Smart market analysis, pricing optimization & promotion strategies powered by global trade data.",
      demo: "AI suggests optimal strategies for 190+ countries",
      details: "Leverage advanced AI algorithms that analyze global trade patterns, market trends, and competitive pricing across 190+ countries. Get real-time recommendations for optimal pricing, promotional strategies, and market entry timing to maximize your export success.",
      gradient: "premium-card-2"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Blockchain Verification",
      description: "Complete product traceability from origin to destination. Build unshakeable trust globally.",
      demo: "QR-code verification for complete transparency",
      details: "Ensure product authenticity and build customer trust with our blockchain-powered verification system. Every product gets a unique QR code that provides complete traceability from manufacturing to delivery, preventing counterfeiting and building international buyer confidence.",
      gradient: "premium-card-3"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Smart Logistics",
      description: "Integrated fulfillment network with real-time tracking and 3-day global delivery promise.",
      demo: "Live tracking across 40+ countries",
      details: "Access our intelligent logistics network spanning 40+ countries with predictive routing, automated customs handling, and real-time tracking. Our AI-optimized delivery system ensures your products reach customers within 3 days while minimizing shipping costs.",
      gradient: "premium-card-1"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive business intelligence with sales forecasts, inventory optimization and market insights.",
      demo: "Professional dashboard with predictive analytics",
      details: "Make data-driven decisions with our comprehensive analytics suite. Get detailed insights on sales performance, inventory optimization, customer behavior, and market trends. Our predictive analytics help you forecast demand and plan inventory effectively.",
      gradient: "premium-card-2"
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Compliance Suite",
      description: "Automated export documentation, regulatory compliance, and step-by-step guidance.",
      demo: "One-click compliant document generation",
      details: "Navigate complex export regulations effortlessly with our automated compliance suite. Generate all required documentation with one click, get real-time regulatory updates, and receive step-by-step guidance for each destination country's requirements.",
      gradient: "premium-card-3"
    }
  ];

  const testimonials = [
    {
      name: "Lakshmi Ramachandran",
      business: "Kanchipuram Silk Exports",
      quote: "Our international orders increased by 300% within the first quarter. The professional platform gave us instant credibility.",
      rating: 5
    },
    {
      name: "Rohit Sharma",
      business: "Himalayan Spice Co.",
      quote: "Export compliance used to take weeks. Now it's automated and error-free. Our first European contract was seamless.",
      rating: 5
    },
    {
      name: "Ayesha Khan",
      business: "Heritage Handicrafts",
      quote: "The blockchain verification helped us command premium prices. International buyers trust our authenticity instantly.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <ThemeToggle />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${isScrolled ? 'glass-effect border-b border-border/50' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-serif text-2xl font-bold text-primary animate-slide-in-bounce">
            BharatBridge
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="hover:text-primary transition-colors duration-300 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#features" className="hover:text-primary transition-colors duration-300 relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#demo" className="hover:text-primary transition-colors duration-300 relative group">
              Demo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="hover:text-primary transition-colors duration-300 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          <Button className="md:hidden" variant="ghost" size="sm">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 luxury-gradient-1"></div>
          {/* Floating Elements */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full floating-animation ${
                i % 3 === 0 ? 'bg-primary/30' : i % 3 === 1 ? 'bg-secondary/30' : 'bg-accent/30'
              }`}
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.3}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BharatBridge
            </span>
          </h1>
          <h2 className="font-serif text-2xl md:text-4xl font-semibold mb-6 text-secondary animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            India's Professional Export Gateway
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            Empower your MSME with <span className="text-primary font-semibold">professional export solutions</span>, 
            <span className="text-secondary font-semibold"> AI-powered insights</span>, and 
            <span className="text-accent font-semibold"> blockchain verification</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in" style={{animationDelay: '0.6s'}}>
            <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
              <DialogTrigger asChild>
                <Button className="professional-gradient text-white font-semibold text-lg px-8 py-4 hover:scale-105 transition-transform duration-300 elegant-shadow">
                  Join the Waitlist
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-effect border-primary/50">
                <DialogHeader>
                  <DialogTitle className="text-primary font-serif">Join Our Professional Network</DialogTitle>
                  <DialogDescription>
                    Be among the first to access BharatBridge's professional export platform.
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
                  <Button type="submit" className="w-full professional-gradient text-white font-semibold">
                    Secure My Position
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              className="border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold text-lg px-8 py-4 hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-2 w-5 h-5" />
              View Live Demo
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <ChevronDown className="w-8 h-8 text-secondary" />
        </div>
      </section>

      {/* About & Founders */}
      <section id="about" className={`py-20 relative transition-all duration-1000 ${visibleSections.has('about') ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="absolute inset-0 luxury-gradient-2"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex space-x-6 justify-center md:justify-start">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1 wiggle">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="absolute -inset-2 rounded-full border border-primary/30 animate-pulse-soft"></div>
                </div>
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-accent p-1 wiggle" style={{animationDelay: '0.5s'}}>
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <Users className="w-8 h-8 text-secondary" />
                    </div>
                  </div>
                  <div className="absolute -inset-2 rounded-full border border-secondary/30 animate-pulse-soft"></div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm text-secondary font-semibold mb-2 uppercase tracking-wider">Founders</p>
                <p className="text-xl font-serif font-semibold">Shourya Pant & Shivang Jagwan</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="font-serif text-4xl font-bold text-primary">
                Built with Purpose
              </h2>
              <p className="text-lg leading-relaxed">
                Founded by <span className="text-primary font-semibold">Shourya Pant</span> and <span className="text-secondary font-semibold">Shivang Jagwan</span>—two passionate engineers committed to democratizing global trade for India's 63 million micro-businesses.
              </p>
              <p className="text-lg leading-relaxed">
                From Uttarakhand's mountain enterprises to Tamil Nadu's traditional crafts, they witnessed exceptional products struggling with export complexities. <span className="text-primary font-semibold">BharatBridge is their professional solution.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Statistics */}
      <section id="mission-section" className={`py-20 relative overflow-hidden transition-all duration-1000 ${visibleSections.has('mission-section') ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="absolute inset-0 luxury-gradient-3"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl font-bold text-secondary mb-8">
              Our Mission
            </h2>
            <p className="text-2xl leading-relaxed max-w-4xl mx-auto">
              To unlock India's <span className="text-secondary font-bold">\$400 billion export potential</span> through a comprehensive digital export platform—
              <span className="text-primary font-bold"> professional, intuitive, and completely trustworthy.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-effect border-primary/30 text-center hover:scale-105 transition-all duration-500 elegant-shadow cartoon-bounce">
              <CardContent className="p-8">
                <div className="text-5xl font-serif font-black text-primary mb-4">
                  {counters.msmes}M
                </div>
                <p className="text-lg font-semibold">MSMEs Ready</p>
                <p className="text-sm text-muted-foreground">Micro, Small & Medium Enterprises</p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-secondary/30 text-center hover:scale-105 transition-all duration-500 elegant-shadow cartoon-bounce" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-8">
                <div className="text-5xl font-serif font-black text-secondary mb-4">
                  \${counters.opportunity}B
                </div>
                <p className="text-lg font-semibold">Market Opportunity</p>
                <p className="text-sm text-muted-foreground">Untapped global export potential</p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-accent/30 text-center hover:scale-105 transition-all duration-500 elegant-shadow cartoon-bounce" style={{animationDelay: '0.4s'}}>
              <CardContent className="p-8">
                <div className="text-5xl font-serif font-black text-accent mb-4">
                  {counters.delivery}%
                </div>
                <p className="text-lg font-semibold">Efficiency Gain</p>
                <p className="text-sm text-muted-foreground">With our integrated platform</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 relative transition-all duration-1000 ${visibleSections.has('features') ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="absolute inset-0 luxury-gradient-1"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-serif text-5xl font-bold text-center text-secondary mb-16">
            Professional Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`glass-effect border-primary/30 hover:scale-105 transition-all duration-500 group elegant-shadow ${feature.gradient}`}>
                <CardHeader>
                  <div className="text-primary mb-4 group-hover:animate-wiggle">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-serif">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/10 p-3 rounded-lg mb-4">
                    <p className="text-sm text-primary font-semibold">
                      ✨ {feature.demo}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => handleLearnMore(feature)}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learn More Modal */}
      <Dialog open={isLearnMoreOpen} onOpenChange={setIsLearnMoreOpen}>
        <DialogContent className="glass-effect border-primary/50 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-primary font-serif text-2xl flex items-center gap-3">
              {selectedFeature?.icon}
              {selectedFeature?.title}
            </DialogTitle>
            <DialogDescription className="text-lg mt-4">
              {selectedFeature?.details}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <p className="text-primary font-semibold">
              ✨ {selectedFeature?.demo}
            </p>
          </div>
          <div className="flex gap-4 mt-6">
            <Button className="professional-gradient text-white flex-1" onClick={() => setIsWaitlistOpen(true)}>
              Join Waitlist
            </Button>
            <Button variant="outline" className="border-secondary text-secondary" onClick={() => setIsLearnMoreOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dashboard Preview */}
      <section id="demo" className={`py-20 relative overflow-hidden transition-all duration-1000 ${visibleSections.has('demo') ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="absolute inset-0 luxury-gradient-2">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full floating-animation opacity-60"
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
            <h2 className="font-serif text-5xl font-bold text-primary mb-8">
              Professional Dashboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the comprehensive dashboard that will transform your export operations
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="glass-effect border-secondary/50 overflow-hidden elegant-shadow">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="glass-effect p-4 rounded-lg border border-primary/30 hover:scale-105 transition-transform duration-300">
                      <h4 className="text-primary font-semibold">Revenue</h4>
                      <p className="text-2xl font-bold">₹2,45,680</p>
                      <p className="text-sm text-green-500">↗ +24% this month</p>
                    </div>
                    <div className="glass-effect p-4 rounded-lg border border-secondary/30 hover:scale-105 transition-transform duration-300">
                      <h4 className="text-secondary font-semibold">Active Orders</h4>
                      <p className="text-2xl font-bold">47</p>
                      <p className="text-sm text-yellow-500">12 shipping today</p>
                    </div>
                    <div className="glass-effect p-4 rounded-lg border border-accent/30 hover:scale-105 transition-transform duration-300">
                      <h4 className="text-accent font-semibold">Global Reach</h4>
                      <p className="text-2xl font-bold">23</p>
                      <p className="text-sm text-blue-500">Countries served</p>
                    </div>
                    <div className="glass-effect p-4 rounded-lg border border-primary/30 hover:scale-105 transition-transform duration-300">
                      <h4 className="text-primary font-semibold">Trust Score</h4>
                      <p className="text-2xl font-bold">94%</p>
                      <p className="text-sm text-green-500">Excellent rating</p>
                    </div>
                  </div>
                  
                  <div className="glass-effect p-6 rounded-lg border border-border">
                    <h3 className="text-xl font-serif mb-4 text-secondary">Live Shipment Tracking</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center hover:bg-primary/10 p-2 rounded transition-colors">
                        <span>Premium Silk Collection to California</span>
                        <span className="text-green-500 font-semibold">✈ In Transit</span>
                      </div>
                      <div className="flex justify-between items-center hover:bg-secondary/10 p-2 rounded transition-colors">
                        <span>Organic Spice Blend to London</span>
                        <span className="text-yellow-500 font-semibold">📦 Customs Clearance</span>
                      </div>
                      <div className="flex justify-between items-center hover:bg-accent/10 p-2 rounded transition-colors">
                        <span>Handcrafted Jewelry to Sydney</span>
                        <span className="text-blue-500 font-semibold">🚛 Out for Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center mt-8">
              <Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold text-lg px-8 py-4 hover:scale-105 transition-all duration-300 elegant-shadow">
                Request Professional Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 relative transition-all duration-1000 ${visibleSections.has('testimonials') ? 'animate-fade-in-up' : 'opacity-0'}`} id="testimonials">
        <div className="absolute inset-0 luxury-gradient-3"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-serif text-5xl font-bold text-center text-secondary mb-16">
            Success Stories
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Card className="glass-effect border-primary/50 min-h-[300px] flex items-center elegant-shadow">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-primary fill-current animate-wiggle" style={{animationDelay: `${i * 0.1}s`}} />
                  ))}
                </div>
                
                <blockquote className="text-2xl font-medium mb-6 leading-relaxed italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div>
                  <p className="text-primary font-semibold text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-secondary">
                    {testimonials[currentTestimonial].business}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-muted'
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
        <div className="absolute inset-0 luxury-gradient-1"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="font-serif text-5xl font-bold text-primary mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Join thousands of Indian MSMEs already on the waitlist. Be part of the export revolution.
          </p>
          
          <Card className="max-w-2xl mx-auto glass-effect border-primary/50">
            <CardContent className="p-8">
              <form onSubmit={handleWaitlistSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" className="glass-effect border-primary/30" />
                  <Input placeholder="Email" type="email" className="glass-effect border-primary/30" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Business Name" className="glass-effect border-primary/30" />
                  <Select>
                    <SelectTrigger className="glass-effect border-primary/30">
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
                
                <div className="bg-accent/10 p-4 rounded-lg glass-effect">
                  <p className="text-sm text-accent">
                    💡 <strong>Referral Bonus:</strong> Invite colleagues to climb higher in line!
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Input 
                      value="bharatbridge.in/ref/yourcode" 
                      readOnly 
                      className="glass-effect border-accent/30 text-sm" 
                    />
                    <Button size="sm" variant="outline" className="text-accent border-accent">
                      Copy
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full professional-gradient text-white font-bold text-lg py-4 hover:scale-105 transition-all duration-300">
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
        <div className="absolute inset-0 luxury-gradient-2">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full floating-animation opacity-60"
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
          <h2 className="font-serif text-5xl font-bold text-center text-secondary mb-16">
            Get in Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="glass-effect border-primary/50">
              <CardHeader>
                <CardTitle className="text-primary font-serif">Send us a Message</CardTitle>
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
                  <Button type="submit" className="w-full professional-gradient text-white font-bold">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-8">
              <Card className="glass-effect border-secondary/50">
                <CardHeader>
                  <CardTitle className="text-secondary font-serif">Contact Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">support@bharatbridge.in</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-secondary" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Users className="w-6 h-6 text-accent" />
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-muted-foreground">Chat with our team</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-effect border-primary/50">
                <CardHeader>
                  <CardTitle className="text-primary font-serif">Office Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-secondary">9 AM - 7 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-secondary">10 AM - 4 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background/80 backdrop-blur-lg border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-secondary">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-secondary">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-secondary">Press</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-secondary">News</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-serif text-xl font-bold text-secondary mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Dashboard Demo</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-secondary">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-secondary">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-secondary">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-secondary">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-serif text-xl font-bold text-secondary mb-4">Legal</h3>
              <ul className="space-y-2 mb-6">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Cookie Policy</a></li>
              </ul>
              
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-secondary">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2025 BharatBridge. Empowering India's MSMEs. ❤️ Made in India
            </p>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
        <DialogContent className="glass-effect border-primary/50">
          <DialogHeader>
            <DialogTitle className="text-primary font-serif">Join Our Professional Network</DialogTitle>
            <DialogDescription>
              Be among the first to access BharatBridge's professional export platform.
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
            <Button type="submit" className="w-full professional-gradient text-white font-semibold">
              Secure My Position
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Contact Modal */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="glass-effect border-secondary/50">
          <DialogHeader>
            <DialogTitle className="text-secondary font-serif">Contact Our Team</DialogTitle>
            <DialogDescription>
              Get in touch with our experts for personalized assistance.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <Label htmlFor="contact-name-modal">Name</Label>
              <Input id="contact-name-modal" placeholder="Your name" required />
            </div>
            <div>
              <Label htmlFor="contact-email-modal">Email</Label>
              <Input id="contact-email-modal" type="email" placeholder="your@email.com" required />
            </div>
            <div>
              <Label htmlFor="contact-message">Message</Label>
              <Textarea id="contact-message" placeholder="How can we help you?" rows={4} required />
            </div>
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold">
              Send Message
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BharatBridge;
