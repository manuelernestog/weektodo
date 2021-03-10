<template>
  <div class="row">
    <div class="col-md-5"><img class="qr-payment" :src="qrImg"></div>
    <div class="col-md-7 d-flex flex-column ">
      <div style="margin-top: 20px;">
        <div class="mb-3"><h6 class="d-inline"> Tipo de Pago: </h6> {{payment}}</div>
        <div v-if="paymentAddress">
          <label class="form-label">Direccion: </label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="paymentAddress" readonly>
            <span class="input-group-text" id="basic-addon2" @click="copy">Copy <i class="bi-files"> </i></span>
          </div>
        </div>
      </div>
      <div class="d-flex flex-row-reverse">
        <button class="btn " type="button" @click="goHome">
          <i class="bi-arrow-left a"></i> Ir Atras
        </button>
      </div>
    </div>
  </div>
</template>

<script>
    import {Toast} from 'bootstrap';

    export default {
        name: "paymentDetails",
        props: {
            address: {required: false, type: String},
            payment: {required: true, type: String},
            qrImg: {required: false, type: String},
        },
        data() {
            return {
                paymentAddress: this.address
            }
        },
        methods: {
            async copy() {
                await navigator.clipboard.writeText(this.paymentAddress);
                var toast = new Toast(document.getElementById('liveToast'));
                toast.show();
            },
            goHome: function () {
                document.getElementById("homeTab").click()
            }
        }
    }
</script>

<style scoped>
  .qr-payment {
    margin-top: 10px;
    width: 90%;
  }

  .input-group-text {
    cursor: pointer;
  }

  .bi-files {
    margin-left: 5px;
  }

  .form-control[readonly] {
    background-color: white;
  }

  .input-group-text {
    background-color: #f2f5f8;
  }

  .input-group-text:hover {
    background-color: #edf0f3;
  }

  .dark-theme .input-group-text {
    background-color: #0d0d12;
    border: 1px solid #30363d;
    color: #c9d1d9;
  }

  .dark-theme .input-group-text:hover {
    background-color: #08080c;
  }

  .dark-theme .form-control {
    background-color: #15161e;
    border: 1px solid #30363d;
    color: #c9d1d9;
  }

  .form-control:focus {
    box-shadow: none;
  }

</style>