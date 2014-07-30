var userName = session.get("LOGGED_IN_USER");
if(userName!=null){
    var es = require('store');
    es.server.sandbox({
        tenantId: -1234,
        username: userName
    }, function () {
        var asset = require('rxt').asset;
        var am = asset.createUserAssetManager(session, 'gadget');
        model.assets = am.list();

    });
}else{
    model.assets = {};
}

