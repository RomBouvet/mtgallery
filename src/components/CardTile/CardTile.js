import {
    Link,
    useRouteMatch
  } from "react-router-dom";
import './CardTile.css'

function CardTile(props) {
    let { url } = useRouteMatch();
    return (
        <Link class="cardTile" to={`${url}/${props.id}`}>
            <img src={"https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid="+props.id+"&type=card"} alt={props.alt === undefined ? props.name : props.alt}/>
        </Link>
    );
}

export default CardTile;