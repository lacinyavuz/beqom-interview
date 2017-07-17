import React, { Component } from 'react';
import MyVideoList from './MyVideoList';
import $ from 'jquery';

class MyVideoSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { searchResult: [] };

        // Reactjs de eventleri bu şekilde bind etmem gerektiğini farkettim
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // kullanıcının mobil cihaz kullandığını kesin olarak saptamak çok zor
        // burada touch eventlerini destekleyen tüm tarayıcıları mobil varsayıyorum
        this.isMobile = 'ontouchstart' in document.documentElement;

        // Bazı fieldlar tanımlıyorum
        this.changeTimeout = null;
        this.refreshInterval = null;
        this.searchString = "";
        this.refreshQuery = "";
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
            this.changeTimeout = setTimeout(function () { this.sendRequest(this.searchString); }, 1000);
        }
    }

    sendRequest(queryString) {
        // önceki request tamamlanmadan yeni refresh veya arama requesti gelirse önceki requesti iptal ediyorum.
        if (this.refreshInterval) clearInterval(this.refreshInterval);

        // scope'u yakalıyorum ajax içerisinde kullanmak üzere
        const scope = this;

        $.ajax({
            type: 'GET',
            url: 'http://jsonstub.com/beqominterview/' + queryString,
            contentType: 'application/json',
            beforeSend: function (request) {
                request.setRequestHeader('JsonStub-User-Key',
                    '84e0aeb9-9302-43c8-8e60-15a0fda7981a');
                request.setRequestHeader('JsonStub-Project-Key',
                    '4d99a9a7-ccbf-4d5b-bd31-8aee887d6460');
            }
        }).done(function (data) {
            scope.setState({ searchResult: data });

            // Başarılı olan sorguyu kaydedip periyodik olarak çağırıyorum değişiklikleri yakalamak için
            scope.refreshQuery = queryString;
            scope.refreshInterval = setInterval(function () { scope.sendRequest(scope.refreshQuery); }, 5000);
        }).fail(function () {
            scope.setState({ searchResult: [] });
        });
    }

    handleSubmit(event) {
        this.sendRequest(this.searchString);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Search..." type="text" onChange={this.handleChange} />
                </form>
                <br /><br />
                <MyVideoList videoList={this.state.searchResult} />
            </div>
        );
    }
}

export default MyVideoSearch;
