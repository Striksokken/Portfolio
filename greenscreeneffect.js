// script.js

// Opret Module så vi kan bruge FS_createDataFile
let Module = {
  onRuntimeInitialized() {
    initOpenCv();
  }
};

const videoElement = document.getElementById('video');
const canvasOutput  = document.getElementById('output');

let cap, net, srcMat, inputBlob, maskMat, resizedMaskMat;

async function initOpenCv() {
  // 1) Fetch ONNX (sørg for at filen ligger korrekt i vendor/)
  const res = await fetch('vendor/deeplabv3_mnv2_pascal.onnx');
  if (!res.ok) {
    console.error('Kunne ikke hente ONNX-model:', res.status, res.statusText);
    return;
  }
  const buf = await res.arrayBuffer();
  // 2) Upload til Emscripten-FS
  Module.FS_createDataFile('/', 'model.onnx',
                           new Uint8Array(buf),
                           /*canRead=*/ true,
                           /*canWrite=*/ false);

  // 3) Indlæs netværket
  net = cv.readNetFromONNX('model.onnx');

  // 4) Start webcam
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      videoElement.srcObject = stream;
      videoElement.play();
      videoElement.onplaying = initProcessing;
    })
    .catch(err => console.error('Fejl ved webcam:', err));
}

function initProcessing() {
  cap             = new cv.VideoCapture(videoElement);
  srcMat          = new cv.Mat(videoElement.height, videoElement.width, cv.CV_8UC4);
  inputBlob       = new cv.Mat();
  maskMat         = new cv.Mat();
  resizedMaskMat  = new cv.Mat();
  requestAnimationFrame(processFrame);
}

function processFrame() {
  cap.read(srcMat);
  cv.cvtColor(srcMat, srcMat, cv.COLOR_RGBA2RGB);
  cv.resize(srcMat, inputBlob, new cv.Size(513, 513));
  cv.dnn.blobFromImage(
    inputBlob, inputBlob,
    1/255, new cv.Size(513, 513),
    new cv.Scalar(0,0,0), true, false
  );

  net.setInput(inputBlob);
  let out = net.forward();  // [1,21,513,513]

  const channels   = new cv.MatVector();
  out.reshape(513, 513 * 21).split(channels);
  const personProb = channels.get(15);

  cv.threshold(personProb, maskMat, 0.5, 255, cv.THRESH_BINARY);
  cv.resize(maskMat, resizedMaskMat,
            new cv.Size(srcMat.cols, srcMat.rows),
            0,0,cv.INTER_NEAREST);

  const fg = new cv.Mat();
  srcMat.copyTo(fg, resizedMaskMat);
  cv.imshow(canvasOutput, fg);

  // Ryd op
  fg.delete();
  out.delete();
  channels.delete();
  personProb.delete();

  requestAnimationFrame(processFrame);
}
