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
            <h5 style="margin-top: 15px; margin-bottom: 2px;">WeekToDo</h5>
            <span class="mt-1" style="font-size: 0.75rem">{{$t('about.version')}} {{version}} •
              <span style="font-size: 0.75rem; cursor: pointer; opacity: .7;"
                    data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#changeLogModal">
                {{ $t("ui.changeLog") }}
              </span>
            </span>
            <span>
              <div class="visit-site mt-2" style="font-size: 0.75rem;" @click="openWebSite()">{{$t('about.site')}}</div>
              </span>
          </div>
          <div class="horizontal-divider mt-3 mb-3"></div>
          <div>
            <div style="margin-top: 10px">
              <div class="row">
                <a href="https://manuelernestogr.bio.link/" target="_blank" class="row" style="text-decoration: none">
                  <div class="col-md-3">
                    <img class="logo align-self-center" src="Avatar.png" alt="Manuel Ernesto Garcia"
                         title="Manuel Ernesto Garcia" width="64">
                  </div>
                  <div class="col-md-9 pt-3">
                    <h6 class="mb-1">{{$t('about.devName')}}</h6>
                    <div style="font-size: 0.7rem; opacity: .7;"> {{$t('about.dev')}}</div>
                  </div>
                </a>
              </div>
              <div class="horizontal-divider mt-3 mb-3"></div>
              <div class="row">
                <div class="text-center text-uppercase" style="font-size: 0.8rem; opacity: .8;">
<!--                  <span> Patrocinadores </span>-->
<!--                  <span class="mx-1"> • </span>-->
                  <span @click="showContributors" data-bs-dismiss="modal" style="cursor: pointer"> {{$t('about.contributors')}} </span>
                </div>
              </div>
              <div class="horizontal-divider mt-3 mb-3"></div>
              <div class="d-flex" >
                <span style="margin-top: 10px; margin-right: 10px;">{{$t('about.madeWith')}} <i class="bi-heart-fill"
                                                                                                style="color: red"></i> {{$t('about.inCuba')}}</span>
                <button type="button" class="btn flex-fill" data-bs-dismiss="modal" data-bs-toggle="modal"
                        data-bs-target="#donateModal">{{$t('donate.contribute')}}
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
            },
            showContributors: function () {
                let modal = new Modal(document.getElementById('contributorModal'));
                modal.show();
            }
        }
    }
</script>

<style scoped>
  .modal-dialog {
    max-width: 360px;
  }

  a, a:hover {
    color: unset;
  }

  .visit-site {
    cursor: pointer;
  }

</style>