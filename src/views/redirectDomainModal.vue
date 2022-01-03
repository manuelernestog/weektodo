<template>
  <div class="modal  fade" id="RedirectDomainModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
<!--          <h5 class="modal-title">{{$t('tips.tips')}}</h5>-->
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body d-flex">
     Esta abrindo week todo desde no es loco cambia y deja la tall
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "RedirectDomainModal",
        data() {
            return {
                index: 0
            }
        },
    }
</script>

<style scoped>
  .modal-dialog {
    max-width: 400px;
  }

  .modal-body {
    height: 100px;
  }

  .bi-info-circle {
    background: -webkit-linear-gradient(180deg, rgba(89, 66, 141, 1) 0%, rgba(114, 78, 156, 1) 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .dark-theme .bi-info-circle {
    background: -webkit-linear-gradient(180deg, rgb(115, 75, 176) 0%, rgb(147, 110, 203) 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }


</style>