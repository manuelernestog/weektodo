<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
    <div :id="id" class="toast " role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{text}}
        </div>
        <i class="bi-x me-2 m-auto close-toast" data-bs-dismiss="toast" aria-label="Close"></i>
      </div>
    </div>
  </div>
</template>

<script>
    import {Toast} from 'bootstrap';

    export default {
        name: "toastMessage",
        props: {
            text: {type: String, required: true},
            id: {type: String, required: true},
        },
        methods: {
            show: function () {
                var toast = new Toast(document.getElementById(this.id));
                toast.show();
            }
        }
    }
</script>

<style scoped>

</style>