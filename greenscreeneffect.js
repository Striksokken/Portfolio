const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('output');
const statusElement = document.getElementById('greenscreen-status');
const canvasCtx = canvasElement.getContext('2d');

function setStatus(message, isError = false) {
    if (!statusElement) return;
    statusElement.textContent = message;
    statusElement.style.color = isError ? '#ff7b7b' : '';
}

function initSegmentation() {
    if (!window.SelfieSegmentation || !window.Camera) {
        setStatus('Kan ikke indlæse greenscreen biblioteket. Tjek din internetforbindelse.', true);
        return;
    }

    const segmentation = new SelfieSegmentation({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
    });

    segmentation.setOptions({ modelSelection: 1 });
    segmentation.onResults((results) => {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // Tegn masken
        canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height);

        // Vis kun personen
        canvasCtx.globalCompositeOperation = 'source-in';
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        // Tegn grøn baggrund bag personen
        canvasCtx.globalCompositeOperation = 'destination-atop';
        canvasCtx.fillStyle = '#0a7a33';
        canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

        canvasCtx.restore();
    });

    const camera = new Camera(videoElement, {
        onFrame: async () => {
            await segmentation.send({ image: videoElement });
        },
        width: videoElement.width,
        height: videoElement.height
    });

    camera.start()
        .then(() => setStatus('Klar! Din baggrund er nu udskiftet.'))
        .catch((err) => {
            console.error(err);
            setStatus('Kunne ikke få adgang til webcam. Giv adgang og prøv igen.', true);
        });
}

document.addEventListener('DOMContentLoaded', initSegmentation);
