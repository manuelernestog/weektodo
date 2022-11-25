<template>
  <div class="row">
    <div class="col-md-4">
      <div class="icon-container">
        <i class="bi-check-circle"></i>
      </div>
    </div>
    <div class="col-md-8">
      <div>
        <h4> {{$t('welcome.allReady')}}</h4>
        <h6> {{$t('welcome.allReadyText')}} </h6>
        <span class="sub-header"> {{$t('welcome.allReadySub')}} <i
          class="bi-info-square"></i></span>
      </div>
    </div>
  </div>
  <div class="d-flex btn-footer mt-3">
    <button type="button" class="btn flex-fill" @click="back"><i class="bi-chevron-double-left"></i>
      {{$t('welcome.next')}}
    </button>
    <button type="button" class="btn flex-fill" data-bs-dismiss="modal" @click="finish">{{$t('welcome.ready')}}</button>
  </div>

</template>

<script>
    import initialDataCreator from "../../helpers/initialDataCreator";

    export default {
        name: "doneView",
        data() {
            return {
                darkTheme: this.$store.getters.config.darkTheme
            }
        },
        methods: {
            back: function () {
                document.getElementById('welcome-3-tab').click();
            },
            finish: function () {
                initialDataCreator.create(this);
            }
        }
    }
</script>

<style scoped>

  .form-check-input {
    width: 2.8em !important;
    height: 1.4em !important;
  }

  .bi-sun {
    margin-right: 15px;
  }

  .form-check-label i {
    font-size: 2rem;
    /*margin: 5px;*/
  }

  .icon-container i {
    font-size: 6rem;
    background: -webkit-linear-gradient(180deg, rgba(89, 66, 141, 1) 0%, rgba(114, 78, 156, 1) 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .dark-theme .icon-container i {
    color: #f3f3f3;
    background: -webkit-linear-gradient(180deg, rgb(115, 75, 176) 0%, rgb(147, 110, 203) 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .icon-container {
    margin-top: 20px;
    margin-left: 20px;
  }

  .btn-footer {
    border-top: 1px solid #dee2e6;
    padding-top: 6px
  }

  .dark-theme .btn-footer {
    border-top: 1px solid #999da1;
  }

  .sub-header {
    font-size: 0.9rem;
    font-style: italic;
  }

  .sub-header i {
    margin-left: 5px;
  }


</style>