import { get } from './fetch' // needed for later...

export function searchGeneral(query: string): Checkpoints.SearchResults[] {
    let mockData: Checkpoints.SearchResults[] = [
        {
            type: "event",
            name: "Some event 1"
        },
        {
            type: "user",
            name: "Some friend 1"
        }
    ];

    return mockData;
}