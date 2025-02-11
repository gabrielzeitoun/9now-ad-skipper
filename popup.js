
chrome.storage.local.get({ '9NowAdSkipOn': true }, (data) => {
    let toggle_button = document.getElementById('toggle');
    const adSkipOn =  data['9NowAdSkipOn'];
    toggle_button.textContent = adSkipOn ? 'Turn Off' : 'Turn On';
});

document.getElementById('toggle').addEventListener('click', (e) => {
    // if clicked while 'turn off', it means its not on rn
    const adSkipOn = (e.target.textContent === 'Turn Off'); 
    chrome.storage.local.set({ '9NowAdSkipOn': !adSkipOn}, () => {
        e.target.textContent = adSkipOn ? 'Turn On' : 'Turn Off';
        chrome.tabs.reload();
    });
});

