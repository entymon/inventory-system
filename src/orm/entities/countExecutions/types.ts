import { CountPlan } from '../countPlans/CountPlan';

export type TCountExecution = {
  id?: number;
  count_plan?: CountPlan;
  status?: CountExecutionStatusEnum;
};

export enum CountExecutionStatusEnum {
  ONGOING = 'ongoing',
  END = 'end',
  STARTED = 'started',
};