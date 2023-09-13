import React from 'react';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { array: [] };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        const maxHeight = window.innerHeight * 0.9;
        const maxWidth = window.innerWidth * 0.22; //the multiplier is based on the bar width

        for (let i = 0; i < maxWidth; i++) {
            array.push(randomIntFromInterval(5, maxHeight));
        }

        this.setState({ array });
    }

    render() {
        const { array } = this.state;

        return (
            <>
                <div className='array-container'>
                    {array.map((value, idx) => (
                        <div className='array-bar'
                            key={idx}
                            style={{ height: `${value}px` }}>
                        </div>
                    ))}
                </div>
            </>
        );
    };

}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

