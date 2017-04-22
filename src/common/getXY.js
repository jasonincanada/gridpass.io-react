
// From: http://stackoverflow.com/questions/4249648/jquery-get-mouse-position-within-an-element
export default function getXY(evt, elementId) {
	const element = document.getElementById(elementId);
	const rect = element.getBoundingClientRect();
	const scrollTop = document.documentElement.scrollTop?
									document.documentElement.scrollTop:document.body.scrollTop;
	const scrollLeft = document.documentElement.scrollLeft?                   
									document.documentElement.scrollLeft:document.body.scrollLeft;
	const elementLeft = rect.left+scrollLeft;  
	const elementTop = rect.top+scrollTop;

	let x = 0, y = 0;

	if (document.all){ //detects using IE   
		x = event.clientX+scrollLeft-elementLeft; //event not evt because of IE
		y = event.clientY+scrollTop-elementTop;
	}
	else
	{
		x = evt.pageX-elementLeft;
		y = evt.pageY-elementTop;
	}

	return {x: x, y: y};
}

