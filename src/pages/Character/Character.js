import React from "react";
import * as routes from "../../constants/routes";
import createRequest from "../../utils/request";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import axios from "axios";
class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: [],
      episodes: [],
      hasLoaded: false,
    };
  }

  async componentDidMount() {
    this.loadCharacter();
  }

  async loadCharacter() {
    const characterId = this.props.match.params.id;

    axios
      .get(`https://rickandmortyapi.com/api${routes.CHARACTER}/${characterId}`)
      .then((result) => {
        this.setState({ character: result.data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { character } = this.state;
    return (
      <Layout>
        {/* <CharacterCard
          id={character.id}
          name={character.name}
          image={character.image}
          species={character.species}
          status={character.status}
          origin={character.origin}
          location={character.location}
        /> */}
        <div>
          <p>{character.name}</p>
          <p>{character.id}</p>
          <p>{character.image}</p>
          <p>{character.status}</p>
          {/* <p>{character.origin}</p>
          <p>{character.location}</p> */}
        </div>
      </Layout>
    );
  }
}

export default Character;
