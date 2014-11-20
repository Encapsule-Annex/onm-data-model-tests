// test-onm-data-model-tests.js
//

var packageMeta = require('../package.json');
var assert = require('chai').assert;

describe(packageMeta.name + " v" + packageMeta.version + " test suite.", function() {

    describe("Load dependency and module-under-test.", function() {

        var addressBookDataModelDeclaration = null;
        var initializeDataModelDeclaration = function() {
            addressBookDataModelDeclaration =  require('onm/test/fixture/address-book-data-model').modelDeclaration;
        };

        var thisModuleExports = null;
        var initializeThisModuleExports = function() {
            thisModuleExports = require('../index');
        };

        before(function() {
            assert.doesNotThrow(initializeDataModelDeclaration);
            assert.doesNotThrow(initializeThisModuleExports);
        });

        it("The address book data model declaration should have loaded.", function() {
            assert.isDefined(addressBookDataModelDeclaration);
            assert.isNotNull(addressBookDataModelDeclaration);
            assert.isObject(addressBookDataModelDeclaration);
        });

        it("This module's exports should be defined and non-null.", function() {
            assert.isDefined(thisModuleExports);
            assert.isNotNull(thisModuleExports);
        });

        it("This module should export an object.", function() {
            assert.isObject(thisModuleExports);
        });

        it("The object should define property 'validateDataModelDeclaration'.", function() {
            assert.property(thisModuleExports, 'validateDataModelDeclaration');
        });

        it("The 'validateDataModelDeclaration' property should be a function.", function() {
            assert.isFunction(thisModuleExports.validateDataModelDeclaration);
        });

        describe("Invoke the 'validateDataModelDeclaration' function to validate the address boook data model.", function() {

            before(function(done_) {
                thisModuleExports.validateDataModelDeclaration(addressBookDataModelDeclaration);
                done_();
            });

            it("Execute the dynamic test suite.", function() {
                assert.isTrue(true);
            });
        });

    });

});
