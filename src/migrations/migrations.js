import configRepository from "../repositories/configRepository";

export default {
    migrate() {
        configCheckUpdate();
        configCalendar();
    }
}

function configCheckUpdate() {
    let config = configRepository.load();
    if (!('checkUpdates' in config)) {
        config['checkUpdates'] = true;
        configRepository.update(config);
    }
}

function configCalendar() {
    let config = configRepository.load();
    if (!('calendar' in config)) {
        config['calendar'] = true;
        configRepository.update(config);
    }
}