<template>
  <div class="modal fade" id="customListRemoveModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <i class="bi-clipboard-x" style="font-size: 50px; color: red"></i>
          <h6 class="modal-title"> Estas seguro que deseas eliminar la lista {{listId}}?</h6>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "removeCustomList",
        computed:{
            listId: function () {
                if (this.$store.state.actions.cListToRmv){
                    return this.$store.state.actions.cListToRmv.name;
                }
                return null;
            }
        }
    }
</script>

<style scoped>

</style>