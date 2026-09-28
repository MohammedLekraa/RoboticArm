// Calibración individual por dedo tomada del TFG
const flexCalibration = [
    { min: 1530, max: 2100 }, // Pulgar
    { min: 1530, max: 2100 }, // Índice
    { min: 1700, max: 2300 }, // Corazón
    { min: 1650, max: 2100 }, // Anular
    { min: 1730, max: 2000 }  // Meñique
];

// Mapeo lineal idéntico a la función map() de Arduino
function arduinoMap(x, in_min, in_max, out_min, out_max) {
    let result = (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    return Math.max(out_min, Math.min(out_max, Math.round(result)));
}

// Función para actualizar la interfaz con una trama recibida
function updateDashboard(flexValues, wristServoAngle) {
    // 1. Actualizar Dedos (Flex1 - Flex5)
    flexValues.forEach((adc, index) => {
        let fingerNum = index + 1;
        let cal = flexCalibration[index];
        
        // El sensor flex disminuye su ADC al flexionarse (según la memoria del TFG)
        let angle = arduinoMap(adc, cal.max, cal.min, 0, 180); 
        let percentage = Math.round((angle / 180) * 100);

        // Actualizar UI
        document.getElementById(`valFlex${fingerNum}`).innerText = `${adc} ADC | ${angle}°`;
        document.getElementById(`barFlex${fingerNum}`).style.width = `${percentage}%`;
    });

    // 2. Actualizar Rotación de Muñeca (Gauge)
    document.getElementById('wristAngle').innerText = `${wristServoAngle}°`;
    let rotationDeg = (wristServoAngle / 180) * 180; // Mapeo a semicírculo
    document.getElementById('wristNeedle').style.transform = `rotate(${rotationDeg}deg)`;

    // 3. Imprimir Trama en Terminal
    let frameText = `${flexValues.join(' ')} ${wristServoAngle}`;
    let logElement = document.getElementById('terminalLog');
    logElement.innerText = `[RX SPP]: ${frameText}\n` + logElement.innerText;
}

// Botón de simulación para pruebas en la Web
document.getElementById('btnSimulate').addEventListener('click', () => {
    // Generar valores aleatorios dentro del rango de trabajo real
    let simFlex = [
        Math.floor(Math.random() * (2100 - 1530) + 1530), // Pulgar
        Math.floor(Math.random() * (2100 - 1530) + 1530), // Índice
        Math.floor(Math.random() * (2300 - 1700) + 1700), // Corazón
        Math.floor(Math.random() * (2100 - 1650) + 1650), // Anular
        Math.floor(Math.random() * (2000 - 1730) + 1730)  // Meñique
    ];
    let simWrist = Math.floor(Math.random() * 180);

    updateDashboard(simFlex, simWrist);
});

// Inicializar con estado de reposo (dedos extendidos, muñeca a 0°)
updateDashboard([2100, 2100, 2300, 2100, 2000], 0);
