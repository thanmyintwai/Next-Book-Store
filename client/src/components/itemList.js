import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import Item from './item';
import Head from './head';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/* const Title = styled(Paper)({
    textAlign: 'center',
    color: blue,
    height: 60,
    lineHeight: '60px',
  });
 */

function ItemList () {

    return (
        <Container sx={{ py: 5 }} maxWidth="lg">
          <Head />
             <Container sx={{ py: 5 }} maxWidth="lg">
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        
                        <Item key={card} data={card}/>
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