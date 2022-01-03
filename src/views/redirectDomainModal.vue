<template>
  <div class="modal  fade" id="RedirectDomainModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{$t('settings.data')}}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body d-flex">
          {{ $t("settings.goToNewDomain")}}
        </div>
        <div class="modal-footer d-flex">
          <button type="button" class="btn flex-fill" @click="exportData">
            {{ $t("settings.export")}}
            <i class="bi-cloud-download-fill mx-2"></i>
          </button>
          <a href="https://app.weektodo.me" target="_blank" class="btn flex-fill" >
          {{$t('about.site')}} <i
            class="bi-globe2 mx-2"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    import exportTool from "../helpers/exportTool";

    export default {
        name: "RedirectDomainModal",
        data() {
            return {
                index: 0
            }
        },
        methods: {
            exportData: function () {
                exportTool.export();
            },
        }
    }
</script>

<style scoped>
  .modal-dialog {
    max-width: 550px;
  }

  .bi-info-circle {
    background: -webkit-linear-gradient(180deg, rgba(89, 66, 141, 1) 0%, rgba(114, 78, 156, 1) 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .dark-theme .bi-info-circle {
    background: -webkit-linear-gradient(180deg, rgb(115, 75, 176) 0%, rgb(147, 110, 203) 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }


</style>