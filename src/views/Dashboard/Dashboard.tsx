import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Image,
} from "semantic-ui-react";

import TopNav from "../../Components/TopNav/TopNav"
import "./Dashboard.css";

export class Dashboard extends Component {
  contextRef = createRef();
  render() {
    return (
      <div>
        <TopNav />
        <Container text>
          <Image
            src="https://www.vertex42.com/calendars/images/2020-calendar-with-holidays.png"
            size="large"
            centered
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum
            laudantium voluptates enim totam, eligendi doloribus similique
            deserunt libero vero provident reprehenderit voluptatum omnis, culpa
            accusamus cupiditate placeat odio minus. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolores accusamus rerum illo minus,
            magni nisi aliquam provident dolore atque incidunt, possimus
            voluptate neque veritatis exercitationem natus distinctio inventore,
            eius ipsa? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Deserunt, culpa. Nisi doloremque error ea alias, dolore quod
            consectetur repellat assumenda perspiciatis omnis quam hic? Cum quae
            quis cupiditate quam non! Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Magni quas dolor sit magnam nisi mollitia minus
            quaerat numquam iusto, fuga est. Voluptatem quaerat iste fuga
            laborum non architecto maiores similique.
          </p>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
