import { useParams } from 'react-router-dom'

export default function Room() {

    const params = useParams()
    return(
        <h2>Room id: {params.roomId}</h2>
    );
}