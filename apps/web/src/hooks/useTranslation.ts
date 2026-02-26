import { useSettings } from '../context/SettingsContext';
import { translations, TranslationKeys } from '../i18n/translations';

export const useTranslation = () => {
    const { settings } = useSettings();
    const t = (translations[settings.language] || translations.es) as TranslationKeys;

    return { t, language: settings.language };
};
