import { AppError, ErrorTypes } from '../error';
import { SofttekRole } from './roles';

export enum SofttekUserLevel {
  SYS_ADMIN = 'sys_admin',
  SYS_USER = 'sys_user',
}

export function extractUserLevel(role: SofttekRole) {
  const cases: { [key: keyof { [key: string]: any }]: SofttekUserLevel } = {
    [role.startsWith(SofttekUserLevel.SYS_USER) as any]: SofttekUserLevel.SYS_USER,
  };

  const level: SofttekUserLevel | undefined = cases[true as any];
  if (!level) {
    throw new AppError(
      ErrorTypes.BAD_REQUEST,
      `User level could not be resolved from ${role}`,
      'ERR_INVALID_LEVEL'
    );
  }

  return level;
}
