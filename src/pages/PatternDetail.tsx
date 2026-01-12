import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Code2, HardDrive, Lightbulb, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import CodeBlock from "@/components/CodeBlock";
import { patterns, getIconComponent } from "@/data/patterns";
import { Button } from "@/components/ui/button";

const PatternDetail = () => {
  const { id } = useParams();
  const pattern = patterns.find((p) => p.id === id);
  const currentIndex = patterns.findIndex((p) => p.id === id);
  const prevPattern = currentIndex > 0 ? patterns[currentIndex - 1] : null;
  const nextPattern = currentIndex < patterns.length - 1 ? patterns[currentIndex + 1] : null;

  if (!pattern) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pattern not found</h1>
          <Link to="/patterns">
            <Button>Back to Patterns</Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getIconComponent(pattern.icon);
  const difficultyColors = {
    Easy: "bg-success/10 text-success border-success/30",
    Medium: "bg-warning/10 text-warning border-warning/30",
    Hard: "bg-destructive/10 text-destructive border-destructive/30",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link to="/patterns" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Patterns
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-start gap-6 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
                <IconComponent className="h-8 w-8" />
              </div>
              <div>
                <span className="text-sm font-mono text-muted-foreground mb-2 block">
                  Pattern #{pattern.number.toString().padStart(2, '0')}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {pattern.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  {pattern.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <span className={`px-3 py-1.5 rounded-full border text-sm font-medium ${difficultyColors[pattern.difficulty]}`}>
                {pattern.difficulty}
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm">
                <Clock className="h-4 w-4" />
                Time: {pattern.timeComplexity}
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm">
                <HardDrive className="h-4 w-4" />
                Space: {pattern.spaceComplexity}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Theory */}
              <section className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold">Theory & Concept</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {pattern.theory}
                </p>
              </section>

              {/* Analogy */}
              <section className="p-6 rounded-xl border border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold">Real-World Analogy</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {pattern.analogy}
                </p>
              </section>

              {/* Code Example */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold">C++ Implementation</h2>
                </div>
                <CodeBlock
                  code={pattern.codeExample}
                  language="cpp"
                  title={`${pattern.title.toLowerCase().replace(/\s+/g, '_')}.cpp`}
                />
              </section>

              {/* Syntax Description */}
              <section className="p-6 rounded-xl border border-border bg-card">
                <h2 className="text-xl font-semibold mb-4">Syntax Breakdown</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {pattern.syntaxDescription}
                </p>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* When to Use */}
              <section className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">When to Use</h3>
                </div>
                <ul className="space-y-3">
                  {pattern.whenToUse.map((use, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {use}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Practice Problems */}
              <section className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-4">Practice Problems</h3>
                <ul className="space-y-3">
                  {pattern.problems.map((problem, index) => (
                    <li key={index} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{problem.name}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        problem.difficulty === "Easy" ? "bg-success/10 text-success" :
                        problem.difficulty === "Medium" ? "bg-warning/10 text-warning" :
                        "bg-destructive/10 text-destructive"
                      }`}>
                        {problem.difficulty}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Complexity Card */}
              <section className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-4">Complexity Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Time Complexity</p>
                    <p className="font-mono text-lg text-primary">{pattern.timeComplexity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Space Complexity</p>
                    <p className="font-mono text-lg text-accent">{pattern.spaceComplexity}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-16 pt-8 border-t border-border">
            {prevPattern ? (
              <Link to={`/patterns/${prevPattern.id}`} className="group">
                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs text-muted-foreground">Previous</p>
                    <p className="font-medium">{prevPattern.title}</p>
                  </div>
                </div>
              </Link>
            ) : <div />}
            
            {nextPattern && (
              <Link to={`/patterns/${nextPattern.id}`} className="group text-right">
                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <div>
                    <p className="text-xs text-muted-foreground">Next</p>
                    <p className="font-medium">{nextPattern.title}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatternDetail;
