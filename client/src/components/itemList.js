import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import Item from './item';
import Head from './head';
import { useQuery, gql} from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateSearch, updateBooks, updateCount } from '../states/booksSlice';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];



/* const Title = styled(Paper)({
    textAlign: 'center',
    color: blue,
    height: 60,
    lineHeight: '60px',
  });
 */


const GET_BOOKS = gql`
    query BooksQuery($orderBy: BooksOrderByInput, $filter: String, $skip: Int, $take: Int)  {
  books (orderBy: $orderBy, filter: $filter, skip: $skip, take: $take) {
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

    const { loading, error, data, refetch } = useQuery(GET_BOOKS,{
      variables: {
        take: 6
      }
    });
    const searched = useSelector(state=>state.books.searched)
    const [pages, setPages] = useState(1)
  

    useEffect(()=>{
        refetch({ 
          filter: searched
        })
    }, [searched])

    useEffect(()=>{
      const parPag =5;
      if(data){
        const totalItem = data.books.count 
        let pagNums = Math.ceil(totalItem / parPag)
        setPages(pagNums)

      }
    },[data])

    let books = null
    if(loading) return <p>loading...</p>
    if(error) return <p>Error: {error.message}</p>
  

    const pageChange= (event, page)=>{
      let skipped = (page - 1) * 6
      refetch({ 
        skip: skipped
      })
    }

    const afterDeleteFetch = () =>{
      console.log('i m fetched')
      refetch({ 
        filter: searched
      })
    }

    return (
        <Container sx={{ py: 5 }} maxWidth="lg">
            {console.log(data)}
          <Head />
             <Container sx={{ py: 5 }} maxWidth="lg">
                <Grid container spacing={4}>
                    {data.books.data.map((book) => (
                        
                        <Item key={book.id} book={book} afterDelete={afterDeleteFetch}/>
                    ))}
                </Grid>
            </Container>
            <Container sx={{ py: 5,  display: 'flex', justifyContent: 'center'}} maxWidth="lg">
                <Pagination count={pages} shape="rounded" onChange={pageChange}/>
            </Container>
        </Container>

    )
}

export default ItemList;