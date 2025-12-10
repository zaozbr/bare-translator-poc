/* APP LOGIC
Runs inside the Pear Runtime.
*/
import Hyperdrive from 'hyperdrive';
import Hyperswarm from 'hyperswarm';
import Corestore from 'corestore';

let drive = null;
let translationModel = null;

// Expose functions to window so HTML can call them
window.connectToSwarm = async () => {
	const keyStr = document.getElementById('driveKey').value;
	const statusDiv = document.getElementById('connectionStatus');

	if (! keyStr) {
		statusDiv.innerText = "Error: Please enter a key.";
		return;
	}

	statusDiv.innerText = "Initializing Corestore...";

	// 1. Setup local storage for the client
	const store = new Corestore('./storage-client');
	await store.ready();

	// 2. Setup Networking
	const swarm = new Hyperswarm();
	swarm.on('connection', (socket) => store.replicate(socket));

	// 3. Initialize Drive (Read-Only mode using the key)
	statusDiv.innerText = "Looking for peers...";
	drive = new Hyperdrive(store, Buffer.from(keyStr, 'hex'));
	await drive.ready();

	// 4. Join Swarm
	swarm.join(drive.discoveryKey);
	await swarm.flush();

	statusDiv.innerText = "Connected! Downloading mock model...";

	// 5. Retrieve the Data (The "Model")
	try {
		const buffer = await drive.get('/model.json');
		if (! buffer) 
		throw new Error("Model file not found in drive.");


		// Parse the JSON (Simulating loading model into memory)
		translationModel = JSON.parse(buffer.toString());

		statusDiv.innerText = "Model Loaded successfully via P2P!";
		document.getElementById('setup').style.display = 'none';
		document.getElementById('app').style.display = 'block';
	} catch (err) {
		statusDiv.innerText = "Error loading model: " + err.message;
		console.error(err);
	}
};

window.translateText = () => {
	const input = document.getElementById('inputText').value.toLowerCase();
	const outputDiv = document.getElementById('result');

	if (! translationModel) 
	return;


	// Simple key-value lookup (Mocking AI inference)
	const translation = translationModel[input];

	if (translation) {
		outputDiv.innerText = translation;
	} else {
		outputDiv.innerText = "[Unknown Word] - Model limited";
	}
};