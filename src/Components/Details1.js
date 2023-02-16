import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import '../Styles/Details1.css';

  import Details2 from "./Details2"; 

class Details1 extends React.Component {
    render() {
        return (<div>
            <Carousel showThumbs={false}>
                <div>
                    <img className="img" src="https://www.daysoftheyear.com/wp-content/uploads/national-fast-food-day.jpg" alt="pizza" />
                </div>
                <div>
                    <img className="img" src="https://www.expatica.com/app/uploads/sites/5/2014/05/french-food.jpg " alt="not found" />
                </div>
                <div>
                    <img className="img" src="https://www.expatica.com/app/uploads/sites/5/2014/05/boeuf-bourguignon.jpg" alt="not found" />
                </div>
            </Carousel>
              <Details2 /> 

        </div>)
    }
}
export default Details1;
