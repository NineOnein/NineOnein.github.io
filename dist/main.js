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
let lastScrollTop = 0;
let scrollDirection = undefined;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
document.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
   let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop){
       scrollDirection = 'down';
   } else {
      scrollDirection = 'up';
   }
   lastScrollTop = st;
}, false);
window.onbeforeunload = function () {
	window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', function(){

	let scope = {};
	let trigger = new ScrollTrigger();
	trigger.callScope = scope;

	svg_container = document.getElementById('svg_container');

	morph('empty', 'earth');

	scope.morph = function(morphTarget) {
		//console.log('Visible element: '+this.id);

		morph('empty', morphTarget);
	}

	scope.morphPrev = function(morphTarget){
		//console.log(scrollDirection);
		if(scrollDirection == 'up'){
			morph('empty', morphTarget);
		}
	}

	function dimOpacity(){
		svg_container.style.opacity = 0.2;
	}

	function incOpacity(){
		svg_container.style.opacity = 'initial';
	}
});
