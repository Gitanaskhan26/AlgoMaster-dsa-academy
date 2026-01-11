import {
    ArrowUpDown, Search, GitBranch, Cpu, HardDrive,
    Clock, Layers, Binary, Network, Database,
    Repeat, Timer, Box, TreePine, Share2
} from "lucide-react";

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

export const categories: AlgorithmCategory[] = [
    { id: "sorting", name: "Sorting Algorithms", icon: "ArrowUpDown", description: "Algorithms to arrange elements in order" },
    { id: "searching", name: "Searching Algorithms", icon: "Search", description: "Algorithms to find elements in data structures" },
    { id: "graph", name: "Graph Algorithms", icon: "GitBranch", description: "Algorithms for graph traversal and optimization" },
    { id: "dp", name: "Dynamic Programming", icon: "Layers", description: "Optimization using overlapping subproblems" },
    { id: "os", name: "Operating System Algorithms", icon: "Cpu", description: "CPU scheduling, memory, and disk algorithms", subcategories: ["Process Scheduling", "Memory Management", "Page Replacement", "Disk Scheduling", "Synchronization"] }
];

export const algorithms: Algorithm[] = [
    // ============ SORTING ALGORITHMS ============
    {
        id: "bubble-sort",
        name: "Bubble Sort",
        category: "sorting",
        description: "Compare and swap neighbors (like bubbles rising)",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        code: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break; // Already sorted
    }
}`,
        theory: "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. The largest elements 'bubble up' to the end of the array with each pass. The algorithm continues until no swaps are needed, indicating the list is sorted.",
        steps: [
            "Start at the beginning of the array",
            "Compare the first two neighbors - if the left one is bigger, swap them",
            "Move to the next pair and repeat the comparison",
            "After one complete pass, the biggest number has bubbled to the end",
            "Repeat the process, but now ignore the last sorted element",
            "Keep going until no swaps happen in a pass - that means we're done!"
        ]
    },
    {
        id: "selection-sort",
        name: "Selection Sort",
        category: "sorting",
        description: "Find minimum, swap to front",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        code: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
        theory: "Selection Sort divides the array into sorted and unsorted regions. It repeatedly finds the minimum element from the unsorted region and moves it to the end of the sorted region. Unlike Bubble Sort, it makes only one swap per pass.",
        steps: [
            "Look at all the numbers and find the smallest one",
            "Swap it with the first number in the unsorted part",
            "Now the first position is sorted! Move to the next position",
            "Find the smallest number in the remaining unsorted part",
            "Swap it to the current position",
            "Keep repeating until everything is in its place"
        ]
    },
    {
        id: "insertion-sort",
        name: "Insertion Sort",
        category: "sorting",
        description: "Like sorting playing cards in hand",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        code: `void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
        theory: "Insertion Sort builds the final sorted array one item at a time. It takes each element and inserts it into its correct position among the previously sorted elements, shifting larger elements to the right to make room.",
        steps: [
            "Pick up the second card (first is already 'sorted')",
            "Compare it with the card before it",
            "If it's smaller, shift the bigger card to the right",
            "Keep shifting until you find the right spot",
            "Insert the card in its correct position",
            "Pick up the next card and repeat until all cards are sorted"
        ]
    },
    {
        id: "merge-sort",
        name: "Merge Sort",
        category: "sorting",
        description: "Divide, sort halves, merge",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        code: `void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size()) {
        arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    }
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
        theory: "Merge Sort uses divide-and-conquer: it divides the array into halves, recursively sorts each half, then merges the sorted halves. The merge operation combines two sorted arrays into one sorted array efficiently.",
        steps: [
            "Split the pile of numbers into two halves",
            "Keep splitting each half until you have piles of just one number",
            "One number by itself is already sorted!",
            "Now merge two small piles: compare tops, take the smaller one",
            "Keep merging pairs into bigger sorted piles",
            "Eventually all numbers are merged into one big sorted pile"
        ]
    },
    {
        id: "quick-sort",
        name: "Quick Sort",
        category: "sorting",
        description: "Partition around pivot",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        code: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
        theory: "Quick Sort picks a 'pivot' element and partitions the array so elements smaller than pivot go left, larger go right. It then recursively sorts the sub-arrays. Average case is O(n log n), but worst case is O(n²) if pivot selection is poor.",
        steps: [
            "Pick a number as the 'pivot' (often the last one)",
            "Put all smaller numbers on the left of pivot",
            "Put all bigger numbers on the right of pivot",
            "Now pivot is in its final correct position!",
            "Do the same for the left group and right group",
            "Keep dividing until each group has just one number"
        ]
    },
    {
        id: "heap-sort",
        name: "Heap Sort",
        category: "sorting",
        description: "Build heap, extract max",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        code: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
        theory: "Heap Sort first builds a max-heap from the array, where the largest element is at the root. It then repeatedly extracts the maximum (root) and places it at the end, reducing the heap size each time.",
        steps: [
            "Arrange numbers into a special tree called a 'max-heap'",
            "In a max-heap, every parent is bigger than its children",
            "The biggest number is always at the top (root)",
            "Swap the top (biggest) with the last position",
            "That biggest number is now sorted! Shrink the heap by one",
            "Fix the heap and repeat until all numbers are extracted"
        ]
    },
    {
        id: "counting-sort",
        name: "Counting Sort",
        category: "sorting",
        description: "Count occurrences, reconstruct",
        timeComplexity: "O(n + k)",
        spaceComplexity: "O(k)",
        code: `void countingSort(vector<int>& arr) {
    int maxVal = *max_element(arr.begin(), arr.end());
    int minVal = *min_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;
    
    vector<int> count(range), output(arr.size());
    
    for (int num : arr) count[num - minVal]++;
    for (int i = 1; i < range; i++) count[i] += count[i - 1];
    
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
    }
    arr = output;
}`,
        theory: "Counting Sort counts how many times each value appears, then uses these counts to place elements directly in their correct positions. It's very fast but only works for integers with a limited range.",
        steps: [
            "Find the range of numbers (smallest to largest)",
            "Create a count array to track how many times each number appears",
            "Go through the array and count each number",
            "Calculate where each number should end up based on counts",
            "Place each number directly in its final position",
            "No comparisons needed - just counting and placing!"
        ]
    },
    {
        id: "radix-sort",
        name: "Radix Sort",
        category: "sorting",
        description: "Sort by digits (units, tens, hundreds)",
        timeComplexity: "O(d × n)",
        spaceComplexity: "O(n + k)",
        code: `void countingSortByDigit(vector<int>& arr, int exp) {
    vector<int> output(arr.size());
    int count[10] = {0};
    
    for (int num : arr) count[(num / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    arr = output;
}

void radixSort(vector<int>& arr) {
    int maxVal = *max_element(arr.begin(), arr.end());
    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}`,
        theory: "Radix Sort processes digits from least significant to most significant. For each digit position, it uses a stable sort (like counting sort) to arrange numbers. After processing all digits, the array is sorted.",
        steps: [
            "Start with the rightmost digit (ones place)",
            "Group numbers by that digit (0-9 buckets)",
            "Collect them back in order",
            "Move to the next digit (tens place) and repeat",
            "Keep going to hundreds, thousands, etc.",
            "After processing all digits, numbers are fully sorted!"
        ]
    },
    {
        id: "bucket-sort",
        name: "Bucket Sort",
        category: "sorting",
        description: "Distribute into buckets, sort each",
        timeComplexity: "O(n + k)",
        spaceComplexity: "O(n)",
        code: `void bucketSort(vector<float>& arr) {
    int n = arr.size();
    vector<vector<float>> buckets(n);
    
    for (float num : arr) {
        int idx = n * num;  // For values in [0, 1)
        buckets[idx].push_back(num);
    }
    
    for (auto& bucket : buckets) {
        sort(bucket.begin(), bucket.end());
    }
    
    int idx = 0;
    for (auto& bucket : buckets) {
        for (float num : bucket) {
            arr[idx++] = num;
        }
    }
}`,
        theory: "Bucket Sort distributes elements into several buckets based on their value range. Each bucket is sorted individually (often with insertion sort), then concatenated. It's efficient when input is uniformly distributed.",
        steps: [
            "Create several empty buckets (like bins)",
            "Look at each number and put it in the right bucket based on its value",
            "Small numbers go in early buckets, big numbers in later ones",
            "Sort the numbers inside each bucket (there aren't many!)",
            "Go through buckets in order and collect all numbers",
            "The collected numbers are now fully sorted!"
        ]
    },
    {
        id: "shell-sort",
        name: "Shell Sort",
        category: "sorting",
        description: "Insertion sort with gaps",
        timeComplexity: "O(n log² n)",
        spaceComplexity: "O(1)",
        code: `void shellSort(vector<int>& arr) {
    int n = arr.size();
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`,
        theory: "Shell Sort is an optimized insertion sort that compares elements far apart first, then progressively reduces the gap. This helps move elements to their approximate positions quickly, making final insertion sort passes much faster.",
        steps: [
            "Start with a big gap (usually half the array size)",
            "Compare and swap elements that are 'gap' positions apart",
            "This moves elements roughly to where they belong",
            "Reduce the gap (divide by 2) and repeat",
            "Keep reducing until gap is 1",
            "Final pass is regular insertion sort, but array is almost sorted!"
        ]
    },
    {
        id: "tim-sort",
        name: "Tim Sort",
        category: "sorting",
        description: "Hybrid (merge + insertion)",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        code: `const int RUN = 32;

void insertionSortRun(vector<int>& arr, int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int temp = arr[i];
        int j = i - 1;
        while (j >= left && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
    }
}

void timSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i += RUN) {
        insertionSortRun(arr, i, min(i + RUN - 1, n - 1));
    }
    for (int size = RUN; size < n; size *= 2) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = left + size - 1;
            int right = min(left + 2 * size - 1, n - 1);
            if (mid < right) merge(arr, left, mid, right);
        }
    }
}`,
        theory: "Tim Sort is a hybrid algorithm used in Python and Java. It divides the array into small 'runs', sorts each with insertion sort (efficient for small arrays), then merges runs using merge sort. It exploits existing order in real-world data.",
        steps: [
            "Divide the array into small chunks called 'runs' (32-64 elements)",
            "Sort each small run using insertion sort (fast for tiny arrays)",
            "Now we have many small sorted pieces",
            "Start merging pairs of runs together",
            "Keep merging bigger and bigger pieces",
            "Eventually everything is merged into one sorted array!"
        ]
    },
    {
        id: "cycle-sort",
        name: "Cycle Sort",
        category: "sorting",
        description: "Minimize memory writes",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        code: `void cycleSort(vector<int>& arr) {
    int n = arr.size();
    for (int cycleStart = 0; cycleStart < n - 1; cycleStart++) {
        int item = arr[cycleStart];
        int pos = cycleStart;
        
        for (int i = cycleStart + 1; i < n; i++) {
            if (arr[i] < item) pos++;
        }
        if (pos == cycleStart) continue;
        
        while (item == arr[pos]) pos++;
        swap(item, arr[pos]);
        
        while (pos != cycleStart) {
            pos = cycleStart;
            for (int i = cycleStart + 1; i < n; i++) {
                if (arr[i] < item) pos++;
            }
            while (item == arr[pos]) pos++;
            swap(item, arr[pos]);
        }
    }
}`,
        theory: "Cycle Sort minimizes the number of memory writes. It finds where each element should go and creates cycles of swaps. Each element is written to its final position exactly once, making it optimal for flash memory or EEPROM.",
        steps: [
            "Pick the first number and count how many are smaller",
            "That count tells us exactly where this number belongs",
            "Put the number in its correct position, but save what was there",
            "Now find where THAT saved number belongs",
            "Keep following this chain until we get back to the start",
            "One cycle complete! Move to the next unsorted position"
        ]
    },
    {
        id: "comb-sort",
        name: "Comb Sort",
        category: "sorting",
        description: "Bubble sort with shrinking gap",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        code: `void combSort(vector<int>& arr) {
    int n = arr.size();
    int gap = n;
    float shrink = 1.3;
    bool sorted = false;
    
    while (!sorted) {
        gap = max(1, (int)(gap / shrink));
        sorted = (gap == 1);
        
        for (int i = 0; i + gap < n; i++) {
            if (arr[i] > arr[i + gap]) {
                swap(arr[i], arr[i + gap]);
                sorted = false;
            }
        }
    }
}`,
        theory: "Comb Sort improves on Bubble Sort by using gaps larger than 1. It starts with a large gap and shrinks it by a factor (usually 1.3) each pass. This eliminates 'turtles' - small values near the end that slow down bubble sort.",
        steps: [
            "Start with a big gap (the array size)",
            "Compare elements that are 'gap' apart and swap if needed",
            "Shrink the gap (divide by 1.3)",
            "Repeat comparisons with the smaller gap",
            "Keep shrinking until gap is 1",
            "Final passes are like bubble sort, but most work is done!"
        ]
    },
    {
        id: "pigeonhole-sort",
        name: "Pigeonhole Sort",
        category: "sorting",
        description: "When range is small",
        timeComplexity: "O(n + range)",
        spaceComplexity: "O(range)",
        code: `void pigeonholeSort(vector<int>& arr) {
    int minVal = *min_element(arr.begin(), arr.end());
    int maxVal = *max_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;
    
    vector<vector<int>> holes(range);
    
    for (int num : arr) {
        holes[num - minVal].push_back(num);
    }
    
    int idx = 0;
    for (auto& hole : holes) {
        for (int num : hole) {
            arr[idx++] = num;
        }
    }
}`,
        theory: "Pigeonhole Sort creates a 'hole' for each possible value in the range. Elements are placed in their corresponding holes, then collected in order. It's very fast when the range of values is similar to the number of elements.",
        steps: [
            "Find the smallest and largest numbers to know the range",
            "Create a 'pigeonhole' (bucket) for each possible value",
            "Go through each number and drop it in its matching hole",
            "Number 5 goes in hole 5, number 8 goes in hole 8, etc.",
            "Walk through holes from first to last",
            "Collect all numbers - they come out sorted!"
        ]
    },
    {
        id: "gnome-sort",
        name: "Gnome Sort",
        category: "sorting",
        description: "Like insertion but simpler",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        code: `void gnomeSort(vector<int>& arr) {
    int n = arr.size();
    int i = 0;
    
    while (i < n) {
        if (i == 0 || arr[i] >= arr[i - 1]) {
            i++;
        } else {
            swap(arr[i], arr[i - 1]);
            i--;
        }
    }
}`,
        theory: "Gnome Sort is similar to insertion sort but simpler. It moves forward when elements are in order, but when it finds a misplaced element, it swaps backward until that element is in place. Named after garden gnomes sorting flower pots.",
        steps: [
            "Start at the first position",
            "Look at the current pot and the one before it",
            "If they're in order (or you're at the start), step forward",
            "If they're out of order, swap them and step backward",
            "Keep going - forward when good, backward when fixing",
            "When you reach the end, everything is sorted!"
        ]
    },

    // ============ SEARCHING ALGORITHMS ============
    {
        id: "linear-search",
        name: "Linear Search",
        category: "searching",
        description: "Check each element",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;  // Not found
}`,
        theory: "Linear Search checks every element one by one until it finds the target or reaches the end. It works on any array (sorted or unsorted) and is simple but can be slow for large datasets.",
        steps: [
            "Start at the first element",
            "Is this the number we're looking for? If yes, we found it!",
            "If not, move to the next element",
            "Check that one too",
            "Keep checking one by one until we find it",
            "If we reach the end without finding it, it's not there"
        ]
    },
    {
        id: "binary-search",
        name: "Binary Search",
        category: "searching",
        description: "Halve sorted array",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        code: `int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
        theory: "Binary Search works on sorted arrays by repeatedly dividing the search space in half. It compares the target with the middle element and eliminates half of the remaining elements each time.",
        steps: [
            "The array must be sorted first!",
            "Look at the middle element",
            "Is it what we want? Great, we found it!",
            "Is our target bigger? Then ignore the left half",
            "Is our target smaller? Then ignore the right half",
            "Keep halving until we find it or run out of elements"
        ]
    },
    {
        id: "jump-search",
        name: "Jump Search",
        category: "searching",
        description: "Jump blocks, then linear",
        timeComplexity: "O(√n)",
        spaceComplexity: "O(1)",
        code: `int jumpSearch(vector<int>& arr, int target) {
    int n = arr.size();
    int step = sqrt(n);
    int prev = 0;
    
    while (arr[min(step, n) - 1] < target) {
        prev = step;
        step += sqrt(n);
        if (prev >= n) return -1;
    }
    
    while (arr[prev] < target) {
        prev++;
        if (prev == min(step, n)) return -1;
    }
    
    return (arr[prev] == target) ? prev : -1;
}`,
        theory: "Jump Search works on sorted arrays by jumping ahead by fixed steps until finding a block where the target could be, then doing a linear search within that block. Optimal step size is √n.",
        steps: [
            "Array must be sorted",
            "Jump forward by √n elements at a time",
            "After each jump, check: is this element bigger than target?",
            "If yes, target is somewhere in the previous block",
            "Go back to the previous block",
            "Search through that block one by one to find the target"
        ]
    },
    {
        id: "interpolation-search",
        name: "Interpolation Search",
        category: "searching",
        description: "Estimate position",
        timeComplexity: "O(log log n)",
        spaceComplexity: "O(1)",
        code: `int interpolationSearch(vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low == high) {
            return (arr[low] == target) ? low : -1;
        }
        
        int pos = low + ((double)(high - low) / 
                  (arr[high] - arr[low])) * (target - arr[low]);
        
        if (arr[pos] == target) return pos;
        if (arr[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
}`,
        theory: "Interpolation Search improves on binary search for uniformly distributed data. Instead of always going to the middle, it estimates the position based on the target value, similar to how we search a phone book.",
        steps: [
            "Array must be sorted with evenly spread values",
            "Instead of looking at the middle, guess where the target might be",
            "If looking for 'John' in a phone book, start near 'J', not the middle",
            "Calculate the estimated position based on the target value",
            "Check that position - adjust left or right based on result",
            "Very fast when values are evenly spread out!"
        ]
    },
    {
        id: "exponential-search",
        name: "Exponential Search",
        category: "searching",
        description: "Find range, then binary",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        code: `int exponentialSearch(vector<int>& arr, int target) {
    int n = arr.size();
    if (arr[0] == target) return 0;
    
    int i = 1;
    while (i < n && arr[i] <= target) {
        i *= 2;
    }
    
    int left = i / 2;
    int right = min(i, n - 1);
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
        theory: "Exponential Search first finds a range where the target might be by doubling the index (1, 2, 4, 8, 16...), then performs binary search within that range. It's useful for unbounded or infinite arrays.",
        steps: [
            "Array must be sorted",
            "Start at position 1, then 2, then 4, then 8... (doubling each time)",
            "Stop when we find a value bigger than our target",
            "Now we know the target is somewhere in the previous range",
            "Use binary search in that range",
            "Great for huge arrays when target is near the beginning!"
        ]
    },
    {
        id: "ternary-search",
        name: "Ternary Search",
        category: "searching",
        description: "Divide into 3 parts",
        timeComplexity: "O(log₃ n)",
        spaceComplexity: "O(1)",
        code: `int ternarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid1 = left + (right - left) / 3;
        int mid2 = right - (right - left) / 3;
        
        if (arr[mid1] == target) return mid1;
        if (arr[mid2] == target) return mid2;
        
        if (target < arr[mid1]) right = mid1 - 1;
        else if (target > arr[mid2]) left = mid2 + 1;
        else { left = mid1 + 1; right = mid2 - 1; }
    }
    return -1;
}`,
        theory: "Ternary Search divides the array into three parts and determines which third contains the target. While it makes fewer comparisons theoretically, binary search is often faster in practice due to simpler operations.",
        steps: [
            "Array must be sorted",
            "Divide the array into three equal parts",
            "Check both dividing points (1/3 and 2/3 positions)",
            "If target is less than first point, search left third",
            "If target is greater than second point, search right third",
            "Otherwise, search the middle third"
        ]
    },
    {
        id: "fibonacci-search",
        name: "Fibonacci Search",
        category: "searching",
        description: "Use Fibonacci numbers",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        code: `int fibonacciSearch(vector<int>& arr, int target) {
    int n = arr.size();
    int fib2 = 0, fib1 = 1, fib = fib1 + fib2;
    
    while (fib < n) {
        fib2 = fib1;
        fib1 = fib;
        fib = fib1 + fib2;
    }
    
    int offset = -1;
    while (fib > 1) {
        int i = min(offset + fib2, n - 1);
        if (arr[i] < target) {
            fib = fib1;
            fib1 = fib2;
            fib2 = fib - fib1;
            offset = i;
        } else if (arr[i] > target) {
            fib = fib2;
            fib1 = fib1 - fib2;
            fib2 = fib - fib1;
        } else return i;
    }
    
    if (fib1 && offset + 1 < n && arr[offset + 1] == target)
        return offset + 1;
    return -1;
}`,
        theory: "Fibonacci Search uses Fibonacci numbers to divide the array. It only uses addition and subtraction (no division), making it efficient on systems where division is costly.",
        steps: [
            "Array must be sorted",
            "Find the smallest Fibonacci number >= array size",
            "Use Fibonacci numbers to decide where to look",
            "If target is smaller, move to a smaller Fibonacci range",
            "If target is larger, move to a larger Fibonacci range",
            "Uses only addition - no division needed!"
        ]
    },
    {
        id: "hash-search",
        name: "Hash-based Search",
        category: "searching",
        description: "O(1) with hash table",
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
        code: `class HashSearch {
    unordered_set<int> hashTable;
    
public:
    void insert(int value) {
        hashTable.insert(value);
    }
    
    bool search(int target) {
        return hashTable.find(target) != hashTable.end();
    }
    
    void remove(int value) {
        hashTable.erase(value);
    }
};`,
        theory: "Hash-based Search uses a hash function to compute an index for each element, allowing O(1) average-case lookup. The hash function maps values to buckets, and collisions are handled with chaining or open addressing.",
        steps: [
            "Create a big array of 'buckets' (the hash table)",
            "When adding a number, calculate its 'hash' (like a special address)",
            "Put the number in that bucket",
            "To find a number, calculate its hash again",
            "Go directly to that bucket - no searching through everything!",
            "Super fast! Like knowing exactly which locker to check"
        ]
    },

    // ============ GRAPH ALGORITHMS ============
    {
        id: "bfs",
        name: "BFS (Breadth-First Search)",
        category: "graph",
        description: "Level order traversal",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        code: `void bfs(vector<vector<int>>& adj, int start) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    
    visited[start] = true;
    q.push(start);
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";
        
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`,
        theory: "BFS explores a graph level by level, visiting all neighbors of a node before moving to their neighbors. It uses a queue to track nodes to visit and is ideal for finding shortest paths in unweighted graphs.",
        steps: [
            "Start at the first node and add it to a queue",
            "Take out the front node and visit all its neighbors",
            "Add each unvisited neighbor to the queue",
            "Mark neighbors as visited so we don't repeat",
            "Repeat: take from queue, visit neighbors, add to queue",
            "Stop when queue is empty - we've seen everything!"
        ]
    },
    {
        id: "dfs",
        name: "DFS (Depth-First Search)",
        category: "graph",
        description: "Depth first exploration",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        code: `void dfs(vector<vector<int>>& adj, int node, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(adj, neighbor, visited);
        }
    }
}`,
        theory: "DFS explores as deep as possible along each branch before backtracking. It uses recursion or a stack and is useful for path finding, cycle detection, and topological sorting.",
        steps: [
            "Start at a node and mark it visited",
            "Pick one neighbor and go there",
            "From that neighbor, pick another neighbor and keep going deeper",
            "When you hit a dead end (no unvisited neighbors), go back",
            "Try another path from where you backtracked",
            "Keep exploring until all reachable nodes are visited"
        ]
    },
    {
        id: "dijkstra",
        name: "Dijkstra's Algorithm",
        category: "graph",
        description: "Shortest path (no negative weights)",
        timeComplexity: "O((V + E) log V)",
        spaceComplexity: "O(V)",
        code: `vector<int> dijkstra(vector<vector<pair<int,int>>>& adj, int src) {
    int n = adj.size();
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    
    dist[src] = 0;
    pq.push({0, src});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
        theory: "Dijkstra finds the shortest path from a source to all other vertices in a weighted graph with non-negative weights. It greedily selects the unvisited vertex with the smallest distance.",
        steps: [
            "Set distance to start as 0, all others as infinity",
            "Pick the unvisited node with smallest distance",
            "Look at all its neighbors",
            "If going through current node is shorter, update their distance",
            "Mark current node as visited",
            "Repeat until all nodes are visited or target is reached"
        ]
    },
    {
        id: "bellman-ford",
        name: "Bellman-Ford Algorithm",
        category: "graph",
        description: "Shortest path (allows negative weights)",
        timeComplexity: "O(V × E)",
        spaceComplexity: "O(V)",
        code: `vector<int> bellmanFord(int V, vector<tuple<int,int,int>>& edges, int src) {
    vector<int> dist(V, INT_MAX);
    dist[src] = 0;
    
    for (int i = 0; i < V - 1; i++) {
        for (auto& [u, v, w] : edges) {
            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    // Check for negative cycle
    for (auto& [u, v, w] : edges) {
        if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
            return {}; // Negative cycle exists
        }
    }
    return dist;
}`,
        theory: "Bellman-Ford finds shortest paths even with negative edge weights. It relaxes all edges V-1 times and can detect negative cycles. Slower than Dijkstra but more versatile.",
        steps: [
            "Set distance to start as 0, all others as infinity",
            "Go through ALL edges and try to improve distances",
            "If edge A→B can make B's distance shorter, update it",
            "Repeat this for all edges, V-1 times total",
            "Check once more - if distances still improve, there's a negative cycle",
            "After V-1 rounds, we have the shortest distances!"
        ]
    },
    {
        id: "floyd-warshall",
        name: "Floyd-Warshall Algorithm",
        category: "graph",
        description: "All pairs shortest path",
        timeComplexity: "O(V³)",
        spaceComplexity: "O(V²)",
        code: `void floydWarshall(vector<vector<int>>& dist) {
    int V = dist.size();
    
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] != INT_MAX && dist[k][j] != INT_MAX) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
}`,
        theory: "Floyd-Warshall finds shortest paths between ALL pairs of vertices. It considers each vertex as an intermediate point and updates distances. Works with negative weights but not negative cycles.",
        steps: [
            "Create a distance table for all pairs of nodes",
            "For each possible 'middle' node K",
            "Check every pair of nodes (A, B)",
            "Ask: Is going A→K→B shorter than A→B directly?",
            "If yes, update the A→B distance",
            "After trying all middle nodes, we have all shortest paths!"
        ]
    },
    {
        id: "prims",
        name: "Prim's Algorithm",
        category: "graph",
        description: "Minimum Spanning Tree",
        timeComplexity: "O((V + E) log V)",
        spaceComplexity: "O(V)",
        code: `int prims(vector<vector<pair<int,int>>>& adj) {
    int n = adj.size();
    vector<bool> inMST(n, false);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    
    pq.push({0, 0});
    int totalWeight = 0;
    
    while (!pq.empty()) {
        auto [w, u] = pq.top(); pq.pop();
        if (inMST[u]) continue;
        
        inMST[u] = true;
        totalWeight += w;
        
        for (auto [v, weight] : adj[u]) {
            if (!inMST[v]) pq.push({weight, v});
        }
    }
    return totalWeight;
}`,
        theory: "Prim's algorithm builds a Minimum Spanning Tree by starting from one vertex and always adding the cheapest edge that connects a new vertex to the growing tree.",
        steps: [
            "Start with any node - it's the beginning of our tree",
            "Look at all edges going OUT from our tree",
            "Pick the cheapest edge that leads to a new node",
            "Add that node and edge to our tree",
            "Now look at edges from our bigger tree",
            "Keep adding cheapest edges until all nodes are connected!"
        ]
    },
    {
        id: "kruskals",
        name: "Kruskal's Algorithm",
        category: "graph",
        description: "MST with union-find",
        timeComplexity: "O(E log E)",
        spaceComplexity: "O(V)",
        code: `class UnionFind {
    vector<int> parent, rank;
public:
    UnionFind(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank[px] < rank[py]) swap(px, py);
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
};

int kruskals(int V, vector<tuple<int,int,int>>& edges) {
    sort(edges.begin(), edges.end());
    UnionFind uf(V);
    int mstWeight = 0;
    
    for (auto& [w, u, v] : edges) {
        if (uf.unite(u, v)) mstWeight += w;
    }
    return mstWeight;
}`,
        theory: "Kruskal's algorithm builds MST by sorting all edges by weight and adding them one by one, skipping edges that would create a cycle (detected using Union-Find).",
        steps: [
            "List all edges and sort them from cheapest to most expensive",
            "Pick the cheapest edge",
            "Does it connect two separate groups? Add it!",
            "Would it create a cycle? Skip it!",
            "Use Union-Find to quickly check for cycles",
            "Keep going until we have V-1 edges (spanning tree complete)"
        ]
    },
    {
        id: "topological-sort",
        name: "Topological Sort",
        category: "graph",
        description: "Order dependencies",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        code: `vector<int> topologicalSort(vector<vector<int>>& adj) {
    int n = adj.size();
    vector<int> indegree(n, 0);
    
    for (int u = 0; u < n; u++) {
        for (int v : adj[u]) indegree[v]++;
    }
    
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    vector<int> result;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        result.push_back(u);
        for (int v : adj[u]) {
            if (--indegree[v] == 0) q.push(v);
        }
    }
    return result;
}`,
        theory: "Topological Sort orders vertices of a DAG so that for every edge u→v, u comes before v. It's used for task scheduling, build systems, and dependency resolution.",
        steps: [
            "Count how many edges point TO each node (in-degree)",
            "Find all nodes with no incoming edges - they can go first",
            "Add them to a queue",
            "Take a node from queue, add to result",
            "Remove its outgoing edges (decrease neighbors' in-degree)",
            "If any neighbor now has in-degree 0, add to queue"
        ]
    },
    {
        id: "kahns",
        name: "Kahn's Algorithm",
        category: "graph",
        description: "Topological sort with BFS",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        code: `vector<int> kahns(int V, vector<vector<int>>& adj) {
    vector<int> indegree(V, 0);
    for (int u = 0; u < V; u++) {
        for (int v : adj[u]) indegree[v]++;
    }
    
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    vector<int> result;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        result.push_back(u);
        for (int v : adj[u]) {
            if (--indegree[v] == 0) q.push(v);
        }
    }
    
    return (result.size() == V) ? result : vector<int>();
}`,
        theory: "Kahn's Algorithm is a BFS-based approach to topological sorting. It also detects cycles - if the result has fewer nodes than V, the graph has a cycle.",
        steps: [
            "Calculate in-degree for each node",
            "Add all zero in-degree nodes to queue",
            "Process queue: remove node, add to result",
            "Decrease in-degree of all neighbors",
            "If neighbor's in-degree becomes 0, add to queue",
            "If result has all nodes, success! Otherwise, there's a cycle"
        ]
    },
    {
        id: "articulation-points",
        name: "Articulation Points",
        category: "graph",
        description: "Graph connectivity critical nodes",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        code: `void dfs(int u, int parent, vector<vector<int>>& adj,
         vector<int>& disc, vector<int>& low,
         vector<bool>& ap, int& timer) {
    disc[u] = low[u] = timer++;
    int children = 0;
    
    for (int v : adj[u]) {
        if (disc[v] == -1) {
            children++;
            dfs(v, u, adj, disc, low, ap, timer);
            low[u] = min(low[u], low[v]);
            
            if (parent == -1 && children > 1) ap[u] = true;
            if (parent != -1 && low[v] >= disc[u]) ap[u] = true;
        } else if (v != parent) {
            low[u] = min(low[u], disc[v]);
        }
    }
}`,
        theory: "Articulation Points (cut vertices) are nodes whose removal disconnects the graph. They're found using DFS with discovery and low times.",
        steps: [
            "Do a DFS and track when each node was discovered",
            "Also track the earliest discovered node reachable from subtree",
            "Root is an articulation point if it has 2+ children",
            "Non-root is articulation point if no path bypasses it",
            "A node is critical if children can't reach ancestors without it",
            "These are the points that would 'break' the graph if removed"
        ]
    },
    {
        id: "bridges",
        name: "Bridges in Graph",
        category: "graph",
        description: "Critical edges",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        code: `void findBridges(int u, int parent, vector<vector<int>>& adj,
                 vector<int>& disc, vector<int>& low,
                 vector<pair<int,int>>& bridges, int& timer) {
    disc[u] = low[u] = timer++;
    
    for (int v : adj[u]) {
        if (disc[v] == -1) {
            findBridges(v, u, adj, disc, low, bridges, timer);
            low[u] = min(low[u], low[v]);
            
            if (low[v] > disc[u]) {
                bridges.push_back({u, v});
            }
        } else if (v != parent) {
            low[u] = min(low[u], disc[v]);
        }
    }
}`,
        theory: "Bridges are edges whose removal disconnects the graph. Similar to articulation points, we use DFS with discovery/low times. An edge u-v is a bridge if v cannot reach any ancestor of u.",
        steps: [
            "Do DFS and track discovery time of each node",
            "Track lowest discovery time reachable from each subtree",
            "For each edge u→v, check if v's subtree can reach u's ancestors",
            "If v's lowest reachable is greater than u's discovery time",
            "Then u-v is a bridge (removing it disconnects v's part)",
            "These are the 'weak links' in the network"
        ]
    },
    {
        id: "scc-kosaraju",
        name: "Strongly Connected Components",
        category: "graph",
        description: "Kosaraju's algorithm",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        code: `void dfs1(int u, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& st) {
    visited[u] = true;
    for (int v : adj[u]) if (!visited[v]) dfs1(v, adj, visited, st);
    st.push(u);
}

void dfs2(int u, vector<vector<int>>& radj, vector<bool>& visited, vector<int>& comp) {
    visited[u] = true;
    comp.push_back(u);
    for (int v : radj[u]) if (!visited[v]) dfs2(v, radj, visited, comp);
}

vector<vector<int>> kosaraju(int V, vector<vector<int>>& adj) {
    stack<int> st;
    vector<bool> visited(V, false);
    for (int i = 0; i < V; i++) if (!visited[i]) dfs1(i, adj, visited, st);
    
    vector<vector<int>> radj(V);
    for (int u = 0; u < V; u++) for (int v : adj[u]) radj[v].push_back(u);
    
    fill(visited.begin(), visited.end(), false);
    vector<vector<int>> sccs;
    while (!st.empty()) {
        int u = st.top(); st.pop();
        if (!visited[u]) {
            vector<int> comp;
            dfs2(u, radj, visited, comp);
            sccs.push_back(comp);
        }
    }
    return sccs;
}`,
        theory: "Kosaraju's algorithm finds SCCs in two DFS passes. First DFS orders nodes by finish time, second DFS on reversed graph finds components. Nodes in an SCC can all reach each other.",
        steps: [
            "Do DFS on original graph, push nodes to stack when done",
            "Reverse all edges in the graph",
            "Pop nodes from stack and do DFS on reversed graph",
            "Each DFS in step 3 finds one SCC",
            "Nodes that can reach each other form a component",
            "Two passes give us all strongly connected components!"
        ]
    },
    {
        id: "tarjans",
        name: "Tarjan's Algorithm",
        category: "graph",
        description: "SCC in one pass",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        code: `void tarjan(int u, vector<vector<int>>& adj, vector<int>& disc, vector<int>& low,
            stack<int>& st, vector<bool>& onStack, vector<vector<int>>& sccs, int& timer) {
    disc[u] = low[u] = timer++;
    st.push(u);
    onStack[u] = true;
    
    for (int v : adj[u]) {
        if (disc[v] == -1) {
            tarjan(v, adj, disc, low, st, onStack, sccs, timer);
            low[u] = min(low[u], low[v]);
        } else if (onStack[v]) {
            low[u] = min(low[u], disc[v]);
        }
    }
    
    if (low[u] == disc[u]) {
        vector<int> scc;
        while (true) {
            int v = st.top(); st.pop();
            onStack[v] = false;
            scc.push_back(v);
            if (v == u) break;
        }
        sccs.push_back(scc);
    }
}`,
        theory: "Tarjan's algorithm finds SCCs in a single DFS pass using a stack. A node is the root of an SCC if its low value equals its discovery time.",
        steps: [
            "Do DFS and track discovery time and low values",
            "Push each node onto a stack when visiting",
            "Update low values based on neighbors",
            "When a node's low equals its discovery time, it's an SCC root",
            "Pop stack until we reach this root - that's one SCC",
            "Single pass finds all strongly connected components!"
        ]
    },
    {
        id: "ford-fulkerson",
        name: "Ford-Fulkerson Algorithm",
        category: "graph",
        description: "Maximum flow",
        timeComplexity: "O(E × max_flow)",
        spaceComplexity: "O(V²)",
        code: `bool bfs(vector<vector<int>>& rGraph, int s, int t, vector<int>& parent) {
    int V = rGraph.size();
    vector<bool> visited(V, false);
    queue<int> q;
    q.push(s);
    visited[s] = true;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v = 0; v < V; v++) {
            if (!visited[v] && rGraph[u][v] > 0) {
                q.push(v);
                parent[v] = u;
                visited[v] = true;
            }
        }
    }
    return visited[t];
}

int fordFulkerson(vector<vector<int>>& graph, int s, int t) {
    int V = graph.size();
    vector<vector<int>> rGraph = graph;
    vector<int> parent(V);
    int maxFlow = 0;
    
    while (bfs(rGraph, s, t, parent)) {
        int pathFlow = INT_MAX;
        for (int v = t; v != s; v = parent[v]) {
            pathFlow = min(pathFlow, rGraph[parent[v]][v]);
        }
        for (int v = t; v != s; v = parent[v]) {
            rGraph[parent[v]][v] -= pathFlow;
            rGraph[v][parent[v]] += pathFlow;
        }
        maxFlow += pathFlow;
    }
    return maxFlow;
}`,
        theory: "Ford-Fulkerson finds maximum flow in a network by repeatedly finding augmenting paths from source to sink and pushing flow along them until no more paths exist.",
        steps: [
            "Start with zero flow everywhere",
            "Find any path from source to sink with available capacity",
            "Find the bottleneck (minimum capacity) on this path",
            "Push that much flow through the path",
            "Update remaining capacities",
            "Repeat until no path exists - that's maximum flow!"
        ]
    },
    {
        id: "edmonds-karp",
        name: "Edmonds-Karp Algorithm",
        category: "graph",
        description: "Max flow with BFS",
        timeComplexity: "O(V × E²)",
        spaceComplexity: "O(V²)",
        code: `int edmondsKarp(vector<vector<int>>& capacity, int s, int t) {
    int V = capacity.size();
    vector<vector<int>> flow(V, vector<int>(V, 0));
    int maxFlow = 0;
    
    while (true) {
        vector<int> parent(V, -1);
        queue<int> q;
        q.push(s);
        parent[s] = s;
        
        while (!q.empty() && parent[t] == -1) {
            int u = q.front(); q.pop();
            for (int v = 0; v < V; v++) {
                if (parent[v] == -1 && capacity[u][v] - flow[u][v] > 0) {
                    parent[v] = u;
                    q.push(v);
                }
            }
        }
        
        if (parent[t] == -1) break;
        
        int pathFlow = INT_MAX;
        for (int v = t; v != s; v = parent[v]) {
            pathFlow = min(pathFlow, capacity[parent[v]][v] - flow[parent[v]][v]);
        }
        for (int v = t; v != s; v = parent[v]) {
            flow[parent[v]][v] += pathFlow;
            flow[v][parent[v]] -= pathFlow;
        }
        maxFlow += pathFlow;
    }
    return maxFlow;
}`,
        theory: "Edmonds-Karp is Ford-Fulkerson using BFS to find augmenting paths. BFS guarantees shortest augmenting paths, giving polynomial time complexity.",
        steps: [
            "Same as Ford-Fulkerson but always use BFS for paths",
            "BFS finds the shortest path (fewest edges)",
            "This ensures we make progress efficiently",
            "Find path, push flow, update capacities",
            "Repeat until no path from source to sink",
            "Guaranteed to finish in O(VE²) time!"
        ]
    },
    {
        id: "hungarian",
        name: "Hungarian Algorithm",
        category: "graph",
        description: "Assignment problem",
        timeComplexity: "O(n³)",
        spaceComplexity: "O(n²)",
        code: `// Simplified Hungarian Algorithm concept
vector<int> hungarian(vector<vector<int>>& cost) {
    int n = cost.size();
    vector<int> u(n+1), v(n+1), p(n+1), way(n+1);
    
    for (int i = 1; i <= n; i++) {
        p[0] = i;
        int j0 = 0;
        vector<int> minv(n+1, INT_MAX);
        vector<bool> used(n+1, false);
        
        do {
            used[j0] = true;
            int i0 = p[j0], j1;
            int delta = INT_MAX;
            
            for (int j = 1; j <= n; j++) {
                if (!used[j]) {
                    int cur = cost[i0-1][j-1] - u[i0] - v[j];
                    if (cur < minv[j]) { minv[j] = cur; way[j] = j0; }
                    if (minv[j] < delta) { delta = minv[j]; j1 = j; }
                }
            }
            for (int j = 0; j <= n; j++) {
                if (used[j]) { u[p[j]] += delta; v[j] -= delta; }
                else { minv[j] -= delta; }
            }
            j0 = j1;
        } while (p[j0] != 0);
        
        do { int j1 = way[j0]; p[j0] = p[j1]; j0 = j1; } while (j0);
    }
    
    vector<int> result(n);
    for (int j = 1; j <= n; j++) result[p[j]-1] = j-1;
    return result;
}`,
        theory: "The Hungarian Algorithm solves the assignment problem - optimally assigning n workers to n jobs with minimum total cost. It uses potential theory to find augmenting paths efficiently.",
        steps: [
            "Create a cost matrix (worker i to job j costs cost[i][j])",
            "Reduce each row by its minimum value",
            "Reduce each column by its minimum value",
            "Find maximum matching with zero-cost edges",
            "If not all assigned, adjust potentials and repeat",
            "Final matching gives optimal assignment!"
        ]
    },
    {
        id: "a-star",
        name: "A* Algorithm",
        category: "graph",
        description: "Informed search with heuristics",
        timeComplexity: "O(E)",
        spaceComplexity: "O(V)",
        code: `struct Node { int pos, g, f; };

int heuristic(int a, int b, int cols) {
    int ax = a % cols, ay = a / cols;
    int bx = b % cols, by = b / cols;
    return abs(ax - bx) + abs(ay - by);  // Manhattan distance
}

int aStar(vector<vector<pair<int,int>>>& adj, int start, int goal, int cols) {
    int n = adj.size();
    vector<int> gScore(n, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    
    gScore[start] = 0;
    pq.push({heuristic(start, goal, cols), start});
    
    while (!pq.empty()) {
        auto [f, u] = pq.top(); pq.pop();
        if (u == goal) return gScore[goal];
        
        for (auto [v, w] : adj[u]) {
            int tentative = gScore[u] + w;
            if (tentative < gScore[v]) {
                gScore[v] = tentative;
                int fScore = tentative + heuristic(v, goal, cols);
                pq.push({fScore, v});
            }
        }
    }
    return -1;
}`,
        theory: "A* combines Dijkstra's algorithm with heuristics. It uses f(n) = g(n) + h(n) where g is actual cost and h is estimated cost to goal. With admissible heuristics, it finds optimal paths efficiently.",
        steps: [
            "Start with the starting node",
            "For each node, calculate: actual cost + estimated remaining cost",
            "Always explore the node with lowest total estimated cost",
            "The estimate (heuristic) guides us toward the goal",
            "If goal is reached, we found the shortest path!",
            "Smart guessing makes it faster than exploring blindly"
        ]
    },
    {
        id: "bidirectional-search",
        name: "Bidirectional Search",
        category: "graph",
        description: "Search from both ends",
        timeComplexity: "O(b^(d/2))",
        spaceComplexity: "O(b^(d/2))",
        code: `int bidirectionalSearch(vector<vector<int>>& adj, int start, int goal) {
    if (start == goal) return 0;
    int n = adj.size();
    
    vector<int> distS(n, -1), distG(n, -1);
    queue<int> qS, qG;
    
    qS.push(start); distS[start] = 0;
    qG.push(goal); distG[goal] = 0;
    
    while (!qS.empty() && !qG.empty()) {
        // Expand from start
        int u = qS.front(); qS.pop();
        for (int v : adj[u]) {
            if (distS[v] == -1) {
                distS[v] = distS[u] + 1;
                if (distG[v] != -1) return distS[v] + distG[v];
                qS.push(v);
            }
        }
        
        // Expand from goal
        u = qG.front(); qG.pop();
        for (int v : adj[u]) {
            if (distG[v] == -1) {
                distG[v] = distG[u] + 1;
                if (distS[v] != -1) return distS[v] + distG[v];
                qG.push(v);
            }
        }
    }
    return -1;
}`,
        theory: "Bidirectional search runs two simultaneous BFS searches - one from start and one from goal. They meet in the middle, dramatically reducing the search space.",
        steps: [
            "Start two searches: one from start, one from goal",
            "Both searches expand outward like ripples",
            "Alternate between expanding each search",
            "When the ripples meet, we found a path!",
            "Path length = distance from start + distance from goal",
            "Much faster than searching one way - we meet in the middle!"
        ]
    },

    // ============ DYNAMIC PROGRAMMING ============
    {
        id: "knapsack-01",
        name: "0/1 Knapsack",
        category: "dp",
        description: "Item selection optimization",
        timeComplexity: "O(n × W)",
        spaceComplexity: "O(W)",
        code: `int knapsack(vector<int>& wt, vector<int>& val, int W) {
    int n = wt.size();
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}`,
        theory: "The 0/1 Knapsack problem: given items with weights and values, find the maximum value that fits in a bag of capacity W. Each item can only be taken once (0 or 1).",
        steps: ["You have a bag that can hold W pounds", "Each item has a weight and value", "For each item, decide: take it or leave it?", "If you take it, subtract its weight from remaining capacity", "Track the best value possible for each capacity", "Answer is the best value when using full capacity"]
    },
    {
        id: "unbounded-knapsack",
        name: "Unbounded Knapsack",
        category: "dp",
        description: "Unlimited items available",
        timeComplexity: "O(n × W)",
        spaceComplexity: "O(W)",
        code: `int unboundedKnapsack(vector<int>& wt, vector<int>& val, int W) {
    vector<int> dp(W + 1, 0);
    for (int w = 1; w <= W; w++) {
        for (int i = 0; i < wt.size(); i++) {
            if (wt[i] <= w) {
                dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
            }
        }
    }
    return dp[W];
}`,
        theory: "Unlike 0/1 Knapsack, you can take unlimited copies of each item. The recurrence changes: we can reuse items, so we iterate capacity from left to right.",
        steps: ["Same bag with capacity W", "But now you can take any item multiple times!", "For each capacity, try all items that fit", "Pick whichever gives maximum value", "An item can be used again and again", "Find best value for each capacity up to W"]
    },
    {
        id: "lcs",
        name: "Longest Common Subsequence",
        category: "dp",
        description: "String similarity measure",
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
        code: `int lcs(string& a, string& b) {
    int m = a.size(), n = b.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (a[i-1] == b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}`,
        theory: "Find the longest sequence that appears in both strings (not necessarily contiguous). Used in diff tools, DNA analysis, and version control.",
        steps: ["Compare two strings character by character", "If characters match, extend the sequence by 1", "If they don't match, take the better result from either skipping left or right character", "Build up solutions from smaller substrings", "The answer is in the bottom-right cell", "The path back shows the actual common subsequence"]
    },
    {
        id: "lis",
        name: "Longest Increasing Subsequence",
        category: "dp",
        description: "Find longest ascending order",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        code: `int lis(vector<int>& nums) {
    vector<int> tail;
    for (int num : nums) {
        auto it = lower_bound(tail.begin(), tail.end(), num);
        if (it == tail.end()) tail.push_back(num);
        else *it = num;
    }
    return tail.size();
}`,
        theory: "Find the longest subsequence where each element is larger than the previous. The O(n log n) solution uses binary search to maintain potential endings.",
        steps: ["Go through numbers one by one", "Keep track of smallest endings for each length", "For each number, find where it could extend a sequence", "Use binary search to find the right position", "Either extend the longest or replace a larger ending", "Length of our tracking array is the answer"]
    },
    {
        id: "matrix-chain",
        name: "Matrix Chain Multiplication",
        category: "dp",
        description: "Optimal parenthesization",
        timeComplexity: "O(n³)",
        spaceComplexity: "O(n²)",
        code: `int matrixChain(vector<int>& dims) {
    int n = dims.size() - 1;
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i < n - len + 1; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    return dp[0][n-1];
}`,
        theory: "Find the optimal way to parenthesize matrix multiplications to minimize total operations. Different orders can have vastly different costs.",
        steps: ["Matrices can be multiplied in different orders", "A×B×C = (A×B)×C or A×(B×C)", "Each order has different number of operations", "Try all possible ways to split the chain", "For each split, add cost of multiplying results", "Find the split that minimizes total operations"]
    },
    {
        id: "coin-change",
        name: "Coin Change",
        category: "dp",
        description: "Ways to make amount",
        timeComplexity: "O(n × amount)",
        spaceComplexity: "O(amount)",
        code: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}`,
        theory: "Find the minimum number of coins needed to make a target amount. Classic DP problem with unlimited coins of each denomination.",
        steps: ["You have coins of different values", "Want to make exact change for an amount", "For each amount from 1 to target", "Try using each coin that doesn't exceed current amount", "Take minimum coins needed", "Build up from smaller amounts to target"]
    },
    {
        id: "edit-distance",
        name: "Edit Distance",
        category: "dp",
        description: "String transformation cost",
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
        code: `int editDistance(string& a, string& b) {
    int m = a.size(), n = b.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (a[i-1] == b[j-1]) dp[i][j] = dp[i-1][j-1];
            else dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
        }
    }
    return dp[m][n];
}`,
        theory: "Minimum operations (insert, delete, replace) to transform one string into another. Used in spell checkers and DNA sequence alignment.",
        steps: ["Compare two words", "Three operations: insert, delete, or replace a letter", "If letters match, no operation needed", "If different, try all three operations", "Pick the one with minimum total cost", "Answer is minimum edits to transform completely"]
    },
    {
        id: "subset-sum",
        name: "Subset Sum",
        category: "dp",
        description: "Can we make target sum?",
        timeComplexity: "O(n × sum)",
        spaceComplexity: "O(sum)",
        code: `bool subsetSum(vector<int>& nums, int target) {
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int num : nums) {
        for (int t = target; t >= num; t--) {
            dp[t] = dp[t] || dp[t - num];
        }
    }
    return dp[target];
}`,
        theory: "Determine if any subset of numbers adds up to exactly the target sum. Foundation for many partition and knapsack problems.",
        steps: ["Given numbers and a target sum", "Can we pick some numbers to get exactly that sum?", "For each number, decide: include or exclude", "Track which sums are possible", "If sum-num was possible, sum is now possible too", "Check if target sum is achievable"]
    },
    {
        id: "rod-cutting",
        name: "Rod Cutting",
        category: "dp",
        description: "Maximize profit from cuts",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
        code: `int rodCutting(vector<int>& prices, int n) {
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            dp[i] = max(dp[i], prices[j-1] + dp[i-j]);
        }
    }
    return dp[n];
}`,
        theory: "Given a rod of length n and prices for each length, find the maximum profit by cutting the rod into pieces. Similar to unbounded knapsack.",
        steps: ["You have a rod of length n", "Different lengths sell for different prices", "You can cut it into smaller pieces", "Each piece has its own value", "Find the best way to cut for maximum profit", "Try all possible first-cut positions"]
    },
    {
        id: "fibonacci-dp",
        name: "Fibonacci DP",
        category: "dp",
        description: "Optimized recursion",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `long long fibonacci(int n) {
    if (n <= 1) return n;
    long long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long long c = a + b;
        a = b;
        b = c;
    }
    return b;
}`,
        theory: "Classic introduction to DP. Naive recursion is O(2^n), but storing previous results reduces to O(n). Can optimize space to O(1) by keeping only last two values.",
        steps: ["Fibonacci: each number is sum of previous two", "0, 1, 1, 2, 3, 5, 8, 13...", "Simple recursion recalculates same values many times", "Store previous results to avoid recalculation", "Only need last two numbers at any time", "Much faster: linear time instead of exponential!"]
    },
    {
        id: "egg-drop",
        name: "Egg Dropping Problem",
        category: "dp",
        description: "Minimum attempts to find critical floor",
        timeComplexity: "O(n × k × log n)",
        spaceComplexity: "O(n × k)",
        code: `int eggDrop(int eggs, int floors) {
    vector<vector<int>> dp(eggs + 1, vector<int>(floors + 1, 0));
    for (int i = 1; i <= floors; i++) dp[1][i] = i;
    for (int e = 2; e <= eggs; e++) {
        for (int f = 1; f <= floors; f++) {
            dp[e][f] = INT_MAX;
            int lo = 1, hi = f;
            while (lo <= hi) {
                int mid = (lo + hi) / 2;
                int breaks = dp[e-1][mid-1];
                int survives = dp[e][f-mid];
                int worst = 1 + max(breaks, survives);
                dp[e][f] = min(dp[e][f], worst);
                if (breaks > survives) hi = mid - 1;
                else lo = mid + 1;
            }
        }
    }
    return dp[eggs][floors];
}`,
        theory: "Find the minimum number of trials needed to find the critical floor where eggs break. Balance between binary search efficiency and egg conservation.",
        steps: ["You have k eggs and n floors", "Find the floor where eggs start breaking", "Drop from a floor: egg breaks or survives", "If it breaks, search below with one less egg", "If it survives, search above with same eggs", "Find strategy that minimizes worst-case attempts"]
    },
    {
        id: "optimal-bst",
        name: "Optimal BST",
        category: "dp",
        description: "Minimum search cost tree",
        timeComplexity: "O(n³)",
        spaceComplexity: "O(n²)",
        code: `int optimalBST(vector<int>& keys, vector<int>& freq) {
    int n = keys.size();
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int i = 0; i < n; i++) dp[i][i] = freq[i];
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            int sum = 0;
            for (int k = i; k <= j; k++) sum += freq[k];
            for (int r = i; r <= j; r++) {
                int cost = sum;
                if (r > i) cost += dp[i][r-1];
                if (r < j) cost += dp[r+1][j];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    return dp[0][n-1];
}`,
        theory: "Construct a BST that minimizes expected search cost given search frequencies. More frequent keys should be closer to the root.",
        steps: ["Keys have different search frequencies", "Frequent keys should be near the root", "Try each key as root of a subtree", "Recursively optimize left and right subtrees", "Cost = depth × frequency for each key", "Find arrangement with minimum total cost"]
    },

    // ============ OS ALGORITHMS - PROCESS SCHEDULING ============
    {
        id: "fcfs-scheduling",
        name: "FCFS Scheduling",
        category: "os",
        subcategory: "Process Scheduling",
        description: "First Come First Served",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `void fcfs(vector<int>& arrival, vector<int>& burst) {
    int n = arrival.size();
    vector<int> completion(n), waiting(n), turnaround(n);
    completion[0] = arrival[0] + burst[0];
    for (int i = 1; i < n; i++) {
        completion[i] = max(completion[i-1], arrival[i]) + burst[i];
    }
    for (int i = 0; i < n; i++) {
        turnaround[i] = completion[i] - arrival[i];
        waiting[i] = turnaround[i] - burst[i];
    }
}`,
        theory: "Simplest scheduling algorithm. Processes are executed in the order they arrive. Non-preemptive - once a process starts, it runs to completion.",
        steps: ["Processes line up in order of arrival", "First process in line gets the CPU", "It runs until completely finished", "Then the next process in line runs", "Simple but can cause long waiting times", "Like a grocery store checkout line"]
    },
    {
        id: "sjf-scheduling",
        name: "SJF Scheduling",
        category: "os",
        subcategory: "Process Scheduling",
        description: "Shortest Job First",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
        code: `void sjf(vector<int>& arrival, vector<int>& burst) {
    int n = arrival.size();
    vector<bool> done(n, false);
    int time = 0, completed = 0;
    while (completed < n) {
        int idx = -1, minBurst = INT_MAX;
        for (int i = 0; i < n; i++) {
            if (!done[i] && arrival[i] <= time && burst[i] < minBurst) {
                minBurst = burst[i];
                idx = i;
            }
        }
        if (idx == -1) { time++; continue; }
        time += burst[idx];
        done[idx] = true;
        completed++;
    }
}`,
        theory: "Select the process with shortest burst time. Minimizes average waiting time but can cause starvation for longer processes.",
        steps: ["Look at all processes that have arrived", "Pick the one with shortest execution time", "Run it to completion", "Then pick the next shortest job", "Short jobs finish fast, average wait is low", "But long jobs might wait forever!"]
    },
    {
        id: "round-robin",
        name: "Round Robin",
        category: "os",
        subcategory: "Process Scheduling",
        description: "Time slices for fairness",
        timeComplexity: "O(n × total_time/quantum)",
        spaceComplexity: "O(n)",
        code: `void roundRobin(vector<int>& burst, int quantum) {
    int n = burst.size();
    vector<int> remaining = burst;
    queue<int> ready;
    for (int i = 0; i < n; i++) ready.push(i);
    int time = 0;
    while (!ready.empty()) {
        int p = ready.front(); ready.pop();
        int run = min(quantum, remaining[p]);
        remaining[p] -= run;
        time += run;
        if (remaining[p] > 0) ready.push(p);
    }
}`,
        theory: "Each process gets a fixed time slice (quantum). Fair scheduling that ensures all processes make progress. Response time is good but context switching adds overhead.",
        steps: ["Give each process a fixed time slice (like 10ms)", "Process runs for that time or until done", "If not done, it goes to the back of the line", "Next process gets its turn", "Everyone gets fair CPU time", "Like taking turns on a swing"]
    },
    {
        id: "priority-scheduling",
        name: "Priority Scheduling",
        category: "os",
        subcategory: "Process Scheduling",
        description: "Based on priority levels",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
        code: `void priorityScheduling(vector<int>& burst, vector<int>& priority) {
    int n = burst.size();
    vector<int> order;
    vector<bool> done(n, false);
    for (int i = 0; i < n; i++) {
        int highest = -1, highestPrio = INT_MAX;
        for (int j = 0; j < n; j++) {
            if (!done[j] && priority[j] < highestPrio) {
                highestPrio = priority[j];
                highest = j;
            }
        }
        order.push_back(highest);
        done[highest] = true;
    }
}`,
        theory: "Processes are assigned priorities. Higher priority processes run first. Can be preemptive or non-preemptive. May cause starvation of low priority processes.",
        steps: ["Each process has a priority number", "Lower number = higher priority usually", "Always run the highest priority process", "If new high-priority arrives, it might preempt", "Low priority processes might starve", "Solution: aging - increase priority over time"]
    },
    // ============ OS ALGORITHMS - MEMORY MANAGEMENT ============
    {
        id: "first-fit",
        name: "First Fit",
        category: "os",
        subcategory: "Memory Management",
        description: "First available block",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `int firstFit(vector<int>& blocks, int processSize) {
    for (int i = 0; i < blocks.size(); i++) {
        if (blocks[i] >= processSize) {
            blocks[i] -= processSize;
            return i;
        }
    }
    return -1;  // No fit found
}`,
        theory: "Allocate the first block that is big enough. Fast but may leave small unusable fragments at the beginning of memory.",
        steps: ["Process needs some memory", "Start from the beginning of memory", "Find the first block big enough", "Allocate it there", "Fast because we stop at first match", "But might skip better options later"]
    },
    {
        id: "best-fit",
        name: "Best Fit",
        category: "os",
        subcategory: "Memory Management",
        description: "Smallest sufficient block",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `int bestFit(vector<int>& blocks, int processSize) {
    int bestIdx = -1, minWaste = INT_MAX;
    for (int i = 0; i < blocks.size(); i++) {
        if (blocks[i] >= processSize && blocks[i] - processSize < minWaste) {
            minWaste = blocks[i] - processSize;
            bestIdx = i;
        }
    }
    if (bestIdx != -1) blocks[bestIdx] -= processSize;
    return bestIdx;
}`,
        theory: "Find the smallest block that fits. Minimizes wasted space per allocation but can create many tiny unusable fragments.",
        steps: ["Process needs some memory", "Look at ALL available blocks", "Find the one that fits with least waste", "Allocate there", "Reduces wasted space per block", "But creates many tiny leftover pieces"]
    },
    {
        id: "worst-fit",
        name: "Worst Fit",
        category: "os",
        subcategory: "Memory Management",
        description: "Largest available block",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `int worstFit(vector<int>& blocks, int processSize) {
    int worstIdx = -1, maxSize = -1;
    for (int i = 0; i < blocks.size(); i++) {
        if (blocks[i] >= processSize && blocks[i] > maxSize) {
            maxSize = blocks[i];
            worstIdx = i;
        }
    }
    if (worstIdx != -1) blocks[worstIdx] -= processSize;
    return worstIdx;
}`,
        theory: "Allocate from the largest available block. Leaves large remaining fragments that might be more useful for future allocations.",
        steps: ["Process needs some memory", "Find the LARGEST block that fits", "Allocate from there", "Leave a big leftover chunk", "Big leftovers are more useful than tiny ones", "Can fit future medium-sized processes"]
    },
    // ============ OS ALGORITHMS - PAGE REPLACEMENT ============
    {
        id: "fifo-page",
        name: "FIFO Page Replacement",
        category: "os",
        subcategory: "Page Replacement",
        description: "First In First Out",
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
        code: `int fifo(vector<int>& pages, int frames) {
    queue<int> memory;
    unordered_set<int> inMemory;
    int pageFaults = 0;
    for (int page : pages) {
        if (inMemory.find(page) == inMemory.end()) {
            pageFaults++;
            if (memory.size() == frames) {
                inMemory.erase(memory.front());
                memory.pop();
            }
            memory.push(page);
            inMemory.insert(page);
        }
    }
    return pageFaults;
}`,
        theory: "Replace the page that has been in memory longest. Simple to implement using a queue. Can suffer from Belady's anomaly.",
        steps: ["Memory has limited space (frames)", "New page needed but memory is full", "Remove the page that arrived first", "Like a queue: first in, first out", "Simple but not always optimal", "Might remove frequently used pages"]
    },
    {
        id: "lru-page",
        name: "LRU Page Replacement",
        category: "os",
        subcategory: "Page Replacement",
        description: "Least Recently Used",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        code: `int lru(vector<int>& pages, int frames) {
    list<int> memory;
    unordered_map<int, list<int>::iterator> pageMap;
    int pageFaults = 0;
    for (int page : pages) {
        if (pageMap.find(page) == pageMap.end()) {
            pageFaults++;
            if (memory.size() == frames) {
                pageMap.erase(memory.back());
                memory.pop_back();
            }
        } else {
            memory.erase(pageMap[page]);
        }
        memory.push_front(page);
        pageMap[page] = memory.begin();
    }
    return pageFaults;
}`,
        theory: "Replace the page that hasn't been used for the longest time. Good approximation of optimal. Uses recency as predictor of future use.",
        steps: ["Track when each page was last used", "When memory is full and new page needed", "Remove the page used longest ago", "Recently used pages stay in memory", "Good prediction: recent use = likely future use", "More complex but better results"]
    },
    {
        id: "lfu-page",
        name: "LFU Page Replacement",
        category: "os",
        subcategory: "Page Replacement",
        description: "Least Frequently Used",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        code: `int lfu(vector<int>& pages, int frames) {
    unordered_map<int, int> freq, lastUsed;
    unordered_set<int> inMemory;
    int pageFaults = 0, time = 0;
    for (int page : pages) {
        if (inMemory.find(page) == inMemory.end()) {
            pageFaults++;
            if (inMemory.size() == frames) {
                int minFreq = INT_MAX, victim = -1;
                for (int p : inMemory) {
                    if (freq[p] < minFreq || (freq[p] == minFreq && lastUsed[p] < lastUsed[victim])) {
                        minFreq = freq[p]; victim = p;
                    }
                }
                inMemory.erase(victim);
            }
            inMemory.insert(page);
        }
        freq[page]++;
        lastUsed[page] = time++;
    }
    return pageFaults;
}`,
        theory: "Replace the page used least frequently. Tracks access count for each page. Good for workloads with clear hot/cold patterns.",
        steps: ["Count how many times each page is used", "When memory is full", "Remove the page with lowest count", "Frequently used pages stay", "Good for: some pages used way more than others", "Problem: old popular pages might never leave"]
    },
    // ============ OS ALGORITHMS - DISK SCHEDULING ============
    {
        id: "fcfs-disk",
        name: "FCFS Disk Scheduling",
        category: "os",
        subcategory: "Disk Scheduling",
        description: "Simple queue order",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `int fcfsDisk(vector<int>& requests, int head) {
    int totalSeek = 0;
    for (int req : requests) {
        totalSeek += abs(req - head);
        head = req;
    }
    return totalSeek;
}`,
        theory: "Service disk requests in arrival order. Fair but can result in lots of unnecessary head movement (seek time).",
        steps: ["Disk head starts at current position", "Process requests in order they arrived", "Head moves to each track in sequence", "Calculate total distance moved", "Fair but inefficient", "Head might zig-zag across disk"]
    },
    {
        id: "sstf-disk",
        name: "SSTF Disk Scheduling",
        category: "os",
        subcategory: "Disk Scheduling",
        description: "Shortest Seek Time First",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
        code: `int sstf(vector<int>& requests, int head) {
    int totalSeek = 0;
    vector<bool> done(requests.size(), false);
    for (int i = 0; i < requests.size(); i++) {
        int closest = -1, minDist = INT_MAX;
        for (int j = 0; j < requests.size(); j++) {
            if (!done[j] && abs(requests[j] - head) < minDist) {
                minDist = abs(requests[j] - head);
                closest = j;
            }
        }
        totalSeek += minDist;
        head = requests[closest];
        done[closest] = true;
    }
    return totalSeek;
}`,
        theory: "Always service the request closest to current head position. Minimizes seek time but can cause starvation for distant requests.",
        steps: ["Look at all pending requests", "Find the one closest to current head position", "Move there (shortest possible move)", "Repeat until all done", "Minimizes total head movement", "But far-away requests might wait forever"]
    },
    {
        id: "scan-elevator",
        name: "SCAN (Elevator)",
        category: "os",
        subcategory: "Disk Scheduling",
        description: "Move to end, reverse",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        code: `int scan(vector<int>& requests, int head, int diskSize, bool goUp) {
    sort(requests.begin(), requests.end());
    int totalSeek = 0;
    vector<int> left, right;
    for (int r : requests) {
        if (r < head) left.push_back(r);
        else right.push_back(r);
    }
    if (goUp) {
        for (int r : right) { totalSeek += abs(r - head); head = r; }
        if (!left.empty()) {
            totalSeek += abs(diskSize - 1 - head) + (diskSize - 1 - left[0]);
            head = left[0];
            for (int i = 1; i < left.size(); i++) { totalSeek += abs(left[i] - head); head = left[i]; }
        }
    }
    return totalSeek;
}`,
        theory: "Head moves in one direction until end, then reverses. Like an elevator. Provides more uniform wait times than SSTF.",
        steps: ["Head moves in one direction (like going up)", "Services all requests in that direction", "When it reaches the end of disk", "It reverses direction", "Services requests on the way back", "Like an elevator going up then down"]
    },
    // ============ OS ALGORITHMS - SYNCHRONIZATION ============
    {
        id: "bankers",
        name: "Banker's Algorithm",
        category: "os",
        subcategory: "Synchronization",
        description: "Deadlock avoidance",
        timeComplexity: "O(n² × m)",
        spaceComplexity: "O(n × m)",
        code: `bool isSafe(vector<vector<int>>& alloc, vector<vector<int>>& need, vector<int>& avail) {
    int n = alloc.size(), m = avail.size();
    vector<bool> finished(n, false);
    vector<int> work = avail;
    int count = 0;
    while (count < n) {
        bool found = false;
        for (int i = 0; i < n; i++) {
            if (!finished[i]) {
                bool canRun = true;
                for (int j = 0; j < m; j++) {
                    if (need[i][j] > work[j]) { canRun = false; break; }
                }
                if (canRun) {
                    for (int j = 0; j < m; j++) work[j] += alloc[i][j];
                    finished[i] = true;
                    found = true;
                    count++;
                }
            }
        }
        if (!found) return false;
    }
    return true;
}`,
        theory: "Prevents deadlock by ensuring system stays in 'safe state'. Before granting resources, check if remaining resources can satisfy at least one process completely.",
        steps: ["System has limited resources", "Processes request resources", "Before granting, simulate what happens", "Can remaining resources finish at least one process?", "If that finishes, its resources are freed", "If all can eventually finish, it's safe"]
    },
    {
        id: "petersons",
        name: "Peterson's Algorithm",
        category: "os",
        subcategory: "Synchronization",
        description: "Mutual exclusion for 2 processes",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        code: `// Peterson's Algorithm for 2 processes
volatile bool flag[2] = {false, false};
volatile int turn = 0;

void lock(int id) {
    int other = 1 - id;
    flag[id] = true;      // I want to enter
    turn = other;         // But I'll let you go first
    while (flag[other] && turn == other);  // Wait if other wants and it's their turn
}

void unlock(int id) {
    flag[id] = false;
}`,
        theory: "Software solution for mutual exclusion between two processes. Uses flags and turn variable. Ensures only one process in critical section.",
        steps: ["Two processes want to enter critical section", "Each raises a flag saying 'I want in'", "Each politely says 'you can go first'", "If other wants in AND it's their turn, wait", "Otherwise, enter critical section", "When done, lower your flag"]
    }
];

export const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
        ArrowUpDown, Search, GitBranch, Cpu, HardDrive,
        Clock, Layers, Binary, Network, Database,
        Repeat, Timer, Box, TreePine, Share2
    };
    return icons[iconName] || Search;
};

export const getAlgorithmsByCategory = (category: string) => {
    return algorithms.filter(a => a.category === category);
};

export const getAlgorithmById = (id: string) => {
    return algorithms.find(a => a.id === id);
};
