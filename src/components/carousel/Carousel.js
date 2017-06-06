import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import Pagination from './Pagination';
import '../../style/carousel.css'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default class Carousel extends Component {
    state = {
        index: 0
    };

    handleChangeIndex = (index) => {
        this.setState({index});
    };

    render() {
        const {index} = this.state;
        let push = this.props.push;
        return (
            <div className="root">
                <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                    <div className="slide slide1" onClick={e=>{push('/detail/1495806937898')}}>
                    </div>
                    <div className="slide slide2" onClick={e=>{push('/detail/1495807329005')}}>
                    </div>
                    <div className="slide slide3" onClick={e=>{push('/detail/1495807405189')}}>
                    </div>
                </AutoPlaySwipeableViews>
                <Pagination dots={3} index={index} onChangeIndex={this.handleChangeIndex}/>
            </div>
        );
    }
}
