document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.code.toLowerCase() === 'space') {
        setColour();
    }
})


document.addEventListener('click', event => {
    const type = event.target.dataset.type;

    if (type === 'lock') {
        const node =
        event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    }

})

const generateColour = (alpha = false) => {
    const hexSymbols = '0123456789ABCDEF';
    let colourCode = '';
    for (let i = 0; i < 6; i++) {
        colourCode += hexSymbols[Math.floor(Math.random() * hexSymbols.length)];
    }
    
    if (alpha === true) {
        for (let i = 0; i < 2; i++) {
            colourCode += hexSymbols[Math.floor(Math.random() * hexSymbols.length)];
        }
    }
    
    return '#' + colourCode;
} 

const colourColumns = document.querySelectorAll('#colourColumn');

const setColour = (isInitial) => {
    const colours = isInitial ? setColourFromHash() : [];

    colourColumns.forEach((colourColumn, index) => {
        const isLocked = colourColumn.querySelector('i').classList.contains('fa-lock');
        const colourCode = colourColumn.querySelector('#colourCode');
        const lockButtonText = colourColumn.querySelector('i');
        const newColourCode = colourCode.cloneNode();
        
        if (isLocked) {
            colours.push(colourCode.textContent)
            return;
        }

        const newColour = isInitial 
            ? colours[index] 
                ? colours[index]
                : generateColour().toLowerCase()
            : generateColour().toLowerCase();
        if (!isInitial) {
            colours.push(newColour);
        }

        colourColumn.style.backgroundColor = newColour;
        newColourCode.textContent = newColour;
        colourCode.parentElement.replaceChild(newColourCode, colourCode);
        setColourForText(newColourCode, newColour);
        setColourForText(lockButtonText, newColour);
        newColourCode.addEventListener('click', () => {
            copyColorCode(newColour);
            showToast(`${newColour} успешно скопирован!`, newColour);
        });
    });
    updateHashColour(colours);
}

const setColourForText = (text, colour) => {
    const luminance = chroma(colour).luminance();
    text.style.color = luminance < .5 ? '#fff' : '#000';
}

const copyColorCode = (colourCode) => {
    navigator.clipboard.writeText(colourCode);
}

const toastContainer = document.querySelector('#toastContainer')

const showToast = (message, colour) => {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    const colourIcon = document.createElement('div');
    colourIcon.classList.add('colour-icon');
    colourIcon.style.backgroundColor = colour;
    const messageText = document.createElement('div');
    messageText.classList.add('message-text');
    messageText.textContent = message;
    toast.append(colourIcon);
    toast.append(messageText)
    toastContainer.appendChild(toast)

    setTimeout(() =>{
        toast.remove();}, 3000
    )
}

const updateHashColour = (colours = []) => {
    document.location.hash = colours.map(colour => {
        return colour.toString().substring(1)
    }).join('-');
}

const setColourFromHash = () => {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(colour => '#' + colour)
    }
    return [];
}

setColour(true);
