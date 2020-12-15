import './CardViewer.scss';
import 'mana-font';
import {
    useParams
} from "react-router-dom";

export default function CardViewer() {
    let { id } = useParams();
    return (
        <div class="flex flex-col items-center w-full">
            <div class="flex flex-row flex-wrap items-start w-200">
                <img class="w-2/5 pr-4" src={"https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + id + "&type=card"} alt="" />
                <div class="w-3/5 border-2">
                    <div class="flex justify-between border p-3">
                        <div class="text-lg">The Ur-Dragon</div>
                        <div>
                            <i class="ms ms-cost ms-4 ms-shadow mr-1"></i>
                            <i class="ms ms-cost ms-w ms-shadow mr-1"></i>
                            <i class="ms ms-cost ms-u ms-shadow mr-1"></i>
                            <i class="ms ms-cost ms-b ms-shadow mr-1"></i>
                            <i class="ms ms-cost ms-r ms-shadow mr-1"></i>
                            <i class="ms ms-cost ms-g ms-shadow mr-1"></i>
                        </div>
                    </div>
                    <div class="border p-2">Legendary Creature - Dragon Avatar</div>
                    <div class="border p-2">10 / 10</div>
                    <div class="border p-2">
                        <div class="mb-4">
                            <i>Eminence</i> — Tant que L'Ur-Dragon est dans la zone de commandement ou sur le champ de bataille, les autres sorts de dragon que vous lancez coûtent de moins à lancer.<br />
                            Vol<br />
                            À chaque fois qu'au moins un dragon que vous contrôlez attaque, piochez autant cartes, puis vous pouvez mettre sur le champ de bataille une carte de permanent de votre main.
                        </div>
                        <div class="italic">
                            Flavor Text
                        </div>

                    </div>
                    <div class="border p-2">
                        Illustrated by Jim Murray
                    </div>
                    <div class="border p-2">
                        <div>Ultimate Masters (2015)<i class="ml-2 ms ms-chaos"></i></div>
                        <div>Inistrad (2012)<i class="ml-2 ms ms-guild-boros"></i></div>
                    </div>
                    <div class="border p-2">
                        <dl class="flex flex-wrap">
                            <div class="w-1/2 h-7 mb-1 flex flex-nowrap"><dd class="w-20 bg-gray-400 text-white rounded mr-2 uppercase text-sm flex items-center justify-center">Not Legal</dd><dt>Standard</dt></div>
                            <div class="w-1/2 h-7 mb-1 flex flex-nowrap"><dd class="w-20 bg-gray-400 text-white rounded mr-2 uppercase text-sm flex items-center justify-center">Not Legal</dd><dt>Brawl</dt></div>
                            <div class="w-1/2 h-7 mb-1 flex flex-nowrap"><dd class="w-20 bg-gray-400 text-white rounded mr-2 uppercase text-sm flex items-center justify-center">Not Legal</dd><dt>Pioneer</dt></div>
                            <div class="w-1/2 h-7 mb-1 flex flex-nowrap"><dd class="w-20 bg-gray-400 text-white rounded mr-2 uppercase text-sm flex items-center justify-center">Not Legal</dd><dt>Historic</dt></div>
                            <div class="w-1/2 h-7 mb-1 flex flex-nowrap"><dd class="w-20 bg-gray-400 text-white rounded mr-2 uppercase text-sm flex items-center justify-center">Not Legal</dd><dt>Modern</dt></div>
                            <div class="w-1/2 h-7 mb-1 flex flex-nowrap"><dd class="w-20 bg-gray-400 text-white rounded mr-2 uppercase text-sm flex items-center justify-center">Not Legal</dd><dt>Pauper</dt></div>
                            <div class="w-1/2 h-7 mb-1 flex flex-nowrap"><dd class="w-20 bg-green-600 text-white rounded mr-2 uppercase text-sm flex items-center justify-center">Legal</dd><dt>Legacy</dt></div>
                            <div class="w-1/2 h-7 mb-1 flex flex-nowrap"><dd class="w-20 bg-gray-400 text-white rounded mr-2 uppercase text-sm flex items-center justify-center">Not Legal</dd><dt>Penny</dt></div>
                            <div class="w-1/2 h-7 mb-1 flex flex-nowrap"><dd class="w-20 bg-green-600 text-white rounded mr-2 uppercase text-sm flex items-center justify-center">Legal</dd><dt>Vintage</dt></div>
                            <div class="w-1/2 h-7 mb-1 flex flex-nowrap"><dd class="w-20 bg-green-600 text-white rounded mr-2 uppercase text-sm flex items-center justify-center">Legal</dd><dt>Commander</dt></div>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="flex flex-col bg-red-100 w-full items-center p-4 m-4">
                <div class="flex flex-row flex-wrap w-200 text-justify">
                    <h3 class="w-full text-lg mb-2">Notes and Rules Information for The Ur-Dragon: </h3>
                    <div class="w-1/2 pr-3 mb-2">
                        You draw one card for each Dragon you controlled that attacked, even if some of them left the battlefield before The Ur-Dragon’s triggered ability resolves.
                        <div class="text-sm italic text-gray-600">(25/08/2017)</div>
                    </div>
                    <div class="w-1/2 pl-3 mb-2">
                        If a Dragon you control enters the battlefield attacking, it won’t cause The Ur-Dragon’s last ability to trigger.
                        <div class="text-sm italic text-gray-600">(25/08/2017)</div>
                    </div>
                    <div class="w-1/2 pr-3 mb-2">
                        You may only put one permanent card from your hand onto the battlefield, no matter how many Dragons you attacked with or how many players they attacked.
                        <div class="text-sm italic text-gray-600">(25/08/2017)</div>
                    </div>

                    <div class="w-1/2 pl-3 mb-2">
                        The Ur-Dragon’s triggered ability resolves after all attackers have been chosen. You can’t attack with some Dragons, put a creature card with haste onto the battlefield, and then attack with that creature. Similarly, any “whenever a creature attacks” abilities of the permanent card you put onto the battlefield won’t trigger.
                        <div class="text-sm italic text-gray-600">(25/08/2017)</div>
                    </div>
                </div>
            </div>
        </div>
    );
}