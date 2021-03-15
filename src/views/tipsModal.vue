<template>
  <div class="modal  fade" id="tipsModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{$t('tips.tips')}}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body d-flex">
          <div style="margin: 5px">
            <i class="bi-info-circle" style="font-size: 38px; margin-right: 30px; "></i>
          </div>
          <div style="margin-top: 9px">
            {{tips[index].text}}
          </div>
        </div>
        <div class="modal-footer d-flex">
          <button type="button" class="btn flex-fill" @click="forward"><i class="bi-chevron-double-left"></i>
            {{$t('tips.forward')}}
          </button>
          <button type="button" class="btn flex-fill" @click="next">{{$t('tips.next')}} <i
            class="bi-chevron-double-right"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "tipsModal",
        data() {
            return {
                tips: [
                    {text: this.$i18n.t("tips.tip1")},
                    {text: this.$i18n.t("tips.tip2")},
                    {text: this.$i18n.t("tips.tip3")},
                    {text: this.$i18n.t("tips.tip4")},
                    {text: this.$i18n.t("tips.tip5")},
                    {text: this.$i18n.t("tips.tip6")},
                    {text: this.$i18n.t("tips.tip7")},
                    {text: this.$i18n.t("tips.tip8")},
                    {text: this.$i18n.t("tips.tip9")},
                    {text: this.$i18n.t("tips.tip13")},
                    {text: this.$i18n.t("tips.tip10")},
                    {text: this.$i18n.t("tips.tip11")},
                    {text: this.$i18n.t("tips.tip12")}
                ],
                index: 0
            }
        },
        methods: {
            next: function () {
                if (this.index == this.tips.length - 1) {
                    this.index = 0;
                } else {
                    this.index++;
                }
            },
            forward: function () {
                if (this.index == 0) {
                    this.index = this.tips.length - 1;
                } else {
                    this.index--;
                }
            }
        }
    }
</script>

<style scoped>
  .modal-dialog {
    max-width: 600px;
  }

  .modal-body {
    height: 120px;
  }

  .bi-info-circle {
    background: -webkit-linear-gradient(180deg, rgba(89,66,141,1) 0%, rgba(114,78,156,1) 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .dark-theme .bi-info-circle {
    background: -webkit-linear-gradient(180deg, rgb(115, 75, 176) 0%, rgb(147, 110, 203) 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }


</style>