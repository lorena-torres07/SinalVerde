// Registro do Service Worker para transformar em PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registrado!', reg))
            .catch(err => console.error('Erro ao registrar SW', err));
    });
}

// Acesso à Câmera (Hardware)
const video = document.getElementById('camera-stream');
const captureBtn = document.getElementById('capture-btn');
const canvas = document.getElementById('snapshot');
const statusMsg = document.getElementById('status-message');

async function startCamera() {
    try {
        // Solicita a câmera traseira (ideal para ler rótulos)
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
        });
        video.srcObject = stream;
    } catch (err) {
        console.error("Erro ao acessar a câmera: ", err);
        statusMsg.textContent = "Permissão de câmera negada ou dispositivo não suportado.";
    }
}

captureBtn.addEventListener('click', () => {
    if (video.srcObject) {
        // Tira a "foto"
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // UI Feedback
        video.style.display = 'none';
        canvas.style.display = 'block';
        captureBtn.textContent = 'Escanear Novo Rótulo';
        statusMsg.textContent = "Processando informações nutricionais...";
        statusMsg.style.color = "#2e7d32";
        
        // Reseta após 3 segundos para demonstração
        setTimeout(() => {
            video.style.display = 'block';
            canvas.style.display = 'none';
            captureBtn.textContent = 'Escanear Rótulo';
            statusMsg.textContent = "";
        }, 3000);
    }
});

// Inicia a câmera ao carregar a página
startCamera();
