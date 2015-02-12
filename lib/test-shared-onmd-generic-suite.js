// test-shared-onmd-generic-suite.js
//
// Generic Object Namespace Manager (onm) data model declaration object test suite.
//
// This module implements a generic test suite for Object Namespace Manager (onm)
// data model declaration objects. If you're taking a dependency on the onm module,
// it is strongly recommended that you execute this test module against your own onm
// data model declaration objects to ensure that they are free from obvious error(s).
//
//
// The onm_ parameter is optional and should be defined only by the onm module itself.
//

var Mocha = require('mocha');
var Suite = Mocha.Suite;
var Test = Mocha.Test;
var Hook = Mocha.Hook;
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;
var withData = require('leche').withData;

module.exports = (function() {

    // onm_ parameter not for you. for onm module tests.
    return function (dataModelDeclaration_, onm_) {

        var onm = (onm_ !== null) && onm_ || require('onm');
        var dataModelDeclaration = dataModelDeclaration_;

        describe("Object Namespace Manager (onm) data model declaration generic acceptance test suite.", function() {

            before(function(done_) {
                done_();
            });

            describe("Base level test input data acceptance tests.", function() {
                it("The input data model declaration should be defined.", function() {
                    assert.isDefined(dataModelDeclaration);
                });
                it("The input data model declaration should not be null.", function() {
                    assert.isNotNull(dataModelDeclaration);
                });
                it("The input data model declaration should be an object reference.", function() {
                    assert.isObject(dataModelDeclaration);
                });
            });

            describe("Parse the data model declaration object and construct an onm.Model instance.", function() {

                var onmModel = null;

                before(function() {
                    onmModel = new onm.Model(dataModelDeclaration);
                });
                it("Result should be defined.", function() {
                    assert.isDefined(onmModel);
                });
                it("Result should not be null.", function() {
                    assert.isNotNull(onmModel);
                });
                it("Result should be an instance of onm.Model.", function() {
                    assert.instanceOf(onmModel, onm.Model);
                });

                describe("Data model binding validation test suite.", function() {

                    var onmStore = null;

                    before(function() {
                        onmStore = new onm.Store(onmModel);
                    });

                    it("onm.Store instance bound to onm.Model should be defined.", function() {
                        assert.isDefined(onmStore);
                    });

                    it("onm.Store instance bound to onm.Model should not be null.", function() {
                        assert.isNotNull(onmStore);
                    });

                    it("onm.Store instance reference should be a verified instance of onm.Store.", function() {
                        assert.instanceOf(onmStore, onm.Store);
                    });

                    var dynamicDataModelBindingSuite = describe("Data component construction tests.", function() {

                        before(function(dynamicDataModelBindingSuiteDone_) {

                            var extensionPointModelPathCoverageMap = {};

                            var componentAddresses = [];

                            if (onmModel.implementation.countExtensionPoints) {

                                var currentComponentAddress = onmModel.createRootAddress();

                                var generateSubcomponentCreateSuite = function (addressComponent_, parentTestSuite_) {

                                    var unresolvedSubcomponentAddresses = [];
                                    addressComponent_.visitExtensionPointAddresses(function (addressExtensionPoint_) {
                                        var modelPath = addressExtensionPoint_.implementation.getModelPath();
                                        if (extensionPointModelPathCoverageMap[modelPath] === undefined) {
                                            extensionPointModelPathCoverageMap[modelPath] = true;
                                            var unresolvedSubcomponentAddress = addressExtensionPoint_.createSubcomponentAddress();
                                            unresolvedSubcomponentAddresses.push(unresolvedSubcomponentAddress);
                                            // console.log("Discovered '" + unresolvedSubcomponentAddress.uri() + "'.");
                                        }
                                    }); // end visit extension points

                                    unresolvedSubcomponentAddresses.forEach(function(element, index, array) {

                                        // console.log("In foreach on index = " + index);

                                        var unresolvedComponentAddress = element;
                                        var componentNamespace = null;

                                        var dynamicComponentCreateSuite = Suite.create(parentTestSuite_, "Component '" + element.uri() + "' create test.");
                                        
                                        var title = '"before all" hook' + dynamicComponentCreateSuite.title;

                                        var fn = function(dynamicComponentCreateSuiteDone_) {
                                            componentNamespace = onmStore.nsCreate(unresolvedComponentAddress);
                                            dynamicComponentCreateSuite.addTest(new Test("Component '" + componentNamespace.address().uri() + "' was created.", function() {
                                                assert.isDefined(componentNamespace);
                                                assert.isNotNull(componentNamespace);
                                                assert.instanceOf(componentNamespace, onm.Namespace);
                                                // RECURSION (note that recursive data models are cycle-busted by this algorithm).
                                                generateSubcomponentCreateSuite(componentNamespace.address(), dynamicComponentCreateSuite);
                                            }));
                                            // console.log("Finished executing 'beforeAll' for '" + unresolvedComponentAddress.uri() + "'.");
                                            dynamicComponentCreateSuiteDone_.call(dynamicComponentCreateSuite);
                                        };

                                        var hook = new Hook(title, fn);

                                        hook.parent = dynamicComponentCreateSuite;
                                        hook.timeout(dynamicComponentCreateSuite.timeout());
                                        hook.enableTimeouts(dynamicComponentCreateSuite.enableTimeouts());
                                        hook.slow(dynamicComponentCreateSuite.slow());
                                        hook.ctx = dynamicComponentCreateSuite.ctx;
                                        dynamicComponentCreateSuite._beforeAll.push(hook);
                                        dynamicComponentCreateSuite.emit('beforeAll', hook);

                                        dynamicComponentCreateSuite.addTest(new Test("Execute the dynamic component create suite.", function() {
                                            assert.isTrue(true);
                                        }));

                                    });

                                }; // generateSubcomponentCreateSuite

                                generateSubcomponentCreateSuite(currentComponentAddress, dynamicDataModelBindingSuite);

                            }

                            dynamicDataModelBindingSuiteDone_();
                        });

                        it("Execute the dynamic onm data model binding test suite.", function() {
                            assert.isTrue(true);
                        });
                    });
                });
            });
        });
    };

})();

