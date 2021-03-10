import storageRepository from "./storageRepository";

export default {
    load() {
        let config = storageRepository.get('config');
        if (config) {
            return config;
        } else {
            let default_config = {
                darkMode: false,
                customList: true,
                firstTimeOpen: true,
                language: 'en'
            }
            storageRepository.set('config', default_config);
            return default_config;
        }
    },
    update(config) {
        storageRepository.set('config',config);
    }
};