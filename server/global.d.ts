declare namespace Checkpoints {
  export interface Event {
    id: number;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    distance?: number;
    eventSource: string;
    pictureURL: string;
  }
}