import './CardViewer.scss';
import 'mana-font';
import { Component } from 'react'
import { withRouter } from "react-router-dom";
import Masonry from "react-responsive-masonry"

var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;
var htmlToReactParser = new HtmlToReactParser()

const addManaCost = (text) => {
	if (!text)
		return '';
	return (
		ReactDOMServer.renderToStaticMarkup(
			htmlToReactParser.parse(
				text.replaceAll(/\{([WRGUB]|[0-9]*)\}/g, (str) => {
					if (/\d/.test(str)) {
						return "<i className='ms-" + str.match(/[\d]/g) + " ms ms-cost ms-shadow mr-1'></i>";
					} else {
						return "<i className='ms-" + (str.match(/[A-Z]/g)[0]).toLowerCase() + " ms ms-cost ms-shadow mr-1'></i>";
					}
				})
			)
		)
	)
};

class CardViewer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			card: {}
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		fetch("http://localhost:8080/cards/" + id, {
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
						card: result[0]
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
		const { error, isLoaded, card } = this.state;
		console.log(card);
		if (error) {
			console.log(error);
			return <div>Erreur : {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Chargement…</div>;
		} else {
			return (
				<div id="cardViewer">
					<div className="container">
						<div className="cardProfile">
							<img src={"https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + card.id + "&type=card"} alt="" />
							<div className="cardDescription">
								<div className="row">
									<h2>{card.name}</h2>
									<div dangerouslySetInnerHTML={{ __html: addManaCost(card.manaCost) }}></div>
								</div>
								<div>{card.type}</div>
								{card.power ? <div>{card.power} / {card.toughness}</div> : null}
								{card.loyalty ? <div>{card.loyalty}</div> : null}
								<div className="texts">
									{card.text ? <div dangerouslySetInnerHTML={{ __html: addManaCost(card.text) }}></div> : ''}
									{card.flavorText ? <div className="flavor">{card.flavorText}</div> : ''}
								</div>
								<div>{'Illustrated by ' + card.artist}</div>
								<div className="printings">
									{
										// need to get all sets in api
										card.printings.map((e, i) => {
											return <div key={i} className="row">{e.name}<img className="max-h-full" src={"https://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=" + e.code + "&size=medium&rarity=C"} alt='&nbsp;' />({e.releaseDate.substr(0, 4)})</div>
										})
									}
								</div>
								<div className="legalities">
									<dl>
										<div><dd className={(card.legalities.standard ? "legal" : "illegal")}>{(card.legalities.standard ? "Legal" : "Not Legal")}</dd><dt>Standard</dt></div>
										<div><dd className={(card.legalities.brawl ? "legal" : "illegal")}>{(card.legalities.brawl ? "Legal" : "Not Legal")}</dd><dt>Brawl</dt></div>
										<div><dd className={(card.legalities.pioneer ? "legal" : "illegal")}>{(card.legalities.pioneer ? "Legal" : "Not Legal")}</dd><dt>Pioneer</dt></div>
										<div><dd className={(card.legalities.historic ? "legal" : "illegal")}>{(card.legalities.historic ? "Legal" : "Not Legal")}</dd><dt>Historic</dt></div>
										<div><dd className={(card.legalities.modern ? "legal" : "illegal")}>{(card.legalities.modern ? "Legal" : "Not Legal")}</dd><dt>Modern</dt></div>
										<div><dd className={(card.legalities.pauper ? "legal" : "illegal")}>{(card.legalities.pauper ? "Legal" : "Not Legal")}</dd><dt>Pauper</dt></div>
										<div><dd className={(card.legalities.legacy ? "legal" : "illegal")}>{(card.legalities.legacy ? "Legal" : "Not Legal")}</dd><dt>Legacy</dt></div>
										<div><dd className={(card.legalities.penny ? "legal" : "illegal")}>{(card.legalities.penny ? "Legal" : "Not Legal")}</dd><dt>Penny</dt></div>
										<div><dd className={(card.legalities.vintage ? "legal" : "illegal")}>{(card.legalities.vintage ? "Legal" : "Not Legal")}</dd><dt>Vintage</dt></div>
										<div><dd className={(card.legalities.commander ? "legal" : "illegal")}>{(card.legalities.commander ? "Legal" : "Not Legal")}</dd><dt>Commander</dt></div>
									</dl>
								</div>
							</div>
						</div>
					</div>

					<div className="container grey-bg rulings">
						{
							(card.rulings.length > 0 ?
								(<div>
										<h3>Notes and Rules Information for {card.name} : </h3>
										<Masonry columnsCount={2}>
											{
												card.rulings.map((e, i) => {
													return (
														<div className={ i%2 ? "right" : "left" } key="i" dangerouslySetInnerHTML={{ __html: addManaCost(e.text) + "<div class='date'>" + e.date + "</div>" }}></div>
													)
												})
											}
										</Masonry>
								</div>) : ''
							)
						}
					</div>
				</div>
			);
		}
	}
}

export default withRouter(CardViewer);