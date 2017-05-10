window.board = (() => {

    let observer = null;

    function getColumns() {
        return document.querySelectorAll('.js-project-column');
    }

    function getColumnCards(column) {
        return column.getElementsByClassName('issue-card');
    }

    function getCardInfo(card) {
        return [...card.querySelectorAll('.issue-card-label')].reduce((acc, labelNode) => {
            const label = labelNode.textContent;

            let info = label.split(':');
            if (info.length < 2) {
                // add all labels as true if they have no value
                acc[info[0].trim()] = true;
            } else {
                // add all labels with : in them to the card info
                acc[info[0].trim()] = info[1].trim();
            }

            return acc;
        }, {});
    }

    function setup() {
        getColumns().forEach((col, i) => {
            // setup estimated and consumed
            let header = col.getElementsByTagName('h4')[0];

            // create estimated counter
            let estimatedCounter = document.createElement('span');
            estimatedCounter.className = 'Counter';
            estimatedCounter.id = 'est-counter-' + i;
            estimatedCounter.textContent = '0';
            estimatedCounter.style['background-color'] = '#bfdadc';
            estimatedCounter.style['color'] = 'white';
            estimatedCounter.style['margin-left'] = '4px';

            header.appendChild(estimatedCounter);

            // create consumed counter
            let consumedCounter = document.createElement('span');
            consumedCounter.className = 'Counter';
            consumedCounter.id = 'con-counter-' + i;
            consumedCounter.textContent = '0';
            consumedCounter.style['background-color'] = '#006b75';
            consumedCounter.style['color'] = 'white';
            consumedCounter.style['margin-left'] = '4px';

            header.appendChild(consumedCounter);

            // create observer for mutations
            observer = new MutationObserver((mutation) => {
                let cards = [...getColumnCards(col)].map((card) => getCardInfo(card));
                let info = cards.reduce((acc, card) => {
                    acc.estimated += card.estimated ? parseInt(card.estimated) : 0;
                    acc.consumed += card.consumed ? parseInt(card.consumed) : 0;
                    return acc;
                }, { estimated: 0, consumed: 0});

                estimatedCounter.textContent = info.estimated.toString();
                consumedCounter.textContent = info.consumed.toString();
            });

            let config = { attributes: true, subtree: true, characterData: true };
            observer.observe(col, config);
        });
    }

    function destroy() {
        // cleanup
        observer.disconnect();
    }

    return {setup, destroy};
})();