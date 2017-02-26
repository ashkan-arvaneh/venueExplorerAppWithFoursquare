module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
        all:{
            options:{
                port:9000,
                hostname:'localhost',
                bases:['dist'],
                livereload:true
            }
        }
    },
    watch: {
        options:{livereload:true},
        sass: {
            files: ['app/sass/*.scss'],
            tasks: ['sass'],
        },
        syncjsfiles: {
            files: ['app/**/*.js'],
            tasks: ['sync:syncjsfiles'],
        },
        syncCSSfiles: {
            files: ['app/vendor/bootstrap/dist/css/*.css'],
            tasks: ['sync:syncCSSfiles'],
        }
    },
    sass: {
        default: {
            files: [
                {
                    expand: true,
                    cwd: 'app/sass',
                    src: 'style.scss',
                    dest: 'dist/css',
                    ext: '.css',
                }
            ]
        },
    },
    sync : {
      syncjsfiles: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['js/*.js','vendor/angular/*.js','vendor/bootstrap/dist/js/bootstrap.min.js','vendor/jquery/dist/jquery.min.js','vendor/angular-resource/*.js','vendor/angular-route/*.js','vendor/angular-sanitize/*.js'],
          dest: 'dist/',
        }]
      },
        syncCSSfiles: {
            files: [{
                cwd: 'app/vendor/bootstrap/dist/css/',
                src: '*.css',
                dest: 'dist/css',
            }]
        }
    }
});

  // Plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-express');


  // Default task(s).
  grunt.registerTask('default', ['sass', 'sync','watch']);
  grunt.registerTask('server', ['express','sync','watch','sass']);

};