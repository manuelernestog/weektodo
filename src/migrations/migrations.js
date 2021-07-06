import configRepository from "../repositories/configRepository";

export default {
    migrate() {
        configCheckUpdate();
        configCalendar();
        configZoomAndColums();
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

function configZoomAndColums() {
    let config = configRepository.load();
    if (!('zoom' in config)) {
        config['zoom'] = 100;
        config['columns'] = 5;
        configRepository.update(config);
    }
}