import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { CountExecution } from 'orm/entities/countExecutions/CountExecution';
import { CountExecutionStatusEnum, TCountExecution } from 'orm/entities/countExecutions/types';
import { CountPlan } from 'orm/entities/countPlans/CountPlan';
import { TCountPlan, TCountPlanScheduleOptions, TSchedulerRequest } from 'orm/entities/countPlans/types';
import { RepetitionSchedule } from 'orm/entities/repetitionSchedules/RepetitionSchedule';
import { TRepetitionSchedule } from 'orm/entities/repetitionSchedules/types';
import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

declare global {
  interface Date {
    nextSecondMonday: () => string;
  }
}

Date.prototype.nextSecondMonday = function () {
  const temp = new Date(this);
  const date = temp.getDate();

  let n = 1;
  while (temp.getDay() !== 1) temp.setDate(++n);

  temp.setDate(n + 7);
  if (date > temp.getDate()) {
    temp.setMonth(temp.getMonth() + 1, 1);
    return temp.nextSecondMonday();
  }
  return temp.toLocaleDateString();
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, schedule } = req.body as unknown as TCountPlan;

  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      const customError = new CustomError(400, 'General', 'The user does not exist', [
        `ID '${userId}' does not exists`,
      ]);
      return next(customError);
    }

    const countPlan = await createCountPlan(user);

    createScheduler(countPlan, schedule);

    res.customSuccess(200, `Count plan with id: ${countPlan.id} was created successfully`);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

// move to service
export const createCountPlan = (owner: User): Promise<CountPlan> => {
  return CountPlan.create({
    owner,
  }).save();
};

// move to service
export const createScheduler = (countPlan: CountPlan, schedule: TSchedulerRequest) => {
  if (schedule.repeatEvery === TCountPlanScheduleOptions.WEEK) {
    createCountExecution(countPlan, CountExecutionStatusEnum.STARTED);

    const currentDate = new Date();
    const newDate = addWeeks(currentDate, 1);
    RepetitionSchedule.create({
      count_plan: countPlan,
      next_count: newDate,
    } as TRepetitionSchedule).save();
  }

  // This should be a check if today is 2nd Monday and if then execution should be started
  if (schedule.repeatEvery === TCountPlanScheduleOptions.MONDAY_2ND) {
    const currentDate = new Date();
    RepetitionSchedule.create({
      count_plan: countPlan,
      next_count: new Date(currentDate.nextSecondMonday()),
    } as TRepetitionSchedule).save();
  }
};

// move to service
export const createCountExecution = (countPlan: CountPlan, status: CountExecutionStatusEnum) => {
  CountExecution.create({
    count_plan: countPlan,
    status,
  } as TCountExecution).save();
};

// move to service with scheduler
const addWeeks = (date: Date, weeks: number) => {
  const dateCopy = new Date(date);

  dateCopy.setDate(dateCopy.getDate() + 7 * weeks);

  return dateCopy;
};
