import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

const Home = () => {
    return (
        <div className="page-wrapper">
            <div className="page-content">
              <div className="main-container">
                <Link
                    to="https://www.kodingwife.com/demos/goldfinch/design1/index.html"
                    className="theme-switch"
                    target="_blank"
                >Gradient Color Option</Link>
                <Header/>
                <div className="page-header">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">Admin Dashboard</li>
                  </ol>
                  <ul className="app-actions">
                    <li>
                      <a href="#"> <i className="icon-export"></i> Export </a>
                    </li>
                  </ul>
                </div>
                <div className="row gutters">
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="info-stats2">
                      <div className="info-icon">
                        <i className="icon-eye1"></i>
                      </div>
                      <div className="sale-num">
                        <h2>5289</h2>
                        <p>Visitors</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="info-stats2">
                      <div className="info-icon">
                        <i className="icon-shopping-cart1"></i>
                      </div>
                      <div className="sale-num">
                        <h2>3765</h2>
                        <p>Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="info-stats2">
                      <div className="info-icon">
                        <i className="icon-shopping-bag1"></i>
                      </div>
                      <div className="sale-num">
                        <h2>8423</h2>
                        <p>Sales</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="info-stats2">
                      <div className="info-icon">
                        <i className="icon-activity"></i>
                      </div>
                      <div className="sale-num">
                        <h2>2619</h2>
                        <p>Expenses</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-title">Revenue</div>
                      </div>
                      <div className="card-body">
                        <div className="graph-status-right">
                          <div className="graph-status primary">
                            <div className="status-icon">
                              <i className="icon-arrow-down"></i>
                            </div>
                            <div className="status-info">
                              <div className="status-title">Today's Income</div>
                              <div className="percentage">$4575.00</div>
                            </div>
                          </div>
                          <div className="graph-status secondary">
                            <div className="status-icon">
                              <i className="icon-arrow-up"></i>
                            </div>
                            <div className="status-info">
                              <div className="status-title">Last Week Income</div>
                              <div className="percentage">+20.50%</div>
                            </div>
                          </div>
                        </div>
                        <div id="lineRevenueGraph"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-title">Team Activity</div>
                      </div>
                      <div className="card-body">
                        <ul className="team-activity">
                          <li className="product-list clearfix">
                            <div className="product-time">
                              <p className="date center-text">02:30 pm</p>
                              <span className="badge badge-primary">New</span>
                            </div>
                            <div className="product-info">
                              <div className="activity">
                                <h6>Unify - Admin Dashboard</h6>
                                <p>by Luke Etheridge</p>
                              </div>
                              <div className="status">
                                <div className="progress">
                                  <div
                                      className="progress-bar progress-bar-info"
                                      role="progressbar"
                                      aria-valuenow="49"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{width: "49%"}}
                                  >
                                    <span className="sr-only">49% Complete (success)</span>
                                  </div>
                                </div>
                                <p>(225 of 700gb)</p>
                              </div>
                            </div>
                          </li>
                          <li className="product-list clearfix">
                            <div className="product-time">
                              <p className="date center-text">11:30 am</p>
                              <span className="badge badge-primary">Task</span>
                            </div>
                            <div className="product-info">
                              <div className="activity">
                                <h6>User_Profile.php</h6>
                                <p>by Rovane Durso</p>
                              </div>
                              <div className="status">
                                <div className="progress">
                                  <div
                                      className="progress-bar progress-bar-info"
                                      role="progressbar"
                                      aria-valuenow="60"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{width: "60%"}}
                                  >
                                    <span className="sr-only">60% Complete (success)</span>
                                  </div>
                                </div>
                                <p>(485 of 850gb)</p>
                              </div>
                            </div>
                          </li>
                          <li className="product-list clearfix">
                            <div className="product-time">
                              <p className="date center-text">12:50 pm</p>
                              <span className="badge badge-primary">Closed</span>
                            </div>
                            <div className="product-info">
                              <div className="activity">
                                <h6>Material Design Kit</h6>
                                <p>by Cosmin Capitanu</p>
                              </div>
                              <div className="status">
                                <span className="line-seven">5,3,9,6,5,9,7,3,5,7</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-title">Tasks</div>
                      </div>
                      <div className="card-body pt-0">
                        <div id="radialTasks"></div>
                        <ul className="task-list-container">
                          <li className="task-list-item primary">
                            <div className="task-icon">
                              <i className="icon-clipboard"></i>
                            </div>
                            <div className="task-info">
                              <h6 className="task-title">New</h6>
                              <p className="amount-spend">12</p>
                            </div>
                          </li>
                          <li className="task-list-item secondary">
                            <div className="task-icon">
                              <i className="icon-clipboard"></i>
                            </div>
                            <div className="task-info">
                              <h6 className="task-title">Done</h6>
                              <p className="amount-spend">15</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-title">Order History</div>
                      </div>
                      <div className="card-body">
                        <div className="customScroll5">
                          <ul className="recent-orders">
                            <li>
                              <div className="order-img">
                                <img src="img/orders/order5.png" alt="Food"/>
                                <span className="badge badge-success">Delivered</span>
                              </div>
                              <div className="order-details">
                                <h5 className="order-title">The Original Cake</h5>
                                <p className="order-desc">Wedding cake with macarons.</p>
                                <span className="order-date">21 mins ago</span>
                              </div>
                            </li>
                            <li>
                              <div className="order-img">
                                <img src="img/orders/order6.png" alt="Food"/>
                                <span className="badge badge-danger">On Hold</span>
                              </div>
                              <div className="order-details">
                                <h5 className="order-title">Classic Sandwich</h5>
                                <p className="order-desc">Creamy Sandwich with pie.</p>
                                <span className="order-date">32 mins ago</span>
                              </div>
                            </li>
                            <li>
                              <div className="order-img">
                                <img src="img/orders/order3.png" alt="Food"/>
                                <span className="badge badge-danger">On Hold</span>
                              </div>
                              <div className="order-details">
                                <h5 className="order-title">Strawberry Pecan</h5>
                                <p className="order-desc">
                                  Homemade cheese Pecan with berries.
                                </p>
                                <span className="order-date">15 mins ago</span>
                              </div>
                            </li>
                            <li>
                              <div className="order-img">
                                <img src="img/orders/order1.png" alt="Food"/>
                                <span className="badge badge-info">Processing</span>
                              </div>
                              <div className="order-details">
                                <h5 className="order-title">Double Stacker</h5>
                                <p className="order-desc">
                                  Homemade cheese cake with berries.
                                </p>
                                <span className="order-date">10 mins ago</span>
                              </div>
                            </li>
                            <li>
                              <div className="order-img">
                                <img src="img/orders/order4.png" alt="Food"/>
                                <span className="badge badge-success">Delivered</span>
                              </div>
                              <div className="order-details">
                                <h5 className="order-title">Veggie Burger</h5>
                                <p className="order-desc">
                                  Homemade cheese cake with berries.
                                </p>
                                <span className="order-date">17 mins ago</span>
                              </div>
                            </li>
                            <li>
                              <div className="order-img">
                                <img src="img/orders/order2.png" alt="Food"/>
                                <span className="badge badge-danger">On Hold</span>
                              </div>
                              <div className="order-details">
                                <h5 className="order-title">Teriyaki Cheese Balls</h5>
                                <p className="order-desc">
                                  Chocolate cake with mascarpone.
                                </p>
                                <span className="order-date">12 mins ago</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-title">Activity</div>
                      </div>
                      <div className="card-body">
                        <div className="customScroll5">
                          <div className="timeline-activity">
                            <div className="activity-log">
                              <p className="log-name">
                                Corey Haggard<small className="log-time"
                              >- 9 mins ago</small
                              >
                              </p>
                              <div className="log-details">
                                GoldFinch dashboard has been created<span
                                  className="text-success ml-1"
                              >#New</span
                              >
                              </div>
                            </div>
                            <div className="activity-log">
                              <p className="log-name">
                                Gleb Kuznetsov<small className="log-time"
                              >- 4 hrs ago</small
                              >
                              </p>
                              <div className="log-details">
                                Farewell day photos uploaded.
                                <div className="stacked-images mt-1">
                                  <img
                                      className="sm"
                                      src="img/user.png"
                                      alt="Profile Image"
                                  />
                                  <img
                                      className="sm"
                                      src="img/user2.png"
                                      alt="Profile Image"
                                  />
                                  <img
                                      className="sm"
                                      src="img/user3.png"
                                      alt="Profile Image"
                                  />
                                  <img
                                      className="sm"
                                      src="img/user4.png"
                                      alt="Profile Image"
                                  />
                                  <span className="plus sm">+5</span>
                                </div>
                              </div>
                            </div>
                            <div className="activity-log">
                              <p className="log-name">
                                Yuki Hayashi<small className="log-time"
                              >- 7 hrs ago</small
                              >
                              </p>
                              <div className="log-details">
                                Developed 30 multipurpose Bootstrap 4 Admin Templates
                              </div>
                            </div>
                            <div className="activity-log">
                              <p className="log-name">
                                Nathan James<small className="log-time"
                              >- 9 hrs ago</small
                              >
                              </p>
                              <div className="log-details">Best Design Award</div>
                            </div>
                            <div className="activity-log">
                              <p className="log-name">
                                Elon Musk<small className="log-time">- 4 hrs ago</small>
                              </p>
                              <div className="log-details">
                                Farewell day photos uploaded.
                                <div className="stacked-images mt-1">
                                  <img
                                      className="sm"
                                      src="img/user5.png"
                                      alt="Profile Image"
                                  />
                                  <img
                                      className="sm"
                                      src="img/user22.png"
                                      alt="Profile Image"
                                  />
                                  <span className="plus sm">+7</span>
                                </div>
                              </div>
                            </div>
                            <div className="activity-log">
                              <p className="log-name">
                                Nkio Toyoda<small className="log-time">- 3 hrs ago</small>
                              </p>
                              <div className="log-details">
                                Developed 30 multipurpose Bootstrap 4 Admin Templates
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-title">Sales</div>
                      </div>
                      <div className="card-body">
                        <a
                            href="#"
                            className="graph-notify"
                            data-toggle="tooltip"
                            data-placement="left"
                            title=""
                            data-original-title="5 new orders placed"
                        >
                          <i className="icon-alert-circle"></i>
                        </a>
                        <div id="lineGraph1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-title">Income</div>
                      </div>
                      <div className="card-body">
                        <a
                            href="#"
                            className="graph-notify"
                            data-toggle="tooltip"
                            data-placement="left"
                            title=""
                            data-original-title="5 payment errors"
                        >
                          <i className="icon-alert-circle"></i>
                        </a>
                        <div id="lineGraph2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-title">Stats</div>
                      </div>
                      <div className="card-body">
                        <div className="customScroll5">
                          <ul className="statistics">
                            <li>
                            <span className="stat-icon">
                                <i className="icon-eye1"></i>
                            </span>
                              A new ticket opened.
                            </li>
                            {/* Add more statistics items here */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-title">Top Links</div>
                      </div>
                      <div className="card-body">
                        <div className="customScroll5">
                          <ul className="recent-links">
                            <li>
                              <a href="#">Bootstrap admin template</a>
                            </li>
                            {/* Add more recent links here */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-title">Top Customers</div>
                      </div>
                      <div className="card-body">
                        <div className="customScroll5">
                          <div className="top-agents-container">
                            <div className="top-agent">
                              <img src="img/user.png" className="avatar" alt="Agent"/>
                              <div className="agent-details">
                                <h6>Amy Diaz</h6>
                                <div className="agent-score">
                                  <div className="progress">
                                    <div className="progress-bar bg-primary" role="progressbar" style={{width: "87%"}}
                                         aria-valuenow="87" aria-valuemin="0" aria-valuemax="100"></div>
                                  </div>
                                  <div className="points">
                                    <div className="left">Rank #1</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Add more top agents here */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
};

export default Home;