import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Code2, HardDrive, ListOrdered } from "lucide-react";
import Navbar from "@/components/Navbar";
import CodeBlock from "@/components/CodeBlock";
import { algorithms, categories, getIconComponent } from "@/data/algorithms";
import { Button } from "@/components/ui/button";

import Footer from "@/components/Footer";

const AlgorithmDetail = () => {
    const { category, id } = useParams();
    const algorithm = algorithms.find(a => a.id === id && a.category === category);

    const categoryAlgos = algorithms.filter(a => a.category === category);
    const currentIndex = categoryAlgos.findIndex(a => a.id === id);
    const prevAlgo = currentIndex > 0 ? categoryAlgos[currentIndex - 1] : null;
    const nextAlgo = currentIndex < categoryAlgos.length - 1 ? categoryAlgos[currentIndex + 1] : null;

    const categoryInfo = categories.find(c => c.id === category);

    if (!algorithm) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Algorithm not found</h1>
                    <Link to="/algorithms">
                        <Button>Back to Algorithms</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const CategoryIcon = categoryInfo ? getIconComponent(categoryInfo.icon) : null;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <Link
                        to="/algorithms"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Algorithms
                    </Link>

                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-start gap-6 mb-6">
                            {CategoryIcon && (
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
                                    <CategoryIcon className="h-8 w-8" />
                                </div>
                            )}
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-sm font-mono text-muted-foreground">
                                        {categoryInfo?.name}
                                    </span>
                                    {algorithm.subcategory && (
                                        <>
                                            <span className="text-muted-foreground">•</span>
                                            <span className="text-sm px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                                                {algorithm.subcategory}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">{algorithm.name}</h1>
                                <p className="text-lg text-muted-foreground max-w-3xl">
                                    {algorithm.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm">
                                <Clock className="h-4 w-4" />
                                Time: {algorithm.timeComplexity}
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm">
                                <HardDrive className="h-4 w-4" />
                                Space: {algorithm.spaceComplexity}
                            </span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Code Example */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Code2 className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-xl font-semibold">C++ Implementation</h2>
                                </div>
                                <CodeBlock
                                    code={algorithm.code}
                                    language="cpp"
                                    title={`${algorithm.id}.cpp`}
                                />
                            </section>

                            {/* Theory */}
                            <section className="p-6 rounded-xl border border-border bg-card">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <BookOpen className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-xl font-semibold">How It Works</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {algorithm.theory}
                                </p>
                            </section>

                            {/* Step by Step */}
                            <section className="p-6 rounded-xl border border-primary/20 bg-primary/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <ListOrdered className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-xl font-semibold">Step-by-Step Walkthrough</h2>
                                </div>
                                <ol className="space-y-3">
                                    {algorithm.steps.map((step, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium shrink-0">
                                                {index + 1}
                                            </span>
                                            <span className="text-muted-foreground pt-0.5">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Complexity Card */}
                            <section className="p-6 rounded-xl border border-border bg-card">
                                <h3 className="font-semibold mb-4">Complexity Analysis</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Time Complexity</p>
                                        <p className="font-mono text-lg text-primary">{algorithm.timeComplexity}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Space Complexity</p>
                                        <p className="font-mono text-lg text-accent">{algorithm.spaceComplexity}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Category Info */}
                            {categoryInfo && (
                                <section className="p-6 rounded-xl border border-border bg-card">
                                    <h3 className="font-semibold mb-4">Category</h3>
                                    <div className="flex items-center gap-3">
                                        {CategoryIcon && (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                <CategoryIcon className="h-5 w-5" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium">{categoryInfo.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {categoryAlgos.length} algorithms
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-16 pt-8 border-t border-border">
                        {prevAlgo ? (
                            <Link to={`/algorithms/${prevAlgo.category}/${prevAlgo.id}`} className="group">
                                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Previous</p>
                                        <p className="font-medium">{prevAlgo.name}</p>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div />
                        )}

                        {nextAlgo && (
                            <Link to={`/algorithms/${nextAlgo.category}/${nextAlgo.id}`} className="group text-right">
                                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Next</p>
                                        <p className="font-medium">{nextAlgo.name}</p>
                                    </div>
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AlgorithmDetail;
