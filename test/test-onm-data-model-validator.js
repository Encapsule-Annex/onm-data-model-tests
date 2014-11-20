// test-onm-data-model-validator.js
//

var onm = require('onm');
var addressBookDataModelDeclaration = require('onm/test/fixture/address-book-data-model').modelDeclaration;
var validatorExports = require('../index');

validatorExports.validateDataModelDeclaration(addressBookDataModelDeclaration);



