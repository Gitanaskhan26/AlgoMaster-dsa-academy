import { AlgorithmCategory } from "./types";

export const categories: AlgorithmCategory[] = [
    { id: "sorting", name: "Sorting Algorithms", icon: "ArrowUpDown", description: "Algorithms to arrange elements in order" },
    { id: "searching", name: "Searching Algorithms", icon: "Search", description: "Algorithms to find elements in data structures" },
    { id: "graph", name: "Graph Algorithms", icon: "GitBranch", description: "Algorithms for graph traversal and optimization" },
    { id: "dp", name: "Dynamic Programming", icon: "Layers", description: "Optimization using overlapping subproblems" },
    { id: "os", name: "Operating System Algorithms", icon: "Cpu", description: "CPU scheduling, memory, and disk algorithms", subcategories: ["Process Scheduling", "Memory Management", "Page Replacement", "Disk Scheduling", "Synchronization"] }
];
