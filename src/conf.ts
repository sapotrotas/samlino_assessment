
/*
* App Global Custom Config
* ----------------------------------------------------------------------------
*/

/* Version */
export const VERSION = '0.0.1';

/* Server Protocol - http, https */
export const PROTO = 'https';

/* Server HOST */
export const HOST = 'jsonplaceholder.typicode.com';

/* Project */
export const PROJECT = 'samlino_dk_test';

/**
 * End Config
 */

/* API service */
// export const BASE_PATH: string = `/${PROJECT}`;
export const SERVICE_URL: string = PROTO + '://' + HOST /*+ BASE_PATH*/;
console.log('Pointing to\t', SERVICE_URL);
console.log('\tProj\t', PROJECT);

/* Storage */
export const SPREFIX: string = 'samlino_dk_test_app_';
export const STORAGE_USER: string = SPREFIX + 'user';
// export const STORAGE_TOKEN: string = SPREFIX + 'token';

/* Roles */
export const roles: { [index: string]: string } = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const rolesArray = Object.keys(roles).map((key) => roles[key]);

export function userIs(
  userRoles: string | Array<string>,
  roleToCompare: string
): boolean {
  if (Array.isArray(userRoles)) {
    return userRoles.includes(roleToCompare);
  }

  return userRoles === roleToCompare;
}

export function userIsAdmin(userRoles: string | Array<string>): boolean {
  return userRoles.includes(roles.ADMIN);
}

export function userIsUser(userRoles: string | Array<string>): boolean {
  return userRoles.includes(roles.USER);
}

