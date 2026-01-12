import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Navbar from "@/components/Navbar";
import CodeBlock from "@/components/CodeBlock";
import { AlertTriangle, CheckCircle, Clock, HardDrive, TrendingUp, Zap } from "lucide-react";

const Complexity = () => {
  const [selectedComplexity, setSelectedComplexity] = useState<string | null>(null);

  // Generate data for complexity graph
  const generateChartData = () => {
    const data = [];
    for (let n = 1; n <= 20; n++) {
      data.push({
        n,
        "O(1)": 1,
        "O(log n)": Math.log2(n),
        "O(n)": n,
        "O(n log n)": n * Math.log2(n),
        "O(n²)": Math.min(n * n, 100),
        "O(2ⁿ)": Math.min(Math.pow(2, n), 100),
      });
    }
    return data;
  };

  const chartData = generateChartData();

  const complexities = [
    {
      notation: "O(1)",
      name: "Constant",
      color: "hsl(145, 70%, 45%)",
      description: "Execution time stays the same regardless of input size.",
      example: "Array access by index, hash table lookup",
      code: `// O(1) - Constant time
int getFirst(vector<int>& arr) {
    return arr[0];  // Always 1 operation
}`,
      quality: "excellent"
    },
    {
      notation: "O(log n)",
      name: "Logarithmic",
      color: "hsl(175, 80%, 50%)",
      description: "Execution time grows slowly as input size increases. Halving the search space each step.",
      example: "Binary search, balanced BST operations",
      code: `// O(log n) - Logarithmic
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      quality: "excellent"
    },
    {
      notation: "O(n)",
      name: "Linear",
      color: "hsl(200, 80%, 55%)",
      description: "Execution time grows linearly with input size. One pass through the data.",
      example: "Linear search, array traversal, counting",
      code: `// O(n) - Linear
int sum(vector<int>& arr) {
    int total = 0;
    for (int num : arr) {  // n iterations
        total += num;
    }
    return total;
}`,
      quality: "good"
    },
    {
      notation: "O(n log n)",
      name: "Linearithmic",
      color: "hsl(45, 90%, 55%)",
      description: "Efficient sorting complexity. Divide and conquer with linear work at each level.",
      example: "Merge sort, quicksort, heapsort",
      code: `// O(n log n) - Merge Sort
void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int mid = l + (r - l) / 2;
    mergeSort(arr, l, mid);      // log n levels
    mergeSort(arr, mid + 1, r);  // of recursion
    merge(arr, l, mid, r);       // O(n) merge
}`,
      quality: "fair"
    },
    {
      notation: "O(n²)",
      name: "Quadratic",
      color: "hsl(25, 90%, 55%)",
      description: "Execution time grows with the square of input size. Nested loops over the same data.",
      example: "Bubble sort, selection sort, nested iterations",
      code: `// O(n²) - Quadratic
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {       // n times
        for (int j = 0; j < n-1; j++) { // n times
            if (arr[j] > arr[j+1])
                swap(arr[j], arr[j+1]);
        }
    }
}`,
      quality: "poor"
    },
    {
      notation: "O(2ⁿ)",
      name: "Exponential",
      color: "hsl(0, 75%, 55%)",
      description: "Execution time doubles with each additional input element. Rapidly becomes impractical.",
      example: "Naive recursive Fibonacci, power set generation",
      code: `// O(2ⁿ) - Exponential
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
    // Each call spawns 2 more calls
}`,
      quality: "terrible"
    }
  ];

  const qualityIcons = {
    excellent: <CheckCircle className="h-5 w-5 text-success" />,
    good: <CheckCircle className="h-5 w-5 text-primary" />,
    fair: <AlertTriangle className="h-5 w-5 text-warning" />,
    poor: <AlertTriangle className="h-5 w-5 text-accent" />,
    terrible: <AlertTriangle className="h-5 w-5 text-destructive" />
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Big O Notation & <span className="gradient-text">Complexity Analysis</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Understanding time and space complexity is fundamental to writing efficient algorithms.
              Learn how to analyze and optimize your code&apos;s performance.
            </p>
          </div>

          {/* What is Big O */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="p-8 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">What is Big O?</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Big O notation describes the <strong className="text-foreground">upper bound</strong> of an algorithm&apos;s 
                  growth rate. It tells us how the runtime or space requirements grow as the input size increases.
                </p>
                <p className="text-muted-foreground mb-4">
                  We focus on the <strong className="text-foreground">dominant term</strong> and ignore constants because 
                  as n approaches infinity, lower-order terms become negligible.
                </p>
                <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm">
                  <p className="text-muted-foreground">Example simplification:</p>
                  <p className="text-foreground mt-2">
                    3n² + 5n + 100 → <span className="text-primary">O(n²)</span>
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Why It Matters</h2>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Performance Prediction</p>
                      <p className="text-sm text-muted-foreground">Estimate how your code scales with larger inputs</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HardDrive className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Resource Planning</p>
                      <p className="text-sm text-muted-foreground">Understand memory requirements for large datasets</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Algorithm Comparison</p>
                      <p className="text-sm text-muted-foreground">Choose the most efficient solution for your problem</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Complexity Graph */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Complexity Growth Comparison</h2>
            <div className="p-6 rounded-xl border border-border bg-card">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="n" 
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Input Size (n)', position: 'insideBottom', offset: -5, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Operations', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  {complexities.map((c) => (
                    <Line
                      key={c.notation}
                      type="monotone"
                      dataKey={c.notation}
                      stroke={c.color}
                      strokeWidth={selectedComplexity === c.notation ? 4 : 2}
                      dot={false}
                      opacity={selectedComplexity && selectedComplexity !== c.notation ? 0.3 : 1}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
              
              <div className="flex flex-wrap gap-2 mt-6 justify-center">
                {complexities.map((c) => (
                  <button
                    key={c.notation}
                    onClick={() => setSelectedComplexity(selectedComplexity === c.notation ? null : c.notation)}
                    className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                      selectedComplexity === c.notation
                        ? "ring-2 ring-offset-2 ring-offset-background"
                        : "hover:bg-secondary"
                    }`}
                    style={{ 
                      backgroundColor: selectedComplexity === c.notation ? c.color : undefined,
                      color: selectedComplexity === c.notation ? 'white' : c.color,
                      borderColor: c.color,
                      borderWidth: 1,
                      borderStyle: 'solid'
                    }}
                  >
                    {c.notation}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Complexity Details */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Common Time Complexities</h2>
            <div className="space-y-6">
              {complexities.map((complexity) => (
                <div
                  key={complexity.notation}
                  className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                  style={{ borderLeftWidth: 4, borderLeftColor: complexity.color }}
                >
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span 
                          className="text-2xl font-mono font-bold"
                          style={{ color: complexity.color }}
                        >
                          {complexity.notation}
                        </span>
                        <span className="text-lg text-muted-foreground">— {complexity.name}</span>
                        {qualityIcons[complexity.quality as keyof typeof qualityIcons]}
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {complexity.description}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Examples: </span>
                        <span className="text-foreground">{complexity.example}</span>
                      </p>
                    </div>
                    <div>
                      <CodeBlock code={complexity.code} language="cpp" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to Calculate */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">How to Calculate Complexity</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Time Complexity Rules
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">1.</span>
                    <span><strong className="text-foreground">Drop constants:</strong> O(2n) → O(n)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">2.</span>
                    <span><strong className="text-foreground">Drop lower terms:</strong> O(n² + n) → O(n²)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">3.</span>
                    <span><strong className="text-foreground">Sequential:</strong> Add complexities (O(n) + O(m) = O(n+m))</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">4.</span>
                    <span><strong className="text-foreground">Nested:</strong> Multiply complexities (O(n) × O(m) = O(nm))</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">5.</span>
                    <span><strong className="text-foreground">Recursion:</strong> Count total calls × work per call</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-accent" />
                  Space Complexity Rules
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-mono">1.</span>
                    <span><strong className="text-foreground">Count variables:</strong> Fixed variables = O(1)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-mono">2.</span>
                    <span><strong className="text-foreground">Count data structures:</strong> Array of size n = O(n)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-mono">3.</span>
                    <span><strong className="text-foreground">Recursion stack:</strong> Max depth of call stack</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-mono">4.</span>
                    <span><strong className="text-foreground">In-place:</strong> Modifying input doesn&apos;t count</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-mono">5.</span>
                    <span><strong className="text-foreground">Auxiliary space:</strong> Extra space beyond input</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Example */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Step-by-Step Analysis Example</h2>
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <CodeBlock
                    code={`void findPairs(vector<int>& arr, int target) {
    int n = arr.size();                    // O(1)
    
    for (int i = 0; i < n; i++) {          // O(n)
        for (int j = i+1; j < n; j++) {    // O(n)
            if (arr[i] + arr[j] == target) {
                cout << i << ", " << j;    // O(1)
            }
        }
    }
}`}
                    language="cpp"
                    title="analyzing_complexity.cpp"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Analysis:</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <span className="font-mono text-primary">Line 2:</span> Getting size is O(1)
                    </p>
                    <p>
                      <span className="font-mono text-primary">Line 4:</span> Outer loop runs n times
                    </p>
                    <p>
                      <span className="font-mono text-primary">Line 5:</span> Inner loop runs (n-1), (n-2), ..., 1 times
                    </p>
                    <p>
                      <span className="font-mono text-primary">Total:</span> n + (n-1) + (n-2) + ... + 1 = n(n-1)/2
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="font-mono text-lg">
                      Time: <span className="text-primary font-bold">O(n²)</span>
                    </p>
                    <p className="font-mono text-lg mt-1">
                      Space: <span className="text-accent font-bold">O(1)</span> <span className="text-sm text-muted-foreground">(only using fixed variables)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Complexity;
