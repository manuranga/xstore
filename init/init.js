//all this should happen with-in the unit.
var mod = require('store');
var configs =   {
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
    "lifeCycleBehaviour":{
        "visibleIn":["Published"]
    },
    "socialAppConnectionInfo":{
        "script":"https://localhost:9443/social/export-js/social.js",
        "scriptType":"text/javascript",
        "socialAppUrl":"../../../social/"
    },
    "ssoConfiguration": {
        "enabled": true,
        "issuer": "store",
        "identityProviderURL": "%https.carbon.local.ip%/admin/samlsso",
        "keyStorePassword": "wso2carbon",
        "identityAlias": "wso2carbon",
        "responseSigningEnabled": "true",
        "storeAcs" : "%https.host%/store/acs",
        "keyStoreName": "/repository/resources/security/wso2carbon.jks"
    }
};

mod.server.init(configs);

mod.user.init(configs);
