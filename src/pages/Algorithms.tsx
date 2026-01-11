import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { algorithms, categories, getIconComponent } from "@/data/algorithms";
import { Search, Clock, HardDrive, ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";

const Algorithms = () => {
    const [search, setSearch] = useState("");
    const [expandedCategories, setExpandedCategories] = useState<string[]>(
        categories.map(c => c.id)
    );

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const filteredAlgorithms = algorithms.filter(
        algo =>
            algo.name.toLowerCase().includes(search.toLowerCase()) ||
            algo.description.toLowerCase().includes(search.toLowerCase())
    );

    const getAlgorithmsByCategory = (categoryId: string) => {
        return filteredAlgorithms.filter(a => a.category === categoryId);
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="max-w-3xl mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            All <span className="gradient-text">Algorithms</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Master 70+ essential algorithms with C++ code, theory, and step-by-step explanations.
                            From sorting basics to advanced graph algorithms.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative max-w-md mb-8">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search algorithms..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-10 bg-card border-border"
                        />
                    </div>

                    {/* Categories */}
                    <div className="space-y-6">
                        {categories.map(category => {
                            const categoryAlgos = getAlgorithmsByCategory(category.id);
                            const isExpanded = expandedCategories.includes(category.id);
                            const IconComponent = getIconComponent(category.icon);

                            if (categoryAlgos.length === 0 && search) return null;

                            return (
                                <div
                                    key={category.id}
                                    className="rounded-xl border border-border bg-card overflow-hidden"
                                >
                                    {/* Category Header */}
                                    <button
                                        onClick={() => toggleCategory(category.id)}
                                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <IconComponent className="h-6 w-6" />
                                            </div>
                                            <div className="text-left">
                                                <h2 className="text-xl font-semibold">{category.name}</h2>
                                                <p className="text-sm text-muted-foreground">
                                                    {categoryAlgos.length} algorithms • {category.description}
                                                </p>
                                            </div>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                        ) : (
                                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                        )}
                                    </button>

                                    {/* Algorithm Cards */}
                                    {isExpanded && (
                                        <div className="p-4 pt-0">
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                                {categoryAlgos.map(algo => (
                                                    <Link
                                                        key={algo.id}
                                                        to={`/algorithms/${algo.category}/${algo.id}`}
                                                        className="group p-4 rounded-lg border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-all"
                                                    >
                                                        <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                                                            {algo.name}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                                            {algo.description}
                                                        </p>
                                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="h-3 w-3" />
                                                                {algo.timeComplexity}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <HardDrive className="h-3 w-3" />
                                                                {algo.spaceComplexity}
                                                            </span>
                                                        </div>
                                                        {algo.subcategory && (
                                                            <span className="mt-2 inline-block text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                                                                {algo.subcategory}
                                                            </span>
                                                        )}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {filteredAlgorithms.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                No algorithms found matching "{search}"
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Algorithms;
