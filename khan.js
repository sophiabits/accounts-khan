Accounts.oauth.registerService('khan');

if (Meteor.isClient) {
    Meteor.loginWithKhanAcademy = function(options, callback) {
        if (!callback && typeof options === 'function') {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        KhanAcademy.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    var autopublishedFields = _.map(['id', 'nickname'], function(field) {
        return 'services.khan.' + field;
    });

    Accounts.addAutopublishFields({
        forLoggedInUser: autopublishedFields,
        forOtherUsers: autopublishedFields
    });
}