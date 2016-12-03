import React, {Component} from 'react';
import { GoogleMap, GoogleMapLoader, Marker, InfoWindow, OverlayView} from "react-google-maps";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchMapInfo } from '../actions/index';
import { pokemonInfo } from '../data/pokemonInfo';
import { PokemonMarker } from './pokemon_marker';
import { pokemonsLocation as pokemonFakeList } from '../data/samplePokemonData';

const geolocation = (
    navigator.geolocation || {
        getCurrentPosition: (success, failure) => {
            failure(`Your browser doesn't support geolocation.`);
        },
    }
);

const defaultCenter = { lat: 25.060108, lng: 121.542267};
const defaultZoom = 15;
const fakeData = 1;

class PkMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locationCenter: defaultCenter,
            center: defaultCenter,
            zoom: defaultZoom,
            now: new Date(),
            showInfo: false
           
        };

    }
    componentWillMount() {

        const { locationCenter ,zoom } = this.state;

         this.props.fetchMapInfo({
            init: '0',
            center: locationCenter,
            zoom: zoom,
        });
    }

    componentDidMount() {
        const { zoom } = this.state;

        geolocation.getCurrentPosition((position) => {
            this.setState({
                locationCenter: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
            });

            this.props.fetchMapInfo({
                init: '0',
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
                zoom: zoom,
            });
        });

        //enable pokemon timer
        setInterval(this.refreshTimer.bind(this), 1000);
    }

    refreshTimer() {
        if(fakeData == 1){
             this.setState({ now: new Date('Wed Aug 31 2016 14:25:23') });
        }else{
            this.setState({ now: new Date() });
        }
    }

    calculateLeftTime(nowTime,createdTime){
        const poekmonExistTime = 15 * 60000; //15 minutes
        let timeLeftText = "";

        let timeLeft = new Date(createdTime * 1000 + poekmonExistTime) - nowTime;
        if (timeLeft < 0) {
            timeLeftText = 'bye!!!'
        } else {
            let minutes = parseInt((timeLeft) / (1000 * 60)) >= 10 ? parseInt((timeLeft) / (1000 * 60)) : '0' + parseInt((timeLeft) / (1000 * 60));
            let seconds = parseInt((timeLeft - minutes * 60 * 1000) / (1000)) >= 10 ? parseInt((timeLeft - minutes * 60 * 1000) / (1000)) : '0' + parseInt((timeLeft - minutes * 60 * 1000) / (1000));
            timeLeftText = minutes + ":" + seconds
        }

        return timeLeftText ;
    }

    renderPokemonTimer(data) {
        let markerItem;

        if (data) {

            let nowTime = this.state.now;

            markerItem = data.map((marker, index) => {
                //just show (Poke Radar Prediction)
                if (marker.userId != "13661365"){
                    return;
                }

                let timeLeftText = this.calculateLeftTime(nowTime,marker.created);

                const pokemonState = {
                    position: {
                        lat: marker.latitude,
                        lng: marker.longitude,
                    },
                    created: marker.created,
                    pokemonId: marker.pokemonId,
                    trainerName: marker.trainerName,
                    downvotes: marker.downvotes,
                    upvotes: marker.upvotes,
                    key: `pokemon_${index}`,
                    mapPaneName: OverlayView.OVERLAY_MOUSE_TARGET,
                    getPixelPositionOffset: this.getPixelPositionOffset,
                    imgUrl: `../../image/pokemon/${marker.pokemonId}.jpg`
                }
                
                const timerState = {
                    position: {
                        lat: marker.latitude,
                        lng: marker.longitude,
                    },
                    key: `pokemon_${index}`,
                    mapPaneName: OverlayView.OVERLAY_MOUSE_TARGET,
                    getPixelPositionOffset: this.getPixelPositionOffset
                };


                let imgUrl = `../../image/pokemon/${marker.pokemonId}.jpg`;
                return (
                    <OverlayView {...timerState} >
                        <div className="pokemon" onClick={this.handlePokemonClick.bind(this, pokemonState) } >
                            <img src={imgUrl} height="70" width="70" />
                            <div className="poke-timer">{timeLeftText}</div>

                        </div>
                    </OverlayView>
                );
            })
        }
        return markerItem;


    }

    //Toggle to 'true' to show InfoWindow and re-renders component
    handlePokemonClick(pokemon) {
        //this.props.fetchPokemonInfo({ showInfo: true, pokemon });
        this.setState({ showInfo: true, pokemon });
    }

    handleInfoWindowClose(){
        this.setState({ showInfo: false});
    }

    renderInfoWindow(data) {
       const { showInfo, pokemon } = this.state;

        if (showInfo) {
            let options = {
                year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            };

            let created = new Date(pokemon.created * 1000).toLocaleDateString("ja-JP",options);
            let pokemonName = pokemonInfo[pokemon.pokemonId] ? pokemonInfo[pokemon.pokemonId].name : pokemon.pokemonId;
           
            return (
                <InfoWindow key="info" position={pokemon.position} 
                    onCloseclick={this.handleInfoWindowClose.bind(this)}
                >
                    <div>
                        <div>編號: {pokemon.pokemonId}</div>
                        <div>名稱: {pokemonName}</div>
                        <div>發現訓練師: {pokemon.trainerName}</div>
                        <div>發現時間: {created} </div>

                    </div>
                </InfoWindow>
            )
        }
    }

   

    refreshMap() {
        const { center, zoom ,rangePostion} = this.state;
        if(fakeData != 1){
            this.props.fetchMapInfo({
                init: "1",
                center: center,
                zoom: zoom,
                rangePostion: rangePostion
            });
        }
    }

    getPixelPositionOffset(width, height) {
        return { x: -(width / 2), y: -(height / 2) };
    }

    handleChanged() {
        const zoom = this._googleMapComponent.getZoom();
        const lat = this._googleMapComponent.getCenter().lat();
        const lng = this._googleMapComponent.getCenter().lng();

        const rangePostion = {
            minLatitude: this._googleMapComponent.getBounds().f.f,
            maxLatitude: this._googleMapComponent.getBounds().f.b,
            minLongitude:  this._googleMapComponent.getBounds().b.b,
            maxLongitude:  this._googleMapComponent.getBounds().b.f
        }

        this.setState({
            center: { lat: lat, lng: lng },
            zoom: zoom,
            rangePostion: rangePostion
        });

        this.refreshMap();
    }

   

    render() {
        const { locationCenter, content, center,zoom ,showInfo} = this.state;

        let location = [];

        let pokeList = {};

        if (locationCenter) {
            location = location.concat([
                (<Marker key="location" position={locationCenter} />)
            ]);
        }
        if(fakeData == 1){
            pokeList = pokemonFakeList.data;
        }else{
            pokeList = this.props.pokemonList.list;
        }

        return (
            <div>
                <GoogleMapLoader
                    containerElement={<div style={{ width: '100%', height: '800' }}/>}
                    googleMapElement={
                        <GoogleMap
                            options = {{
                                mapTypeControl: false,
                                streetViewControl: false,
                                clickableLabels:false,
                                clickableIcons: false
                            }}
                           
                            ref={(map) => (this._googleMapComponent = map) }
                            defaultCenter={locationCenter} defaultZoom={zoom}
                            center = {center}
                            onDragend = {  this.handleChanged.bind(this) }
                            onZoomChanged={this.handleChanged.bind(this) }
                            
                        >

                            {location}
                            
                            {showInfo ? this.renderInfoWindow(showInfo) : ''}
                            { this.renderPokemonTimer(pokeList) }
                        </GoogleMap>

                    }
                    />
            </div>
        );
    }
}

function mapStatToProp({pokemonList, mapInfo, windowPokemonInfo}) {
    return {
        pokemonList: pokemonList,
        mapInfo: mapInfo
    };
}

function mapDispatchProps(dispatch) {
    return bindActionCreators({ fetchMapInfo: fetchMapInfo }, dispatch);
}

export default connect(mapStatToProp, mapDispatchProps)(PkMap);