<template>
  <div class="modal  fade" id="contributorModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{$t('about.contributors')}}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <div>
            <div >
              <div v-for="contributor in contributors" :key="contributor.name" class="row mt-3 mb-2">
                <a :href="contributor.url" target="_blank" class="row" style="text-decoration: none">
                  <div class="col-md-2">
                    <img class="logo align-self-center" :src="contributor.img"
                         width="38" style="border-radius: 20px">
                  </div>
                  <div class="col-md-10 pt-1">
                    <h6 class="mb-1">{{contributor.name}}</h6>
                    <div style="font-size: 0.7rem; opacity: .7;"> {{contributor.role}}</div>
                  </div>
                </a>
              </div>
              <div class="horizontal-divider mt-3 mb-3"></div>
            </div>
          </div>
        </div>
        <div class="d-flex" style="margin-top: 10px">
          <button type="button" class="btn flex-fill" data-bs-dismiss="modal" data-bs-toggle="modal"
                  data-bs-target="#donateModal">{{$t('donate.contribute')}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "aboutModal",
        data() {
            return {
                contributors: [
                    {
                        name: "Paolo Barbujani (aka Bujo)",
                        role: "Translator - Italian",
                        url: "https://www.instagram.com/imbujo/",
                        img: "https://i.ibb.co/8sTfSJs/bujo.jpg"
                    },
                    {
                        name: "Mohamed Mansour",
                        role: "Translator - Arabic",
                        url: "https://github.com/itsmohmans",
                        img: "https://avatars.githubusercontent.com/u/55551984?v=4"
                    },
                    {
                        name: "Jakub Jaroński",
                        role: "Translator - Polish",
                        url: "https://github.com/Krotosz6",
                        img: "https://avatars.githubusercontent.com/u/91122443?v=4"
                    }
                ]
            }
        },
        methods: {}
    }
</script>

<style scoped>
  .modal-dialog {
    max-width: 360px;
  }

  .modal-body {
    max-height: 300px;
    overflow: auto;
    padding-bottom: 0px;
  }

  a, a:hover {
    color: unset;
  }


</style>