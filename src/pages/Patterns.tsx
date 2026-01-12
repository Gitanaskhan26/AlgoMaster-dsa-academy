import Navbar from "@/components/Navbar";
import PatternCard from "@/components/PatternCard";
import { patterns, getIconComponent } from "@/data/patterns";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Patterns = () => {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const filteredPatterns = patterns.filter((pattern) => {
    const matchesSearch = pattern.title.toLowerCase().includes(search.toLowerCase()) ||
                         pattern.description.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || pattern.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All <span className="gradient-text">16 Patterns</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Master these algorithmic patterns to solve any coding interview problem. 
              Each pattern includes theory, C++ code, and real-world analogies.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patterns..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <div className="flex gap-2">
              {["all", "Easy", "Medium", "Hard"].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setDifficultyFilter(difficulty)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    difficultyFilter === difficulty
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {difficulty === "all" ? "All" : difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Pattern Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPatterns.map((pattern) => {
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

          {filteredPatterns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No patterns found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Patterns;
