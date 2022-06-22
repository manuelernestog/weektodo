import configRepository from "../repositories/configRepository";

export default {
    migrate() {
        configCheckUpdate();
        configCalendarZoomColumnsCalendarHeight();
        configNotifications();
        runInBackground()
    }
}

function configCheckUpdate() {
    let config = configRepository.load();
    if (!('checkUpdates' in config)) {
        config['checkUpdates'] = true;
        configRepository.update(config);
    }
}

function configCalendarZoomColumnsCalendarHeight() {
    let config = configRepository.load();
    if (!('calendar' in config)) {
        config['calendar'] = true;
        config['zoom'] = 100;
        config['columns'] = 5;
        config['calendarHeight'] = "calc(50% - 35px)";
        configRepository.update(config);
    }
}

function configNotifications() {
    let config = configRepository.load();
    if (!('startupNotification' in config)) {
        config['notificationOnStartup'] = true;
        config['notificationSound'] = "pop";
        config['openOnStartup'] = true;
        configRepository.update(config);
    }
}

function runInBackground() {
    let config = configRepository.load();
    if (!('runInBackground' in config)) {
        config['runInBackground'] = true;
        config['moveOldTasks'] = true;
        configRepository.update(config);
    }
}