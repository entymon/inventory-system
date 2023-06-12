export enum TCountPlanScheduleOptions {
  WEEK = 'week',
  MONDAY_2ND = '2nd Monday',
}

export type TSchedulerRequest = {
  repeatEvery?: TCountPlanScheduleOptions;
};

export type TCountPlan = {
  id?: number;
  userId?: number;
  schedule?: TSchedulerRequest;
};
