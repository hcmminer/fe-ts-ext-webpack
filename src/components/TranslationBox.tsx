import React, {useEffect, useState, useCallback} from "react";
import {Card, CardHeader, CardContent, CardTitle} from "./ui/card";
import {debounce} from "../utils/debounce";
import {TranslationResponse} from "../types/TranslationResponse";
import {TranslationRequest} from "../types/TranslationRequest";
import browser from "webextension-polyfill";

export const TranslationBox = () => {
    const [translation, setTranslation] = useState<TranslationResponse>(null);

    // Debounced function to handle document click events
    const handleDocumentClick = useCallback(
        debounce(async (event) => {
            const selection = window.getSelection()?.toString().trim();
            if (selection) {
                // Kiểm tra xem extension context có hợp lệ không
                try {
                    const translationRequest: TranslationRequest = {
                        type: "translateText",
                        text: selection,
                        sourceLang: "auto",
                        targetLang: "vi",
                    };
                    const response = await browser.runtime.sendMessage(translationRequest);
                    setTranslation(response);
                } catch (error) {
                    console.error("Error sending message to background script:", error);
                }
            }
        }, 300), // delay của debounce là 300ms, có thể điều chỉnh
        []
    );

    useEffect(() => {
        // Đăng ký sự kiện click
        document.addEventListener("click", handleDocumentClick);

        // Hủy đăng ký sự kiện click khi component unmounts
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [handleDocumentClick]);

    // Chỉ render khi có dữ liệu dịch
    if (!translation) return null;

    return (
        <Card className="shad-fixed shad-bottom-5 shad-right-5 shad-max-w-sm shad-z-50 shad-shadow-lg">
            <CardHeader>
                <CardTitle>Translation</CardTitle>
            </CardHeader>
            <CardContent>
                {translation.targetText && (
                    <p>
                        <strong>Translation:</strong> {translation.targetText}
                    </p>
                )}
                {translation.sourceLang && (
                    <p>
                        <strong>Detected Language:</strong> {translation.sourceLang}
                    </p>
                )}
                {translation.transliteration && (
                    <p>
                        <strong>Transliteration:</strong> {translation.transliteration}
                    </p>
                )}
                {translation.targetLang && (
                    <p>
                        <strong>Target Language:</strong> {translation.targetLang}
                    </p>
                )}
                {translation.dict && (
                    <p>
                        <strong>Dictionary:</strong> {JSON.stringify(translation.dict)}
                    </p>
                )}
                {translation.imageUrl && (
                    <p>
                        <strong>Image URL:</strong>{" "}
                        <a href={translation.imageUrl} target="_blank" rel="noopener noreferrer">
                            {translation.imageUrl}
                        </a>
                    </p>
                )}
                {translation.pronunciation && (
                    <p>
                        <strong>Pronunciation:</strong> {translation.pronunciation}
                    </p>
                )}
                {translation.error && (
                    <p>
                        <strong>Error:</strong> {JSON.stringify(translation.error)}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};
