import { ActivityType } from "@app/activity/enum/activity-type.enum";

export class REST_ActivityStartInput {
  userId: string;
  activityType: ActivityType;
}


export class REST_ActivityEndInput {
  activityId: string;
  distance: number;
  imageUrls: string[];
  description?: string;
  name?: string;
}


export class REST_ActivityAddScoreInput {
  activityId: string;
  points: number;
}


export class REST_ActivityAddPathPointInput {
  activityId: string;
  lat: string;
  lon: string;
}

export class REST_PathPointUpdateInput {
  lat?: string;
  lon?: string;
}

export class REST_ActivityUpdateInput {
  id: string;
  durationTime?: number;
  distance?: number;
  trashCount?: number;
  points?: number;
  activityType?: ActivityType;
  description?: string;
  name?: string;
  imageUrls?: string[];
  path?: REST_PathPointUpdateInput[];
}

export class REST_ActivityAddTrashInput {
  activityId: string;
  lat: string;
  lon: string;
}
