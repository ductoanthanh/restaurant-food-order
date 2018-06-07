import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    addFish = (fish) => {
        //1. take a copy of existing state - mutation
        const fishes = {...this.state.fishes};
        //2. add new fish into that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //3. set new fishes obj to state
        this.setState({
            fishes: fishes
        });
    };

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        })
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} />)}
                    </ul>
                </div>
                <Order />
                <Inventory 
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes} />
            </div>
        );
    }
}

export default App;