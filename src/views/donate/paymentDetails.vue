<template>
  <div class="d-flex flex-column mt-3 h-100">
    <div class="col-12 d-flex flex-column align-items-center">
      <img class="qr-payment" :src="qrImg">
    </div>
    <div class="mb-2 mt-2 w-100 text-center">
      <h6 class="d-inline"> {{$t("donate.paymentType")}}: </h6> {{payment}}
    </div>
    <div class="col-md-12 d-flex flex-column mt-3 ">
      <div v-if="paymentAddress" class="d-flex flex-column align-items-center">
        <label class="form-label">{{$t("donate.address")}} </label>
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="paymentAddress" readonly>
          <span class="input-group-text" id="basic-addon2" @click="copy">{{$t("donate.copy")}} <i
            class="bi-files"> </i></span>
        </div>
      </div>
    </div>
    <button class="btn mt-auto" type="button" @click="goHome">
      <i class="bi-arrow-left a"></i> {{$t("donate.goBack")}}
    </button>
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
                var toast = new Toast(document.getElementById('copiedAddress'));
                toast.show();
            },
            goHome: function () {
                document.getElementById("cryptoTab").click()
            }
        }
    }
</script>

<style scoped>
  .qr-payment {
    margin-top: 10px;
    height: 120px;
    align-self: center;
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