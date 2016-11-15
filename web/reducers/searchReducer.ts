import {
    SEARCH_RESULTS,
    SearchAction
} from '../actions/search';

export default function reducer(state: Checkpoints.SearchResults[] = [], action: Redux.Action) {
    switch (action.type) {
        case SEARCH_RESULTS:
            return (action as SearchAction).results;
        default:
            return state;
    }
}