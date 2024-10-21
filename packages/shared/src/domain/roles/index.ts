// eslint-disable-next-line @typescript-eslint/no-var-requires
const ROLES_DEFINITION = require('./roles.json');
import { SofttekRole } from './roles';
import { SofttekRoleValidator } from './validator';
import { SofttekUserLevel, extractUserLevel } from './level';

export { ROLES_DEFINITION, SofttekRole, SofttekRoleValidator, SofttekUserLevel, extractUserLevel };
