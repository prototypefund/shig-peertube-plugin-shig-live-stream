import {ShowPageOptions} from './show-page-options';

async function showLobbyPage({
                                 rootEl,
                                 peertubeHelpers
                             }: ShowPageOptions) {
    // Redirect to login page if not auth
    if (!peertubeHelpers.isLoggedIn()) return (window.location.href = '/login');
    // const loading = await peertubeHelpers.translate("Loading");
    // rootEl.innerHTML = loading + "...";
    rootEl.classList.add('root')
    rootEl.innerHTML = `<div id="wrapper" class="margin-content pb-1 offset-content"></div>`

    const shigLobby = document.createElement('script');
    shigLobby.type = 'text/javascript';
    shigLobby.src = `${peertubeHelpers.getBaseStaticRoute()}/javascript/shig-lobby.js`;
    document.body.appendChild(shigLobby);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const stream = urlParams.get('stream')
    const channel = urlParams.get('channel')

    shigLobby.onload = () => {
        const lobby = document.createElement('shig-lobby');
        lobby.addEventListener('loadComp', (event) => {
            console.log('Component loaded successfully!', event);
        });

        peertubeHelpers.getServerConfig()
        const auth = peertubeHelpers.getAuthHeader();
        lobby.setAttribute('token', auth !== undefined ? auth.Authorization : 'unauthorized');
        lobby.setAttribute('api-prefix', '/plugins/shig-live-stream/router');
        lobby.setAttribute('space', `${channel}`);
        lobby.setAttribute('stream', `${stream}`);

        const wrapper = document.getElementById('wrapper');
        wrapper?.appendChild(lobby);
    };

    return Promise.resolve();
}

export {showLobbyPage};
