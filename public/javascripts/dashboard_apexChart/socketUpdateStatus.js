const socket = io();

// function updateStatus(newData) {
//     // Update the status in the DOM
//     const statusElement = document.getElementById('status');
//     // Update the status text
//     statusElement.innerText = `Status: ${newData.status}`;
// }
function updateStatus(newData) {
    const statusElement = document.getElementById('status');
    const buttonElement = statusElement.closest('div');

    // Update the status text
    statusElement.innerText = `Status: ${newData.status}`;

    // Remove existing gradient classes
    buttonElement.classList.remove(
        'bg-gradient-to-r', 'from-[#e52d27]', 'to-[#b31217]', 'hover:bg-gradient-to-bl', 'focus:ring-red-100', 'dark:focus:ring-red-400',
        'from-[#fceabb]', 'to-[#f8b500]', 'focus:ring-yellow-100', 'dark:focus:ring-yellow-400',
        'from-teal-200', 'to-lime-200', 'focus:ring-lime-200', 'dark:focus:ring-teal-700'
    );

    // Add new gradient classes based on status
    if (newData.status === 'Danger') {
        buttonElement.classList.add('bg-gradient-to-r', 'from-[#e52d27]', 'to-[#b31217]', 'hover:bg-gradient-to-bl', 'focus:ring-red-100', 'dark:focus:ring-red-400');
    } else if (newData.status === 'Warning') {
        buttonElement.classList.add('bg-gradient-to-r', 'from-[#fceabb]', 'to-[#f8b500]', 'hover:bg-gradient-to-bl', 'focus:ring-yellow-100', 'dark:focus:ring-yellow-400');
    } else {
        buttonElement.classList.add('bg-gradient-to-r', 'from-teal-200', 'to-lime-200', 'hover:bg-gradient-to-l', 'focus:ring-lime-200', 'dark:focus:ring-teal-700');
    }
}


socket.on('mqtt-message', (data3) => {
    if(data3.topic === `zteFlood/flood/melaka/${data.id}`){
        const messageData = JSON.parse(data3.message);    
        updateStatus(messageData);
        
    }
});
