/* SEEDER NODE
   Run this first to host the mock translation data.
*/
import Hyperdrive from 'hyperdrive';
import Hyperswarm from 'hyperswarm';
import Corestore from 'corestore';

async function startSeeder() {
	console.log('[SEEDER] Initializing...');

	// 1. Storage: Use a separate folder for the backend data
	const store = new Corestore('./storage-seeder');
	await store.ready();

	// 2. Networking
	const swarm = new Hyperswarm();
	swarm.on('connection', (socket) => store.replicate(socket));

	// 3. Drive: Create a new P2P drive
	const drive = new Hyperdrive(store);
	await drive.ready();

	// 4. Data: Write the "Mock Model" (a simple JSON file)
	// In a real scenario, this would be the binary .onnx model file
	const mockData = JSON.stringify({
		"hello": "hola",
		"world": "mundo",
		"project": "proyecto",
		"manager": "gerente",
		"team": "equipo"
	});

	console.log('[SEEDER] Writing mock model to Hyperdrive...');
	await drive.put('/model.json', Buffer.from(mockData));

	// 5. Go Online
	swarm.join(drive.discoveryKey);
	await swarm.flush();

	console.log('\n==========================================');
	console.log('DRIVE KEY (Copy this to the App):');
	console.log(drive.key.toString('hex'));
	console.log('==========================================\n');
}

startSeeder();
