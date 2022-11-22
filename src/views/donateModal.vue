<template>
  <div class="modal  fade" id="donateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t("donate.supportUs") }}</h5>
          <i class="bi-x close-modal" data-bs-dismiss="modal"></i>
        </div>
        <div class="modal-body">
          <div class="row">
            <div style="text-align: justify; line-height: 21px;">
              {{ $t("donate.supportMessage1") }}
            </div>
            <div>
              <ul class="nav nav-tabs" id="myTab" role="tablist" style="display: none">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="homeTab" data-bs-toggle="tab" data-bs-target="#donate-home"
                    role="tab">Home
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
                <div class="tab-pane fade" id="donate-share">
                  <div class="d-flex flex-column mt-3 h-100 ">
                    <link-list :linkList="shareList"></link-list>
                    <div class="input-group mt-2 mb-3 px-3">
                      <input type="text" class="form-control" value="https://weektodo.me" disabled>
                      <button class="btn btn-outline-secondary" type="button" @click="copy">{{ $t("donate.copy") }}
                        <i class="bi-clipboard" style="padding-left: 5px;"></i></button>
                    </div>
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
import { Toast } from 'bootstrap';

export default {
  name: "donateModal",
  components: {
    linkList
  },
  methods: {
    goHome: function () {
      document.getElementById("homeTab").click()
    },
    async copy() {
      await navigator.clipboard.writeText("https://weektodo.me");
      var toast = new Toast(document.getElementById('copiedAddress'));
      toast.show();
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
  max-width: 400px;
}

#nav-tabContent {
  margin-top: 20px;
}


#donate-home {
  margin-top: 10px;
}

.nav-tabs {
  border-bottom: none;
}

.btn-outline-secondary {
  border: 1px solid #ced4da;
  opacity: 1;
}

.form-control:disabled{
  opacity: 1;
}

.btn-outline-secondary {
  color: rgb(66, 66, 66);
}
.btn-outline-secondary:hover {
  color: rgb(66, 66, 66);
}

.dark-theme .btn-outline-secondary {
  border: 1px solid #ced4da;

}

.dark-theme .btn-outline-secondary:hover {
  opacity: 1;
}
</style>