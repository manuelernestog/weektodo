<template>
  <div class="modal fade" :id="id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex flex-row">
            <i :class="ico" class="main-icon" style="font-size: 38px; margin-right: 30px"></i>
            <div style="margin-top: 2px">
              <h6 class="modal-title">{{ title }}</h6>
              <text class="modal-title" style="font-size: 0.9rem">
                {{ text }}
              </text>
            </div>
          </div>
        </div>
        <div class="horizontal-divider"></div>
        <div class="modal-footer d-flex">
          <button type="button" class="btn flex-fill" data-bs-dismiss="modal"
            :data-bs-target="'#' + id" @click="onCancel"> {{ $t("ui.cancel") }} </button>
          <button type="button" class="btn flex-fill" data-bs-dismiss="modal"  @click="onOk"> {{
              okText
          }} </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comfirmModal",
  props: {
    id: { required: true },
    title: { required: true },
    text: { required: true },
    okText: { required: true },
    ico: { required: true },
  },
  methods: {
    onOk: function () { this.$emit("onOk"); },
    onCancel: function () { this.$emit("onCancel"); }
  }
};
</script>

<style scoped>
.modal-content {
  border: none;
  border-radius: 0.4rem;
  padding: 10px 20px;
}

.dark-theme .modal-content {
  background-color: #21262d;
  border: 1px solid #30363d;
}

.main-icon {
  margin-top: 5px;
  background: -webkit-linear-gradient(180deg,
      rgba(89, 66, 141, 1) 0%,
      rgba(114, 78, 156, 1) 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark-theme .main-icon {
  background: -webkit-linear-gradient(180deg,
      rgb(115, 75, 176) 0%,
      rgb(147, 110, 203) 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>