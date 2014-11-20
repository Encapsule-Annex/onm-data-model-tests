// index.js
// 
// var myDataModelDeclaration = { jsonTag: 'whatever' };
// var validateDateModelDeclaration = require('onm-data-model-validator')().validateDataModelDeclaration;
// validateDataModelDeclaration(myDataModelDeclaration);
//
// Please do not set the onm_ parameter which is reserved for use by the onm module.
//

module.exports = function (onm_) {

    return {
        validateDataModelDeclaration: require('./test/test-shared-onmd-generic-suite')(onm_)
    };

};


