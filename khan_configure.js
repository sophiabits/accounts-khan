Template.configureLoginServiceDialogForKhanAcademy.helpers({
    siteUrl: function() {
        return Meteor.absoluteUrl({replaceLocalhost: true});
    }
});

Template.configureLoginServiceDialogForKhanAcademy.fields = function () {
    return [
        {property: 'consumerKey', label: 'API key'},
        {property: 'secret', label: 'API secret'}
    ];
};