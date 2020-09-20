import React from 'react';
import Header from './header';

export default function HowToPlay() {
    return (
        <div>
            <Header rules={true}/>
            <div className={'base centered'}>
                <h1>How to Play</h1>
                <br />
                <div>
                    <h3>In a Nutshell...</h3>
                    <p>
                        The deck has some Exploding Pandas. Players take turns
                        drawing cards until someone draws one.
                    </p>
                    <div className={"card-example"}>
                        <img src={require("../images/Bomb.png")} alt={"Exploding Panda"} />
                    </div>
                    <p>
                        If you draw an Exploding Panda, you're <b>DEAD</b>. The game continues until
                        one person is left, the winner.
                    </p>
                </div>
                <div>
                    <h3>But I Don't Want to Die!</h3>
                    <p>
                        Me neither. Every player starts with a Defuse card, and there are a few in the deck.
                        If you have a Defuse card, you can stop the Exploding Panda and secretly replace
                        it anywhere you want back within the deck.
                    </p>
                    <div className={"card-example"}>
                        <img src={require("../images/Defuse.png")} alt={"Defuse Card"} />
                    </div>
                    <p>
                        The game continues as normal until Exploding Pandas are drawn and players
                        without Defuse cards blow up.
                    </p>
                </div>
                <div>
                    <h3>It Sounds so Simple...</h3>
                    <p>
                        It is! Things get a little more complicated with all the different kinds of cards,
                        however. Some cards have instructions and allow you to do some special moves. For a full list
                        of all the cards, check out this <a href={"/cards"}>page</a>.
                    </p>
                    <div className={"card-row"}>
                        <img src={require("../images/Shuffle.png")} alt={"Shuffle Card"}/>
                        <img src={require("../images/Nope.png")} alt={"Nope Card"}/>
                        <img src={require("../images/Future.png")} alt={"Future Card"}/>
                        <img src={require("../images/Reverse.png")} alt={"Reverse Card"}/>
                        <img src={require("../images/Attack.png")} alt={"Attack Card"}/>
                    </div>
                    <p>
                        Some cards don't have any instructions on them, but they're still usable.
                    </p>
                    <div className={"card-row"}>
                        <img src={require("../images/Regular_Lonely.png")} alt={"Lonely Panda"}/>
                        <img src={require("../images/Regular_Cyborg.png")} alt={"Cyborg Panda"}/>
                        <img src={require("../images/Regular_Ghost.png")} alt={"Ghost Panda"}/>
                        <img src={require("../images/Regular_Pandacow.png")} alt={"Pandacow"}/>
                    </div>
                    <p>
                        If you play two of the same kind, you can steal a random card from another player.
                    </p>
                    <p>
                        If you play three of the same kind, you can name a specific card to take from someone.
                        If they don't have that card, though, you get nothing.
                    </p>
                </div>
                <div>
                    <h3>And That's It!</h3>
                    <p>
                        You can play as many cards as you want, but just remember, you have to end your turn either
                        by drawing a card or using a special effect.
                    </p>
                </div>
            </div>
        </div>
    )
}