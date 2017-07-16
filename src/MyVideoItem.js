import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Col } from 'react-bootstrap';
import MyVideoModal from './MyVideoModal';

class MyVideoItem extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        ReactDOM.render(<MyVideoModal item={this.props.item} />, document.getElementById('myVideoModalPlaceholder'));
    };

    render() {
        return (
            <Col xs={12} sm={6} md={4} lg={3}>
                <div className="myVideoItem">
                    <div><h4>{this.props.item.title}</h4></div>
                    <div className="myVideoImageWrapper" onClick={this.handleClick}>
                        <img src={this.props.item.pic} alt={this.props.item.title} />
                        <i className="myVideoOverlay"></i>
                    </div>
                    <div>{this.props.item.description}</div>
                    <div>{this.props.item.time}</div>
                </div>
            </Col>
        );
    }
}

export default MyVideoItem;
