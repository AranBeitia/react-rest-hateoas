// import axios from "axios";
import React from "react";
import * as routes from "../../constants/routes";

import Layout from "../../components/Layout";
import createRequest from "../../utils/request";
import axios from "axios";
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    };
  }
  async componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    const locationId = this.props.match.params.id;

    axios
      .get(`https://rickandmortyapi.com/api${routes.LOCATION}/${locationId}`)
      .then((result) => {
        this.setState({ locations: result.data });
      });
  }
  render() {
    const { locations } = this.state;
    return (
      <Layout>
        <p>location: {locations.name}</p>
      </Layout>
    );
  }
}

export default Location;
