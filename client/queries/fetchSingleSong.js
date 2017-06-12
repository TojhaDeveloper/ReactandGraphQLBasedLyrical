import gql from 'graphql-tag';

const  namedQuery = gql`
query getSongQueryIndex($id : ID!){
  song(id : $id) {
    id 
    title
    lyrics {
      id
      content
      likes
    }
  }
}`;

export default namedQuery;