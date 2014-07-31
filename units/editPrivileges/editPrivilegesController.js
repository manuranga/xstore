var store = require('store');
var um = store.server.userManager(-1234);
var users = um.listUsers();
var userMatrix = [];
var roles = um.allRoles();
var user;
var userRoles;
var userRoleFlags;
for (var i = 0; i < users.length; i++) {
    user = users[i];
    userRoles = parse(stringify(um.getRoleListOfUser(user)));
    userRoleFlags = [];
    for (var j = 0; j < roles.length; j++) {
        var role = String(roles[j]);
        new Log().info('is ' +  role + ' in ' + userRoles + ' = ' + userRoles.indexOf(role));
        userRoleFlags.push(userRoles.indexOf(role) >= 0);
    }
    userMatrix.push({name: user, roles: userRoleFlags })
}

model.users = userMatrix;
model.roles = roles;

