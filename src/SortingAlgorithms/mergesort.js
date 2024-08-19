export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  mergeSort(array, 0, array.length - 1, animations);
  return animations;
}

function mergeSort(a, l, r, animations) {
  if (l < r) {
    let center1 = Math.floor((l + r) / 2);
    let center2 = center1 + 1;
    mergeSort(a, l, center1, animations);
    mergeSort(a, center2, r, animations);
    merge(a, l, center1, center2, r, animations);
  }
}

function merge(a, sx, c1, c2, dx, animations) {
  let left = [...a.slice(sx, c1 + 1), Infinity];
  let right = [...a.slice(c2, dx + 1), Infinity];
  let iSx = 0;
  let iDx = 0;

  for (let k = sx; k <= dx; k++) {
    if (left[iSx] <= right[iDx]) {
      animations.push(
        {
          barsIdx: [sx + iSx, c1 + iDx],
          action: 'compare'
        },
        { barsIdx: [k, iSx], barHeight: [, left[iSx]], action: 'swap' },
        { barsIdx: [sx + iSx, c1 + iDx], action: 'reset' }
      );

      a[k] = left[iSx++];
    } else {
      animations.push(
        { barsIdx: [sx + iSx, c1 + iDx], action: 'compare' },
        { barsIdx: [k, iDx], barHeight: [, right[iDx]], action: 'swap' },
        { barsIdx: [sx + iSx, c1 + iDx], action: 'reset' }
      );

      a[k] = right[iDx++];
    }
  }
}
