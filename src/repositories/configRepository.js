import storageRepository from "./storageRepository";
import version_json from '../../public/version.json'

export default {
    load() {
        let config = storageRepository.get('config');
        if (config) {
            return config;
        } else {
            let default_config = {
                darkMode: false,
                customList: true,
                calendar: true,
                firstTimeOpen: true,
                language: 'en',
                version: version_json.version,
                checkUpdates: true,
            }
            storageRepository.set('config', default_config);
            return default_config;
        }
    },
    update(config) {
        storageRepository.set('config',config);
    }
};