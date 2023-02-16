import React, { useState } from "react";
import '../Styles/filter.css';

import queryString from 'query-string';
import axios from "axios";

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurent: [],
      location: [],
      meal_type :undefined,
      cuisine: [],
      lcost: {},
      hcost: {},
      sort: {},
      page: 0,
      pageCount: [],
      totalPage: []
    }

  }
  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    const { meal_type, location_id } = qs;
    const filterObj = {
      searchFilter: {
        mealtype_id: Number(meal_type),
        location_id: Number(location_id)
      }
    };

    axios({
      method: 'POST',
      url: 'http://localhost:3002/api/restaurent/filter',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    }).then(response => {
      this.setState({ restaurent: response.data.data.restaurent })

      //console.log(response.data.data.restaurent);

    })
      .catch(err => console.log(err));

    axios({
      method: 'GET',
      url: 'http://localhost:3002/api/location/getLocation',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      this.setState({ location: response.data.data })
      //console.log(response.data.data.restaurent);

    }).catch(err => console.log(err));

  }

  //   handleLocationChange = (event) => {
  //         const location = event.target.value;
  //         const { meal_type, cuisine, lcost, hcost, sort, page } = this.setState;
  //         const filterObj = {
  //           meal_type : Number(meal_type),
  //           cuisine,
  //           lcost,
  //           hcost,
  //           sort,
  //           page
  //         };
  //  axios({
  //       method: 'POST',
  //       url: 'http://localhost:3002/api/restaurent/filter',
  //       headers: { 'Content-Type': 'application/json'},
  //       data: filterObj
  //     })
  // .then(response => {
  //   this.setState({ restaurent : response.data.data.restaurent,location})
  //   //console.log(response.data.data.restaurent);

  // })
  // .catch(err => console.log(err));
  // }
  handleLocationChange = (event) => {
    const location = event.target.value;
    const qs = queryString.parse(this.props.location.search);
    const { meal_type } = qs;
    this.props.history.push(`/filter?mealtype=${meal_type}&location_id=${location}`);
    window.location.reload()
  }

  handleCuisineChange = (cuisineId) => {
    const qs = queryString.parse(this.props.location.search);
    const { meal_type } = qs;
    //console.log(meal_type)

    const { cuisine } = this.state;

    //console.log(cuisine) 
    const index = cuisine.indexOf(cuisineId);

    if (index === -1) {
      cuisine.push(cuisineId);
    } else {
      cuisine.splice(index, 1);
    }


    const filterObj = {
      searchFilter: {
        mealtype_id: Number(meal_type),

        // location_id:Number(location_id),
        cuisine: cuisine.length === 0 ? undefined : cuisine
        // lcost,
        // hcost,
        // sort,
        // page
      }
    };
    axios({
      method: 'POST',
      url: 'http://localhost:3002/api/restaurent/filter',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    })
      .then(response => {
        this.setState({ restaurent: response.data.data.restaurent })
        console.log(response.data.data.restaurent)

      })
      .catch(err => console.log(err));
  }
  handleCostChange = (lcost, hcost) => {
    const qs = queryString.parse(this.props.location.search);
    const { meal_type } = qs;


    const filterObj = {
      searchFilter: {
        mealtype_id: Number(meal_type),
        min_price: { $gt: lcost, $lt: hcost }
      }
    }
    axios({
      method: 'POST',
      url: 'http://localhost:3002/api/restaurent/filter',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    })
      .then(response => {
        this.setState({ restaurent: response.data.data.restaurent, lcost, hcost })
      })
      .catch(err => console.log(err));
  }

  handleSortChange = (sort) => {
    const qs = queryString.parse(this.props.location.search);
    const { meal_type } = qs;
    var sortCondition = sort === "priceLow" ? { "min_price": 1 } : { "min_price": -1 }
    const filterObj = {
      searchFilter: {
        mealtype_id: Number(meal_type)
      },
      sort: sortCondition
    }
    axios({
      method: 'POST',
      url: 'http://localhost:3002/api/restaurent/filter',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    })
      .then(response => {
        this.setState({ restaurent: response.data.data.restaurent, sort })
      })
      .catch(err => console.log(err));
  }

  handlePageChange = (page) => {
    useState()
    this.state.page = page ? page : 0;
    const qs = queryString.parse(this.props.location.search);   //this is from mealtype from home page when we select the mealtype it will give us restaurent list
    const { mealtype } = qs;
    const filterObj = {
      searchFilter: {
        mealtype_id: Number(mealtype)
      },
      page: page ? page : 0
    };

    axios({
      method: 'POST',
      url: 'http://localhost:3002/api/restaurent/filter',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    }).then(response => {
      this.setState({ restaurent: response.data.data.restaurent })

      this.setState({ totalPage: new Array(response?.data?.data?.totalPage).fill("test") });
    }).catch(err => console.log(err))
  }
  handleNavigate = (resId) => {
    this.props.history.push(`/details2?restaurent=${resId}`);
  }


  render() {
    const { restaurent, location, totalPage, page } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row heading d-flex justify-content-center">
            Breakfast places in Salem
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-3">
              <div className="filterPanel">
                <div className="filterPanelHeading">
                  Filters
                </div>
                <div className="filterPannelSubHeading">
                  Select Location
                </div>
                <select className="locationSelection" onChange={this.handleLocationChange}>
                  <option value="0">Select City</option>
                  {location.map((item, i) => {
                    return <option value={item.location_id} key={i}> {`${item.name} , ${item.city}`}</option>
                  })}
                </select>
                <div className="filterPanelSubHeading">Cuisine</div>

                <input type="checkbox" className="cuisinOption" onChange={(e) => this.handleCuisineChange(1)} />
                <label>North Indian</label>

                <br />
                <input type="checkbox" className="cuisinOption" onChange={(e) => this.handleCuisineChange(2)} />
                <label>South Indian</label>

                <br />
                <input type="checkbox" className="cuisinOption" onChange={(e) => this.handleCuisineChange(3)} />
                <label>Chinese</label>

                <br />
                <input type="checkbox" className="cuisinOption" onChange={(e) => this.handleCuisineChange(4)} />
                <label>Fast Food</label>

                <br></br>
                <input type="checkbox" className="cuisinOption" onChange={(e) => this.handleCuisineChange(5)} />
                <label>Street Food</label>

                <br />
                <div className="filterPanelSubHeading">
                  Cost for two
                </div>

                <input type="radio" className="cuisinOption" name="cost" onChange={() => this.handleCostChange(0, 500)} />
                <label>Less than 500</label>

                <br />
                <input type="radio" className="cuisinOption" name="cost" onChange={() => this.handleCostChange(500, 1000)} />
                <label>500 to 1000</label>

                <br />
                <input type="radio" className="cuisinOption" name="cost" onChange={() => this.handleCostChange(1000, 1500)} />
                <label>1000 to 1500</label>

                <br />
                <input type="radio" className="cuisinOption" name="cost" onChange={() => this.handleCostChange(1500, 2000)} />
                <label>1500 to 2000</label>

                <br></br>
                <input type="radio" className="cuisinOption" name="cost" onChange={() => this.handleCostChange(2000, 50000)} />
                <label>2000+</label>

                <br />
                <div className="filterPanelSubHeading">
                  Sort
                </div>
                <input type="radio" className="cuisinOption" name="price" onChange={() => this.handleSortChange("priceLow")} />
                <label>Price low to high</label>

                <br />
                <input type="radio" className="cuisinOption" name="price" onChange={() => this.handleSortChange("priceHigh")} />
                <label>Price high to low</label>

                <br />
              </div>
            </div>
            <div className="col-sm-12 col-md-8 col-lg-9">

            {restaurent.length > 0 ? restaurent.map(item => {
                return (
                <div className="resultPanel" onClick={() => this.handleNavigate(item._id)}>
                  <div className="row upperSection">
                    <div className="col-2">
                      <img src={item.image} alt="notfound" className="resultsImage" />
                    </div>
                    <div className="col-10">
                      <div className="resultsHeading" >{item.name}</div>
                      <div className="resultsSubHeading" >{item.locality}</div>
                      <div className="resultsAddress" ><strong>{item.city}</strong></div>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row lowerSection">
                    <div className="col-2">
                      <div className="resultsAddress">CUISINES:</div>
                      <div className="resultsAddress">Cost For Two:</div>
                    </div>
                    <div className="col-10">
                      <div className="resultsSubHeading">{item.cuisine.map(cuisineItem => `${cuisineItem.name} `)}</div>
                      <div className="resultsSubHeading">  &#8377;{item.min_price}</div>
                    </div>
                  </div>
                </div>
                )
                }) :<div className="No"> No Result Found ...</div> }
              
            {restaurent.length > 0 ?
              <div className="pagination d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                  {page ? (
                          <li className="page-item">
                            <a
                              className="page-link"
                              onClick={() => this.handlePageChange(page - 1)}
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>
                        ) : ("")
                        }

                        {
                          totalPage?.map((item, i) => {
                            return (
                              <li className="page-item">
                                <a className="page-link" onClick={() => this.handlePageChange(i)}>
                                  {i + 1}
                                </a>
                              </li>
                            )
                          })
                        }
                        {
                          // console.log(page, totalPage.length - 1)
                          page < totalPage.length - 1 ? (
                            <li className="page-item">
                              <a className="page-link" onClick={() => this.handlePageChange(page + 1)} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                             ) : ("")
                     }
                            </ul>
                </nav>
              </div> : null}
          </div>
        </div>
      </div>
      </div>


    )
  }
}
export default Filter;