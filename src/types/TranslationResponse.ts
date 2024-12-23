export interface TranslationResponse {
    success?: boolean;
    error?: any,
    action?: string;
    targetText?: string;
    detectedLang?: string;
    transliteration?: string;
    sourceLang?: string;
    targetLang?: string;
    dict?: any;  // Bạn có thể thay đổi `any` thành kiểu dữ liệu cụ thể hơn nếu cần
    imageUrl?: string;
    pronunciation?: string | null;
}