import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import getApi from "../../utils/getApi";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      paginationInfo: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    this.loadEpisodes();
    // console.log(this.getPages());
  }

  componentDidUpdate() {
    this.nextPage();
  }
  async getPages() {
    getApi("https://rickandmortyapi.com/api/episode");
  }

  async loadEpisodes() {
    const EPISODES_URL = `https://rickandmortyapi.com/api/episode?page=1`;
    axios
      .get(EPISODES_URL)
      .then((response) => {
        const newEpisodes = response.data.results;
        this.setState({ episodes: newEpisodes, hasLoaded: true });
      })
      .catch((error) => {
        this.setState({ hasError: true });
        console.log(error);
      });
  }

  nextPage = () => {
    if (this.state.page === this.state.paginationInfo) {
      this.setState({ paginationInfo: this.state.page + 1 });
    }
    console.log("next page");
  };

  render() {
    const { episodes, hasLoaded, hasError } = this.state;
    return (
      <Layout>
        <section className="row">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          {episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              id={episode.id}
              name={episode.name}
              airDate={episode.air_date}
              episode={episode.episode}
            />
          ))}
          <div className="col col-12">
            <hr />
            <button onClick={this.nextPage}>Next page</button>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
