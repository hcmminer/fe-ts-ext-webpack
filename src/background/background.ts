import browser from 'webextension-polyfill';
import translator from "../trans/index.js";

(async function backgroundInit() {
    try {
        addMessageListener(); // listen message from content script for handle translate & tts
    } catch (error) {
        console.log(error);
    }
})();

function addMessageListener() {
    browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        (async () => {
            if (request.type === "translateText" && request.text) {
                try {
                    const translation = await translator["googleWeb"].translate(
                        request.text,
                        request.sourceLang,
                        request.targetLang
                    );
                    console.log("translation", translation);

                    const response = {
                        success: !!translation,
                        action: translation ? "displayTranslation" : undefined,
                        targetText: translation?.targetText,
                        sourceLang: translation?.detectedLang,
                        transliteration: translation?.transliteration,
                        error: translation ? undefined : "Translation failed"
                    };
                    sendResponse();
                } catch (error) {
                    sendResponse();
                }
            }
            // Additional message types can go here if necessary
        })();
        return true; // Ensures the async sendResponse works correctly
    });
}
