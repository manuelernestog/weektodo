<template>
  <div class="modal  fade" id="toDoModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"> {{ $t("settings.settings") }}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          todo modal
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "toDoModal",
        data() {
            return {

            }
        },
        methods: {
        }
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
    max-width: 500px;
  }


</style>