const socket = io();

function updateStatus(newData) {
    // Update the status in the DOM
    document.getElementById('status').innerText = `Status: ${newData.status}`;
}

socket.on('mqtt-message', (data) => {
    const messageData = JSON.parse(data.message);
    updateStatus(messageData); // Call updateStatus with the new data
});
