export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSort(array, animations);
  return animations;
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  leftChildIndex(index) {
    return 2 * index + 1;
  }

  rightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(a, b) {
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  insert(item, animations) {
    this.heap.push(item);
    let index = this.heap.length - 1;
    let parent = this.parentIndex(index);

    while (this.heap[parent] && this.heap[parent] < this.heap[index]) {
      animations.push(
        { barsIdx: [parent, index], action: 'compare' },
        {
          barsIdx: [parent, index],
          barHeight: [this.heap[parent], this.heap[index]],
          action: 'swap'
        },
        { barsIdx: [parent, index], action: 'reset' }
      );

      this.swap(parent, index);
      //swap(arr, parent, index);
      index = this.parentIndex(index);
      parent = this.parentIndex(index);
    }
  }

  delete(animations, i, j) {
    let item = this.heap.shift(); // the root node gets removed
    this.heap.unshift(this.heap.pop()); // the last node take its place
    let index = 0;
    let leftChild = this.leftChildIndex(index);
    let rightChild = this.rightChildIndex(index);

    animations.push(
      { barsIdx: [i, j], action: 'compare' },
      { barsIdx: [i, j], barHeight: [item, this.heap[j]], action: 'swap' },
      { barsIdx: [i, j], action: 'reset' }
    );

    //this leaves us with a completely distorted heap.
    //So we need to bubble this misplaced value down until the heap property is back in place:
    while (
      (this.heap[leftChild] && this.heap[leftChild] > this.heap[index]) ||
      this.heap[rightChild] > this.heap[index]
    ) {
      let max = leftChild;
      if (this.heap[rightChild] && this.heap[rightChild] > this.heap[max]) {
        max = rightChild;
      }

      animations.push(
        { barsIdx: [max, index], action: 'compare' },
        {
          barsIdx: [max, index],
          barHeight: [this.heap[max], this.heap[index]],
          action: 'swap'
        },
        { barsIdx: [max, index], action: 'reset' }
      );

      this.swap(max, index);
      //swap(arr, max, index);
      index = max;
      leftChild = this.leftChildIndex(max);
      rightChild = this.rightChildIndex(max);
    }

    return item;
  }
}

function heapSort(arr, animations) {
  let sorted = [];
  let heap1 = new MaxHeap();

  for (let i = 0; i < arr.length; i++) {
    arr[i] = heap1.insert(arr[i], animations);
  }

  //console.log("Heap: ", heap1.heap);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = sorted.unshift(heap1.delete(animations, i, arr.length - i - 1));
  }

  //return sorted;
}
