var querystring = Npm.require("querystring");

KhanAcademy = {};

var urls = {
    requestToken: "https://www.khanacademy.org/api/auth2/request_token",
    authorize: "https://www.khanacademy.org/api/auth2/authorize",
    accessToken: "https://www.khanacademy.org/api/auth2/access_token",
    authenticate: "https://www.khanacademy.org/api/auth2/authorize"
};

OAuth.registerService('khan', 1, urls, function(oauthBinding) {
    var response = oauthBinding.get('https://www.khanacademy.org/api/v1/user');

    var identity = response.data;

    var serviceData = {
        id: identity.kaid,
        accessToken: OAuth.sealSecret(oauthBinding.accessToken),
        accessTokenSecret: OAuth.sealSecret(oauthBinding.accessTokenSecret),
        badge_counts: identity.badge_counts,
        email: identity.email,
        nickname: identity.nickname,
        points: identity.points,
        profile_url: identity.profile_root
    };

    return {
        serviceData: serviceData
    };
});


KhanAcademy.retrieveCredential = function(credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};

OAuth1Binding.prototype._oldPrepareRequestToken = OAuth1Binding.prototype.prepareRequestToken;
OAuth1Binding.prototype.prepareRequestToken = function(callbackUrl) {
    if (callbackUrl.indexOf('_oauth/khan?') == -1) {
        this._oldPrepareRequestToken();
    } else {
        var self = this;

        var headers = self._buildHeader({
            oauth_callback: callbackUrl
        });

        // KhanAcademy requires the callback url to be passed as a query string
        var response = self._call('POST', self._urls.requestToken + '?oauth_callback=' + encodeURIComponent(callbackUrl), headers);
        var tokens = querystring.parse(response.content);

        // KhanAcademy does not set this flag
        //if (! tokens.oauth_callback_confirmed)
        //    throw _.extend(new Error("oauth_callback_confirmed false when requesting oauth1 token"),
        //        {response: response});

        self.requestToken = tokens.oauth_token;
        self.requestTokenSecret = tokens.oauth_token_secret;
    }
};