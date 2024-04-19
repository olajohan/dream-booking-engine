import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CheckMarkIcon from '@mui/icons-material/Check'
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'


export interface RoomCategoryCardProps {
  name: string;
  id: string;
  text: string;
  image: string;
}

export default function RoomCategoryCard(props: RoomCategoryCardProps) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={props.image}
          alt={props.name}
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'none' }}>
        <Button variant='outlined' color="primary" startIcon={<CheckMarkIcon />}>
          BOOK NOW
        </Button>
        <Link to={'/rooms/' + props.id}>
          <Button variant="outlined" color="error" startIcon={<EventBusyIcon />}>
            Not available for selected dates. See availability
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}