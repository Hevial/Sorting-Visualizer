import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations } from '../SortingAlgorithms/mergesort.js';
import { getBubbleSortAnimations } from '../SortingAlgorithms/bubblesort.js';
import { getQuickSortAnimations } from '../SortingAlgorithms/quicksort.js';
import { getHeapSortAnimations } from '../SortingAlgorithms/heapsort.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 25;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'blue';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const MAX_SIZE = 6;

let isSorted = false;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.timeouts = [];
    this.state = { array: [], speed: 1, size: 1 };
  }

  componentDidMount() {
    this.resetArray();
  }

  disableButtons() {
    const btns = document.getElementsByClassName('button');
    const sliders = document.querySelectorAll('.speed-slider');
    sliders[0].classList.add('disabled');
    sliders[1].classList.add('disabled');
    for (let i = 1; i < btns.length; i++) {
      btns[i].classList.add('disabled');
    }
  }

  enableButtons() {
    const btns = document.getElementsByClassName('button');
    const sliders = document.querySelectorAll('.speed-slider');
    sliders[0].classList.remove('disabled');
    sliders[1].classList.remove('disabled');
    for (let i = 1; i < btns.length; i++) {
      btns[i].classList.remove('disabled');
    }
  }

  resetArray() {
    this.enableButtons();

    isSorted = false;

    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts = [];

    const barsPerPx = window.innerWidth / 6;
    const maxWidth = ((barsPerPx * 0.98) / MAX_SIZE) * this.state.size;
    let array = [];

    for (let i = 0; i < maxWidth; i++) {
      array.push(Math.min(Math.random() + 0.05, 0.99 - (Math.random() / 10)));
    }

    return new Promise(resolve => {
      this.setState({ array }, () => {
        // Questa funzione di callback viene eseguita dopo che il componente è stato aggiornato
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
          const heightValue = this.state.array[i] * 100;
          arrayBars[i].style.height = `${heightValue}%`;
          arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }

        console.log(this.state.array);

        resolve();
      });
    });
  }

  mergeSort() {
    isSorted = true;
    //console.log('Array originale:', this.state.array);
    const animations = getMergeSortAnimations(this.state.array);
    //console.log('Array originale sortato:', this.state.array);
    this.animate(animations);
  }

  quickSort() {
    isSorted = true;
    //console.log('Array originale:', this.state.array);
    const animations = getQuickSortAnimations(this.state.array);
    //console.log('Array originale sortato:', this.state.array);
    this.animate(animations);
  }

  heapSort() {
    isSorted = true;
    //console.log('Array originale:', this.state.array);
    const animations = getHeapSortAnimations(this.state.array);
    //console.log('Array originale sortato:', this.state.array);
    this.animate(animations);
  }

  bubbleSort() {
    isSorted = true;
    //console.log('Array originale:', this.state.array);
    const animations = getBubbleSortAnimations(this.state.array);
    //console.log('Array originale sortato:', this.state.array);
    this.animate(animations);
  }

  animate(animations) {
    this.disableButtons();

    const speed = this.state.speed;
    const arrayBars = document.getElementsByClassName('array-bar');

    //console.log(animations);

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      const [barOneIdx, barTwoIdx] = animation.barsIdx;

      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      switch (animation.action) {
        case 'compare':
          //comparing the two values
          const compareTimeout = setTimeout(() => {
            barOneStyle.backgroundColor = SECONDARY_COLOR;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
          }, ((i * ANIMATION_SPEED_MS) / speed) * (MAX_SIZE / this.state.size));

          this.timeouts.push(compareTimeout);
          break;
        case 'swap':
          //swapping the two values
          const swapTimeout = setTimeout(() => {
            const [barOneHeight, barTwoHeight] = animation.barHeight;

            barOneStyle.height = `${barTwoHeight * 100}%`;
            if (barOneHeight) barTwoStyle.height = `${barOneHeight * 100}%`;
          }, ((i * ANIMATION_SPEED_MS) / speed) * (MAX_SIZE / this.state.size));

          this.timeouts.push(swapTimeout);
          break;

        case 'reset':
          // after comparing and swapping or not, reset back to the primary color
          const resetTimeout = setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, ((i * ANIMATION_SPEED_MS) / speed) * (MAX_SIZE / this.state.size));

          this.timeouts.push(resetTimeout);
          break;

        default:
          console.log('Action not possible! Current anim obj: ', animation);
          break;
      }
    }

    const buttonTimeout = setTimeout(() => {
      this.enableButtons();
    }, ((animations.length * ANIMATION_SPEED_MS) / speed) * (MAX_SIZE / this.state.size));

    animations.length = 0;
    this.timeouts.push(buttonTimeout);
  }

  render() {
    const { array } = this.state;

    return (
      <>
        <div className='array-container'>
          {array.map((value, idx) => (
            <div
              className='array-bar'
              key={idx}
              style={{ height: `${value * 100}%` }}
            ></div>
          ))}
        </div>
        <div className='tool-bar'>
          <div>
            <span id='title'>Sorting Visualizer</span>
          </div>
          <div className='menu'>
            <p className='speed-value'>{this.state.size}</p>
            <div className='slider'>
              <p className='slider-label'>Size Slider</p>
              <input
                className='speed-slider'
                type='range'
                value={this.state.size}
                min='1'
                max={MAX_SIZE}
                step='1'
                onChange={e => {
                  this.setState({ size: e.target.value }, () => {
                    this.resetArray();
                  });
                }}
              />
            </div>
            <p className='speed-value'>{this.state.speed}</p>
            <div className='slider'>
              <p className='slider-label'>Speed Slider</p>
              <input
                className='speed-slider'
                type='range'
                value={this.state.speed}
                min='1'
                max='9'
                step='1'
                onChange={e => {
                  this.setState({ speed: e.target.value });
                }}
              />
            </div>

            <button className='button' onClick={() => this.resetArray()}>
              Generate New Array
            </button>
            <button
              className='button'
              onClick={() => {
                if (isSorted) this.resetArray().then(() => this.mergeSort());
                else this.mergeSort();
              }}
            >
              Merge Sort
            </button>
            <button
              className='button'
              onClick={() => {
                if (isSorted) this.resetArray().then(() => this.quickSort());
                else this.quickSort();
              }}
            >
              Quick Sort
            </button>
            <button
              className='button'
              onClick={() => {
                if (isSorted) this.resetArray().then(() => this.heapSort());
                else this.heapSort();
              }}
            >
              Heap Sort
            </button>
            <button
              className='button'
              onClick={() => {
                if (isSorted) this.resetArray().then(() => this.bubbleSort());
                else this.bubbleSort();
              }}
            >
              Bubble Sort
            </button>
          </div>
        </div>
      </>
    );
  }
}
