import React, { Component } from "react";
import axios from "axios";
import { Container, Col, Row, Pagination } from "react-bootstrap";

import "./App.css";

const ENTER_KEY = 13;

class App extends Component {
    constructor() {
        super();
        this.state = {
            searchKeyword: "kebab",
            restaurants: [],
            resultFound: 0,
            resultStart: 1,
            resultShown: 20,
            totalPage: 0,
            page: 1,
            displayLoadingIndicator: "invisible",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSelectPage = this.handleSelectPage.bind(this);
    }

    findResto() {
        this.setState({ displayLoadingIndicator: "visible" });

        let queryParams = [
            "q=" + this.state.searchKeyword,
            //'category=8,9,10',
            "lat=-6.283522",
            "lon=106.711296",
            "sort=real_distance",
            "start=" + this.state.page,
        ];

        console.log(queryParams);

        let url =
            "https://developers.zomato.com/api/v2.1/search?" +
            queryParams.join("&");

        let config = {
            headers: {
                "user-key": "e1c8adecc3c5148865875f8253a600ff",
            },
        };

        axios.get(url, config).then((response) => {
            console.log(response);

            let resultFound = response.data.results_found;
            let resultShown = response.data.results_shown;
            let totalPage = Math.ceil(resultFound / resultShown);

            this.setState({
                restaurants: response.data.restaurants,
                resultFound: resultFound,
                resultStart: response.data.results_start,
                resultShown: resultShown,
                totalPage: totalPage,
                displayLoadingIndicator: "invisible",
            });
        });
    }

    componentWillMount() {}

    componentDidMount() {
        this.findResto();
    }

    handleChange(event) {
        this.setState({ searchKeyword: event.target.value });
    }

    handleKeyDown(event) {
        if (event.keyCode === ENTER_KEY) {
            this.findResto();
        }
    }

    handleSelectPage(event) {
        //event.preventDefault();
        let selectedPage = parseInt(event.target.text);
        console.log(selectedPage);
        this.setState({ page: selectedPage }, () => {
            this.findResto();
        });
    }

    render() {
        const data = this.state.restaurants.map((item, index) => {
            var thumb = item.restaurant.thumb;

            if (thumb.length === 0) {
                thumb = "https://via.placeholder.com/200";
            }

            var restaurantName = item.restaurant.name;
            var restaurantAddress = item.restaurant.location.address;

            // var googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${restaurantName},${item.restaurant.location.latitude},${item.restaurant.location.longitude}`;

            var googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${restaurantName},${restaurantAddress}`;

            return (
                <Col
                    key={index}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-5 text-center"
                >
                    <a
                        className="text-decoration-none"
                        href={item.restaurant.menu_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={thumb}
                            className="img-fluid rounded"
                            alt={restaurantName}
                        />
                        <br />
                        <span className="font-weight-bold text-dark">
                            {restaurantName}
                        </span>
                        <br />
                        {restaurantAddress}
                    </a>

                    <div>
                        <a
                            href={googleMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-warning btn-sm"
                        >
                            Buka Peta
                        </a>
                    </div>
                </Col>
            );
        });

        let pagination = [];

        for (let i = 0; i < this.state.totalPage; i++) {
            let page = i + 1;
            let pagingItem = (
                <Pagination.Item
                    key={i}
                    active={page === this.state.resultStart}
                    onClick={this.handleSelectPage}
                >
                    {page}
                </Pagination.Item>
            );

            pagination.push(pagingItem);
        }

        return (
            <Container>
                <div
                    className={this.state.displayLoadingIndicator}
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        marginLeft: "-120px",
                        marginTop: "-70px",
                        backgroundColor: "#999999",
                        width: "220px",
                        height: "120px",
                        textAlign: "center",
                        zIndex: 100,
                    }}
                >
                    <div className="lds-facebook">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <br />
                    <span>Mencari resto ...</span>
                </div>

                <Row>
                    <Col>
                        <h1>Resto Finder</h1>
                    </Col>
                </Row>

                <Row>
                    <Col className="mb-3">
                        <input
                            className="form-control input-sm"
                            type="search"
                            maxLength="100"
                            placeholder="Type resto or menu name here..."
                            value={this.state.searchKeyword}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                        />
                        <small>Tekan Enter untuk melakukan pencarian</small>
                    </Col>
                </Row>

                <Row>
                    <Col className="mb-3" style={{ overflow: "auto" }}>
                        <Pagination>{pagination}</Pagination>
                    </Col>
                </Row>

                <Row>{data}</Row>

                <Row>
                    <Col className="mb-2" style={{ overflow: "auto" }}>
                        <Pagination>{pagination}</Pagination>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default App;
