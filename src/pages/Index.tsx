import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Code2, Cpu, GitBranch, Layers, Timer, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PatternCard from "@/components/PatternCard";
import { patterns, getIconComponent } from "@/data/patterns";

const Index = () => {
  const featuredPatterns = patterns.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Zap className="h-4 w-4" />
              Master 16 Essential Patterns
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Learn & Master
              <br />
              <span className="gradient-text">Data Structures</span>
              <br />
              & Algorithms
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Deep dive into DSA with C++. Understand the logic, master the syntax, 
              and visualize complexity with interactive explanations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/patterns">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box gap-2 text-base px-8">
                  Start Learning
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/complexity">
                <Button size="lg" variant="outline" className="border-border hover:bg-secondary gap-2 text-base">
                  <TrendingUp className="h-4 w-4" />
                  Big O Notation
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Code Preview */}
          <div className="mt-16 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="relative rounded-xl overflow-hidden border border-border bg-card shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <span className="text-sm font-mono text-muted-foreground ml-2">sliding_window.cpp</span>
              </div>
              <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <code>
                  <span className="code-comment">{"// Maximum sum subarray of size k"}</span>{"\n"}
                  <span className="code-keyword">int</span> <span className="code-function">maxSum</span>(vector&lt;<span className="code-keyword">int</span>&gt;&amp; arr, <span className="code-keyword">int</span> k) {"{"}{"\n"}
                  {"    "}<span className="code-keyword">int</span> windowSum = <span className="code-number">0</span>, maxSum = <span className="code-number">0</span>;{"\n"}
                  {"    "}<span className="code-keyword">for</span> (<span className="code-keyword">int</span> i = <span className="code-number">0</span>; i &lt; arr.<span className="code-function">size</span>(); i++) {"{"}{"\n"}
                  {"        "}windowSum += arr[i];{"\n"}
                  {"        "}<span className="code-keyword">if</span> (i &gt;= k) windowSum -= arr[i - k];{"\n"}
                  {"        "}<span className="code-keyword">if</span> (i &gt;= k - <span className="code-number">1</span>) maxSum = <span className="code-function">max</span>(maxSum, windowSum);{"\n"}
                  {"    "}{"}"}{"\n"}
                  {"    "}<span className="code-keyword">return</span> maxSum;{"\n"}
                  {"}"}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Master DSA</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive learning resources designed for real understanding, not just memorization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: "Clear Theory",
                description: "Deep explanations with real-world analogies that make complex concepts click."
              },
              {
                icon: <Code2 className="h-6 w-6" />,
                title: "C++ Code",
                description: "Production-ready implementations with detailed syntax breakdowns."
              },
              {
                icon: <Timer className="h-6 w-6" />,
                title: "Complexity Analysis",
                description: "Visual time & space complexity with Big O notation explained."
              },
              {
                icon: <Layers className="h-6 w-6" />,
                title: "16 Patterns",
                description: "All essential algorithmic patterns that cover 90% of interview problems."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patterns Preview */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Algorithmic <span className="gradient-text">Patterns</span>
              </h2>
              <p className="text-muted-foreground">
                Master these patterns to solve any coding problem.
              </p>
            </div>
            <Link to="/patterns" className="hidden md:flex items-center gap-2 text-primary hover:underline font-medium">
              View All 16 Patterns
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPatterns.map((pattern) => {
              const IconComponent = getIconComponent(pattern.icon);
              return (
                <PatternCard
                  key={pattern.id}
                  id={pattern.id}
                  number={pattern.number}
                  title={pattern.title}
                  description={pattern.description}
                  difficulty={pattern.difficulty}
                  timeComplexity={pattern.timeComplexity}
                  icon={<IconComponent className="h-6 w-6" />}
                />
              );
            })}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/patterns">
              <Button variant="outline" className="gap-2">
                View All Patterns
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
            <Cpu className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Master <span className="gradient-text">Algorithms</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start with understanding Big O notation and complexity analysis, 
              then dive into the patterns that will transform your problem-solving skills.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/complexity">
                <Button size="lg" variant="outline" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Learn Big O Notation
                </Button>
              </Link>
              <Link to="/patterns">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  Explore All Patterns
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-bold">DSAMaster</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Master Data Structures & Algorithms with C++
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
