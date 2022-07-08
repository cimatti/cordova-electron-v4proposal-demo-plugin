module.exports = {
  coolMethod: function (p1, p2, p3) { // Can be async if necessary
    // The following code is just for backward compatibility with cordova-electron 3 (or cordova-electron-v32proposal by Cimatti)
    // If you want to support just cordova-electron-v4proposal by Cimatti you can just replace arguments (p1, p2, p3) with (success, error, args)
    let success, error, args;
    if (typeof p1 === 'function') {
      // cordova-electron-v4proposal by Cimatti
      success = p1;
      error = p2;
      args = p3
    } else {
      // cordova-electron 3, you can omit this block if you just want to support cordova-electron-v4proposal
      args = p1[0]; // in cordova-electron 3, args were encapsulated twice in arrays
      if (typeof p2 === 'function') {
        // cordova-electron-v32proposal by Cimatti
        success = p2;
        error = p3;
      } else {
        // cordova-electron 3: success and error will prepare the return value
        success = function (message) { return message };
        error = function (error) { return Promise.reject(error) };
      }
    }

    if (args[0] !== undefined && args[0] !== null) {
      const message = String(args[0]);
      if (message.length > 0) {
        return success(message); // "return" here is necessary just for backward compatibility with cordova-electron 3, you can omit "return" if you just want to support cordova-electron-v32proposal or cordova-electron-v4proposal by Cimatti
      }
    }
    return error("Expected one non-empty string argument."); // "return" here is necessary just for backward compatibility with cordova-electron 3, you can omit "return" if you just want to support cordova-electron-v32proposal or cordova-electron-v4proposal by Cimatti
  }
};
