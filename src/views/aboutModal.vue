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
            <div class="col-md-4 p-3 d-flex flex-column" style="text-align: center">
              <img class="logo align-self-center" src="WeekToDo-Logo-Color.svg" alt="WeekToDo" title="WeekToDo Logo"
                   width="110">
              <h5 style="margin-top: 15px; margin-bottom: 2px;">WeekToDo</h5>
              <span style="font-size: 0.75rem">Version 1.0.0</span>
            </div>
            <div class="col-md-8">
              <span>Developed and Designed by:</span>
              <h6>Manuel Ernesto García</h6>
              <h6>From Zuntek Project</h6>
              <h6>Visitar Sitio Web <i class="bi-globe2"></i></h6>
              <div class="modal-footer d-flex" style="margin-top: 50px">
                <button type="button" class="btn flex-fill" data-bs-dismiss="modal">Donar</button>
                <button type="button" class="btn flex-fill" @click="removeCustomList">Enviar Comentario</button>
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