(function () {
    var log = new Log(),
        ssoConfiguration = {
            "keyStorePassword": "wso2carbon",
            "identityAlias": "wso2carbon",
            "responseSigningEnabled": "true",
            "keyStoreName": "/repository/resources/security/wso2carbon.jks"
        },
        process = require("process"),
        samlResponse = request.getParameter('SAMLResponse'),
        sessionId = session.getId(),
        samlRequest = request.getParameter('SAMLRequest'),
        relayState = request.getParameter('RelayState'),
        sso = require('sso'),
        samlRespObj,
        keyStoreProps = {
            KEY_STORE_NAME: process.getProperty('carbon.home') + ssoConfiguration.keyStoreName,
            KEY_STORE_PASSWORD: ssoConfiguration.keyStorePassword,
            IDP_ALIAS: ssoConfiguration.identityAlias
        },
        sso_sessions = application.get('sso_sessions');

    if (!sso_sessions) {
        application.put('sso_sessions', {});
        sso_sessions = application.get('sso_sessions');
    }

    if (samlResponse != null) {
        samlRespObj = sso.client.getSamlObject(samlResponse);
        if (!sso.client.isLogoutResponse(samlRespObj)) {

            // validating the signature
            if (ssoConfiguration.responseSigningEnabled) {

                if (sso.client.validateSignature(samlRespObj, keyStoreProps)) {
                    var sessionObj = sso.client.decodeSAMLLoginResponse(samlRespObj, samlResponse, sessionId);

                    if (sessionObj.sessionIndex != null || sessionObj.sessionIndex != 'undefined') {
                        session.put("LOGGED_IN_USER", sessionObj.loggedInUser);
                        session.put("Loged", "true");

                        sso_sessions[sessionObj.sessionId] = sessionObj.sessionIndex;

                        var user = require('store').user;

                        if (user.loginWithSAML(sessionObj.loggedInUser)) {
                            log.debug('user is set :::' + sessionObj.loggedInUser);
                            //response.sendRedirect(relayState);
                            response.sendRedirect('/xstore');
                        }

                    }
                }
            }

        } else {
            session.invalidate();
            response.sendRedirect('/xstore');
        }
    }

    // if saml request is a log out request, then invalidate session.
    if (samlRequest != null) {
        var index = sso.client.decodeSAMLLogoutRequest(sso.client.getSamlObject(samlRequest));
        log.debug('BACKEND LOGOUT RECIEVED FROM STORE THE INDEX IS ######' + index);

        var jSessionId = application.get('sso_sessions')[index];

        delete application.get('sso_sessions')[index];


        log.debug('store Session Id :::' + jSessionId);

        session.invalidate();
    }
}());
