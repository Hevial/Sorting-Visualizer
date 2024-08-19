export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  mergeSort(array, 0, array.length - 1, animations);
  return animations;
}

function mergeSort(a, l, r, animations) {
  if (l < r) {
    let centro1 = Math.floor((l + r) / 2);
    let centro2 = centro1 + 1;
    mergeSort(a, l, centro1, animations);
    mergeSort(a, centro2, r, animations);
    merge(a, l, centro1, centro2, r, animations);
  }
}

function merge(a, sx, c1, c2, dx, animations) {
  let t = [...a];
  let indexT = sx;
  let iSx = sx;
  let iDx = c2;

  while (iSx <= c1 && iDx <= dx) {
    if (t[iSx] <= t[iDx]) {
      animations.push(
        { barsIdx: [indexT, iSx], action: 'compare' },
        { barsIdx: [indexT, iSx], barHeight: [, t[iSx]], action: 'swap' },
        { barsIdx: [indexT, iSx], action: 'reset' }
      );
      a[indexT++] = t[iSx++];
    } else {
      animations.push(
        { barsIdx: [indexT, iDx], action: 'compare' },
        { barsIdx: [indexT, iDx], barHeight: [, t[iDx]], action: 'swap' },
        { barsIdx: [indexT, iDx], action: 'reset' }
      );
      a[indexT++] = t[iDx++];
    }
  }

  while (iDx <= dx) {
    animations.push(
      { barsIdx: [indexT, iDx], action: 'compare' },
      { barsIdx: [indexT, iDx], barHeight: [, t[iDx]], action: 'swap' },
      { barsIdx: [indexT, iDx], action: 'reset' }
    );
    a[indexT++] = t[iDx++];
  }

  while (iSx <= c1) {
    animations.push(
      { barsIdx: [indexT, iSx], action: 'compare' },
      { barsIdx: [indexT, iSx], barHeight: [, t[iSx]], action: 'swap' },
      { barsIdx: [indexT, iSx], action: 'reset' }
    );
    a[indexT++] = t[iSx++];
  }
}
