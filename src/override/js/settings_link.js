/*======================
Settings Link
======================*/

const settings = document.querySelector('.settings');

const settings_line = document.querySelector('.line_transform');

// Settings link hover transition

settings.addEventListener('mouseenter', function(){
	settings_line.classList.add('move');
});

settings.addEventListener('mouseleave', function(){
	settings_line.classList.remove('move');
});

// Reveal the options page

settings.addEventListener('click', function(){
	var body = document.querySelector('body');
	if(body.classList.contains('show_options')) {
		body.classList.remove('show_options');
	}
	else {
		body.classList.add('show_options');
	}
});