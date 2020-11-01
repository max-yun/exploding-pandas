import React from 'react';
import Header from './header';

export default function About() {
    return (
        <div>
            <Header about={true}/>
            <div className={'base'}>
                <div>
                    <h1>About</h1>
                    <p>
                        Exploding Pandas was a project started in 2020 to give Max Yun something to do during quarantine.
                        It's modeled after the popular card game
                        <a href={"https://explodingkittens.com/"} target={"_blank"}
                           rel={"noopener noreferrer"}>
                            Exploding Kittens
                        </a>, but with fewer cats and more... pandas. Play a game now with up to 4 players!
                    </p>
                    <p>
                        Have a question or comment? Feel free
                        to reach out at <a href={"mailto:myun97@gmail.com"}>myun97@gmail.com.</a>
                    </p>
                </div>

                <br />

                <div>
                    <h1>Q&A</h1>
                    <br />
                    <h5>How many players can play?</h5>
                    <p>
                        Currently the game supports 2-4 players.
                    </p>
                    <h5>Do you take suggestions?</h5>
                    <p>
                        Yes! I'd love to hear ideas on new mechanics, cards, or improvements.
                    </p>
                    <h5>Who made this game?</h5>
                    <p>This game and its artwork were created and designed by
                        <a href={"https://www.maxyun.me"} target={"_blank"} rel={"noopener noreferrer"}>Max Yun</a>.
                        Frances Yun helped with some of the UI while Hermes Ip came up with the initial idea for putting such a game online.
                        The gameplay is based off of Exploding Kittens by Matthew Inman and Elan Lee.
                    </p>

                </div>
            </div>
        </div>
    )
}