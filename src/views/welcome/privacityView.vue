<template>
  <div class="row" style="height: 170px">
    <div class="col-md-4">
      <div class="icon-container">
        <i class="bi-exclamation-triangle"></i>
      </div>
    </div>
    <div class="col-md-8">
      <div>
        <h4> Privacidad</h4>
        <div class="mb-1">
          WeekToDo almacena la información en tu equipo. Si eventualmente deseas cambiar de equipo o navegador recuerda
          crear una copia de seguridad.
        </div>
        <span class="sub-header"> Puedes crear una copia de seguriad en el menu de configuracion.</span>
      </div>
    </div>
  </div>
  <div class="d-flex btn-footer">
    <button type="button" class="btn flex-fill" @click="back"><i class="bi-chevron-double-left"></i> Anterior</button>
    <button type="button" class="btn flex-fill" @click="next">Siguiente <i class="bi-chevron-double-right"></i></button>
  </div>

</template>

<script>

    export default {
        name: "backupView",
        data() {
            return {
                darkTheme: this.$store.state.config.darkTheme
            }
        },
        methods: {
            next: function () {
                document.getElementById('welcome-4-tab').click();
            },
            back: function () {
                document.getElementById('welcome-2-tab').click();
            }
        }
    }
</script>

<style scoped>

  .form-check-input {
    width: 2.8em !important;
    height: 1.4em !important;
  }

  .bi-sun {
    margin-right: 15px;
  }

  .form-check-label i {
    font-size: 2rem;
    /*margin: 5px;*/
  }

  .icon-container i {
    font-size: 6rem;
    background: -webkit-linear-gradient(180deg, rgba(89, 66, 141, 1) 0%, rgba(114, 78, 156, 1) 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .dark-theme .icon-container i {
    color: #f3f3f3;
    background: -webkit-linear-gradient(180deg, rgb(115, 75, 176) 0%, rgb(147, 110, 203) 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .icon-container {
    margin-top: 20px;
    margin-left: 20px;
  }

  .btn-footer {
    border-top: 1px solid #dee2e6;
    padding-top: 6px
  }

  .dark-theme .btn-footer {
    border-top: 1px solid #999da1;
  }

  .sub-header {
    font-size: 0.9rem;
    font-style: italic;
  }

  .sub-header i {
    margin-left: 5px;
  }


</style>