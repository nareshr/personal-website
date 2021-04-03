import React, { Component } from "react";
import Article from "../elements/Article";

class Articles extends Component {
  constructor(props) {
    super();
    this.state = { articles: [] };
  }

  componentDidMount() {
    const devTo = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nareshramoliya";

    fetch(devTo)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let articles = [];
        //delete data.items[0];
        data.items.forEach((element, index) => {
          articles.push(
            <div className="column" key={index}>
              <Article
                key={index}
                title={element.title}
                url={element.link}
                image={element.thumbnail}
                extract=''
              />
            </div>
          );
        });
        var offset = 4 - data.length;
        for (var i = 0; i < offset; i++) {
          articles.push(<div className="column"></div>);
        }
        this.setState({ articles: articles });
      });
  }

  render() {
    return (
      <section className="section" id="articles">
        <div className="container">
          <h1 className="title">Articles</h1>
          <h2 className="subtitle is-4">My latest articles</h2>
          <div className="columns">{this.state.articles}</div>
        </div>
      </section>
    );
  }
}

export default Articles;
