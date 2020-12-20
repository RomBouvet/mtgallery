import { Component } from 'react';
import CardTile from '../../components/CardTile/CardTile';
import './Cards.css';

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      cards: []
    };
  }

  componentDidMount() {
    console.log("FETCHING")
    fetch("http://localhost:8080/cards/", {
      // mode: 'no-cors',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log("I AM HERE")
          this.setState({
            isLoaded: true,
            cards: result
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
    const { error, isLoaded, cards } = this.state;
    if (error) {
      console.log(error);
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="w-full grid grid-cols-auto-fill-200 gap-4 pr-4 pl-4">
          {cards.map(card => (
            <CardTile id={card.id} />
          ))}
        </div>
      );
    }
  }
}