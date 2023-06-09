import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {  addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {

  const { basket, status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch()
 


  if (!basket) return <Typography variant="h3"> Korpa je prazna</Typography>
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Proizvod</TableCell>
              <TableCell align="right">Cena</TableCell>
              <TableCell align="center">Kolicina</TableCell>
              <TableCell align="right">Ukupno</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map(item => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center'>
                    <img src={item.imagePath} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{item.price} RSD</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={status ==='pending' + item.productId+'rem'}
                    color='error'
                    onClick={() => dispatch(removeBasketItemAsync({productId: item.productId,quantity: 1,name: 'rem'}))}>
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={status ==='pendingAddItem' + item.productId}
                    color='secondary'
                    onClick={() => dispatch(addBasketItemAsync({ productId: item.productId}))}>
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{item.price * item.quantity} RSD</TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={status ==='pending'+item.productId+'del'}
                    color='error'
                    onClick={() => dispatch(removeBasketItemAsync({productId: item.productId,quantity: item.quantity,name: 'del' }))}>
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid  container>
            <Grid item xs={6}/>
            <Grid item xs={6}>
              <BasketSummary/>
              <Button component={Link} to='/checkout' variant='contained' size='large' fullWidth>
                Kupi
              </Button>
            </Grid>
      </Grid>
    </>

  )
}
