<template>
  <div class="modal  fade" id="welcomeModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Welcome</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="homeTab" data-bs-toggle="tab" data-bs-target="#info-1"
                      role="tab">1
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" ref="btcTab" data-bs-toggle="tab" data-bs-target="#info-2"
                      role="tab">2
              </button>
            </li>
          </ul>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="info-1">
              asd
            </div>
            <div class="tab-pane fade" id="info-2">
              asd2
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
  .modal-dialog {
    max-width: 600px;
  }

</style>