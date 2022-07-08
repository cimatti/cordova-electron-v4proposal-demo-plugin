module.exports = {
  coolMethod: function (successCallback, errorCallback, args) {
    if (typeof args == 'object' && args != undefined && args != null) {
      if (args[0] != undefined && args[0] != null) {
        var message = String(args[0]);
        if (message.length > 0) {
          typeof successCallback === 'function' && successCallback(message);
          return;
        }
      }
    }
    typeof errorCallback === 'function' && errorCallback("Expected one non-empty string argument.")
  }
};

require('cordova/exec/proxy').add('CordovaElectronV4proposalDemoPlugin', module.exports);
