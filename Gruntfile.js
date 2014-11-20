// Encapsule/onm-data-model-tests

module.exports = function (grunt_) {

    var configObject = {
        pkg: grunt_.file.readJSON("package.json"),

        jshint: {
            files: [ 'Gruntfile.js', 'index.js', 'test/*.js', 'test/**/*.js' ],
            options: {
            }
        },

        // Execute server-side Mocha tests using the grunt-mocha-test module.

        mochaTest: {
            options: { reporter: 'spec', checkLeaks: true },
            src: [
                'test/test-onm-data-model-tests.js'
            ]
        }
    };

    grunt_.initConfig(configObject);

    grunt_.loadNpmTasks("grunt-contrib-clean");
    grunt_.loadNpmTasks("grunt-contrib-jshint");
    grunt_.loadNpmTasks("grunt-mocha-test");

    grunt_.registerTask("lint", [ "jshint" ]);
    grunt_.registerTask("test", [ "mochaTest" ]);
    grunt_.registerTask("default", [ "lint", "test" ]);

};
