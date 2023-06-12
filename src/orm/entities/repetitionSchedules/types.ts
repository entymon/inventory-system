import { CountPlan } from '../countPlans/CountPlan';

export type TRepetitionSchedule = {
  count_plan: CountPlan;
  next_count: Date;
};
