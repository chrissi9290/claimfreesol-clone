// Solana Web3.js und Wallet Adapter importieren
const { Connection, clusterApiUrl, PublicKey } = solanaWeb3;
const { PhantomWalletAdapter } = walletAdapterWallets;

// Solana Verbindung
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Phantom Wallet Adapter
const wallet = new PhantomWalletAdapter();

// Button und Anzeigeelemente
const connectButton = document.getElementById('connect-wallet');
const walletInfo = document.getElementById('wallet-info');
const walletAddressSpan = document.getElementById('wallet-address');
const scanButton = document.getElementById('scan-wallet');
const solBalance = document.getElementById('sol-balance');

// Wallet verbinden
connectButton.addEventListener('click', async () => {
    try {
        await wallet.connect();
        walletInfo.style.display = 'block';
        walletAddressSpan.textContent = wallet.publicKey.toString();
    } catch (err) {
        console.error('Wallet-Verbindung fehlgeschlagen', err);
    }
});

// Nach SOL scannen
scanButton.addEventListener('click', async () => {
    try {
        const publicKey = wallet.publicKey;
        const balance = await connection.getBalance(publicKey);
        solBalance.textContent = `SOL-Guthaben: ${(balance / 1e9).toFixed(4)} SOL`;
    } catch (err) {
        console.error('Fehler beim Abrufen des SOL-Guthabens', err);
    }
});
