import * as React from 'react';
import './MovieCard.css'
class CardHeader extends React.Component {
  render() {
    const { image } = this.props;
    var style = { 
        backgroundImage: 'url(' + image + ')',
    };
    return (
      <header style={style} id={image} className="card-header">
      </header>
    )
  }
}
class Card extends React.Component {
  render() {
    return (
      <article className="card" onClick={this.props.onClick}>
        <CardHeader image={"https://image.tmdb.org/t/p/w500/"+this.props.movie.backdrop_path}/>
        <div className="card-body">
            <p className="date">{this.props.movie.release_date}</p>
            <h4>{this.props.movie.title}</h4>
            <p className="body-content">{this.props.movie.overview.slice(0,200)+"..."}</p>
            <button className="button button-primary">
                <i className="fa fa-star"></i> {this.props.movie.vote_average+"/10"}
            </button>
      </div>
      </article>
    )
  }
}

export default Card