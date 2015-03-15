module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // здесь будут настроенные нами таски
    watch : {
      options: {
        livereload: true,
        nospawn: true
      }
    },
    express : {
      dev: {
        options: {
          script: 'bin/www.js'
        }
      }
    },
  });

  // здесь будут подключаться необходимые модули
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  // а здесь - вызываться таски
  grunt.registerTask('default', ['express', 'watch']);

};
