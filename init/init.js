//all this should happen with-in the unit.
var mod = require('store');
var configs = {
    "assetsUrlPrefix": "/assets",
    "extensionsUrlPrefix": "/extensions",
    "subscriptionsUrlPrefix": "/subscriptions",
    "tenantConfigs": "/_system/config/store/configs/store.json",
    "socialCommentsEnable": true,
    "cached": false,
    "server": {
        "https": "http://localhost:9443/admin",
        "http": "%http.host%"
    },
    "lifeCycleBehaviour": {
        "visibleIn": ["Published"]
    },
    "socialAppConnectionInfo": {
        "script": "https://localhost:9443/social/export-js/social.js",
        "scriptType": "text/javascript",
        "socialAppUrl": "../../../social/"
    },
    "permissions": {
        "login": {
            "/permission/admin/login": ["ui.execute"]
        }
    },
    "ssoConfiguration": {
        "enabled": true,
        "issuer": "store",
        "identityProviderURL": "%https.carbon.local.ip%/admin/samlsso",
        "keyStorePassword": "wso2carbon",
        "identityAlias": "wso2carbon",
        "responseSigningEnabled": "true",
        "storeAcs": "%https.host%/store/acs",
        "keyStoreName": "/repository/resources/security/wso2carbon.jks"
    },
    "rxt": {
        "CONFIG_BASE_PATH": "/_system/config/store/configs/",
        "EXTENSION_PATH": "extensions/assets/",
        "ASSET_SCRIPT_PATH": "/asset.js",
        "DEFAULT_ASSET_SCRIPT": "/extensions/assets/default/asset.js"
    }

};

mod.server.init(configs);

mod.user.init(configs);


var rxt = require('rxt');
rxt.core.init();
rxt.resources.init();

var event = require('event');
event.on('tenantLoad', function (tenantId) {
    mod.server.systemRegistry(tenantId).put(configs, {
        content: JSON.stringify(configs),
        mediaType: 'application/json'
    })
});

event.emit('tenantLoad', -1234);
