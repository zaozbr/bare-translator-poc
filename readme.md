# **Bare Translator PoC: Usage Documentation**

This document outlines the steps to install, run, and verify the **Bare Translator Proof of Concept**. This PoC validates the critical technical path: retrieving a "Mock AI Model" (JSON data) from a decentralized P2P Hyperdrive using the Bare runtime.

## **1\. Prerequisites**

Before running the application, ensure the following are installed on your machine:

* **Node.js & NPM:** [Download here](https://nodejs.org/)  
* **Pear Runtime (Global):**  
  npm install \-g pear

## **2\. Installation**

1. Navigate to the project root folder (bare-translator-poc).  
2. Install the required P2P dependencies (Hyperswarm, Hyperdrive, Corestore):  
   npm install

## **3\. Running the PoC**

This simulation requires two separate terminal windows to represent two distinct nodes on the network: the **Seeder** (Hosting the Model) and the **App** (Consuming the Model).

### **Step 1: Start the Seeder (The "Backend")**

The Seeder creates the P2P Drive and writes the mock data file (model.json) to it.

1. Open **Terminal A**.  
2. Run the seeder script:  
   pear run seeder.js

3. **Action:** Wait for the initialization to complete. The terminal will output a **Drive Key** (a long hexadecimal string).  
   * *Example:* e9a1b2c3d4...  
   * **Copy this key.** You will need it for the app.

### **Step 2: Start the App (The "User")**

The App is the frontend interface that will download the model.

1. Open **Terminal B**.  
2. Run the application in development mode:  
   pear run \--dev .

3. A window labeled "Bare Translator (PoC)" will appear.

## **4\. Usage & Verification**

Now that both nodes are running, follow these steps to verify the P2P connection and "Translation" logic.

1. **Connect:**  
   * In the App window, paste the **Drive Key** (copied from Terminal A) into the input field.  
   * Click **Connect**.  
   * *Observation:* You may notice a slight delay while the App searches the Distributed Hash Table (DHT) for the Seeder. The status will change to "Model Loaded successfully via P2P\!".  
2. **Translate:**  
   * Once connected, the translation UI appears.  
   * Type one of the mock supported words: hello, world, or team.  
   * Click **Translate**.  
   * *Result:* The app should return the Spanish equivalent (hola, mundo, equipo).  
3. **Test Offline Mode (Optional):**  
   * After the model is loaded, disconnect your internet.  
   * Try translating another word.  
   * *Result:* It should still work, proving the model was successfully downloaded to the local device.

## **5\. Troubleshooting**

* **Stuck on "Looking for peers...":**  
  * Ensure both terminals are running.  
  * If on a corporate network, firewalls may block P2P connections. Try running both terminals on a standard home WiFi or mobile hotspot.  
* **"Error loading model":**  
  * Verify you copied the key exactly.  
  * Restart the seeder.js process to generate a fresh key and try again.