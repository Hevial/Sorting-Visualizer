
export function getBubbleSortAnimations(array) {
    const animations = []
    if (array.length <= 1) return array;
    bubbleSort(array, animations)
    return animations
}

function bubbleSort(array, animations) {
    for (let i = 0; i < array.length - 1; i++) {
        let swapped = false; // To optimize the algorithm
        for (let j = 0; j < array.length - i - 1; j++) {
            animations.push({ barsIdx: [j, j + 1], action: "compare" });

            if (array[j] > array[j + 1]) {
                animations.push({ barsIdx: [j, j + 1], barHeight: [array[j], array[j + 1]], action: "swap" });

                // Swap the elements
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                swapped = true;
            }

            animations.push({ barsIdx: [j, j + 1], action: "reset" });
        }

        // If no two elements were swapped in the inner loop, then the array is already sorted
        if (!swapped) {
            break;
        }
    }
}
