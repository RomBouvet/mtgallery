import {
    Link
  } from "react-router-dom";
import './CardTile.css'

function CardTile(props) {
    return (
        <Link className="cardTile" to={"/cards/"+props.id}>
            <img src={"https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid="+props.id+"&type=card"} alt={props.alt === undefined ? props.name : props.alt}/>
        </Link>
    );
}

export default CardTile;