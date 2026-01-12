import { 
  Layers, GitBranch, Repeat, Timer, SortAsc, 
  RotateCcw, TreePine, Search, Box, Binary, 
  Cpu, ArrowUpDown, Network, Boxes, GitMerge, Share2
} from "lucide-react";

export interface Pattern {
  id: string;
  number: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeComplexity: string;
  spaceComplexity: string;
  icon: string;
  theory: string;
  analogy: string;
  whenToUse: string[];
  codeExample: string;
  syntaxDescription: string;
  problems: { name: string; difficulty: string }[];
}

export const patterns: Pattern[] = [
  {
    id: "sliding-window",
    number: 1,
    title: "Sliding Window",
    description: "Efficiently process contiguous subarrays or substrings by maintaining a window that slides through the data.",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    icon: "Layers",
    theory: "The Sliding Window technique is used to perform required operations on a specific window size of an array or string. It converts two nested loops (O(n²)) into a single loop (O(n)) by reusing computations from the previous window position.",
    analogy: "Imagine looking through a camera viewfinder at a long mural. Instead of stepping back to see the whole mural and then focusing on each section, you slide along the wall, keeping your viewfinder at a fixed width. As you move, you naturally lose sight of what's leaving the left edge while gaining view of what's entering from the right.",
    whenToUse: [
      "Finding subarrays/substrings with specific conditions",
      "Maximum/minimum sum of a subarray of size k",
      "Longest substring with k distinct characters",
      "String anagrams or permutations"
    ],
    codeExample: `// Maximum sum of subarray of size k
int maxSumSubarray(vector<int>& arr, int k) {
    int n = arr.size();
    if (n < k) return -1;
    
    // Compute sum of first window
    int windowSum = 0;
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    
    int maxSum = windowSum;
    
    // Slide the window
    for (int i = k; i < n; i++) {
        // Add incoming element, remove outgoing
        windowSum += arr[i] - arr[i - k];
        maxSum = max(maxSum, windowSum);
    }
    
    return maxSum;
}`,
    syntaxDescription: "The pattern maintains two pointers (start and end) defining the window. We expand by moving end, contract by moving start. Key operations: add new element, remove old element, update result.",
    problems: [
      { name: "Maximum Sum Subarray of Size K", difficulty: "Easy" },
      { name: "Longest Substring Without Repeating Characters", difficulty: "Medium" },
      { name: "Minimum Window Substring", difficulty: "Hard" }
    ]
  },
  {
    id: "two-pointer",
    number: 2,
    title: "Two Pointers",
    description: "Use two pointers to iterate through data structures, typically from opposite ends or at different speeds.",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    icon: "GitBranch",
    theory: "Two Pointers technique uses two pointers to traverse an array or list, usually moving towards each other or in the same direction at different speeds. This approach reduces time complexity from O(n²) to O(n) for many problems.",
    analogy: "Think of two people searching for each other in a hallway - one starts from each end. They walk towards each other, checking each room they pass. They're guaranteed to meet in the middle, having checked every room exactly once together.",
    whenToUse: [
      "Sorted arrays or linked lists",
      "Finding pairs with a target sum",
      "Removing duplicates in-place",
      "Comparing strings or arrays"
    ],
    codeExample: `// Two Sum in Sorted Array
vector<int> twoSum(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        
        if (sum == target) {
            return {left, right};
        } else if (sum < target) {
            left++;  // Need larger sum
        } else {
            right--;  // Need smaller sum
        }
    }
    
    return {-1, -1};  // No pair found
}`,
    syntaxDescription: "Initialize two pointers at strategic positions (often start/end). Move pointers based on comparison with target. Continue until pointers meet or condition is satisfied.",
    problems: [
      { name: "Two Sum II", difficulty: "Easy" },
      { name: "3Sum", difficulty: "Medium" },
      { name: "Container With Most Water", difficulty: "Medium" }
    ]
  },
  {
    id: "fast-slow-pointers",
    number: 3,
    title: "Fast & Slow Pointers",
    description: "Also known as the Tortoise and Hare algorithm, uses two pointers moving at different speeds.",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    icon: "Repeat",
    theory: "Fast and Slow pointers is a technique where two pointers move through a sequence at different speeds. The fast pointer typically moves twice as fast as the slow pointer. This is particularly useful for cycle detection and finding middle elements.",
    analogy: "Imagine two runners on a circular track - one running twice as fast as the other. If the track is circular (has a cycle), the faster runner will eventually lap the slower one. If there's no cycle (like a straight road), the fast runner will simply reach the end first.",
    whenToUse: [
      "Detecting cycles in linked lists",
      "Finding the middle of a linked list",
      "Finding the start of a cycle",
      "Checking if a number is happy"
    ],
    codeExample: `// Detect cycle in linked list
bool hasCycle(ListNode* head) {
    if (!head || !head->next) return false;
    
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;         // Move 1 step
        fast = fast->next->next;   // Move 2 steps
        
        if (slow == fast) {
            return true;  // Cycle detected
        }
    }
    
    return false;  // No cycle
}`,
    syntaxDescription: "Initialize both pointers at head. Move slow by 1 step, fast by 2 steps each iteration. If they meet, there's a cycle. If fast reaches null, no cycle exists.",
    problems: [
      { name: "Linked List Cycle", difficulty: "Easy" },
      { name: "Find Middle of Linked List", difficulty: "Easy" },
      { name: "Linked List Cycle II", difficulty: "Medium" }
    ]
  },
  {
    id: "merge-intervals",
    number: 4,
    title: "Merge Intervals",
    description: "Handle overlapping intervals by sorting and merging, useful for scheduling problems.",
    difficulty: "Medium",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    icon: "Timer",
    theory: "The Merge Intervals pattern deals with overlapping intervals. The key insight is that after sorting intervals by start time, we can determine overlaps by comparing end times. Two intervals overlap if the start of the second is less than or equal to the end of the first.",
    analogy: "Think of scheduling meetings in a conference room. If meetings are sorted by start time, you can easily see overlaps - a new meeting conflicts if it starts before the previous one ends. Merging means combining overlapping meetings into longer blocks.",
    whenToUse: [
      "Merging overlapping time intervals",
      "Finding free time slots",
      "Meeting room scheduling",
      "Interval intersection problems"
    ],
    codeExample: `// Merge overlapping intervals
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    
    // Sort by start time
    sort(intervals.begin(), intervals.end());
    
    vector<vector<int>> merged;
    merged.push_back(intervals[0]);
    
    for (int i = 1; i < intervals.size(); i++) {
        // Check if current overlaps with last merged
        if (intervals[i][0] <= merged.back()[1]) {
            // Merge: extend the end time
            merged.back()[1] = max(merged.back()[1],
                                   intervals[i][1]);
        } else {
            // No overlap: add new interval
            merged.push_back(intervals[i]);
        }
    }
    
    return merged;
}`,
    syntaxDescription: "Sort intervals by start time. Iterate through, comparing each interval's start with the previous end. If overlapping, extend the end. Otherwise, add as new interval.",
    problems: [
      { name: "Merge Intervals", difficulty: "Medium" },
      { name: "Insert Interval", difficulty: "Medium" },
      { name: "Meeting Rooms II", difficulty: "Medium" }
    ]
  },
  {
    id: "cyclic-sort",
    number: 5,
    title: "Cyclic Sort",
    description: "Sort arrays containing numbers in a given range by placing each number at its correct index.",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    icon: "SortAsc",
    theory: "Cyclic Sort is used when dealing with arrays containing numbers in a given range (1 to n or 0 to n-1). The idea is to place each number at its correct index position. Since we know the range, we know exactly where each number should be.",
    analogy: "Imagine organizing books numbered 1-10 on a shelf with slots labeled 1-10. You pick up each book and place it in its matching slot. If that slot has another book, you swap them. Eventually, every book finds its home in O(n) time.",
    whenToUse: [
      "Arrays with numbers in range [1, n] or [0, n-1]",
      "Finding missing or duplicate numbers",
      "Finding the first missing positive",
      "In-place sorting with O(1) space"
    ],
    codeExample: `// Find all missing numbers in range [1, n]
vector<int> findMissingNumbers(vector<int>& nums) {
    int n = nums.size();
    int i = 0;
    
    // Place each number at correct index
    while (i < n) {
        int correctIdx = nums[i] - 1;
        if (nums[i] > 0 && nums[i] <= n &&
            nums[i] != nums[correctIdx]) {
            swap(nums[i], nums[correctIdx]);
        } else {
            i++;
        }
    }
    
    // Find numbers not at correct position
    vector<int> missing;
    for (int i = 0; i < n; i++) {
        if (nums[i] != i + 1) {
            missing.push_back(i + 1);
        }
    }
    
    return missing;
}`,
    syntaxDescription: "For each element, calculate its correct position (usually value-1 or value). If not at correct position, swap it there. Continue until all elements are checked.",
    problems: [
      { name: "Missing Number", difficulty: "Easy" },
      { name: "Find All Duplicates", difficulty: "Medium" },
      { name: "First Missing Positive", difficulty: "Hard" }
    ]
  },
  {
    id: "linked-list-reversal",
    number: 6,
    title: "In-place Reversal of LinkedList",
    description: "Reverse linked list nodes in-place without using extra space by manipulating pointers.",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    icon: "RotateCcw",
    theory: "In-place reversal of a linked list involves reversing the direction of node pointers without using extra data structures. We maintain three pointers: previous, current, and next, systematically reversing each link as we traverse.",
    analogy: "Imagine a conga line where everyone faces forward. To reverse it, each person needs to turn around and point to the person who was behind them. You process one person at a time, making them face backwards while remembering who was next.",
    whenToUse: [
      "Reversing entire linked lists",
      "Reversing sublists between positions",
      "Reversing in groups of k",
      "Palindrome linked list checks"
    ],
    codeExample: `// Reverse a linked list in-place
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    
    while (curr != nullptr) {
        // Save next node
        ListNode* next = curr->next;
        
        // Reverse the link
        curr->next = prev;
        
        // Move pointers forward
        prev = curr;
        curr = next;
    }
    
    return prev;  // New head
}`,
    syntaxDescription: "Use three pointers: prev (initially null), curr (starts at head), and next (temporary). For each node: save next, reverse pointer, advance prev and curr.",
    problems: [
      { name: "Reverse Linked List", difficulty: "Easy" },
      { name: "Reverse Linked List II", difficulty: "Medium" },
      { name: "Reverse Nodes in k-Group", difficulty: "Hard" }
    ]
  },
  {
    id: "tree-bfs",
    number: 7,
    title: "Tree Breadth First Search",
    description: "Traverse trees level by level using a queue, processing all nodes at each depth before moving deeper.",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(w)",
    icon: "TreePine",
    theory: "BFS traverses a tree level by level using a queue. We process all nodes at the current level before moving to the next. This is ideal for level-order operations, finding shortest paths in unweighted graphs, and problems requiring level-wise processing.",
    analogy: "Imagine watering a tree - you'd water the trunk first, then all branches at the same height, then move up to the next level. You're not following any single branch to the top; instead, you're covering all branches at each height before moving up.",
    whenToUse: [
      "Level-order traversal",
      "Finding minimum depth",
      "Level averages or sums",
      "Zigzag traversal",
      "Connect level order siblings"
    ],
    codeExample: `// Level order traversal
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int levelSize = q.size();
        vector<int> currentLevel;
        
        // Process all nodes at current level
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();
            
            currentLevel.push_back(node->val);
            
            // Add children for next level
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        
        result.push_back(currentLevel);
    }
    
    return result;
}`,
    syntaxDescription: "Use a queue. Start with root. For each level: record queue size, process that many nodes, adding their children. Repeat until queue is empty.",
    problems: [
      { name: "Binary Tree Level Order Traversal", difficulty: "Medium" },
      { name: "Minimum Depth of Binary Tree", difficulty: "Easy" },
      { name: "Binary Tree Zigzag Level Order", difficulty: "Medium" }
    ]
  },
  {
    id: "tree-dfs",
    number: 8,
    title: "Depth First Search (DFS)",
    description: "Explore tree branches fully before backtracking, using recursion or a stack.",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    icon: "Search",
    theory: "DFS explores as far as possible along each branch before backtracking. It can be implemented recursively (using call stack) or iteratively (using explicit stack). DFS is fundamental for tree/graph traversal, path finding, and exploring all possibilities.",
    analogy: "Like exploring a maze by always taking the first available path until you hit a dead end, then backtracking to try the next unexplored path. You go deep before you go wide.",
    whenToUse: [
      "Path sum problems",
      "Tree/graph traversal",
      "Finding all paths",
      "Checking tree properties",
      "Solving puzzles with backtracking"
    ],
    codeExample: `// Find all root-to-leaf paths with target sum
void findPaths(TreeNode* node, int sum,
               vector<int>& path,
               vector<vector<int>>& result) {
    if (!node) return;
    
    // Add current node to path
    path.push_back(node->val);
    
    // Check if leaf with target sum
    if (!node->left && !node->right &&
        sum == node->val) {
        result.push_back(path);
    }
    
    // Recurse on children
    findPaths(node->left, sum - node->val,
              path, result);
    findPaths(node->right, sum - node->val,
              path, result);
    
    // Backtrack
    path.pop_back();
}`,
    syntaxDescription: "Process current node, recursively visit children (or use stack for iterative). Track visited nodes in graphs. Backtrack by removing current node from path when returning.",
    problems: [
      { name: "Path Sum", difficulty: "Easy" },
      { name: "Path Sum II", difficulty: "Medium" },
      { name: "Sum Root to Leaf Numbers", difficulty: "Medium" }
    ]
  },
  {
    id: "two-heaps",
    number: 9,
    title: "Two Heaps",
    description: "Use a max-heap and min-heap together to efficiently track median or partition elements.",
    difficulty: "Hard",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(n)",
    icon: "Box",
    theory: "The Two Heaps pattern uses a max-heap for the smaller half of numbers and a min-heap for the larger half. This allows O(1) access to the median and O(log n) insertion. It's powerful for streaming data problems.",
    analogy: "Imagine splitting a deck of cards into two piles - smaller cards face-up (see the largest small card) and larger cards face-down (see the smallest large card). The median is always between these two visible cards.",
    whenToUse: [
      "Finding median in a stream",
      "Sliding window median",
      "Scheduling problems",
      "Partitioning into two groups"
    ],
    codeExample: `class MedianFinder {
    priority_queue<int> maxHeap;  // Smaller half
    priority_queue<int, vector<int>,
                   greater<int>> minHeap;  // Larger half
    
public:
    void addNum(int num) {
        // Add to max heap first
        maxHeap.push(num);
        
        // Balance: largest of small <= smallest of large
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        
        // Keep sizes balanced (max can have 1 more)
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.top();
        }
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
};`,
    syntaxDescription: "Maintain max-heap for lower half, min-heap for upper half. Balance sizes after each insert. Median is top of max-heap (odd count) or average of both tops (even count).",
    problems: [
      { name: "Find Median from Data Stream", difficulty: "Hard" },
      { name: "Sliding Window Median", difficulty: "Hard" },
      { name: "IPO", difficulty: "Hard" }
    ]
  },
  {
    id: "subsets",
    number: 10,
    title: "Subsets",
    description: "Generate all possible subsets or combinations using BFS-style iteration or backtracking.",
    difficulty: "Medium",
    timeComplexity: "O(2^n)",
    spaceComplexity: "O(2^n)",
    icon: "Boxes",
    theory: "The Subsets pattern generates all possible combinations of elements. For n elements, there are 2^n subsets. We can build subsets iteratively (BFS-style: add each element to all existing subsets) or recursively (include/exclude each element).",
    analogy: "Building subsets is like making pizza topping combinations. For each topping, you have a choice: add it or skip it. If you have 3 toppings, you get 8 possible pizzas (including plain and fully loaded).",
    whenToUse: [
      "Generating all subsets/combinations",
      "Permutations",
      "String/array subset problems",
      "Power set generation"
    ],
    codeExample: `// Generate all subsets (iterative BFS approach)
vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    result.push_back({});  // Start with empty set
    
    for (int num : nums) {
        int n = result.size();
        // Add current number to all existing subsets
        for (int i = 0; i < n; i++) {
            vector<int> newSubset = result[i];
            newSubset.push_back(num);
            result.push_back(newSubset);
        }
    }
    
    return result;
}

// Backtracking approach
void backtrack(vector<int>& nums, int start,
               vector<int>& current,
               vector<vector<int>>& result) {
    result.push_back(current);
    
    for (int i = start; i < nums.size(); i++) {
        current.push_back(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.pop_back();  // Backtrack
    }
}`,
    syntaxDescription: "Iterative: start with empty set, for each element add it to copies of all existing subsets. Backtracking: include element, recurse, exclude (backtrack).",
    problems: [
      { name: "Subsets", difficulty: "Medium" },
      { name: "Subsets II (with duplicates)", difficulty: "Medium" },
      { name: "Permutations", difficulty: "Medium" }
    ]
  },
  {
    id: "binary-search",
    number: 11,
    title: "Modified Binary Search",
    description: "Adapt classic binary search for rotated arrays, finding boundaries, or search spaces.",
    difficulty: "Medium",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    icon: "Binary",
    theory: "Modified Binary Search extends the classic algorithm to handle variations: rotated sorted arrays, finding first/last occurrence, searching infinite arrays, or searching on answer space. The key is identifying which half to discard based on problem-specific conditions.",
    analogy: "Like finding a word in a dictionary, but the dictionary might be split and rearranged. You still eliminate half at each step, but your comparison logic adapts to the specific situation.",
    whenToUse: [
      "Rotated sorted arrays",
      "Finding first/last position",
      "Peak element finding",
      "Searching in infinite arrays",
      "Binary search on answer"
    ],
    codeExample: `// Search in rotated sorted array
int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) return mid;
        
        // Determine which half is sorted
        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            if (target >= nums[left] &&
                target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (target > nums[mid] &&
                target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}`,
    syntaxDescription: "Standard binary search structure with modified comparison logic. Determine the sorted portion, check if target lies within it, then narrow search accordingly.",
    problems: [
      { name: "Search in Rotated Sorted Array", difficulty: "Medium" },
      { name: "Find Minimum in Rotated Sorted Array", difficulty: "Medium" },
      { name: "Search in a 2D Matrix", difficulty: "Medium" }
    ]
  },
  {
    id: "bitwise-xor",
    number: 12,
    title: "Bitwise XOR",
    description: "Leverage XOR properties for finding unique elements and bit manipulation problems.",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    icon: "Cpu",
    theory: "XOR has unique properties: a^a=0, a^0=a, and it's commutative/associative. This makes it perfect for finding single unique elements (pairs cancel out), swapping without temp variables, and various bit manipulation tasks.",
    analogy: "XOR is like a light switch - flip it twice and you're back to the original state. If you XOR all numbers in a list where all except one appear twice, pairs cancel out, leaving only the unique number.",
    whenToUse: [
      "Finding single/unique numbers",
      "Finding two unique numbers",
      "Missing number in range",
      "Swapping without extra space"
    ],
    codeExample: `// Find the single number (all others appear twice)
int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;  // Pairs cancel out
    }
    return result;
}

// Find two unique numbers
vector<int> singleNumberIII(vector<int>& nums) {
    int xorAll = 0;
    for (int num : nums) xorAll ^= num;
    
    // Find rightmost set bit (differs between two numbers)
    int rightmostBit = xorAll & (-xorAll);
    
    int num1 = 0, num2 = 0;
    for (int num : nums) {
        if (num & rightmostBit) {
            num1 ^= num;
        } else {
            num2 ^= num;
        }
    }
    
    return {num1, num2};
}`,
    syntaxDescription: "XOR all elements to cancel pairs. For two unique numbers, find a differing bit and partition elements by that bit, XORing each group separately.",
    problems: [
      { name: "Single Number", difficulty: "Easy" },
      { name: "Single Number III", difficulty: "Medium" },
      { name: "Missing Number", difficulty: "Easy" }
    ]
  },
  {
    id: "top-k-elements",
    number: 13,
    title: "Top 'K' Elements",
    description: "Use heaps to efficiently find the K largest or smallest elements in a dataset.",
    difficulty: "Medium",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    icon: "ArrowUpDown",
    theory: "To find top K elements, maintain a heap of size K. For K largest, use a min-heap (smallest of the K largest is at top). For K smallest, use a max-heap. This is more efficient than sorting when K << N.",
    analogy: "Like a VIP section with K seats. When someone new arrives, they only get in if they're more important than the current least important VIP. The doorkeeper (heap top) always knows who's at the threshold.",
    whenToUse: [
      "K largest/smallest elements",
      "K most frequent elements",
      "K closest points",
      "Kth largest element"
    ],
    codeExample: `// Find K largest elements
vector<int> topKLargest(vector<int>& nums, int k) {
    // Min-heap of size k
    priority_queue<int, vector<int>,
                   greater<int>> minHeap;
    
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();  // Remove smallest
        }
    }
    
    // Extract results
    vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top());
        minHeap.pop();
    }
    return result;
}

// Kth largest element
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>,
                   greater<int>> minHeap;
    
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop();
    }
    
    return minHeap.top();
}`,
    syntaxDescription: "For top K largest: use min-heap of size K. Push elements, pop if size exceeds K. The K largest remain in heap. For K smallest, use max-heap.",
    problems: [
      { name: "Kth Largest Element", difficulty: "Medium" },
      { name: "Top K Frequent Elements", difficulty: "Medium" },
      { name: "K Closest Points to Origin", difficulty: "Medium" }
    ]
  },
  {
    id: "k-way-merge",
    number: 14,
    title: "K-way Merge",
    description: "Merge K sorted lists efficiently using a min-heap to track the smallest elements.",
    difficulty: "Hard",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    icon: "GitMerge",
    theory: "K-way merge combines K sorted lists into one sorted output. A min-heap tracks the smallest current element from each list. We repeatedly extract the minimum and insert the next element from that list. Total: O(N log K) where N is total elements.",
    analogy: "Like a tournament where K teams each send their best player. The winner advances (goes to output), and that team sends their next best player. The heap efficiently tracks who's currently competing.",
    whenToUse: [
      "Merging K sorted lists/arrays",
      "Finding smallest range covering K lists",
      "External sorting",
      "Kth smallest in sorted matrix"
    ],
    codeExample: `// Merge K sorted linked lists
ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) {
        return a->val > b->val;
    };
    priority_queue<ListNode*, vector<ListNode*>,
                   decltype(cmp)> minHeap(cmp);
    
    // Add first node from each list
    for (auto list : lists) {
        if (list) minHeap.push(list);
    }
    
    ListNode dummy(0);
    ListNode* tail = &dummy;
    
    while (!minHeap.empty()) {
        ListNode* smallest = minHeap.top();
        minHeap.pop();
        
        tail->next = smallest;
        tail = tail->next;
        
        // Add next from same list
        if (smallest->next) {
            minHeap.push(smallest->next);
        }
    }
    
    return dummy.next;
}`,
    syntaxDescription: "Initialize min-heap with first element from each list. Pop minimum, add to result, push next element from that list. Repeat until heap is empty.",
    problems: [
      { name: "Merge K Sorted Lists", difficulty: "Hard" },
      { name: "Kth Smallest Element in Sorted Matrix", difficulty: "Medium" },
      { name: "Smallest Range Covering K Lists", difficulty: "Hard" }
    ]
  },
  {
    id: "knapsack",
    number: 15,
    title: "0/1 Knapsack (DP)",
    description: "Solve optimization problems where items can be included or excluded using dynamic programming.",
    difficulty: "Hard",
    timeComplexity: "O(n×W)",
    spaceComplexity: "O(W)",
    icon: "Network",
    theory: "The 0/1 Knapsack problem involves choosing items with weights and values to maximize value within a weight capacity. Each item is either taken (1) or not (0). DP solution builds a table where dp[i][w] = max value using first i items with capacity w.",
    analogy: "Packing for a trip with a weight limit. For each item, you decide: take it or leave it. The key insight is that the best packing for capacity W depends on the best packing for smaller capacities, which you've already computed.",
    whenToUse: [
      "Subset sum problems",
      "Partition equal subset sum",
      "Target sum with +/-",
      "Coin change variations",
      "Resource allocation"
    ],
    codeExample: `// 0/1 Knapsack - space optimized
int knapsack(vector<int>& weights,
             vector<int>& values, int W) {
    int n = weights.size();
    vector<int> dp(W + 1, 0);
    
    for (int i = 0; i < n; i++) {
        // Traverse right to left to avoid using
        // updated values from current iteration
        for (int w = W; w >= weights[i]; w--) {
            dp[w] = max(dp[w],
                       values[i] + dp[w - weights[i]]);
        }
    }
    
    return dp[W];
}

// Subset Sum (can we make target sum?)
bool subsetSum(vector<int>& nums, int target) {
    vector<bool> dp(target + 1, false);
    dp[0] = true;  // Empty subset makes sum 0
    
    for (int num : nums) {
        for (int t = target; t >= num; t--) {
            dp[t] = dp[t] || dp[t - num];
        }
    }
    
    return dp[target];
}`,
    syntaxDescription: "Build DP table bottom-up. For each item, update achievable values/sums. Iterate capacity backwards in 1D optimization to avoid using updated values.",
    problems: [
      { name: "0/1 Knapsack", difficulty: "Medium" },
      { name: "Partition Equal Subset Sum", difficulty: "Medium" },
      { name: "Target Sum", difficulty: "Medium" }
    ]
  },
  {
    id: "topological-sort",
    number: 16,
    title: "Topological Sort (Graph)",
    description: "Order vertices in a DAG so that for every edge u→v, u comes before v in the ordering.",
    difficulty: "Hard",
    timeComplexity: "O(V+E)",
    spaceComplexity: "O(V)",
    icon: "Share2",
    theory: "Topological Sort orders vertices of a Directed Acyclic Graph (DAG) linearly such that for every directed edge (u,v), u comes before v. It can be done using DFS (reverse post-order) or BFS (Kahn's algorithm with in-degree tracking).",
    analogy: "Like scheduling courses with prerequisites. You can't take Advanced Math before Basic Math. Topological sort gives you a valid order to take all courses, respecting all prerequisites.",
    whenToUse: [
      "Task scheduling with dependencies",
      "Build order for projects",
      "Course prerequisite ordering",
      "Detecting cycles in directed graphs"
    ],
    codeExample: `// Topological Sort using Kahn's Algorithm (BFS)
vector<int> topologicalSort(int n,
                  vector<vector<int>>& edges) {
    vector<vector<int>> graph(n);
    vector<int> inDegree(n, 0);
    
    // Build graph and count in-degrees
    for (auto& edge : edges) {
        graph[edge[0]].push_back(edge[1]);
        inDegree[edge[1]]++;
    }
    
    // Start with nodes having no prerequisites
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    
    vector<int> result;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        result.push_back(node);
        
        for (int neighbor : graph[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }
    
    // Check for cycle
    if (result.size() != n) return {};
    return result;
}`,
    syntaxDescription: "Kahn's: track in-degrees, start with zero in-degree nodes. Process node, decrement neighbors' in-degrees, add newly zero in-degree nodes. DFS: visit all, add to result in reverse post-order.",
    problems: [
      { name: "Course Schedule", difficulty: "Medium" },
      { name: "Course Schedule II", difficulty: "Medium" },
      { name: "Alien Dictionary", difficulty: "Hard" }
    ]
  }
];

export const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ComponentType<any>> = {
    Layers, GitBranch, Repeat, Timer, SortAsc, 
    RotateCcw, TreePine, Search, Box, Binary, 
    Cpu, ArrowUpDown, Network, Boxes, GitMerge, Share2
  };
  return icons[iconName] || Layers;
};
