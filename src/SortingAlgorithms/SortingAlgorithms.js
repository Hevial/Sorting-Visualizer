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

    let t = []
    let indexT = sx
    let iSx = sx
    let iDx = c2

    while (iSx <= c1 && iDx <= dx) {
        animations.push([iSx, iDx])
        animations.push([iSx, iDx])
        if (a[iSx] <= a[iDx]) {
            animations.push([indexT, a[iSx]]);
            t[indexT++] = a[iSx++]
        }
        else {
            animations.push([indexT, a[iDx]]);
            t[indexT++] = a[iDx++]
        }

    }

    if (iSx === c2) {
        while (iDx <= dx) {
            animations.push([iDx, iDx])
            animations.push([iDx, iDx])
            animations.push([indexT, a[iDx]]);
            t[indexT++] = a[iDx++]
        }
    } else {
        while (iSx <= c1) {
            animations.push([iSx, iSx])
            animations.push([iSx, iSx])
            animations.push([indexT, a[iSx]]);
            t[indexT++] = a[iSx++]
        }
    }

    for (let i = sx; i <= dx; i++) {
        a[i] = t[i]
    }

}