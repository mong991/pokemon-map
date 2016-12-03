import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPockmonList } from '../actions/index';

class PokemonList extends Component {
	constructor(props){
		super(props);
        setInterval(this.refreshMap.bind(this), 20*1000);
	}

    refreshMap(){
       if(this.props.selectPockmon && this.props.mapInfo){
            this.props.fetchPockmonList(this.props.selectPockmon,this.props.mapInfo);
        }
    }

	render(){

        if(this.props.selectPockmon && this.props.mapInfo){
            this.props.fetchPockmonList(this.props.selectPockmon,this.props.mapInfo);
        }
        return(<div />);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({fetchPockmonList}, dispatch);
}

function mapStateToProps({ selectPockmon, mapInfo }) {
    return { selectPockmon ,mapInfo};
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
