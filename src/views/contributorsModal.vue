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
            <div>
              <div class="col-md-12 my-3 " v-for="(contributor,index) in contributorsList" :key="index">
                <a class="d-flex align-items-center" :href="contributor.url" target="_blank"
                   style="text-decoration: unset;">
                  <img :src="contributor.img" style="border-radius: 15px; height: 42px; width: 42px; ">
                  <div class="align-content-start mx-3 card-text">
                    {{contributor.name}}
                  </div>
                  <div style="margin-left: auto; color: #a52b00;"><strong> +{{contributor.contribution}} 💚 </strong>
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
                contributorsList: []
            }
        },
        methods: {
            loadContributors: function () {
                if (this.contributorsList.length == 0) {
                    const axios = require('axios').default;
                    axios.get('https://support.weektodo.me/data/contributors.json')
                        .then(response => (this.renderContributors(response)))
                        .catch(error => console.log(error.message))
                }
            },
            renderContributors: function (response) {
                var data = response.data;
                data.sort(function (a, b) {
                    if (a.contribution < b.contribution) {
                        return 1;
                    }
                    if (a.contribution > b.contribution) {
                        return -1;
                    }
                    return 0;
                });
                this.contributorsList = data;
            }
        }
    }
</script>

<style scoped>
  .modal-dialog {
    max-width: 360px;
  }

  .modal-body {
    max-height: 400px;
    overflow: auto;
    padding-bottom: 0px;
  }

  a, a:hover {
    color: unset;
  }


</style>