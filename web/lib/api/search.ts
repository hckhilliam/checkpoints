import { get } from './fetch' // needed for later...
import { getUrl } from './utils';

function parseResult(result): Checkpoints.SearchResult {
    result.id = result._id;
    delete result._id;
    result.show = true;
    return result as Checkpoints.SearchResult;
}

function parseResults(data): Checkpoints.SearchResult[] {
    return data.map(r => {
        r = parseResult(r);
        return r;
    });
}

export function searchGeneral(query: string): Promise<Checkpoints.SearchResult[]> {
    const url = getUrl(`search?searchQuery=${query}`);
    return get(url).then(res => parseResults(res.body));
}