import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectHotel } from '../../state/hotel/hotelSlice';
import { AppDispatch, RootState } from '../../state/store';
import { IApiHotel } from '../../api/IApiHotel';
import { ISettings, setCurrency } from '../../state/settings/settingsSlice';

function ResponsiveAppBar() {

  const hotel = useSelector<RootState>(state => selectHotel(state)) as IApiHotel
  const settings = useSelector<RootState>(state => state.settings) as ISettings
  const dispatch = useDispatch<AppDispatch>()

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>

          <Typography
            variant="h5"

            component="a"
            href="https://lyngen-north.com"
            sx={{
              mr: 2,
              display: { xs: 'inline-block' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Lyngen North
          </Typography>

          <Box sx={{ minWidth: 140 }}>
            <FormControl>
              <InputLabel id="select-label-currency">Currency</InputLabel>
              <Select
                labelId="select-label-currency"
                label="Currency"
                value={settings.currencyCode}
                onChange={(event) => dispatch(setCurrency(event.target.value))}
              >
                {hotel.Currencies.map((currency, index) => {
                  return (<MenuItem key={index} value={currency.Code}>{currency.Code}</MenuItem>)
                })
                }
              </Select>
            </FormControl>
          </Box>
        </Toolbar>

      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;