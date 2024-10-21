import fs from 'fs';
import roles from './definition';

function _explodeChildrenRolesFromHierarchy(roles: any) {
  const result: any = [];
  for (const role in roles) {
    !result.includes(role) && result.push(role);

    const children = roles[role];
    if (typeof children === 'object') {
      const explodedRoles = _explodeChildrenRolesFromHierarchy(children);
      for (const explodedRole of explodedRoles) {
        !result.includes(explodedRole) && result.push(explodedRole);
      }
    }
  }

  return result;
}

function _mapRolesToSearchableStructure(roles: any) {
  const result: any = {};

  for (const role in roles) {
    const children = roles[role];

    if (typeof children === 'object') {
      result[role] = _explodeChildrenRolesFromHierarchy(children);
      Object.assign(result, _mapRolesToSearchableStructure(children));
    } else {
      result[role] = [];
    }
  }

  return result;
}

fs.writeFileSync('roles.json', JSON.stringify(_mapRolesToSearchableStructure(roles), null, 2));
