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

              </div>
            </div>
        </div>
    );
};

export default Home;