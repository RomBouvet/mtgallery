import './CardViewer.scss';
import {
    useParams
  } from "react-router-dom";

export default function CardViewer(){
    let { id } = useParams();
    return(
        <div class="cardViewerContainer">
            <div class="cardDetails">
                <div class="left">
                <img src={"https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid="+id+"&type=card"} alt=""/>
                <h1>Name of the card</h1>
                </div>
                <div class="right">
                    <div><b>Set : </b>AMK - Amonkhet</div>
                    <div><b>Type : </b>Legendary Creature - Dragon Avatar</div>
                    <div><b>Rarity : </b>Mythic</div>
                    <div><b>Manacost : </b>B R W D G 4</div>
                    <div><b>Converted Manacost : </b>9</div>
                    <div><b>Power : </b>10</div>
                    <div><b>Toughness : </b>10</div>
                    <div><b>Loyalty : </b>/</div>
                    <div>
                        <b>Ability : </b>
                        <i>Eminence</i> — Tant que L'Ur-Dragon est dans la zone de commandement ou sur le champ de bataille, les autres sorts de dragon que vous lancez coûtent de moins à lancer.<br/>
                        Vol<br/>
                        À chaque fois qu'au moins un dragon que vous contrôlez attaque, piochez autant cartes, puis vous pouvez mettre sur le champ de bataille une carte de permanent de votre main.
                    </div>
                    <div><b>Flavor : </b></div>
                    <div><b>Variation : </b></div>
                    <div><b>Artist : </b>Jim Murray</div>
                    <div><b>Color Identity : </b>Maelstrom</div>
                </div>
                
                <div class="cardRulings">
                    <h3>Rulings</h3>
                    <i>2017-08-25: </i>You draw one card for each Dragon you controlled that attacked, even if some of them left the battlefield before The Ur-Dragon’s triggered ability resolves.

                    <i>2017-08-25: </i>You may only put one permanent card from your hand onto the battlefield, no matter how many Dragons you attacked with or how many players they attacked.

                    <i>2017-08-25: </i>If a Dragon you control enters the battlefield attacking, it won’t cause The Ur-Dragon’s last ability to trigger.

                    <i>2017-08-25: </i>The Ur-Dragon’s triggered ability resolves after all attackers have been chosen. You can’t attack with some Dragons, put a creature card with haste onto the battlefield, and then attack with that creature. Similarly, any “whenever a creature attacks” abilities of the permanent card you put onto the battlefield won’t trigger.
                </div>

                <div class="legalities">
                    <h3>Legalities</h3>
                    <label for="modernLegality">Modern : <input name="modernLegality" type="checkbox"/></label>
                </div>
            </div>
        </div>
    );
}