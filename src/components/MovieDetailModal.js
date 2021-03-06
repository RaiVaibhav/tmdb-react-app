import * as React from 'react';
import axios from 'axios';
class MovieDetailModal extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            movieVideos:[],
            movieDetail:undefined,
            searching:true
        };

    }
    async componentDidMount(){
        var one = undefined;
        await axios.get(("https://api.themoviedb.org/3/movie/"+this.props.movie.id), {params:{"api_key":"c9a6d1cef74fc86e46a5e4da7080fa64"}})
            .then((response) => {
                console.log(response.data);
                if (response.data) {
                    one = response.data
                }
                else {
                }
            })
            .catch((err) => {
                console.log(err);
            });
        var two = [];
        await axios.get(("https://api.themoviedb.org/3/movie/"+this.props.movie.id+"/videos"), {params:{"api_key":"c9a6d1cef74fc86e46a5e4da7080fa64"}})
            .then((response) => {
                console.log(response.data);
                if (response.data.results.length!==0) {

                    two =response.data.results
                }
                else {
                }
            })
            .catch((err) => {
                console.log(err);
            });
        
        await this.setState({
            searching:false,
            movieDetail:one,
            movieVideos:two
        })
    }
    render() {
        return <div className="modal-background faster animated fadeIn" onClick={this.props.hide} >
            <div className="modal-container faster animated slideInDown" onClick={(event) => { event.stopPropagation(); }}>
                <div className="clearfix">
                    <div className="float-right">
                        <img style={{cursor:"pointer"}} src="/icons/close.svg" onClick={this.props.hide} />
                    </div>
                </div>
                {this.state.movieDetail && !this.state.searching?<div className="row clearfix">
                    <div className="col-md-6 col-sm-6 col-lg-4 float-left">
                        <img style={{width:"100%"}} src={"https://image.tmdb.org/t/p/w300"+this.state.movieDetail.poster_path} />
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-8 float-right" style={{textAlign: "left"}}>
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-lg-12">
                                <h3 style={{float:"left"}}>{this.state.movieDetail.title}</h3>
                            </div>
                            <div className="col-md-12 col-sm-12 col-lg-12" >
                                <h4 style={{color:"green", float:"left"}}>{this.state.movieDetail.tagline}</h4>
                            </div>
                            <div className="col-md-12 col-sm-12 col-lg-12">
                                {this.state.movieVideos.length?<iframe type="text/html" style={{height:"300px", width:"100%"}}
                                    src={"https://www.youtube.com/embed/"+this.state.movieVideos[0].key}
                                frameBorder="0"/> :null}
                                {this.state.movieDetail.overview?<p style={{textAlign: "left"}}>{this.state.movieDetail.overview}</p>:null}
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 col-lg-6">
                                        <h3>Release Date:</h3>
                                        <h4 style={{color:"green"}}>{this.state.movieDetail.release_date}</h4>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-lg-6">
                                        <h3>Rating:</h3>
                                        <h4 style={{color:"green"}}>{this.state.movieDetail.vote_average +"/10"}</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 col-lg-6">
                                        <h3>Budjet:</h3>
                                        <h4 style={{color:"green"}}>{"$"+this.state.movieDetail.budget}</h4>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-lg-6">
                                        <h3>Revenue:</h3>
                                        <h4 style={{color:"green"}}>{"$"+this.state.movieDetail.revenue}</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 col-lg-6">
                                    <h3>Genre:</h3>
                                        {
                                            this.state.movieDetail.genres.map((genre, index) => {
                                                return <h4 key={index} style={{color:"green"}}>{genre.name}</h4>
                                            })
                                        }
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-lg-6">
                                    <h3>Production:</h3>
                                    {
                                        this.state.movieDetail.production_companies.map((company, index) => {
                                            return <h4 key={index} style={{color:"green"}}>{company.name}</h4>
                                        })
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:<img src="/icons/react-loading.svg"></img>}
            </div>
        </div>;
    }
}
export default MovieDetailModal;