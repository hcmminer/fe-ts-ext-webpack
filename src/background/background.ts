import browser, {Runtime} from 'webextension-polyfill';
import translator from "../trans/index.js";
import {TranslationRequest} from "../types/TranslationRequest";
import {TranslationResponse} from "../types/TranslationResponse";
import MessageSender = Runtime.MessageSender;

(async function backgroundInit() {
    try {
        addMessageListener(); // listen message from content script for handle translate & tts
    } catch (error) {
        console.log(error);
    }
})();

function addMessageListener() {
    browser.runtime.onMessage.addListener(
        function (
            request: TranslationRequest,
            sender: MessageSender,
            sendResponse: (response: TranslationResponse) => void // Allowing a response object
        ) {
            (async () => {
                if (request.type === "translateText" && request.text) {
                    try {
                        const translation = await translator["googleWeb"].translate(
                            request.text,
                            request.sourceLang,
                            request.targetLang
                        );
                        const response = {
                            success: !!translation,
                            action: translation ? "displayTranslation" : undefined,
                            targetText: translation?.targetText,
                            sourceLang: translation?.detectedLang,
                            transliteration: translation?.transliteration,
                            error: translation ? undefined : "Translation failed"
                        };
                        sendResponse(response);
                    } catch (error) {
                        sendResponse({
                            success: false,
                            error: error.message,
                        });
                    }
                }
            })();
            return true;
        }
    );
}
