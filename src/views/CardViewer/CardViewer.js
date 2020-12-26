import './CardViewer.scss';
import { Component } from 'react'
import 'mana-font';
import { withRouter } from "react-router-dom";
import Masonry from "react-responsive-masonry"

var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;
var htmlToReactParser = new HtmlToReactParser()

const addManaCost = (text) => {
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
					console.log("id - " + id);
					console.log(result[0])
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
		if (error) {
			console.log(error);
			return <div>Erreur : {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Chargement…</div>;
		} else {
			return (
				<div className="flex flex-col items-center w-full">
					<div className="flex flex-row flex-wrap items-start w-200">
						<img className="w-2/5 pr-4" src={"https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + card.id + "&type=card"} alt="" />
						<div className="w-3/5 border-2">
							<div className="flex justify-between border p-3">
								<div className="text-lg">{card.name}</div>
								<div dangerouslySetInnerHTML={{ __html: addManaCost(card.manaCost) }}></div>
							</div>
							<div className="border p-2">{card.type}</div>
							{card.power ? <div className="border p-2">{card.power} / {card.toughness}</div> : null}
							{card.loyalty ? <div className="border p-2">{card.loyalty}</div> : null}
							<div className="border p-2">
								<div dangerouslySetInnerHTML={{ __html: addManaCost(card.text) }}></div>
								{card.flavorText ? <div className="italic mt-4">{card.flavorText}</div> : ''}
							</div>
							<div className="border p-2">{'Illustrated by ' + card.artist}</div>
							<div className="border p-2">
								{
									// need to get all sets in api
									card.printings.map((e, i) => {
										return <div key={i} className="flex flex-row">{e.name}<img className="max-h-full" src={"https://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set="+ e.code +"&size=medium&rarity=C"} alt='&nbsp;'/>({e.releaseDate.substr(0,4)})</div>
									})
								}
							</div>
							<div className="border p-2">
								<dl className="flex flex-wrap">
									<div className="w-1/2 h-7 mb-1 flex flex-nowrap"><dd className={(card.legalities.standard ? "bg-green-600" : "bg-gray-400") + " w-20 text-white rounded mr-2 uppercase text-sm flex items-center justify-center"}>{(card.legalities.standard ? "Legal" : "Not Legal")}</dd><dt>Standard</dt></div>
									<div className="w-1/2 h-7 mb-1 flex flex-nowrap"><dd className={(card.legalities.brawl ? "bg-green-600" : "bg-gray-400") + " w-20 text-white rounded mr-2 uppercase text-sm flex items-center justify-center"}>{(card.legalities.brawl ? "Legal" : "Not Legal")}</dd><dt>Brawl</dt></div>
									<div className="w-1/2 h-7 mb-1 flex flex-nowrap"><dd className={(card.legalities.pioneer ? "bg-green-600" : "bg-gray-400") + " w-20 text-white rounded mr-2 uppercase text-sm flex items-center justify-center"}>{(card.legalities.pioneer ? "Legal" : "Not Legal")}</dd><dt>Pioneer</dt></div>
									<div className="w-1/2 h-7 mb-1 flex flex-nowrap"><dd className={(card.legalities.historic ? "bg-green-600" : "bg-gray-400") + " w-20 text-white rounded mr-2 uppercase text-sm flex items-center justify-center"}>{(card.legalities.historic ? "Legal" : "Not Legal")}</dd><dt>Historic</dt></div>
									<div className="w-1/2 h-7 mb-1 flex flex-nowrap"><dd className={(card.legalities.modern ? "bg-green-600" : "bg-gray-400") + " w-20 bg-gray-400 text-white rounded mr-2 uppercase text-sm flex items-center justify-center"}>{(card.legalities.modern ? "Legal" : "Not Legal")}</dd><dt>Modern</dt></div>
									<div className="w-1/2 h-7 mb-1 flex flex-nowrap"><dd className={(card.legalities.pauper ? "bg-green-600" : "bg-gray-400") + " w-20 bg-gray-400 text-white rounded mr-2 uppercase text-sm flex items-center justify-center"}>{(card.legalities.pauper ? "Legal" : "Not Legal")}</dd><dt>Pauper</dt></div>
									<div className="w-1/2 h-7 mb-1 flex flex-nowrap"><dd className={(card.legalities.legacy ? "bg-green-600" : "bg-gray-400") + " w-20 bg-green-600 text-white rounded mr-2 uppercase text-sm flex items-center justify-center"}>{(card.legalities.legacy ? "Legal" : "Not Legal")}</dd><dt>Legacy</dt></div>
									<div className="w-1/2 h-7 mb-1 flex flex-nowrap"><dd className={(card.legalities.penny ? "bg-green-600" : "bg-gray-400") + " w-20 bg-gray-400 text-white rounded mr-2 uppercase text-sm flex items-center justify-center"}>{(card.legalities.penny ? "Legal" : "Not Legal")}</dd><dt>Penny</dt></div>
									<div className="w-1/2 h-7 mb-1 flex flex-nowrap"><dd className={(card.legalities.vintage ? "bg-green-600" : "bg-gray-400") + " w-20 bg-green-600 text-white rounded mr-2 uppercase text-sm flex items-center justify-center"}>{(card.legalities.vintage ? "Legal" : "Not Legal")}</dd><dt>Vintage</dt></div>
									<div className="w-1/2 h-7 mb-1 flex flex-nowrap"><dd className={(card.legalities.commander ? "bg-green-600" : "bg-gray-400") + " w-20 bg-green-600 text-white rounded mr-2 uppercase text-sm flex items-center justify-center"}>{(card.legalities.commander ? "Legal" : "Not Legal")}</dd><dt>Commander</dt></div>
								</dl>
							</div>
						</div>
					</div>
					<div className="flex flex-col bg-red-100 w-full items-center p-4 m-4">
						<div className="flex flex-row flex-wrap w-200 text-justify">
							<h3 className="w-full text-lg mb-2">Notes and Rules Information for {card.name} : </h3>
							<Masonry columnsCount={2}>
								{
									card.rulings.map((e, i) => {
										return (
											<div key="i" className={(i % 2 ? "pl-4" : "pr-4") + " mb-4"} dangerouslySetInnerHTML={{ __html: addManaCost(e.text) + "<div class='text-sm italic text-gray-600 text-right'>" + e.date + "</div>" }}></div>
										)
									})
								}
							</Masonry>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default withRouter(CardViewer);