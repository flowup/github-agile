'use strict'

//const {ownerName, repoName} = pageDetect.getOwnerAndRepo();
//const getUsername = () =>document.querySelector$('meta[name="user-login"]').attr('content');

document.addEventListener('DOMContentLoaded', () => {
    gitHubInjection(window, () => {
        if (pageDetect.isProject()) {
            board.setup();
        }
    });
});