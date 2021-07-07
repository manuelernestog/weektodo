import configRepository from "../repositories/configRepository";

export default {
    migrate() {
        configCheckUpdate();
        configCalendarZoomColumns();
    }
}

function configCheckUpdate() {
    let config = configRepository.load();
    if (!('checkUpdates' in config)) {
        config['checkUpdates'] = true;
        configRepository.update(config);
    }
}

function configCalendarZoomColumns() {
    let config = configRepository.load();
    if (!('calendar' in config)) {
        config['calendar'] = true;
        config['zoom'] = 100;
        config['columns'] = 5;
        configRepository.update(config);
    }
}