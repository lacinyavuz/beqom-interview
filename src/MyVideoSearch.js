import React, { Component } from 'react';
import MyVideoList from './MyVideoList';
import $ from 'jquery';

class MyVideoSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { searchResult: [] };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.searchString = "";

        // kullanıcının mobil cihaz kullandığını kesin olarak saptamak çok zor
        // burada touch eventlerini destekleyen tüm tarayıcıları mobil varsayıyorum
        this.isMobile = 'ontouchstart' in document.documentElement;
        this.changeTimeout = null;
    }

    handleChange(event) {
        // input form elementinin içinde olduğundan enter'a basıldığında zaten
        // tarayıcı submit ediyor, dolayısıyla desktop kullanıcıları için
        // extra bir şey yapmama gerek yok
        this.searchString = event.target.value;

        // mobil kullanıcılar için onchange'de otomatik submit edilmesini sağlamam gerekiyor
        // burada çok fazla request gitmesini engellemek için 1 sn delay koyuyorum
        if (this.isMobile) {
            if (this.changeTimeout) clearTimeout(this.changeTimeout);
            this.changeTimeout = setTimeout(this.handleSubmit, 1000);
        }
    }

    handleSubmit(event) {
        var that = this;
        
        $.ajax({
            type: 'GET',
            url: 'http://jsonstub.com/beqominterview/' + this.searchString,
            contentType: 'application/json',
            beforeSend: function (request) {
                request.setRequestHeader('JsonStub-User-Key',
                    '84e0aeb9-9302-43c8-8e60-15a0fda7981a');
                request.setRequestHeader('JsonStub-Project-Key',
                    '4d99a9a7-ccbf-4d5b-bd31-8aee887d6460');
            }
        }).done(function (data) {
            that.setState({ searchResult: data });
        }).fail(function () {
            that.setState({ searchResult: [] });
        });

        if (event) event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="Search..."
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </form>
                <br /><br />
                <MyVideoList videoList={this.state.searchResult} />
            </div>
        );
    }
}

export default MyVideoSearch;
