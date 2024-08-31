document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname;
    const basePath = currentPath.split('/')[1];
    
    // Fetch the userId from the server-side session
    // const userId = '<%= req.session.userId %>'; // This is server-side interpolation
    // console.log(userId);
    
    // Determine where to redirect based on the current path and session data
    const ayerKerohLink = document.getElementById('linkAyerKeroh');
    const durianTunggalLink = document.getElementById('linkDurianTunggal');
    
    if (basePath === 'history' ) {
        ayerKerohLink.href = `/history/ayerkeroh`;
        durianTunggalLink.href = `/history/duriantunggal`;
    }else if(basePath === 'graph'){
        ayerKerohLink.href = `/graph/ayerkeroh`;
        durianTunggalLink.href = `/graph/duriantunggal`;       
    } else {
        ayerKerohLink.href = `/ayerkeroh`;
        durianTunggalLink.href = `/duriantunggal`;
    }
});
