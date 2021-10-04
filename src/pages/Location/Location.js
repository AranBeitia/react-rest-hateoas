import axios from "axios";
import React from "react";

import Layout from "../../components/Layout";
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
    };
  }
  async componentDidMount() {
    this.getLocation();
  }
  getLocation() {
    const locationId = this.props.match.params.id;

    axios
      .get(`https://rickandmortyapi.com/api/location/${locationId}`)
      .then((result) => {
        this.setState({ location: result.data });
      })
      .catch((error) => console.log(error));
  }
  render() {
    const { location } = this.state;
    return (
      <Layout>
        <p>location: {location.name}</p>
      </Layout>
    );
  }
}

export default Location;
