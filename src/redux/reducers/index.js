import {combineReducers} from 'redux';
import {PokemonReducer as pokemon} from './pokemon.reducer';


const rootReducer = combineReducers({
    pokemon
});

export default rootReducer;
