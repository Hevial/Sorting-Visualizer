import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations } from '../SortingAlgorithms/mergesort.js';
import { getBubbleSortAnimations } from '../SortingAlgorithms/bubblesort.js';
import { getQuickSortAnimations } from '../SortingAlgorithms/quicksort.js';
import { getHeapSortAnimations } from '../SortingAlgorithms/heapsort.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'blue';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

let isSorted = false
let reset = false

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)
        this.timeouts = []
        this.state = { array: [], speed: 4 };
    }

    componentDidMount() {
        this.resetArray();
    }

    disableButtons() {
        const btns = document.getElementsByClassName('button')
        const slider = document.querySelector('.speed-slider')
        slider.classList.add('disabled')
        for (let i = 1; i < btns.length; i++) {
            btns[i].classList.add('disabled')
        }
    }

    enableButtons() {
        const btns = document.getElementsByClassName('button')
        const slider = document.querySelector('.speed-slider')
        slider.classList.remove('disabled')
        for (let i = 1; i < btns.length; i++) {
            btns[i].classList.remove('disabled')
        }
    }

    resetArray() {
        isSorted = false
        reset = true

        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this.timeouts = []

        const array = [];
        const maxHeight = window.innerHeight * 0.91;
        const maxWidth = window.innerWidth * 0.32 * (2 / 4); //the multiplier is based on the bar width

        for (let i = 0; i < maxWidth; i++) {
            array.push(randomIntFromInterval(5, maxHeight));
        }

        this.setState({ array });

        this.enableButtons()
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.height = `${this.state.array[i]}px`
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR
        }
    }

    mergeSort() {
        isSorted = true
        reset = false
        console.log("Array originale:", this.state.array);
        const animations = getMergeSortAnimations(this.state.array);
        console.log("Array originale sortato:", this.state.array);
        this.animate(animations);
    }

    quickSort() {
        isSorted = true
        reset = false
        console.log("Array originale:", this.state.array);
        const animations = getQuickSortAnimations(this.state.array);
        console.log("Array originale sortato:", this.state.array);
        this.animate(animations);
    }

    heapSort() {
        isSorted = true
        reset = false
        console.log("Array originale:", this.state.array);
        const animations = getHeapSortAnimations(this.state.array);
        console.log("Array originale sortato:", this.state.array);
        this.animate(animations);
    }

    bubbleSort() {
        isSorted = true
        reset = false
        console.log("Array originale:", this.state.array);
        const animations = getBubbleSortAnimations(this.state.array);
        console.log("Array originale sortato:", this.state.array);
        this.animate(animations);

    }

    animate(animations) {

        this.disableButtons()
        const speed = this.state.speed
        const arrayBars = document.getElementsByClassName('array-bar');

        console.log(animations)
        for (let i = 0; i < animations.length; i++) {

            const animation = animations[i]
            const [barOneIdx, barTwoIdx] = animation.barsIdx

            const barOneStyle = arrayBars[barOneIdx].style
            const barTwoStyle = arrayBars[barTwoIdx].style

            // comparing the two values

            switch (animation.action) {
                case "compare":

                    //comparing the two values
                    const compareTimeout = setTimeout(() => {
                        if (reset) return

                        barOneStyle.backgroundColor = SECONDARY_COLOR
                        barTwoStyle.backgroundColor = SECONDARY_COLOR
                    }, i * ANIMATION_SPEED_MS / speed);

                    this.timeouts.push(compareTimeout)
                    break
                case "swap":

                    //swapping the two values
                    const swapTimeout = setTimeout(() => {
                        if (reset) return

                        const [barOneHeight, barTwoHeight] = animation.barHeight

                        barOneStyle.height = `${barTwoHeight}px`
                        if (barOneHeight)
                            barTwoStyle.height = `${barOneHeight}px`
                    }, i * ANIMATION_SPEED_MS / speed);

                    this.timeouts.push(swapTimeout)
                    break

                case "reset":

                    // after comparing and swapping or not, reset back to the primary color
                    const resetTimeout = setTimeout(() => {
                        if (reset) return

                        barOneStyle.backgroundColor = PRIMARY_COLOR
                        barTwoStyle.backgroundColor = PRIMARY_COLOR
                    }, i * ANIMATION_SPEED_MS / speed);

                    this.timeouts.push(resetTimeout)
                    break

                default:
                    console.log("Action not possible! Current anim obj: ", animation);
                    break

            }
        }

        const buttonTimeout = setTimeout(() => {
            this.enableButtons()
        }, animations.length * ANIMATION_SPEED_MS / speed);

        animations.length = 0
        this.timeouts.push(buttonTimeout)

    }

    render() {
        const { array } = this.state;

        return (
            <>
                <div className='array-container'>
                    {array.map((value, idx) => (
                        <div className='array-bar'
                            key={idx}
                            style={{ height: `${value}px` }}></div>
                    ))}

                </div>
                <div className='tool-bar' >
                    <div>
                        <span id="title">Sorting Visualizer</span>
                    </div>
                    <div className='menu'>
                        <p className="speed-value">{this.state.speed}</p>
                        <div className='slider'>
                            <p className='slider-label'>Speed Slider</p>
                            <input
                                className="speed-slider"
                                type="range"
                                value={this.state.speed}
                                min="1"
                                max="9"
                                step="1"
                                onChange={(e) => {
                                    this.setState({ speed: parseInt(e.target.value) })
                                }}
                            />
                        </div>

                        <button className='button' onClick={() => this.resetArray()}>Generate New Array</button>
                        <button className='button' onClick={() => { if (!isSorted) this.mergeSort() }}>Merge Sort</button>
                        <button className='button' onClick={() => { if (!isSorted) this.quickSort() }}>Quick Sort</button>
                        <button className='button' onClick={() => { if (!isSorted) this.heapSort() }}>Heap Sort</button>
                        <button className='button' onClick={() => { if (!isSorted) this.bubbleSort() }}>Bubble Sort</button>
                    </div>

                </div>
            </>
        );
    };

}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

