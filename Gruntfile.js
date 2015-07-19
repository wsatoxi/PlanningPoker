module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-typescript-qunit');
  grunt.loadNpmTasks('grunt-coveralls');

  grunt.initConfig({
    ts : {
      base : {
        files:[ { src : ['src/**/*.ts'], dest: 'bin/' }],
        options : {
          module : 'amd',
          target : 'es5',
          sourceMap : true
        }
      }
    },

    clean : {
      all : {
        src : ['bin/**/*.js','bin/**/*.js.map','src/**/*.js','src/**/*.js.map','output','test/**/*.html','test/**/*.js','test/**/*.js.map']
      }
    },

    tsqunit : {
      srcDir : './src/',
      testDir : './test/',
      buildReportDir : './output/'
    },

    coveralls:{
      options: {
        force: false
      },
      base: {
        src: 'output/lcov-reports/lcov.info'
      }
    }
  });

  grunt.registerTask('build',['clean:all','ts']);
}
