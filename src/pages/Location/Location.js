// import axios from "axios";
import React from "react";
import * as routes from "../../constants/routes";

import Layout from "../../components/Layout";
import LocationCard from "../../components/LocationCard";
import createRequest from "../../utils/request";
import axios from "axios";
import CharacterCard from "../../components/CharacterCard";
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      characters: [],
      hasLoaded: false,
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
        const location = result.data;
        this.setState({ location: location });
        axios
          .all(location.residents.map((i) => axios.get(i)))
          .then((request) => {
            const result = request.map((i) => i.data);
            this.setState({
              characters: result,
              hasLoaded: true,
            });
          });
      });
  }
  render() {
    const { location, characters, hasLoaded } = this.state;
    const { history } = this.props;
    console.log(characters);
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            <button className="btn btn-primary" onClick={history.goBack}>
              Back
            </button>
          </div>
          <div className="col col-12">
            <h5>Location</h5>
          </div>
          <LocationCard
            name={location.name}
            type={location.type}
            dimension={location.dimension}
          />
          <div className="col col-12">
            <h5>Residents</h5>
          </div>
          {hasLoaded &&
            characters.map((resident) => {
              // console.log(resident.name);
              <p>{resident.name}</p>;
            })}
        </section>
      </Layout>
    );
  }
}

export default Location;
