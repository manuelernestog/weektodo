<template>
  <div class="modal  fade" id="donateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t("donate.contribute") }}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 px-4 mt-3" style="text-align: justify; line-height: 23px;">
              {{ $t("donate.supportMessage1") }}
              <br><br>
              {{ $t("donate.supportMessage2") }}
            </div>
            <div class="col-md-6">
              <ul class="nav nav-tabs" id="myTab" role="tablist" style="display: none">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="homeTab" data-bs-toggle="tab" data-bs-target="#donate-home"
                    role="tab">Home
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
              </ul>
              <div class="tab-content mt-0" id="nav-tabContent">
                <div class="tab-pane fade show active" id="donate-home">
                  <link-list :linkList="donateList"></link-list>
                </div>
                <div class="tab-pane fade" id="donate-rate">
                  <div class="d-flex flex-column mt-3 h-100 ">
                    <link-list :linkList="rateList"></link-list>
                    <button class="btn mt-auto" type="button" @click="goHome">
                      <i class="bi-arrow-left a"></i> {{ $t("donate.goBack") }}
                    </button>
                  </div>
                </div>
                <div class="tab-pane fade" id="donate-share">
                  <div class="d-flex flex-column mt-3 h-100 ">
                    <link-list :linkList="shareList"></link-list>
                    <button class="btn mt-auto" type="button" @click="goHome">
                      <i class="bi-arrow-left a"></i> {{ $t("donate.goBack") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import linkList from "../components/linkList";
import donateLists from "./donate/donateLists";

export default {
  name: "donateModal",
  components: {
    linkList
  },
  data() {
    return {
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
    },
    shareList: function () {
      return donateLists.shareList(this);
    }
  }
}
</script>

<style scoped>
.modal-dialog {
  max-width: 650px;
}

#nav-tabContent {
  margin-top: 20px;
}

.tab-pane {
  min-height: 230px;
}

.nav-tabs {
  border-bottom: none;
}
</style>