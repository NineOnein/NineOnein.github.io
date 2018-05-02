let svg_container = document.getElementById("svg_container");
let s = Snap(svg_container);


let morph = function(sourceElementId, targetElementId){
	for (var i=0; i<=7; i++){
		let st1 = Snap.select('#'+sourceElementId+'_st'+i+' > path');
		let st2 = Snap.select('#'+targetElementId+'_st'+i+'  > path');
		let st1Points = st1.node.getAttribute('d');
		let st2Points = st2.node.getAttribute('d');
		st1.animate({ d: st2Points }, 2000, mina.easeinout);
	}
}
document.addEventListener('DOMContentLoaded', function(){
	let scope = {};
	let trigger = new ScrollTrigger();
	trigger.callScope = scope;

	morph('empty', 'chameleon');

	scope.fixe = function(value){
		document.getElementById('svg_container').classList.remove('relative');
		document.getElementById('svg_container').classList.add('fixed');
	}


	scope.unfixe = function(){
		document.getElementById('svg_container').classList.remove('fixed');
		document.getElementById('svg_container').classList.add('relative');
	}

	scope.morph = function(value, morphTarget) {
		console.log('Visible element: '+this.id);
		console.log(window.pageYOffset, this.offsetTop);

		morph('empty', morphTarget);
	}
});