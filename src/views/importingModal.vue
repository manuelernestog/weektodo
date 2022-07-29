<template>
  <div class="modal  fade" :id="id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body d-flex align-items-center justify-content-center">
          <div class="loading-spinner">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div> {{ text }} </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "importingModal",
  props: {
    text: { type: String, required: true },
    id: { type: String, required: true },
  },
}


</script>

<style scoped>
.loading-spinner {
  position: relative;
  top: unset;
  height: unset;
  margin: unset;
  margin-right: 20px;
}

.modal-dialog {
  max-width: 250px;
}

.modal-body {
  height: 70px;
}

.modal-content {
  padding: 10px 20px 10px 20px;
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