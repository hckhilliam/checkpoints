import { get } from './fetch' // needed for later...

export function searchGeneral(query: string): SearchResults[] {
    let mockData: SearchResults[] = [
        {
            type: "Event",
            name: "Some event 1"
        },
        {
            type: "friend",
            name: "Some friend 1"
        }
    ];

    return mockData;
}