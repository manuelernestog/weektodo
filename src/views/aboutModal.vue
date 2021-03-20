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
          <div class="row">
            <div class="col-md-3 d-flex flex-column " style="text-align: center; margin-top: 30px;">
              <img class="logo align-self-center" src="WeekToDo-Logo-Color.svg" alt="WeekToDo" title="WeekToDo Logo"
                   width="110">
              <h5 style="margin-top: 20px; margin-bottom: 2px;">WeekToDo</h5>
              <span style="font-size: 0.75rem">{{$t('about.version')}} {{version}}</span>
            </div>
            <div class="col-md-9" style="padding-left: 40px;">
              <div style="margin-top: 10px">
                <span>{{$t('about.desc')}} <a href="#"><b>{{$t('about.site')}} <i
                  class="bi-globe2"></i></b></a></span>
                <div class="horizontal-divider mt-3 mb-3"></div>
                <div class="row">
                  <div class="col-md-3">
                    <img class="logo align-self-center" src="Avatar.png" alt="WeekToDo" width="70"
                    >
                  </div>
                  <div class="col-md-8 pt-3">
                    <span>{{$t('about.dev')}}</span>
                    <h6 style="margin-top: 5px">Manuel Ernesto García</h6>
                  </div>
                </div>
                <div class="d-flex" style="margin-top: 30px">
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
  </div>
</template>

<script>
    import version_json from '../../public/version.json'

    export default {
        name: "aboutModal",
        data() {
            return {
                version: version_json.version
            }
        },
        methods: {}
    }
</script>

<style scoped>
  .modal-dialog {
    max-width: 600px;
  }

  a, a:hover {
    color: unset;
  }

</style>