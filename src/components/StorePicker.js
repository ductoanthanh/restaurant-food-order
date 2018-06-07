import React, {Component} from 'react';
import {getFunName} from '../helpers';

class StorePicker extends Component {
    myInput = React.createRef();

    goToStore = (event) => {
        //stop the form from submitting
        event.preventDefault();
        //get the text from input
        const storeName = this.myInput.value.value;
        //change the page to /store/myInput
        this.props.history.push(`/store/${storeName}`);
    };
    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please enter a store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={this.myInput}/>
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}

export default StorePicker;