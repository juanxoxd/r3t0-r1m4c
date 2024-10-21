// eslint-disable-next-line @typescript-eslint/no-var-requires
const ROLES_DEFINITION = require('./roles.json');

type RoleCollection = {
  [key: string]: string[];
};

export class SofttekRoleValidator {
  private static roleCollection: RoleCollection = ROLES_DEFINITION;

  static validate(roleRestrictions: string[], currentRole: string): boolean {
    // check if current role exists
    const roleFromCollection = this.roleCollection[currentRole];
    if (!roleFromCollection) {
      return false;
    }

    // check if current role exists in role restrictions
    if (roleRestrictions.includes(currentRole)) {
      return true;
    }

    // check if current role has permission on restrictions
    return roleFromCollection.some((rfc) => roleRestrictions.includes(rfc));
  }
}
