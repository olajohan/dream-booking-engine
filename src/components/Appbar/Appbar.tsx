import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function ResponsiveAppBar() {
 
  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>          

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="https://lyngen-north.com"
            sx={{
              mr: 2,
              display: { xs: 'flex'},
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;