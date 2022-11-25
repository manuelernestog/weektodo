<template>
  <div class="modal fade" id="welcomeModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body pb-2">
          <ul class="nav nav-tabs d-none" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#welcome-1" id="welcome-1-tab"
                      role="tab">1
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#welcome-2" id="welcome-2-tab"
                      role="tab">2
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#welcome-2-1" id="welcome-2-1-tab"
                      role="tab">2-1
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#welcome-3" id="welcome-3-tab"
                      role="tab">3
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#welcome-4" id="welcome-4-tab"
                      role="tab">4
              </button>
            </li>
          </ul>
          <div class="tab-content mt-4" id="nav-tabContent">
            <div class="tab-pane fade show active" id="welcome-1">
              <language-view></language-view>
            </div>
            <div class="tab-pane fade" id="welcome-2">
              <theme-view></theme-view>
            </div>
              <div class="tab-pane fade" id="welcome-2-1">
              <app-view></app-view>
            </div>
            <div class="tab-pane fade" id="welcome-3">
              <backup-view></backup-view>
            </div>
            <div class="tab-pane fade" id="welcome-4">
              <done-view></done-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import LanguageView from "./welcome/languageView";
    import ThemeView from "./welcome/themeView";
    import doneView from "./welcome/doneView";
    import backupView from "./welcome/privacityView";
    import appView from "./welcome/appView";

    export default {
        name: "aboutModal",
        components: {
            LanguageView,
            ThemeView,
            doneView,
            backupView,
            appView
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>
  .modal-dialog {
    max-width: 550px;
  }
</style>