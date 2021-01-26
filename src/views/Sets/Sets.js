import './Sets.scss';
import { Component } from 'react';

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
          console.log(result)
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
        <div id="sets">
          <div className="container grey-bg">
            <div className="header">
              <label htmlFor="sort-select">Sorted by : </label>
              <select name="sort-elt">
                <option>Name</option>
                <option>Release date</option>
                <option>Number of cards</option>
              </select>
              <label htmlFor="format-select">Format : </label>
              <select name="format-select">
                <option>Standard</option>
                <option>EDH</option>
                <option>Brawl</option>
              </select>
            </div>
          </div>
          <div className="container">
            <table className="setsTable">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Cards</td>
                  <td>Date</td>
                  <td>Languages</td>
                </tr>
              </thead>
              <tbody>
                {
                  sets.map( set => (
                    <tr key={set.name}>
                      <td>
                        <span className="setName">
                          <img src={"https://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=" + set.code + "&size=medium&rarity=C"} alt="" />
                          <div>{set.name}</div>
                          <div>{set.code}</div>
                        </span>
                      </td>
                      <td>{set.totalSetSize}</td>
                      <td>{set.releaseDate}</td>
                      <td>
                        <span className="languages">
                          <div>EN</div>
                          <div>FR</div>
                          <div>ES</div>
                        </span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>

      );
    }
  }
}