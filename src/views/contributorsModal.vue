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
            <div style="margin-top: 10px">
              <div class="row">
                <a href="https://manuelernestogr.bio.link/" target="_blank" class="row" style="text-decoration: none">
                  <div class="col-md-2">
                    <img class="logo align-self-center" src="Avatar.png" width="36">
                  </div>
                  <div class="col-md-10 pt-2">
                    <h6 class="mb-1">{{$t('about.devName')}}</h6>
                  </div>
                </a>
              </div>
              <div class="horizontal-divider mt-3 mb-3"></div>
              <div class="d-flex" style="margin-top: 10px">
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
    export default {
        name: "aboutModal",
        data() {
            return {

            }
        },
        methods: {
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