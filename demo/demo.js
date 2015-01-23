modujs.define('demoModule',function(){

	var demoModule={};
	
	demoModule.name="It's a demo module";

    return demoModule;
});

modujs.define('anotherModule',['demoModule'],function(demoModule){

	var anotherModule={};
	
	anotherModule.name="It's an another module with dependence from "+demoModule.name;

    return anotherModule;
});

modujs.require(['anotherModule','demoModule'],function(anotherModule,demoModule){
	console.log(anotherModule.name);
	console.log(demoModule.name);
});

var demo=modujs.require('demoModule');

console.log(demo.name);

