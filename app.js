// Registro do PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js');
    });
}

const btnCompartilhar = document.getElementById('btn-compartilhar');
const statusMensagem = document.getElementById('status-mensagem');

btnCompartilhar.addEventListener('click', () => {
    statusMensagem.style.color = '#65676b';
    statusMensagem.innerText = "Acessando satélites...";
    btnCompartilhar.disabled = true;

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (posicao) => {
                const lat = posicao.coords.latitude;
                const lon = posicao.coords.longitude;
                
                // Cria o link do Google Maps
                const linkMaps = `https://www.google.com/maps?q=${lat},${lon}`;
                
                // Prepara a mensagem para o WhatsApp
                const texto = `Oi! Estou te esperando aqui neste local exato: ${linkMaps}`;
                const linkWhatsapp = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
                
                // Redireciona para o WhatsApp
                window.location.href = linkWhatsapp;
                
                statusMensagem.innerText = "";
                btnCompartilhar.disabled = false;
            },
            (erro) => {
                statusMensagem.style.color = '#d32f2f';
                statusMensagem.innerText = "Permissão de localização negada ou GPS inativo.";
                btnCompartilhar.disabled = false;
            },
            { enableHighAccuracy: true } // Força a precisão máxima
        );
    } else {
        statusMensagem.innerText = "Seu dispositivo não suporta GPS.";
        btnCompartilhar.disabled = false;
    }
});
