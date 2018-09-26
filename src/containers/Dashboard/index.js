import React from 'react';
import { connect } from 'react-redux';
import { timeFormat, timeParse } from 'd3';
import axios from 'axios';
import qs from 'qs';

import { signout, validate } from 'redux/actions';
import * as auth from 'system/auth';

import Dashboard from './Dashboard';

const mapDispatchToProps = dispatch => {
    return {
        signout: () => dispatch(signout()),
        validate: () => dispatch(validate()),
    };
};
const mapStateToProps = state => ({
    user: state.user,
});
class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            quote: {},
            symbol: 'AMZN', // default symbol

            // trade form
            quantity: 0,
        };
    }

    // Get initial data/quote
    componentWillMount() {
        this.props.validate();
        this.getData();
        this.getQuote();
    }

    // Submit trade request
    submitTrade = event => {
        event.preventDefault()
        const createTxnRequest = {
            method: 'POST',
            headers: { 'Session-Token': auth.getCookie('api.ptrade.com') },
            url: process.env.API_URL + '/users/' + this.props.user.id + '/transactions',
            data: qs.stringify({
                user_id: this.props.user.id,
                symbol: this.state.symbol,
                quantity: this.state.quantity,
            }),
        }
        axios(createTxnRequest)
            .then((response) => { console.log(response) })
            .catch((error) => { console.log(error); });
    }

    changeBuyQty = event => {
        // TOOD: trade request validation
        this.setState({ quantity: event.target.value });
    }

    changeSellQty = event => {
        // TOOD: trade request validation
        this.setState({ quantity: -event.target.value });
    }

    // Signout, delete current session
    signout = () => {
        this.props.signout();
    }

    // Update symbol value based on search input. 
    changeSearch = event => {
        event.preventDefault();
        this.setState({ symbol: event.target.value });
    }

    // Submit search, send requests for data/quote for current state.symbol
    submitSearch = event => {
        event.preventDefault();
        if (this.state['symbol'].length < 1) {
            console.log('No search input.');
            return;
        }
        this.getData();
        this.getQuote();
    }

    // Send a GET request for the quote for the current state.symbol.
    // If successful, parse quote.
    // Else, log error.
    // TODO: handle error.
    getQuote = () => {
        const createSessionRequest = {
            method: 'GET',
            url: process.env.IEX_URL + '/' + this.state.symbol + '/quote',
        }
        axios(createSessionRequest)
            .then((response) => { this.parseQuote(response.data); })
            .catch((error) => { console.log(error); });
    }

    // Send a GET request for 1d data for the current state.symbol.
    // If successful, parse data.
    // Else, log error.
    // TODO: handle error.
    getData = () => {
        const createSessionRequest = {
            method: 'GET',
            url: process.env.IEX_URL + '/' + this.state.symbol + '/chart/1d?chartInterval=5',
        }
        axios(createSessionRequest)
            .then((response) => { this.parseData(response.data); })
            .catch((error) => { console.log(error); });
    }

    // Parse quote, store import stats into state quote.
    parseQuote = (data) => {
        let parsedQuote = {
            symbol: data['symbol'],
            name: data['companyName'],
            open: data['open'],
            close: data['close'],
            high: data['high'],
            low: data['low'],
            latestPrice: data['latestPrice'],
            change: data['change'],
            changePercent: data['changePercent'],
            avgTotalVolume: data['avgTotalVolume'],
            marketCap: data['marketCap'],
            week52High: data['week52High'],
            week52Low: data['week52Low'],
        };
        this.setState({ quote: parsedQuote });
    }

    // Parse data, set data to an array of objects containing a date and value,
    // with the format date: %H:%M and price: 1234.56.
    // Ex. [{date: '12:30', 3.50}, {date: '12:35', 3.52}, {date: '12:40', 3.55}]
    parseData = (data) => {
        const formatTime = timeFormat("%I:%M");
        const parseTime = timeParse("%H:%M");
        let parsedData = data
            .map((d) => {
                return {
                    date: formatTime(parseTime(d.minute)),
                    value: parseFloat(d.average.toPrecision(6)),
                }
            })
            .filter(d => d.value > 0.0);
        this.setState({ data: parsedData });
    }

    render() {
        return (
            <Dashboard {...this.props} {...this.state}
                changeSearch={this.changeSearch}
                submitSearch={this.submitSearch}
                changeBuyQty={this.changeBuyQty}
                changeSellQty={this.changeSellQty}
                submitTrade={this.submitTrade}
            />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);