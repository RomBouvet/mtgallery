import './Sets.css';
import { Component } from 'react';
import {
  Link
} from "react-router-dom";

export default class Sets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      sets: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/sets/", {
      // mode: 'no-cors',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            sets: result
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, sets } = this.state;
    if (error) {
      console.log(error);
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="w-full grid grid-cols-auto-fill-400 gap-4 pr-4 pl-4">
          {sets.map(set => (
            <Link to={"/sets/"+set.code} key={set.code} className="border-4 p-3 h-32 relative">
              <div className="text-2xl">{set.name} ({set.releaseDate.substr(0,4)})</div>
              <img className="absolute bottom-2 right-3 w-18" src={"https://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set="+ set.code +"&size=medium&rarity=C"} alt='&nbsp;'/>
            </Link>
          ))}
        </div>
      );
    }
  }
}