import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

const Query = gql`{
  products {
    nodes {
      id
      productId
      name
      type
      price
      variations {
        nodes {
          id
          variationId
        }
      }
    }
  }
}`
const Login = (params)=>{
  console.log("het");
  const products = graphql(Query)(props => {
    const { error, dogs } = props.data;
    console.log(props.data);
    if (error) {
      return <Text>{error}</Text>;
    }
    if (dogs) {
      return <Text>{dogs[0].name}</Text>;
    }

    return <Text>Loading...</Text>;
  });
}

export default Login
