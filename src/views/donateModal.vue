<template>
  <div class="modal  fade" id="donateModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t("donate.donate") }}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <text>
            {{ $t("donate.mainMessage") }}
          </text>

          <ul class="nav nav-tabs" id="myTab" role="tablist" style="display: none">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="homeTab" data-bs-toggle="tab" data-bs-target="#donate-home"
                      role="tab">Home
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" ref="btcTab" data-bs-toggle="tab" data-bs-target="#donate-btc"
                      role="tab">btc
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" ref="ethTab" data-bs-toggle="tab" data-bs-target="#donate-eth"
                      role="tab">eth
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" ref="usdtTab" data-bs-toggle="tab" data-bs-target="#donate-usdt"
                      role="tab">usdt
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" ref="enzonaTab" data-bs-toggle="tab" data-bs-target="#donate-enzona"
                      role="tab">enz
              </button>
            </li>
          </ul>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="donate-home">
              <div class="row">
                <payment-method :name="$t('donate.comment')" icon="bi-chat-text-fill" @clickBtn="sendEmail"
                                col-length="4"></payment-method>
<!--                <payment-method name="PayPal" img="icons/paypal.png" col-length="3"></payment-method>-->
                <payment-method name="Bitcoin" img="icons/btc.svg" @clickBtn="$refs.btcTab.click()"
                                col-length="4"></payment-method>
                <payment-method name="Ethereum" img="icons/eth.svg" @clickBtn="$refs.ethTab.click()"
                                col-length="4"></payment-method>
                <payment-method name="ENZONA" img="icons/enzona.png" @clickBtn="$refs.enzonaTab.click()"
                                col-length="4"></payment-method>
                <payment-method :name="`Qvapay ( Payeer | Airtm | ${$t('donate.otherCrypto')} )`" img="icons/qvapay.png"
                                @clickBtn="goToQvaPay" col-length="8"></payment-method>
              </div>
            </div>
            <div class="tab-pane fade" id="donate-btc">
              <payment-details
                address="bc1qy7x0au4tk3h2mvkl3cg5ns5hjqeg7r6snh8z0a"
                payment="Bitcoin"
                qr-img="payment_qr/btc_address.jpg"
              ></payment-details>
            </div>
            <div class="tab-pane fade" id="donate-eth">
              <payment-details
                address="0xc9D838529fF65228100ccE0A7Bb0427763E321B6"
                payment="Ethereum"
                qr-img="payment_qr/eth_address.jpg"
              ></payment-details>
            </div>
            <div class="tab-pane fade" id="donate-enzona">
              <payment-details
                payment="ENZONA"
                qr-img="payment_qr/enzona.png"
              ></payment-details>
            </div>
          </div>
        </div>
      </div>
    </div>

    <toast-message ref="copiedAddress" id="copiedAddress" :text="$t('donate.copiedAddres')"></toast-message>
  </div>
</template>

<script>
    import paymentDetails from "./donate/paymentDetails";
    import paymentMethod from "../components/paymentMethod";
    import toastMessage from "../components/toastMessage";

    export default {
        name: "donateModal",
        components: {
            paymentDetails,
            paymentMethod,
            toastMessage
        },
        data() {
            return {}
        },
        methods: {
            sendEmail: function () {
                window.location = "mailto:weektodoapp@gmail.com";
            },
            goToQvaPay: function () {
                let isElectron = require("is-electron");
                if (isElectron()) {
                    require('electron').shell.openExternal('https://qvapay.com/payme/merodriguez9112', '_blank');
                } else {
                    window.open('https://qvapay.com/payme/merodriguez9112', '_blank');
                }
            }
        }
    }
</script>

<style scoped>
  .modal-dialog {
    max-width: 720px;
  }

  #nav-tabContent {
    margin-top: 20px;
  }

  .tab-pane {
    height: 300px;
  }

  .nav-tabs {
    border-bottom: none;
  }
</style>