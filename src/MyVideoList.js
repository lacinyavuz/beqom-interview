import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import MyVideoItem from './MyVideoItem';

class MyVideoList extends Component {
    render() {
        let videoItems = this.props.videoList.map((item, index) =>
            <MyVideoItem key={item.url} item={item} />
        );

        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        {videoItems}
                    </Row>
                </Grid>
                <div id="myVideoModalPlaceholder"></div>
            </div>
        );
    }
}

export default MyVideoList;
