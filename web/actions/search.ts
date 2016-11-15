import { Action } from 'redux';

import * as search from '../lib/api/search';

// Action Types
export const SEARCH_RESULTS = "SEARCH_RESULTS"

// Actions
export interface SearchAction extends Action {
    results: SearchResults[];
}

// Action creators
// ?? do i need this
function updateResults(results: SearchResults[]) {
    return {
        type: SEARCH_RESULTS,
        results
    };
}

export function searchGeneral(query: string) {
    return dispatch => {
        dispatch(updateResults(search.searchGeneral(query)));

        // for when api gets implemented
        // return search.searchGeneral(query)
        //     .then(results => {
        //         dispatch(updateResults)
        //     });
    }
}