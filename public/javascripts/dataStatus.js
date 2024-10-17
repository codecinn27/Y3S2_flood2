// function updateStatus(newData) {
//     const statusElement = document.getElementById('status');
//     const statusBoxElement = document.getElementById('statusBox');

//     // Update the status text
//     statusElement.innerText = `Status: ${newData.status}`;

//     // Remove existing gradient classes
//     statusBoxElement.classList.remove(
//         'bg-gradient-to-r', 'from-[#e52d27]', 'to-[#b31217]', 'hover:bg-gradient-to-bl', 'focus:ring-red-100', 'dark:focus:ring-red-400',
//         'from-[#fceabb]', 'to-[#f8b500]', 'focus:ring-yellow-100', 'dark:focus:ring-yellow-400',
//         'from-teal-200', 'to-lime-200', 'focus:ring-lime-200', 'dark:focus:ring-teal-700'
//     );

//     // Add new gradient classes based on status
//     if (newData.status === 'Danger') {
//         statusBoxElement.classList.add('bg-gradient-to-r', 'from-[#e52d27]', 'to-[#b31217]', 'hover:bg-gradient-to-bl', 'focus:ring-red-100', 'dark:focus:ring-red-400');
//     } else if (newData.status === 'Warning') {
//         statusBoxElement.classList.add('bg-gradient-to-r', 'from-[#fceabb]', 'to-[#f8b500]', 'hover:bg-gradient-to-bl', 'focus:ring-yellow-100', 'dark:focus:ring-yellow-400');
//     } else {
//         statusBoxElement.classList.add('bg-gradient-to-r', 'from-teal-200', 'to-lime-200', 'hover:bg-gradient-to-l', 'focus:ring-lime-200', 'dark:focus:ring-teal-700');
//     }
// }

function updateStatus(newData) {
    const statusElement = document.getElementById('status');
    const statusBoxElement = document.getElementById('statusBox');
    const sluiceGateButton = document.getElementById('sluiceGateButton');
    const closeGateButton = document.getElementById('closeGateButton');

    // Update the status text
    statusElement.innerText = `Status: ${newData.status}`;

    // Remove existing gradient classes
    statusBoxElement.classList.remove(
        'bg-gradient-to-r', 'from-[#e52d27]', 'to-[#b31217]', 'hover:bg-gradient-to-bl', 'focus:ring-red-100', 'dark:focus:ring-red-400',
        'from-[#fceabb]', 'to-[#f8b500]', 'focus:ring-yellow-100', 'dark:focus:ring-yellow-400',
        'from-teal-200', 'to-lime-200', 'focus:ring-lime-200', 'dark:focus:ring-teal-700'
    );

    // Add new gradient classes based on status
    if (newData.status === 'Danger') {
        statusBoxElement.classList.add('bg-gradient-to-r', 'from-[#e52d27]', 'to-[#b31217]', 'hover:bg-gradient-to-bl', 'focus:ring-red-100', 'dark:focus:ring-red-400');
        sluiceGateButton.style.display = 'block'; // Show button
        closeGateButton.style.display = 'block'; // Show button
    } else if (newData.status === 'Warning') {
        statusBoxElement.classList.add('bg-gradient-to-r', 'from-[#fceabb]', 'to-[#f8b500]', 'hover:bg-gradient-to-bl', 'focus:ring-yellow-100', 'dark:focus:ring-yellow-400');
        sluiceGateButton.style.display = 'block'; // Show button
        closeGateButton.style.display = 'block'; // Show button
    } else {
        statusBoxElement.classList.add('bg-gradient-to-r', 'from-teal-200', 'to-lime-200', 'hover:bg-gradient-to-l', 'focus:ring-lime-200', 'dark:focus:ring-teal-700');
        closeGateButton.style.display = 'none'; // Hide button
    }
}


updateStatus(dataStatus);