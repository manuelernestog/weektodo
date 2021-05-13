<template>
  <div class="modal  fade" id="aboutModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{$t('about.about')}}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <div class=" d-flex flex-column " style="text-align: center; margin-top: 10px;">
            <img class="logo align-self-center" src="WeekToDo-Logo-Color.svg" alt="WeekToDo" title="WeekToDo Logo"
                 width="64">
            <h5 style="margin-top: 18px; margin-bottom: 2px;">WeekToDo</h5>
            <span class="mt-1" style="font-size: 0.75rem">{{$t('about.version')}} {{version}} •
              <span style="font-size: 0.75rem; cursor: pointer; opacity: .7;"
                       data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#changeLogModal">
                {{ $t("ui.changeLog") }}
              </span></span>
          </div>
          <div class="horizontal-divider mt-3 mb-3"></div>
          <div>
            <div style="margin-top: 10px">
                <div style="font-size: 0.9rem; text-align: center; opacity: .8;">
                  {{$t('about.desc')}}
                  <b class="visit-site" @click="openWebSite()">{{$t('about.site')}} <i class="bi-globe2"></i></b></div>
              <div class="horizontal-divider mt-3 mb-3"></div>
              <div class="row">
                <div class="col-md-3">
                  <img class="logo align-self-center" src="Avatar.png" alt="WeekToDo" width="64" >
                </div>
                <div class="col-md-8 pt-3">
                  <span>{{$t('about.dev')}}</span>
                  <h6 style="margin-top: 4px">{{$t('about.devName')}}</h6>
                </div>
              </div>
              <div class="horizontal-divider mt-3 mb-3"></div>
              <div class="d-flex" style="margin-top: 10px">
                  <span style="margin-top: 10px; margin-right: 10px;">{{$t('about.madeWith')}} <i class="bi-heart-fill"
                                                                                                  style="color: red"></i> {{$t('about.inCuba')}} 2021</span>
                <button type="button" class="btn flex-fill" data-bs-dismiss="modal" data-bs-toggle="modal"
                        data-bs-target="#donateModal">{{$t('donate.donate')}}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import version_json from '../../public/version.json'
    import {Modal} from 'bootstrap';

    export default {
        name: "aboutModal",
        data() {
            return {
                version: version_json.version
            }
        },
        methods: {
            openWebSite: function () {
                let isElectron = require("is-electron");
                if (isElectron()) {
                    require('electron').shell.openExternal('https://weektodo.netlify.app', '_blank');
                } else {
                    window.open('https://weektodo.netlify.app', '_blank');
                }
            },
            showChangeLog: function () {
                let modal = new Modal(document.getElementById('changeLogModal'));
                modal.show();
            }
        }
    }
</script>

<style scoped>
  .modal-dialog {
    max-width: 400px;
  }

  a, a:hover {
    color: unset;
  }

  .visit-site {
    cursor: pointer;
  }

</style>