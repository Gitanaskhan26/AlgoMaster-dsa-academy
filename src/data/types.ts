export interface Algorithm {
    id: string;
    name: string;
    category: string;
    subcategory?: string;
    description: string;
    timeComplexity: string;
    spaceComplexity: string;
    code: string;
    theory: string;
    steps: string[];
}

export interface AlgorithmCategory {
    id: string;
    name: string;
    icon: string;
    description: string;
    subcategories?: string[];
}
