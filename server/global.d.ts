declare namespace Checkpoints {
  export interface Event {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    distance?: number;
    eventSource: string;
    pictureURL: string;
  }
}