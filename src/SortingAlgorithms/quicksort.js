export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSort(array, 0, array.length - 1, animations);
    return animations;
}

function quickSort(array, start, end, animations) {

    if (start >= end) return;
    const index = partition(array, start, end, animations);
    quickSort(array, start, index - 1, animations);
    quickSort(array, index + 1, end, animations);
}

function partition(arr, start, end, animations) {
    const swap = (a, b) => { [arr[a], arr[b]] = [arr[b], arr[a]]; }

    const pivotVal = arr[end];
    let pivotIdx = start;

    for (let i = start; i < end; i++) {
        animations.push({ barsIdx: [i, end], action: "compare" })
        if (arr[i] < pivotVal) {
            animations.push(
                { barsIdx: [i, pivotIdx], action: "compare" },
                { barsIdx: [i, pivotIdx], barHeight: [arr[i], arr[pivotIdx]], action: "swap" },
                { barsIdx: [i, pivotIdx], action: "reset" }
            )
            swap(i, pivotIdx++);
        }
        animations.push({ barsIdx: [i, i], action: "reset" })

    }

    animations.push(
        { barsIdx: [end, pivotIdx], action: "compare" },
        { barsIdx: [end, pivotIdx], barHeight: [arr[end], arr[pivotIdx]], action: "swap" },
        { barsIdx: [end, pivotIdx], action: "reset" }
    )

    swap(end, pivotIdx);

    return pivotIdx;
}
