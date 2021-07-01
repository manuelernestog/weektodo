<template>
  <div class="modal  fade" id="donateModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t("donate.contribute") }}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <div style="text-align: justify; font-size: .95rem;">
            {{ $t("donate.mainMessage") }}
          </div>

          <ul class="nav nav-tabs" id="myTab" role="tablist" style="display: none">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="homeTab" data-bs-toggle="tab" data-bs-target="#donate-home"
                      role="tab">Home
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="cryptoTab" data-bs-toggle="tab" data-bs-target="#donate-crypto"
                      role="tab">Crypto
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="rateTab" data-bs-toggle="tab" data-bs-target="#donate-rate"
                      role="tab">Rate
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="shareTab" data-bs-toggle="tab" data-bs-target="#donate-share"
                      role="tab">Share
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="btcTab" data-bs-toggle="tab" data-bs-target="#donate-btc"
                      role="tab">btc
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="ethTab" data-bs-toggle="tab" data-bs-target="#donate-eth"
                      role="tab">eth
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="usdtTab" data-bs-toggle="tab" data-bs-target="#donate-usdt"
                      role="tab">usdt
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="dogeTab" data-bs-toggle="tab" data-bs-target="#donate-doge"
                      role="tab">doge
              </button>
            </li>
          </ul>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="donate-home">
              <link-list :linkList="donateList"></link-list>
            </div>
            <div class="tab-pane fade" id="donate-crypto">
              <div class="d-flex flex-column mt-3 h-100 ">
                <link-list :linkList="cryptoList"></link-list>
                <button class="btn mt-auto" type="button" @click="goHome">
                  <i class="bi-arrow-left a"></i> {{$t("donate.goBack")}}
                </button>
              </div>
            </div>
            <div class="tab-pane fade" id="donate-rate">
              <div class="d-flex flex-column mt-3 h-100 ">
                <link-list :linkList="rateList"></link-list>
                <button class="btn mt-auto" type="button" @click="goHome">
                  <i class="bi-arrow-left a"></i> {{$t("donate.goBack")}}
                </button>
              </div>
            </div>
            <div class="tab-pane fade" id="donate-share">
              <div class="d-flex flex-column mt-3 h-100 ">
                <link-list :linkList="shareList"></link-list>
                <button class="btn mt-auto" type="button" @click="goHome">
                  <i class="bi-arrow-left a"></i> {{$t("donate.goBack")}}
                </button>
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
            <div class="tab-pane fade" id="donate-usdt">
              <payment-details
                address="0xc9D838529fF65228100ccE0A7Bb0427763E321B6"
                payment="USDT (ERC20)"
                qr-img="payment_qr/usdt.jpg"
              ></payment-details>
            </div>
            <div class="tab-pane fade" id="donate-doge">
              <payment-details
                address="D7xwFNwEr66YEWahycouA8oUaxsPzD3m4U"
                payment="DOGE"
                qr-img="payment_qr/doge.jpg"
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
    import toastMessage from "../components/toastMessage";
    import linkList from "../components/linkList";
    import donateLists from "./donate/donateLists";

    export default {
        name: "donateModal",
        components: {
            paymentDetails,
            toastMessage,
            linkList
        },
        data() {
            return {
                cryptoList: donateLists.cryptoList(this),
                shareList: donateLists.shareList(),
                rateList: donateLists.rateList(),
            }
        },
        methods: {
            sendEmail: function () {
                window.location = "mailto:week2do@gmail.com";
            },
            goHome: function () {
                document.getElementById("homeTab").click()
            }
        },
        computed: {
            donateList: function () {
                return donateLists.donateList(this);
            }
        }
    }
</script>

<style scoped>
  .modal-dialog {
    max-width: 400px;
  }

  #nav-tabContent {
    margin-top: 20px;
  }

  .tab-pane {
    height: 350px;
  }

  .nav-tabs {
    border-bottom: none;
  }
</style>