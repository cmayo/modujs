module.exports = function(grunt) {
	var banner = '/* <%= pkg.name %> <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n';

    grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				banner: banner
			},
            build: {
                src: ['src/modujs.js'],
				dest: 'dist/modujs.js'
            }
        },
        uglify: {
			options: {
				banner: banner
			},
            build: {
                files: {
                    'dist/modujs.min.js': ['dist/modujs.js']
                }
            }
        }
    });

	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['concat','uglify']);
    grunt.registerTask('default', ['build']);

};