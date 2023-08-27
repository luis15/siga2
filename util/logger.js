const fs = require('fs');
const logFilePath = '../log';

function writeToLog(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}: ${message}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Erro ao gerar log:', err);
        }
    });
}

module.exports = {
    writeToLog
};