/*======================
Speech Synthesis
======================*/

// Get the voices available by the browser

let voices = [];

window.speechSynthesis.onvoiceschanged = function() {
    voices = window.speechSynthesis.getVoices();
}

// Setup utterance object. This object holds the message and other settings that will be spoken by the browser

const msg = new SpeechSynthesisUtterance();

// Helper function to get a voice object based on a specific language code

function setVoice(voiceLang) {

	// Set the voice name based on the language code passed

	let voiceName;

	if(voiceLang === 'en-US') {
		voiceName = 'Samantha';
	}
	else if(voiceLang === 'es-ES') {
		voiceName = 'Juan';
	}
	else if(voiceLang === 'pt-BR') {
		voiceName = 'Luciana';
	}

	// Find the specific voice object within our voices array

	return voices.find(voice => voice.name === voiceName);
}

// Saves the voice settings and trigger the speak action

function playVoice() {

	// The settings we want are saved in the dom on the span sibling element

	const previousNode = this.previousElementSibling

	// Save our settings to the utterance

	msg.voice = setVoice(previousNode.dataset.lang);
	msg.text = previousNode.textContent;

	// Trigger the browser to speak

	speechSynthesis.speak(msg);
}

// Save the dom elements for the play buttons and add click handlers

const playButtons = document.querySelectorAll('.play_voice');

playButtons.forEach(button => button.addEventListener('click', playVoice));