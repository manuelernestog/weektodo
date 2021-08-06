<template>
  <div class="modal  fade" id="toDoModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"> {{ $t("settings.settings") }}</h5>
          <div class="d-flex header-menu-icons">
            <i class="bi-trash "></i>
            <i class="bi-circle "></i>
            <i class="bi-alarm "></i>
            <i class="bi-arrow-repeat "></i>
            <i class="bi-flag "></i>
            <i class="bi-tag-fill "></i>
            <i class="bi-three-dots-vertical "></i>
          </div>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label">
              Este es el nombre de la tareca esa dios miooooooo asd aksdjh askdjhaskdj haskdj haksjdhaksdjhaskjhaksdjhadk
            </label>
          </div>

          <div class="form-floating">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 150px"></textarea>
            <label for="floatingTextarea2">Detalles</label>
          </div>
          <div class="horizontal-divider mb-4 mt-4"></div>
          <div style="height: 150px">
            Subtarea 1 y la muela y eso que lleva
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "toDoModal",
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>
  .form-check-input {
    width: 2.8em !important;
    height: 1.4em !important;
  }

  .form-check-label {
    width: 220px;
  }

  .icons {
    font-size: 20px;
    margin-right: 5px;
  }

  .form-check-label {
    margin-left: 10px;
    padding-top: 5px;
  }

  .dark-theme .form-select {
    background-color: #15161e;
    border: 1px solid #30363d;
    color: #c9d1d9;
  }

  .form-select:focus {
    box-shadow: none;
  }

  .modal-dialog {
    max-width: 600px;
  }

  .header-menu-icons i {
    font-size: 1.1rem;
    margin-left: 18px;
    color: #6e6e6e;
  }


</style>