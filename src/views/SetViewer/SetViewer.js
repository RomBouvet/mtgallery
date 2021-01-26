import { Component } from 'react';
import CardTile from '../../components/CardTile/CardTile';
import './SetViewer.scss';

export default class SetViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      sets: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch("http://localhost:8080/sets/" + id, {
      // mode: 'no-cors',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result[0])
          this.setState({
            isLoaded: true,
            set: result[0]
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
    const { error, isLoaded, set } = this.state;
    if (error) {
      console.log(error);
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div id="setViewer">
          <div className="container grey-bg">
            <div className="header">
              <div className="setInfos">
                <img src={"https://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=" + set.code + "&size=large&rarity=C"} alt="" />
                <div>
                  <div>{set.name} ({set.code})</div>
                  <div>{set.totalSetSize} cards - Released {set.releaseDate}</div>
                </div>
              </div>
              <div>
                <label htmlFor="sort-select">Sorted by : </label>
                <select name="sort-elt">
                  <option>Name</option>
                  <option>Release date</option>
                  <option>Number of cards</option>
                </select>
                <label htmlFor="order-select">Format : </label>
                <select name="order-select">
                  <option>ASC</option>
                  <option>DESC</option>
                </select>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="cardList">
              {set.cards.map(card => (
                <CardTile key={card.identifiers.multiverseId} id={card.identifiers.multiverseId} alt={card.name} />
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}