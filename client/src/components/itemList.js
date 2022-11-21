import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import Item from './item';
import Head from './head';
import { useQuery, gql} from '@apollo/client';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/* const Title = styled(Paper)({
    textAlign: 'center',
    color: blue,
    height: 60,
    lineHeight: '60px',
  });
 */


const GET_BOOKS = gql`
    query BooksQuery  {
  books {
    code
    success
    message
    data {
      id
      isbn
      title
      price
      pages
      orders {
        id
        books {
          title
        }
        orderBy {
          email
        }
      }
    }
    count
  }
}
`;

function ItemList () {
    const { loading, error, data } = useQuery(GET_BOOKS);
    let books = null
    if(loading) return <p>loading...</p>
    if(error) return <p>Error: {error.message}</p>
  /*   if(data){
        books = data.books
        console.log(books)
    } */
    return (
        <Container sx={{ py: 5 }} maxWidth="lg">
            {console.log(data)}
          <Head />
             <Container sx={{ py: 5 }} maxWidth="lg">
                <Grid container spacing={4}>
                    {data.books.data.map((book) => (
                        
                        <Item key={book.id} data={book}/>
                    ))}
                </Grid>
            </Container>
            <Container sx={{ py: 5,  display: 'flex', justifyContent: 'center'}} maxWidth="lg">
                <Pagination count={10} shape="rounded" />
            </Container>
        </Container>

    )
}

export default ItemList;