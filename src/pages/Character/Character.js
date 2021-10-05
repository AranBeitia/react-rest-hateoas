import React from "react";
import * as routes from "../../constants/routes";
import { Link, useHistory } from "react-router-dom";
import createRequest from "../../utils/request";
import axios from "axios";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import EpisodeCard from "../../components/EpisodeCard/EpisodeCard";
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
        const newEpisode = result.data.episode;

        axios.all(newEpisode.map((url) => axios.get(url))).then((request) => {
          const res = request.map((i) => i.data);
          this.setState({
            character: result.data,
            episodes: res,
            hasLoaded: true,
          });
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { character, episodes, hasLoaded } = this.state;
    // const history = useHistory();
    return (
      <Layout>
        {/* <Link to={() => history.goBack()}>Back</Link> */}
        {hasLoaded && character && (
          <CharacterCard
            id={character.id}
            name={character.name}
            image={character.image}
            status={character.status}
            location={character.location}
            origin={character.origin}
          />
        )}
        <div>
          {/* <img src={character.image} alt={character.name} />
          <p>{character.name}</p>
          <h5>CHARACTER</h5>
          <span>{character.species} | </span>
          <span>{character.status}</span>
          <h5>ORIGIN</h5>
          <span>{character.origin && character.origin.name}</span>
          <h5>LOCATION</h5>
          <span>{character.location && character.location.name}</span>
          <hr /> */}

          <h5>Episodes</h5>
          {hasLoaded &&
            episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
              />
            ))}
        </div>
      </Layout>
    );
  }
}

export default Character;
