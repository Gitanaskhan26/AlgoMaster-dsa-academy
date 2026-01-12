import Navbar from "@/components/Navbar";
import CodeBlock from "@/components/CodeBlock";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Package, 
  Target, 
  Settings, 
  Gamepad2, 
  BookOpen, 
  Boxes, 
  Building, 
  Wrench, 
  Code, 
  Rocket,
  AlertTriangle,
  Lightbulb
} from "lucide-react";

interface SyntaxSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  emoji: string;
  content: React.ReactNode;
}

const Syntax = () => {
  const sections: SyntaxSection[] = [
    {
      id: "basic-structure",
      icon: <Package className="h-5 w-5" />,
      title: "Basic Syntax Structure",
      emoji: "📦",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Minimum Working Program</h4>
            <CodeBlock
              title="hello_world.cpp"
              code={`// Preprocessor Directive (Header Inclusion)
#include <iostream>  // Input/output stream library

// Namespace Declaration
using namespace std; // Avoids std:: prefix (controversial for large projects)

// Function: Program entry point
int main() {         // Must return int
    // Statement: Ends with semicolon
    cout << "Hello, World!" << endl;  // cout: character output
    
    // Return statement (0 = success)
    return 0;        // Optional in C++11+, compiler adds implicit return 0
}

// Compile: g++ -std=c++17 -o program program.cpp
// Run: ./program`}
            />
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Alternative (Better Practice)</h4>
            <CodeBlock
              title="hello_world_better.cpp"
              code={`#include <iostream>

// Explicit namespace usage (prevents pollution)
int main() {
    std::cout << "Hello World!\\n";  // \\n is faster than endl
    // endl flushes buffer, \\n doesn't
    
    return 0;
}`}
            />
          </div>
          
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
            <h5 className="font-semibold text-accent mb-2">💡 Key Takeaways</h5>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><code className="text-primary">#include</code> - Preprocessor directive for including headers</li>
              <li><code className="text-primary">using namespace std;</code> - Convenient but can cause name conflicts</li>
              <li><code className="text-primary">int main()</code> - Entry point, must return int</li>
              <li><code className="text-primary">\\n</code> is faster than <code className="text-primary">endl</code> (no buffer flush)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "data-types",
      icon: <Target className="h-5 w-5" />,
      title: "Data Types & Variables",
      emoji: "🎯",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Fundamental Types</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left text-foreground">Type</th>
                    <th className="px-4 py-2 text-left text-foreground">Size (bytes)</th>
                    <th className="px-4 py-2 text-left text-foreground">Range</th>
                    <th className="px-4 py-2 text-left text-foreground">Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-4 py-2 font-mono text-primary">bool</td><td className="px-4 py-2">1</td><td className="px-4 py-2">true/false</td><td className="px-4 py-2 text-muted-foreground">Flags, conditions</td></tr>
                  <tr className="bg-muted/30"><td className="px-4 py-2 font-mono text-primary">char</td><td className="px-4 py-2">1</td><td className="px-4 py-2">-128 to 127</td><td className="px-4 py-2 text-muted-foreground">ASCII characters</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-primary">short</td><td className="px-4 py-2">2</td><td className="px-4 py-2">-32,768 to 32,767</td><td className="px-4 py-2 text-muted-foreground">Small integers</td></tr>
                  <tr className="bg-muted/30"><td className="px-4 py-2 font-mono text-primary">int</td><td className="px-4 py-2">4</td><td className="px-4 py-2">-2.1B to 2.1B</td><td className="px-4 py-2 text-muted-foreground">General counting</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-primary">long</td><td className="px-4 py-2">4/8</td><td className="px-4 py-2">±9.2×10¹⁸</td><td className="px-4 py-2 text-muted-foreground">Large numbers</td></tr>
                  <tr className="bg-muted/30"><td className="px-4 py-2 font-mono text-primary">long long</td><td className="px-4 py-2">8</td><td className="px-4 py-2">±9.2×10¹⁸</td><td className="px-4 py-2 text-muted-foreground">Very large numbers</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-primary">float</td><td className="px-4 py-2">4</td><td className="px-4 py-2">1.2×10⁻³⁸ to 3.4×10³⁸</td><td className="px-4 py-2 text-muted-foreground">Single precision</td></tr>
                  <tr className="bg-muted/30"><td className="px-4 py-2 font-mono text-primary">double</td><td className="px-4 py-2">8</td><td className="px-4 py-2">2.3×10⁻³⁰⁸ to 1.7×10³⁰⁸</td><td className="px-4 py-2 text-muted-foreground">Scientific computing</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-primary">long double</td><td className="px-4 py-2">12/16</td><td className="px-4 py-2">Extended precision</td><td className="px-4 py-2 text-muted-foreground">Financial, high precision</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Variable Declaration & Initialization</h4>
            <CodeBlock
              title="variables.cpp"
              code={`// 1. C-style initialization
int x = 10;          // Copy initialization
int y(20);           // Direct initialization (constructor syntax)

// 2. Modern C++ initialization (C++11+)
int z{30};           // Uniform initialization (prevents narrowing)
int w{};             // Value initialization (0 for int, false for bool)

// 3. Auto type deduction (C++11+)
auto num = 42;       // int
auto pi = 3.14159;   // double
auto name = "John";  // const char*

// 4. Const and constexpr
const int MAX_SIZE = 100;        // Runtime constant
constexpr int ARRAY_SIZE = 100;  // Compile-time constant
constexpr double PI = 3.141592653589793;

// 5. References
int original = 50;
int& ref = original;  // Reference (alias, must be initialized)
ref = 60;             // original now = 60

// 6. Pointers
int value = 100;
int* ptr = &value;    // Pointer stores address
*ptr = 200;           // Dereference to modify value

// 7. Type aliases
using Counter = int;           // Modern (C++11)
typedef unsigned long ulong;   // Legacy`}
            />
          </div>
        </div>
      ),
    },
    {
      id: "operators",
      icon: <Settings className="h-5 w-5" />,
      title: "Operators Complete Reference",
      emoji: "⚙️",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Arithmetic Operators</h4>
            <CodeBlock
              title="arithmetic.cpp"
              code={`int a = 10, b = 3;
a + b;    // 13  Addition
a - b;    // 7   Subtraction
a * b;    // 30  Multiplication
a / b;    // 3   Integer division (truncates)
a % b;    // 1   Modulo (remainder)

double x = 10.0, y = 3.0;
x / y;    // 3.333... Floating division

// Increment/Decrement
int i = 5;
i++;      // Post-increment: use then increment
++i;      // Pre-increment: increment then use
i--;      // Post-decrement
--i;      // Pre-decrement`}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Relational & Logical Operators</h4>
            <CodeBlock
              title="logical.cpp"
              code={`// Relational (return bool)
a == b;   // Equal to
a != b;   // Not equal
a < b;    // Less than
a > b;    // Greater than
a <= b;   // Less than or equal
a >= b;   // Greater than or equal

// Logical
bool p = true, q = false;
p && q;   // AND (true if both true)
p || q;   // OR (true if at least one true)
!p;       // NOT (inverts)

// Short-circuit evaluation
false && (x++);  // x++ never executes
true || (y--);   // y-- never executes`}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Bitwise Operators</h4>
            <CodeBlock
              title="bitwise.cpp"
              code={`unsigned char a = 0b00110101;  // 53
unsigned char b = 0b00001111;  // 15

a & b;   // AND: 0b00000101 (5)  
a | b;   // OR:  0b00111111 (63)
a ^ b;   // XOR: 0b00111010 (58)  
~a;      // NOT: 0b11001010 (202)  
a << 2;  // Left shift: 0b11010100 (212)
a >> 2;  // Right shift: 0b00001101 (13)

// Compound assignment
int x = 5;
x += 3;   // x = x + 3
x -= 2;   // x = x - 2
x *= 4;   // x = x * 4
x /= 2;   // x = x / 2
x %= 3;   // x = x % 3
x &= 7;   // x = x & 7
x |= 8;   // x = x | 8`}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Special Operators</h4>
            <CodeBlock
              title="special_operators.cpp"
              code={`// Ternary (Conditional)
int max = (a > b) ? a : b;  // If a>b, max=a else max=b

// Comma (evaluates left to right, returns rightmost)
int x = (a=5, b=10, a+b);  // x = 15

// sizeof (compile-time)
size_t int_size = sizeof(int);     // 4 (usually)
size_t arr_size = sizeof(arr);     // Total bytes
size_t num_elements = sizeof(arr)/sizeof(arr[0]);  // Element count

// Type casting
int i = 42;
double d = static_cast<double>(i);  // Modern C++ cast
float f = (float)i;                 // C-style cast (avoid)`}
            />
          </div>
        </div>
      ),
    },
    {
      id: "control-flow",
      icon: <Gamepad2 className="h-5 w-5" />,
      title: "Control Flow Statements",
      emoji: "🎮",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Conditional Statements</h4>
            <CodeBlock
              title="conditionals.cpp"
              code={`// 1. if-else
if (condition1) {
    // Executes if condition1 is true
} 
else if (condition2) {
    // Executes if condition1 false AND condition2 true
} 
else {
    // Executes if all conditions false
}

// 2. Switch (integral/enum types only)
int day = 3;
switch(day) {
    case 1:
        cout << "Monday";
        break;          // Exit switch
    case 2:
        cout << "Tuesday";
        break;
    case 3:
        cout << "Wednesday";
        // No break → fall through!
    case 4:
        cout << " or Thursday";
        break;
    default:            // Optional
        cout << "Weekend";
}
// Output: "Wednesday or Thursday"`}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Loop Structures</h4>
            <CodeBlock
              title="loops.cpp"
              code={`// 1. for loop (definite iteration)
for (int i = 0; i < 10; i++) {
    cout << i << " ";
}
// Output: 0 1 2 3 4 5 6 7 8 9

// Range-based for (C++11+)
vector<int> nums = {1, 2, 3, 4, 5};
for (int num : nums) {           // Copy (expensive for large objects)
    cout << num << " ";
}
for (const auto& num : nums) {   // Reference (no copy, read-only)
    cout << num << " ";
}
for (auto& num : nums) {         // Mutable reference
    num *= 2;  // Modify original
}

// 2. while loop (indefinite)
int count = 0;
while (count < 5) {
    cout << count << " ";
    count++;
}
// Output: 0 1 2 3 4

// 3. do-while (executes at least once)
int x = 10;
do {
    cout << x << " ";
    x--;
} while (x > 0);

// 4. Loop control
for (int i = 0; i < 10; i++) {
    if (i == 3) continue;  // Skip iteration
    if (i == 7) break;     // Exit loop entirely
    cout << i << " ";
}
// Output: 0 1 2 4 5 6`}
            />
          </div>
        </div>
      ),
    },
    {
      id: "functions",
      icon: <BookOpen className="h-5 w-5" />,
      title: "Functions Complete Syntax",
      emoji: "📚",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Function Declaration/Definition</h4>
            <CodeBlock
              title="functions.cpp"
              code={`// 1. Declaration (prototype) in header
int add(int a, int b);              // Function signature
void printMessage(const string& msg); // Const reference parameter

// 2. Definition in source file
int add(int a, int b) {             // Return type, name, parameters
    return a + b;                   // Function body
}

// 3. Parameters
void example(int a,                 // Pass by value (copy)
             int& b,                // Pass by reference (modifiable)
             const int& c,          // Pass by const reference (read-only, efficient)
             int* d) {              // Pass by pointer
    a = 10;    // Changes local copy
    b = 20;    // Changes original
    // c = 30; // Error: c is const
    *d = 40;   // Changes original via pointer
}

// 4. Default arguments (must be at end)
void greet(string name, string prefix = "Hello") {
    cout << prefix << ", " << name << "!\\n";
}
greet("Alice");           // "Hello, Alice!"
greet("Bob", "Hi");       // "Hi, Bob!"`}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Overloading & Special Functions</h4>
            <CodeBlock
              title="overloading.cpp"
              code={`// Function overloading (same name, different parameters)
int square(int x) { return x * x; }
double square(double x) { return x * x; }

// Inline functions (suggest compiler to insert code directly)
inline int max(int a, int b) {
    return (a > b) ? a : b;
}

// Lambda functions (C++11+)
auto sum = [](int a, int b) -> int { return a + b; };
auto multiply = [](auto a, auto b) { return a * b; };  // C++14

// Captures in lambdas
int x = 10, y = 20;
auto lambda1 = [x, &y]() {  // x by value, y by reference
    // x++ would error (x is const in lambda)
    y++;  // OK, modifies original y
};
auto lambda2 = [=]() { /* capture all by value */ };
auto lambda3 = [&]() { /* capture all by reference */ };`}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Recursion Example</h4>
            <CodeBlock
              title="recursion.cpp"
              code={`int factorial(int n) {
    // Base case
    if (n <= 1) return 1;
    
    // Recursive case
    return n * factorial(n - 1);
}

// Stack visualization for factorial(4):
// factorial(4) = 4 * factorial(3)
// factorial(3) = 3 * factorial(2)  
// factorial(2) = 2 * factorial(1)
// factorial(1) = 1  ← Base case reached
// Then unwinds: 2*1=2 → 3*2=6 → 4*6=24`}
            />
          </div>
        </div>
      ),
    },
    {
      id: "arrays-strings",
      icon: <Boxes className="h-5 w-5" />,
      title: "Arrays & Strings",
      emoji: "🏗️",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Arrays</h4>
            <CodeBlock
              title="arrays.cpp"
              code={`// 1. Static arrays (stack allocated)
int arr1[5];                    // Uninitialized (contains garbage)
int arr2[5] = {1, 2, 3};        // Partial init: {1, 2, 3, 0, 0}
int arr3[] = {1, 2, 3, 4, 5};   // Size deduced: 5
int arr4[5]{};                  // Value init: all zeros

// 2. Access and iteration
int nums[5] = {10, 20, 30, 40, 50};
cout << nums[0];                // First element: 10
cout << nums[4];                // Last element: 50
nums[2] = 100;                  // Modify element

// Pointer relationship
int* ptr = nums;                // Array decays to pointer
cout << *(ptr + 2);             // Same as nums[2]

// 3. Multi-dimensional
int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
cout << matrix[1][2];           // 6 (row 1, col 2)`}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Strings</h4>
            <CodeBlock
              title="strings.cpp"
              code={`// 1. C-style strings (character arrays)
char str1[] = "Hello";          // Automatically null-terminated
char str2[20] = "World";
strcat(str1, " ");              // Concatenation
strcat(str1, str2);             // "Hello World"
strlen(str1);                   // Length: 11

// 2. C++ std::string (recommended)
#include <string>
string s1 = "Hello";
string s2("World");
string s3 = s1 + " " + s2;      // Concatenation

// String operations
s1.length();                    // or s1.size()
s1.append("!!!");               // Modifies s1
s1.substr(1, 3);                // "ell" (pos, count)
s1.find("ell");                 // Returns position 1
s1.replace(1, 3, "i");          // s1 = "Hi World"
stoi("42");                     // String to int: 42
to_string(3.14);                // Double to string: "3.14"

// 3. String iteration
string text = "C++";
for (char c : text) {
    cout << c;                  // C + + 
}
for (auto it = text.begin(); it != text.end(); ++it) {
    cout << *it;                // Using iterators
}`}
            />
          </div>
        </div>
      ),
    },
    {
      id: "structs-classes",
      icon: <Building className="h-5 w-5" />,
      title: "Structures & Classes",
      emoji: "📦",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Structures (Plain Old Data)</h4>
            <CodeBlock
              title="structs.cpp"
              code={`struct Point {                  // Default: public members
    // Data members
    double x, y;
    
    // Constructor (C++11+)
    Point(double x_val = 0, double y_val = 0) 
        : x(x_val), y(y_val) {}  // Member initializer list
    
    // Member function
    void print() const {
        cout << "(" << x << ", " << y << ")";
    }
    
    // Operator overload
    Point operator+(const Point& other) const {
        return Point(x + other.x, y + other.y);
    }
};

// Usage
Point p1;                      // (0, 0) - default values
Point p2(3.5, 2.0);            // (3.5, 2.0)
Point p3 = p1 + p2;            // (3.5, 2.0)
p3.print();                    // Method call`}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Classes (Object-Oriented)</h4>
            <CodeBlock
              title="classes.cpp"
              code={`class BankAccount {
private:    // Accessible only within class
    string accountNumber;
    double balance;
    
public:     // Accessible from anywhere
    // Constructor
    BankAccount(string accNum, double initialBalance = 0.0)
        : accountNumber(accNum), balance(initialBalance) {
        cout << "Account created\\n";
    }
    
    // Destructor
    ~BankAccount() {
        cout << "Account destroyed\\n";
    }
    
    // Getter (const member function)
    double getBalance() const {
        return balance;
    }
    
    // Setter
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    // Static member (class-level, not object-level)
    static double interestRate;
    
    // Friend function (access to private members)
    friend void printAccountInfo(const BankAccount& acc);
};

// Static member definition
double BankAccount::interestRate = 0.05;

// Friend function definition
void printAccountInfo(const BankAccount& acc) {
    cout << "Account: " << acc.accountNumber  // Can access private
         << ", Balance: " << acc.balance;     // Can access private
}`}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Inheritance & Polymorphism</h4>
            <CodeBlock
              title="inheritance.cpp"
              code={`// Base class
class Shape {
protected:    // Accessible in derived classes
    string color;
    
public:
    Shape(string c) : color(c) {}
    
    // Virtual function (enables polymorphism)
    virtual double area() const = 0;  // Pure virtual (abstract)
    
    // Virtual destructor (crucial for polymorphism)
    virtual ~Shape() {}
    
    void printColor() const {
        cout << "Color: " << color;
    }
};

// Derived class
class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(string c, double r) : Shape(c), radius(r) {}
    
    // Override virtual function
    double area() const override {
        return 3.14159 * radius * radius;
    }
};

// Usage
Shape* shape = new Circle("Red", 5.0);
cout << shape->area();         // Calls Circle::area()
delete shape;                  // Calls ~Circle() then ~Shape()`}
            />
          </div>
        </div>
      ),
    },
    {
      id: "pointers-memory",
      icon: <Wrench className="h-5 w-5" />,
      title: "Pointers & Memory Management",
      emoji: "🔧",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Pointer Types</h4>
            <CodeBlock
              title="pointers.cpp"
              code={`// 1. Raw pointers
int value = 42;
int* ptr = &value;            // Points to value
cout << *ptr;                 // Dereference: 42

int* arr_ptr = new int[5];    // Heap allocation
delete[] arr_ptr;             // Must delete array with []

// 2. Smart pointers (C++11+) - AUTOMATIC MANAGEMENT
#include <memory>

// Unique pointer (exclusive ownership)
unique_ptr<int> uptr = make_unique<int>(42);
// uptr automatically deletes when out of scope

// Shared pointer (shared ownership)
shared_ptr<int> sptr1 = make_shared<int>(100);
shared_ptr<int> sptr2 = sptr1;  // Both point to same memory
// Deleted when last shared_ptr is destroyed

// Weak pointer (non-owning reference)
weak_ptr<int> wptr = sptr1;
if (auto temp = wptr.lock()) {  // Convert to shared_ptr
    cout << *temp;               // Access if still exists
}`}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Dynamic Memory</h4>
            <CodeBlock
              title="dynamic_memory.cpp"
              code={`// Single object
int* single = new int(10);    // Allocate and initialize
delete single;                // Free memory

// Array
int* arr = new int[5]{1, 2, 3, 4, 5};  // Array initialization
delete[] arr;                          // Array delete

// 2D array
int** matrix = new int*[3];            // Array of pointers
for (int i = 0; i < 3; i++) {
    matrix[i] = new int[4];            // Each row
}
// Cleanup
for (int i = 0; i < 3; i++) {
    delete[] matrix[i];
}
delete[] matrix;

// Common errors:
int* p = new int;
delete p;
// delete p;  // DOUBLE DELETE - CRASH
// cout << *p; // USE AFTER FREE - UNDEFINED`}
            />
          </div>
        </div>
      ),
    },
    {
      id: "templates",
      icon: <Code className="h-5 w-5" />,
      title: "Templates & Generic Programming",
      emoji: "🎯",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Function Templates</h4>
            <CodeBlock
              title="function_templates.cpp"
              code={`template<typename T>          // T is template parameter
T max(T a, T b) {
    return (a > b) ? a : b;
}

// Usage
cout << max(10, 20);         // int version
cout << max(3.14, 2.71);     // double version
cout << max('a', 'z');       // char version

// Multiple parameters
template<typename T1, typename T2>
auto add(T1 a, T2 b) -> decltype(a + b) {
    return a + b;
}

// Template specialization
template<>
const char* max<const char*>(const char* a, const char* b) {
    return (strcmp(a, b) > 0) ? a : b;
}`}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Class Templates</h4>
            <CodeBlock
              title="class_templates.cpp"
              code={`template<typename T>
class Stack {
private:
    vector<T> elements;
    
public:
    void push(const T& value) {
        elements.push_back(value);
    }
    
    T pop() {
        if (elements.empty()) {
            throw out_of_range("Stack is empty");
        }
        T value = elements.back();
        elements.pop_back();
        return value;
    }
};

// Usage
Stack<int> intStack;
Stack<string> stringStack;`}
            />
          </div>
        </div>
      ),
    },
    {
      id: "modern-cpp",
      icon: <Rocket className="h-5 w-5" />,
      title: "Modern C++ (C++11/14/17/20)",
      emoji: "🚀",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
            <CodeBlock
              title="modern_cpp.cpp"
              code={`// 1. auto and decltype
auto x = 5;                    // int
auto y = 3.14;                 // double
decltype(x) z = x * 2;         // Same type as x

// 2. Range-based for loops
vector<int> nums = {1, 2, 3, 4, 5};
for (int num : nums) { /* process */ }

// 3. nullptr (type-safe null)
int* ptr = nullptr;            // Better than NULL or 0

// 4. Lambda expressions
auto square = [](int x) { return x * x; };
sort(vec.begin(), vec.end(), 
     [](int a, int b) { return a > b; });

// 5. Move semantics
vector<int> v1 = {1, 2, 3};
vector<int> v2 = move(v1);     // v1 is now empty
// v2 owns the memory

// 6. constexpr (compile-time evaluation)
constexpr int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}
int arr[factorial(5)];         // Array size 120

// 7. Structured bindings (C++17)
pair<int, string> p = {42, "answer"};
auto [num, text] = p;          // num=42, text="answer"

// 8. Optional (C++17)
optional<int> findValue() {
    if (success) return 42;
    return nullopt;            // No value
}
if (auto val = findValue()) {
    cout << *val;              // Dereference
}

// 9. Ranges (C++20)
#include <ranges>
vector<int> nums = {1, 2, 3, 4, 5};
auto even = nums | views::filter([](int n){ return n%2==0; })
                | views::transform([](int n){ return n*2; });
// {4, 8}`}
            />
          </div>
        </div>
      ),
    },
    {
      id: "pitfalls",
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Common Syntax Pitfalls",
      emoji: "🔍",
      content: (
        <div className="space-y-6">
          <CodeBlock
            title="pitfalls.cpp"
            code={`// 1. Most Vexing Parse
vector<int> v();      // Function declaration, NOT vector!
vector<int> v{};      // Correct: value initialization

// 2. Array decay
void print(int arr[]) {  // arr is actually int*
    cout << sizeof(arr); // Pointer size, NOT array size
}

// 3. Dangling reference
int& badReference() {
    int x = 10;
    return x;  // x destroyed when function returns!
}

// 4. Slicing problem
class Base { /* ... */ };
class Derived : public Base { /* ... */ };

Derived d;
Base b = d;           // Slices! Only Base part copied

// 5. Operator precedence
if (a & b == 0)       // Actually: a & (b == 0)
if ((a & b) == 0)     // Correct

// 6. Integer division
double result = 5 / 2;    // 2.0, not 2.5
double correct = 5.0 / 2; // 2.5

// 7. Uninitialized variables
int x;                 // Garbage value
int y{};               // Zero initialized (0)`}
          />

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Most Vexing Parse", desc: "Use {} instead of () for initialization to avoid function declaration ambiguity" },
              { title: "Array Decay", desc: "Arrays decay to pointers when passed to functions, losing size info" },
              { title: "Dangling Reference", desc: "Never return a reference to a local variable" },
              { title: "Object Slicing", desc: "Use pointers or references when working with polymorphic objects" },
              { title: "Operator Precedence", desc: "Always use parentheses with bitwise operators in conditions" },
              { title: "Integer Division", desc: "At least one operand must be floating-point for decimal result" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <h5 className="font-semibold text-destructive mb-1">{item.title}</h5>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "optimization-tips",
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Syntax Optimization Tips",
      emoji: "💡",
      content: (
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <h5 className="font-semibold text-success mb-2">Use const whenever possible</h5>
              <CodeBlock
                code={`const int MAX = 100;           // Compiler can optimize
void process(const vector<int>& v);  // No copy, can't modify`}
              />
            </div>

            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <h5 className="font-semibold text-success mb-2">Prefer references over pointers for function parameters</h5>
              <CodeBlock
                code={`void better(int& x);          // Clearer than void better(int* x)`}
              />
            </div>

            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <h5 className="font-semibold text-success mb-2">Use range-based for loops</h5>
              <CodeBlock
                code={`for (const auto& item : container)  // Efficient, readable`}
              />
            </div>

            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <h5 className="font-semibold text-success mb-2">Initialize variables with {}</h5>
              <CodeBlock
                code={`int x{};        // 0, not garbage
vector<int> v{}; // Empty vector`}
              />
            </div>

            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <h5 className="font-semibold text-success mb-2">Return by value for small types, reference for large</h5>
              <CodeBlock
                code={`int square(int x) { return x*x; }          // Copy cheap
const vector<int>& getData() { return data; } // Avoid copy`}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Code className="h-4 w-4" />
              Complete Reference Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">C++ Syntax</span> Reference
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master every aspect of C++ syntax from basic structure to modern features. 
              Your complete guide with code examples, explanations, and best practices.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm"
                >
                  <span className="text-primary">{section.icon}</span>
                  <span>{section.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="max-w-4xl mx-auto">
            <Accordion type="multiple" defaultValue={["basic-structure"]} className="space-y-4">
              {sections.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  id={section.id}
                  className="border border-border rounded-xl bg-card/50 backdrop-blur-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {section.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold">
                          {section.emoji} {section.title}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    {section.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Syntax;
