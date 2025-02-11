const observerOptions = { subtree: true, childList: true };

const observer = new MutationObserver(skipAds);

function startObserver() {
  observer.observe(document, observerOptions);
}

function skipAds() {
  const adPlaying = document.getElementsByClassName('_2tYyJb _27q-Z2').length == 0; // "Advertisement" banner has these two classes if ad ISN'T playing
  if (adPlaying) {
    console.log('ad detected, skipping...');
    let adElement = document.querySelector('video[title="Advertisement"]');
    const adLength = adElement.duration;
    try {
      adElement.currentTime = adLength; // skipping thru ad by setting currentTime to length of ad
    } catch (err) {
      // error "The provided double value is non-finite" comes up but doesn't affect anything
    }
  }
}

chrome.storage.local.get({ '9NowAdSkipOn': true }, (data) => {
  const adSkipOn = data['9NowAdSkipOn'];
  if (adSkipOn) {
    console.log('9Now ad skipper on, observing for ads...');
    startObserver();
  } else {
    console.log('9Now ad skipper off, NOT observing for ads...');
  }
});
