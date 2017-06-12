import React, { Component } from 'react';
//to help us right query in javascript since query is not javascript some kind of a compatibility layer
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/songsFetch';
import gql from 'graphql-tag';

class SongList extends Component {
    render() {
        if(this.props.data.loading ) {
            return (<div>Loading...</div>);
        }
        return (
            <div>
            <ul className="collection">{this.renderSongs()}</ul>
            <Link to = "/songs/new" className="btn-floating btn-large red right">
             <i className="material-icons">add</i>
            </Link>
            </div>);
    }

    renderSongs(){
        return this.props.data.songs.map(({id, title}) => {
            return (<li key= {id} className="collection-item"><Link to={`/songs/${id}`}>{title}</Link>
                     <i className= "material-icons" onClick = {()=> {this.onDeleteSong(id)}}>delete</i>
                     </li>);
        });
    }

    onDeleteSong(id){
        this.props.mutate({variables : {id},
                           refetchQueries : [{query}]});
    }
}

const mutation = gql`
mutation DeleteSong($id : ID){
  deleteSong(id : $id ){
    id
  }
}
`;

//This is used to so that graphql can call query multiple times first the mutation and then query...apollo is not set up to take it as two arugments would be been more easier
export default graphql(mutation)(
  graphql(query)(SongList)
  );


