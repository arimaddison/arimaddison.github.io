const TAGS = ['Godot', 'GameMaker', 'Tabletop', 'PC', 'Mobile'/*'Unity', 'Unreal Engine'*/]
var tags_selected = []


const redrawTags = () => {
    if (document.getElementById('tags') === null) return;

    document.getElementById('tags').innerHTML = '<div class="filter-label">Filter:</div>' + TAGS.map((i) => `<div class="filter-button${tags_selected.includes(i) ? ' bold' : ''}">${i}</div>`).join('')

    for (i of document.getElementById('tags').children) {
        i.addEventListener('click', (e) => {
            var self = e.target

            if (tags_selected.includes(self.innerHTML)) {
                tags_selected = tags_selected.filter((j) => j !== self.innerHTML)
            }
            else {
                tags_selected.push(self.innerHTML)
            }

            redrawTags();
            updateCards();
        })
    }
}

const createElementFromHTML = (htmlString) => {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    return div.firstChild;
}

const updateCards = () => {
    var even = false
    var allHidden = true;

    CARDS.forEach((i) => {
        if (tags_selected.length === 0 || tags_selected.every((tag) => i.tags.includes(tag))) {
            i.node.style.display = 'flex'
            i.node.style['flex-direction'] = even ? 'row' : 'row-reverse'

            even = !even
            allHidden = false;
        }
        else {
            i.node.style.display = 'none'
        }
    })

    // document.getElementById('no-cards-message').style.display = allHidden ? 'block' : 'none'
}


document.addEventListener('DOMContentLoaded', () => {
    // redrawTags();
    
    CARDS.forEach((i) => {
        i.node = createElementFromHTML(
            `<a href="${i.url}"><div class="image" style="background-image: url('${i.image}');"></div><div class="text"><h2>${i.name}</h2><p>${i.description}</p><p class="grey">#${i.tags.join('  #')}</p></div></a>`
        )

        document.getElementById('cards').appendChild(i.node)
    })

    updateCards();

    // document.getElementById('reset-filters').addEventListener('click', () => {
    //     tags_selected = []

    //     redrawTags();
    //     updateCards();
    // })
})