import React, { Component } from "react";
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matchcards.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click an image to begin!";

class App extends Component {
    
    // Setting this.state.matches to the matches json array
    state = {
        matches,
        correctGuesses,
        bestScore,
        clickMessage
    };

    setClicked = id => {

        // Make a copy of the state matches array to work with
        const matches = this.state.matches;

        // Filter for the clicked match
        const clickedMatch = matches.filter(match => match.id === id);

        // If the matched image's clicked value is already true, 
        // do the game over actions
        if (clickedMatch[0].clicked){

            console.log ("Correct Guesses: " + correctGuesses);
            console.log ("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "You guessed incorrectly!"

            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({ correctGuesses });
            this.setState({matches});

        // Otherwise, ff clicked = false
        } else {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // increment the appropriate counter
            correctGuesses++;
            
            clickMessage = "You guessed correctly!";

            if (correctGuesses > bestScore){
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            // Shuffle the array to be rendered in a random order
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        }
    };

    render() {
        return (
            <Wrapper>
                <Title>Clicky Game!</Title>
                {this.state.matches.map(match => (
                    <MatchCard
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}

                <div>
                <h2 className="scoreSummary">
                    Click on an image to earn points, but don't click on any of them more than once!
                </h2>
                
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreSummary">
                    Score: {this.state.correctGuesses} 
                </h3>
                
                <h3 className="scoreSummary">
                    Top Score: {this.state.bestScore} 
                </h3>
                </div>
                
            </Wrapper>


        );
    }
}

export default App;
