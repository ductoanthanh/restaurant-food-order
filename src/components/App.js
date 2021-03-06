import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    };

    componentDidMount() {
        const {params} = this.props.match;
        //first reinstate our localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    };

    componentWillUnmount() {
        base.removeBinding(this.ref);
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

    updateFish = (key, updatedFish) => {
        //take a copy of current state
        const fishes = {...this.state.fishes};
        //update state
        fishes[key] = updatedFish;
        //set to state
        this.setState({fishes});
    };

    deleteFish = (key) => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes});
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        })
    };

    addToOrder = (key) => {
        //take a copy of state
        const order = {...this.state.order};
        //either add to the order, or update the number in order
        order[key] = order[key] + 1 || 1;
        //set state to update
        this.setState({
            order: order
        });
    };

    removeFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key]; //not mirror from Firebase
        this.setState({order});
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                             <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
                <Inventory 
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes} 
                    storeId={this.props.match.params.storeId}
                    />
            </div>
        );
    }
}

export default App;