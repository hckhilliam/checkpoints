const debug = require('debug')('checkpoints:checkpoint');
import Checkpoint from '../mongoose/Checkpoint';

export function createCheckpoint(title: string, description: string, isPrivate: boolean = false) {
    debug(`Create checkpoint (${title}) (${description}) (${isPrivate})`);
    const checkpoint = new Checkpoint({
        title,
        description,
        isPrivate,
    });
    return checkpoint.save();
}

// export function getUserCheckpoints(id: number) {
//   return
// }