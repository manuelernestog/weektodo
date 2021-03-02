<template>
  <div class="modal  fade" id="donateModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Donate</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <h6>
            Si te gustaria contribuir con la aplicacion blbla cualquier donacion que hagas seria de gran ayuda.
          </h6>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="donate-home">
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <div class="row">
                    <div class="col-md-3">
                      <div class="card" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button">
                        <div class="card-body">
                          <i class="bi-chat-text-fill" style="font-size: 40px; color: #8dc351"></i>
                        </div>
                        <div class="card-footer">
                          <div>Comment</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="card">
                        <div class="card-body">
                          <img src="icons/paypal.png" width="50" height="50">
                        </div>
                        <div class="card-footer">
                          <div>PayPal</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="card " data-bs-toggle="tab" data-bs-target="#donate-btc" type="button">
                        <div class="card-body">
                          <img src="icons/btc.svg" width="50" height="50">
                        </div>
                        <div class="card-footer">
                          <div>Bitcoin</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="card ">
                        <div class="card-body">
                          <img src="icons/eth.svg" width="50" height="50">
                        </div>
                        <div class="card-footer">
                          <div>ETH</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="card ">
                        <div class="card-body">
                          <img src="icons/usdt.svg" width="50" height="50">
                        </div>
                        <div class="card-footer">
                          <div>USDT</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="card ">
                        <div class="card-body">
                          <img src="icons/enzona.png" width="50" height="50">
                        </div>
                        <div class="card-footer">
                          <div>Enzona</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="card">
                        <div class="card-body">
                          <img src="icons/qvapay.png" width="50" height="50">
                        </div>
                        <div class="card-footer">
                          <div>Qvapay (Payeer, Aritm and Other Altcoins)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            <div class="tab-pane fade" id="donate-btc">
              <img src="payment_qr/btc_address.jpg" style="height: 90%">
              bc1qy7x0au4tk3h2mvkl3cg5ns5hjqeg7r6snh8z0a
            </div>
            <div class="tab-pane fade" id="nav-contact">...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "donateModal",
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>
  .btn:hover {
    background-color: #eaecef;
  }

  .btn:active {
    background-color: #d0d2d5;
  }

  .btn:focus {
    box-shadow: none;
  }

  .dark-theme .btn {
    color: #c9d1d9;
  }

  .dark-theme .btn:hover {
    color: #c9d1d9;
    background-color: #2e353d;
  }

  .dark-theme .btn:active {
    color: #c9d1d9;
    background-color: #343b43;
  }

  .modal-dialog {
    max-width: 800px;
  }

  .card {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  .card-footer {
    width: 100%;
    text-align: center;
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

  .dark-theme .card {
    background-color: #15161e;
    border: 1px solid #30363d;
  }

  .dark-theme .card-footer {
    background-color: #0d0d12;
    border-top: 1px solid #30363d;
  }

</style>