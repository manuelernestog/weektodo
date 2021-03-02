<template>
  <div class="modal  fade" id="aboutModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">About</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-3 d-flex flex-column " style="text-align: center; margin-top: 30px;">
              <img class="logo align-self-center" src="WeekToDo-Logo-Color.svg" alt="WeekToDo" title="WeekToDo Logo"
                   width="110">
              <h5 style="margin-top: 20px; margin-bottom: 2px;">WeekToDo</h5>
              <span style="font-size: 0.75rem">Version 1.0.0</span>
            </div>
            <div class="col-md-9" style="padding-left: 40px;">
              <div style="margin-top: 10px">
                <span>Free Minimalist Weekly Planer Focus on Privacy. <a href="#"><b>Visit Web Site <i
                  class="bi-globe2"></i></b></a></span>
                <div class="horizontal-divider mt-3 mb-3"></div>
                <div class="row">
                  <div class="col-md-2">
                    <img class="logo align-self-center" src="Avatar.jpg" alt="WeekToDo" width="50"
                         style="border-radius: 40px">
                  </div>
                  <div class="col-md-10 pt-1">
                    <span>Developed and Designed by</span>
                    <h6 style="margin-top: 5px">Manuel Ernesto García</h6>
                  </div>
                </div>
                <div class="d-flex" style="margin-top: 30px">
                  <span style="margin-top: 10px; margin-right: 10px;">Hecho con <i class="bi-heart-fill"
                                                                                   style="color: red"></i> en Cuba {{new Date().getFullYear()}}</span>
                  <button type="button" class="btn flex-fill" data-bs-dismiss="modal" data-bs-toggle="modal"
                          data-bs-target="#donateModal">Donate
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

    export default {
        name: "aboutModal",
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>
  .btn:hover {
    background-color: #eaecef;
  }

  .btn:active {
    background-color: #d0d2d5;
  }

  .btn:focus {
    box-shadow: none;
  }

  .dark-theme .btn {
    color: #c9d1d9;
  }

  .dark-theme .btn:hover {
    color: #c9d1d9;
    background-color: #2e353d;
  }

  .dark-theme .btn:active {
    color: #c9d1d9;
    background-color: #343b43;
  }

  .modal-dialog {
    max-width: 600px;
  }

</style>