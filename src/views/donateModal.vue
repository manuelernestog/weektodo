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
          <!--          <nav>-->
          <!--            <div class="nav nav-tabs" id="nav-tab" role="tablist">-->
          <!--              <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>-->
          <!--              <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>-->
          <!--              <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>-->
          <!--            </div>-->
          <!--          </nav>-->
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <div class="d-flex">
                <div class="card">
                  <div class="card-body">
                    <img src="icons/paypal.png" width="50" height="50">
                  </div>
                  <div class="card-footer">
                    <div>PayPal</div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <img src="icons/btc.svg" width="50" height="50">
                  </div>
                  <div class="card-footer">
                    <div>Bitcoin</div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <img src="icons/eth.svg" width="50" height="50">
                  </div>
                  <div class="card-footer">
                    <div>ETH</div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <img src="icons/usdt.svg" width="50" height="50">
                  </div>
                  <div class="card-footer">
                    <div>USDT</div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <img src="icons/enzona.png" width="50" height="50">
                  </div>
                  <div class="card-footer">
                    <div>Enzona</div>
                  </div>
                </div>
                <div class="card" style="width: 220px">
                  <div class="card-body">
                    <img src="icons/qvapay.png" width="50" height="50">
                  </div>
                  <div class="card-footer">
                    <div>Qvapay (Airtm, Payeer, Other Cryptocurrencies)</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
            <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
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

  .card{
    width: 88px;
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

  .card-footer{
    width: 100%;
    text-align: center;
  }

  #nav-tabContent{
    margin-top: 20px;
  }

</style>