import React from 'react';
import Header from './header';

export default function Cards() {

    return (
        <div>
            <Header cards={true}/>
            <div className={"base"}>
                <div>
                    <br />
                    <h1 className={"centered"}>Regular Cards</h1>
                    <div className={"card-row"}>
                        <img src={require("../images/Regular_Lonely.png")} alt={"Lonely Panda"}/>
                        <img src={require("../images/Regular_Cyborg.png")} alt={"Cyborg Panda"}/>
                        <img src={require("../images/Regular_Ghost.png")} alt={"Ghost Panda"}/>
                        <img src={require("../images/Regular_Pandacow.png")} alt={"Pandacow"}/>
                    </div>
                    <div className={"centered"}>
                        <p>
                            If you have two of the same card, you can play them to steal a random card from anyone.
                        </p>
                        <p>
                            If you have three of the same card, you can play them to steal a specified card from anyone.
                            However, if they don't have the card you want, you get... nothing!
                        </p>
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <h1 className={'centered'}>Special Cards</h1>
                    <div className={"row"}>
                        <div className={"card-image"}>
                            <img src={require("../images/Attack.png")} alt={"Attack Card"}/>
                        </div>
                        <div className={"caption"}>
                            This card forces a player of choice to take two turns. Note that
                            the target can play whatever cards they want so long as they take two turns.
                            If someone is attacked but plays an attack card in response, the number of
                            turns to take will double.
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"caption right"}>
                            This card prevents an Exploding Panda from detonating. It allows you to
                            place the Exploding Panda back anywhere in the deck and others won't know where.
                            Use it to ruin your friendships!
                        </div>
                        <div className={"card-image"}>
                            <img src={require("../images/Defuse.png")} alt={"Defuse Card"} />
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"card-image"}>
                            <img src={require("../images/Bomb.png")} alt={"Exploding Panda"} />
                        </div>
                        <div className={"caption"}>
                            This card kills you. Not literally, but figuratively. If you don't have a
                            Defuse card, you're out of the game.
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"caption right"}>
                            This card allows you to view the top three cards on the deck. It does not
                            give you psychic powers in real life.
                        </div>
                        <div className={"card-image"}>
                            <img src={require("../images/Future.png")} alt={"Future Card"}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"card-image"}>
                            <img src={require("../images/Nope.png")} alt={"Nope Card"}/>
                        </div>
                        <div className={"caption"}>
                            This card stops any opponent's action that targets you. It can also be used
                            to counter an opponent's Nope card.
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"caption right"}>
                            This cards ends your turn while reversing the turn order. Someone tried to make you
                            draw an Exploding Panda? REVERSE!
                        </div>
                        <div className={"card-image"}>
                            <img src={require("../images/Reverse.png")} alt={"Reverse Card"}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"card-image"}>
                            <img src={require("../images/Shuffle.png")} alt={"Shuffle Card"}/>
                        </div>
                        <div className={"caption"}>
                            Start uncontrollably dancing and randomly shuffle the deck.
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"caption right"}>
                            End your turn. Just end it.
                        </div>
                        <div className={"card-image"}>
                            <img src={require("../images/Skip.png")} alt={"Reverse Card"}/>
                        </div>
                    </div>

                    </div>
            </div>
        </div>
    )
}