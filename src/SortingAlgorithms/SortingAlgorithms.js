
/*

? How does animations works ?

* The animate function gets this animations array, with all the steps to do;
* The action key is the action that the animate fuctions as to do:
*    - compare: highlights the two bars that are currently been compared
*    - swap: swap the two bars values with the given heigh1t, height2
*    - reset: reset the color to the main one

*animations = [
    *{ barsIdx: [idxBar1,idxBar2], action: "compare"}
    *{ barsIdx: [idxBar1,idxBar2], barHeight: [height1, height2], action: "swap"}
   *{ barsIdx: [idxBar1,idxBar2], action: "reset"}
    !NOTE: if the height1 is missing it will just change the idxbar1 value with the height2
*]

*/

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    mergeSort(array, 0, array.length - 1, animations);
    return animations;
}

function mergeSort(a, l, r, animations) {
    if (l < r) {
        let centro1 = Math.floor((l + r) / 2);
        let centro2 = centro1 + 1
        mergeSort(a, l, centro1, animations)
        mergeSort(a, centro2, r, animations)
        merge(a, l, centro1, centro2, r, animations)
    }
}

function merge(a, sx, c1, c2, dx, animations) {

    let t = [...a]
    let indexT = sx
    let iSx = sx
    let iDx = c2

    while (iSx <= c1 && iDx <= dx) {



        if (t[iSx] <= t[iDx]) {
            animations.push({ barsIdx: [indexT, iSx], action: "compare" })
            animations.push({ barsIdx: [indexT, iSx], barHeight: [, t[iSx]], action: "swap" })
            animations.push({ barsIdx: [indexT, iSx], action: "reset" })
            a[indexT++] = t[iSx++]
        }
        else {
            animations.push({ barsIdx: [indexT, iDx], action: "compare" })
            animations.push({ barsIdx: [indexT, iDx], barHeight: [, t[iDx]], action: "swap" })
            animations.push({ barsIdx: [indexT, iDx], action: "reset" })
            a[indexT++] = t[iDx++]
        }

    }

    while (iDx <= dx) {
        animations.push({ barsIdx: [indexT, iDx], action: "compare" })
        animations.push({ barsIdx: [indexT, iDx], barHeight: [, t[iDx]], action: "swap" })
        animations.push({ barsIdx: [indexT, iDx], action: "reset" })
        a[indexT++] = t[iDx++]

    }

    while (iSx <= c1) {
        animations.push({ barsIdx: [indexT, iSx], action: "compare" })
        animations.push({ barsIdx: [indexT, iSx], barHeight: [, t[iSx]], action: "swap" })
        animations.push({ barsIdx: [indexT, iSx], action: "reset" })
        a[indexT++] = t[iSx++]
    }

}

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
