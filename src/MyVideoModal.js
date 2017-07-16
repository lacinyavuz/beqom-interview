import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class MyVideoModal extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: true };
        this.close = this.close.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ showModal: true });
    };

    close() {
        this.setState({ showModal: false });
    };

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.item.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <iframe
                            className="myModalFrame"
                            src={this.props.item.url.replace("watch?v=", "embed/")}
                            frameBorder="0"
                            allowFullScreen
                            title={this.props.item.title}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="myModalFooter">
                            <div>{this.props.item.description}</div>
                            <div>{this.props.item.time}</div>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default MyVideoModal;
