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
              <div class="visit-site mt-2 mb-3" style="font-size: 0.75rem;">
                <a href="https://weektodo.me" target="_blank">{{$t('about.site')}}</a>
              </div>
              </span>
            <div class="d-flex align-self-center">
              <a href="https://blog.weektodo.me" target="_blank" title="Blog"> <i class="bi-rss mx-2"></i></a>
              <a href="https://t.me/weektodo" target="_blank" title="Telegram"> <i class="bi-telegram mx-2"></i></a>
              <a href="https://twitter.com/weektodo" target="_blank" title="Twitter"> <i
                class="bi-twitter mx-2"></i></a>
              <!-- <a href="https://github.com/Zuntek/WeekToDoWeb" target="_blank" title="Github"> <i
                class="bi-github mx-2"></i></a> -->
              <a href="mailto:contact@weektodo.me"> <i class="bi-envelope mx-2" :title="$t('about.email')"></i></a>
            </div>
          </div>
          <div class="horizontal-divider mt-3 mb-3"></div>
          <div>
            <div style="margin-top: 10px">
              <div class="row">
                <a href="https://manuelernestog.github.io" target="_blank" class="row" style="text-decoration: none">
                  <div class="col-md-3">
                    <img class="logo align-self-center" src="Avatar.webp" alt="Manuel Ernesto Garcia"
                         title="Manuel Ernesto Garcia" width="64">
                  </div>
                  <div class="col-md-9 pt-3">
                    <h6 class="mb-1">{{$t('about.devName')}}</h6>
                    <div style="font-size: 0.7rem; opacity: .7;"> {{$t('about.dev')}}</div>
                  </div>
                </a>
              </div>
              <div class="horizontal-divider mt-3 mb-2"></div>
              <div class="text-center text-uppercase px-2 d-flex justify-content-center flex-wrap" style="font-size: 0.8rem; opacity: .8; line-height: 20px">
                <span class="mx-2" @click="showSponsors" data-bs-dismiss="modal" style="cursor: pointer"> {{$t('about.sponsors')}} </span>
                <span class="mx-2" @click="showContributors" data-bs-dismiss="modal" style="cursor: pointer"> {{$t('about.contributors')}} </span>
                <span class="mx-2" @click="showCollaborators" data-bs-dismiss="modal" style="cursor: pointer"> {{$t('about.collaborators')}} </span>
              </div>
              <div class="horizontal-divider mt-2 mb-3"></div>
              <div class="d-flex">
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

  <contributors-modal ref="contributorsModal"></contributors-modal>
  <sponsor-modal ref="sponsorsModal"></sponsor-modal>
  <collaborators-modal ref="collaboratorsModal"></collaborators-modal>
</template>

<script>
    import contributorsModal from "./contributorsModal";
    import sponsorModal from "./sponsorModal";
    import collaboratorsModal from "./collaboratorsModal";
    import version_json from '../../public/version.json'
    import {Modal} from 'bootstrap';

    export default {
        name: "aboutModal",
        data() {
            return {
                version: version_json.version
            }
        },
        components: {
            contributorsModal,
            sponsorModal,
            collaboratorsModal
        },
        methods: {
            showChangeLog: function () {
                let modal = new Modal(document.getElementById('changeLogModal'));
                modal.show();
            },
            showContributors: function () {
                this.$refs.contributorsModal.loadContributors();
                let modal = new Modal(document.getElementById('contributorModal'));
                modal.show();
            },
            showCollaborators: function () {
                this.$refs.collaboratorsModal.loadCollaborators();
                let modal = new Modal(document.getElementById('collaboratorModal'));
                modal.show();
            },
            showSponsors: function () {
                this.$refs.sponsorsModal.loadSponsors();
                let modal = new Modal(document.getElementById('sponsorModal'));
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