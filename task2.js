//Algorithm
const swap = (arr, i, j) => {
    if (i === j) return;

    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const quicksort = (nums, startIdx, endIdx) => {
    if (endIdx <= startIdx) return;

    let pivotIdx = Math.floor(Math.random() * (endIdx - startIdx + 1)) + startIdx;
    swap(nums, endIdx, pivotIdx);
    pivotIdx = endIdx;
    let pointerIdx = startIdx;

    for (let i = startIdx; i < endIdx; i++) {
        if (nums[i] < nums[pivotIdx]) {
            swap(nums, i, pointerIdx);
            pointerIdx++;
        }
    }

    swap(nums, pointerIdx, pivotIdx);
    quicksort(nums, startIdx, pointerIdx - 1);
    quicksort(nums, pointerIdx + 1, endIdx);
}


// Running the algorithm
const inputSizes = [5, 10, 50, 100, 500, 1000, 2000, 3000, 4000]; 
const repetitions = 1000;
const runtimes = [];

const generateInputArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 10));
}

inputSizes.forEach(size => {
    let totalRuntime = 0;

    for (let i = 0; i < repetitions; i++) {
        const arr = generateInputArray(size);
        
        const startTime = performance.now();
        quicksort(arr, 0, arr.length - 1);
        totalRuntime += performance.now() - startTime;
    }

    const averageRuntime = totalRuntime / repetitions;
    runtimes.push({ size, runtime: averageRuntime });
});


// Plotting the algorithm
const ctx = document.getElementById('myChart').getContext('2d');

const data = {
    labels: inputSizes,
    datasets: [{
        label: 'Runtime',
        data: runtimes.map(item => item.runtime),
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
    }],
};

const options = {
    scales: {
        x: {
            title: {
                display: true,
                text: 'Input Size',
            },
        },
        y: {
            title: {
                display: true,
                text: 'Runtime (ms)',
            },
        },
    },
};

const myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options,
});


