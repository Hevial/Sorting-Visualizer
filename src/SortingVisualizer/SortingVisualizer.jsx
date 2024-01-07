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


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { array: [], speed: 1 };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        const maxHeight = window.innerHeight * 0.91;
        const maxWidth = window.innerWidth * 0.24; //the multiplier is based on the bar width

        for (let i = 0; i < maxWidth; i++) {
            array.push(randomIntFromInterval(5, maxHeight));
        }

        this.setState({ array });
    }

    mergeSort() {
        console.log("Array originale:", this.state.array);
        const animations = getMergeSortAnimations(this.state.array);
        console.log("Array originale sortato:", this.state.array);
        this.animate(animations);

    }

    quickSort() {
        console.log("Array originale:", this.state.array);
        const animations = getQuickSortAnimations(this.state.array);
        console.log("Array originale sortato:", this.state.array);
        this.animate(animations);
    }

    heapSort() {
        console.log("Array originale:", this.state.array);
        const animations = getHeapSortAnimations(this.state.array);
        console.log("Array originale sortato:", this.state.array);
        this.animate(animations);
    }

    bubbleSort() {
        console.log("Array originale:", this.state.array);
        const animations = getBubbleSortAnimations(this.state.array);
        console.log("Array originale sortato:", this.state.array);
        this.animate(animations);

    }

    animate(animations) {

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
                    setTimeout(() => {
                        barOneStyle.backgroundColor = SECONDARY_COLOR
                        barTwoStyle.backgroundColor = SECONDARY_COLOR
                    }, i * ANIMATION_SPEED_MS / this.state.speed);
                    break

                case "swap":

                    //swapping the two values
                    setTimeout(() => {
                        const [barOneHeight, barTwoHeight] = animation.barHeight

                        barOneStyle.height = `${barTwoHeight}px`
                        if (barOneHeight)
                            barTwoStyle.height = `${barOneHeight}px`
                    }, i * ANIMATION_SPEED_MS / this.state.speed);
                    break

                case "reset":

                    // after comparing and swapping or not, reset back to the primary color
                    setTimeout(() => {
                        barOneStyle.backgroundColor = PRIMARY_COLOR
                        barTwoStyle.backgroundColor = PRIMARY_COLOR
                    }, i * ANIMATION_SPEED_MS / this.state.speed);
                    break

                default:
                    console.log("Action not possible! Current anim obj: ", animation);
                    break

            }

        }

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
                        <input
                            id="speed-slider"
                            type="range"
                            value={this.state.speed}
                            min="1"
                            max="9"
                            step="1"
                            onChange={(e) => {
                                this.setState({ speed: parseInt(e.target.value) })
                            }}
                        />

                        <button className='button' onClick={() => this.resetArray()}>Generate New Array</button>
                        <button className='button' onClick={() => this.mergeSort()}>Merge Sort</button>
                        <button className='button' onClick={() => this.quickSort()}>Quick Sort</button>
                        <button className='button' onClick={() => this.heapSort()}>Heap Sort</button>
                        <button className='button' onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    </div>

                </div>
            </>
        );
    };

}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

