<template>
    <div :id="id" class="toast fade hide" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{text}}
          <span v-if="subText" class="sub-text" @click="subTextClick"> {{subText}}</span>
        </div>
        <i class="bi-x me-2 m-auto close-toast" data-bs-dismiss="toast" aria-label="Close"></i>
      </div>
    </div>
</template>

<script>
    import {Toast} from 'bootstrap';

    export default {
        name: "toastMessage",
        emits: ['subTextClick'],
        props: {
            text: {type: String, required: true},
            subText: {type: String, required: false},
            id: {type: String, required: true},
        },
        methods: {
            show: function () {
                var toast = new Toast(document.getElementById(this.id));
                toast.show();
            },
            subTextClick: function () {
                this.$emit("subTextClick");
            }
        }
    }
</script>

<style scoped>
  .sub-text {
    font-weight: bold;
    margin-left: 5px;
    cursor: pointer;
  }

</style>