import * as React from 'react';
import './TopHeader.css';
import MovieDetailModal from './MovieDetailModal'
import Card from './MovieCard'
import axios from 'axios';
var qs = require('qs');
var _=require('lodash');
class TopHeader extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            showdropdown:false,
            searchedMovies:[],
            searchItem:"",
            selectedMovie:undefined,
            searching:true,
            cardData:[]
        }
        this.search = this.search.bind(this)
    }
    search(event){
        this.setState({
            searchItem:event.target.value
        })
        axios.post("https://api.themoviedb.org/3/search/movie", qs.stringify({api_key:"c9a6d1cef74fc86e46a5e4da7080fa64", query: event.target.value}))
            .then((response) => {
                if (response.data.results.length!==0) {
                    this.setState({
                        showdropdown:true,
                        searchedMovies: _.sortBy(response.data.results, "vote_average").reverse()
                    });
                }
                else {
                    this.setState({
                        showdropdown:false,
                        searchedMovies:[]
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    searchItem:"",
                    showdropdown:false
                });
                // console.log(err);
            });
    }
    componentDidMount(){
        axios.get('https://api.themoviedb.org/3/movie/top_rated', {params:{api_key:"c9a6d1cef74fc86e46a5e4da7080fa64"}})
        .then((response) =>{
            if (response.data.results.length){
                setTimeout(()=>{
                    this.setState({
                    cardData: response.data.results,
                    searching:false
                });
                console.log("abc");
            }, 700)

            }})
        .catch(err=>{
            console.log(err)
        })
    }
    render() {
        if (this.state.searching){
            return <img style={{padding:"20%"}} src="/icons/react-loading.svg"></img>
        }
        else {
            return <div className="clearfix page-heading-container" style={{marginTop:"2.5vw"}}>
        <div className="clearfix page-heading-container" style={{marginTop:"2.5vw"}}>
            <div className="float-left">
                <img src="/icons/moviedb.svg" style={{width:"50%"}} />
            </div>
            <div className="float-right">
                &nbsp;&nbsp;&nbsp;
                <div style={{ display: "inline-block", verticalAlign: "middle", position: "relative" }}>
                    <img src="/icons/search.svg" className="search-bar-icon" />
                    <input type="text" className="search-bar input-design" value={this.state.searchItem} placeholder="Search by movie name" onChange={(event) => {this.search(event)}}
                    onBlur ={()=>{
                        setTimeout(()=>{
                            this.setState({
                            searchItem:"",
                            showdropdown:false
                        })}, 300);
                    }}
                    />
                    {this.state.showdropdown && this.state.searchedMovies.length?<div className="search-drop-down">
                        {this.state.searchedMovies.length ? 
                            <div>
                                {
                                    this.state.searchedMovies.map((movie, userIndex) => {
                                        return <div onClick={() => {
                                            this.setState({
                                                searchItem:"",
                                                selectedMovie:movie,
                                                showdropdown:false
                                            })
                                        }} className="search-drop-down-item-content no-select cursor-pointer" key={userIndex}>
                                            <img src={"https://image.tmdb.org/t/p/w500/"+movie.poster_path} />
                                            <span>{movie.title}</span>
                                            <h4>{movie.vote_average}</h4>
                                        </div>;
                                    })
                                }
                            </div> : null}
                    </div>:null}
                    {this.state.selectedMovie?<MovieDetailModal movie={this.state.selectedMovie} hide={()=>{
                            this.setState({
                                showdropdown:false,
                                selectedMovie:undefined
                            })
                        }}/>
                    :null}
                    
                </div>
            </div>
        </div>
        <div className="row clearfix">
        {this.state.cardData.length?<div className="row clearfix">
            {this.state.cardData.map((movie, index)=>{
                return <Card movie={movie} key={index} onClick={()=>{
                        console.log("hello");
                        this.setState({
                            selectedMovie:movie
                        })}}/>
            })}
            </div>:null}
        </div>

        </div>
        }
    }
}
export default TopHeader