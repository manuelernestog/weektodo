<template>

  <toast-message id="versionChanges" :text="$t('ui.softwareUpdated')" :sub-text="$t('ui.seeChanges')"></toast-message>
</template>

<script>
    import version_json from '../../public/version.json'
    import configRepository from "../repositories/configRepository";
    import toastMessage from "./toastMessage";
    import {Toast} from 'bootstrap';

    export default {
        name: "updateCheck",
        components: {
            toastMessage
        },
        data() {
            return {
                changes: version_json.changes
            }
        },
        mounted() {
            if (version_json.version != this.$store.state.config.version) {
                this.$store.commit('updateConfigVersion', version_json.version);
                configRepository.update(this.$store.state.config);
                var toast = new Toast(document.getElementById('versionChanges'));
                toast.show();
            }
        }
    }
</script>

<style scoped>

</style>