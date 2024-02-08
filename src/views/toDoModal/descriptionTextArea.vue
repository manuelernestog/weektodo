<template>
    <div class="position-relative" v-show="editingDescription">
        <textarea class="todo-description-textarea mt-2" @input="resizeTextArea" :placeholder="$t('todoDetails.notes')"
            ref="descriptionInput" @blur="doneEditDescription" v-model="desc">
                </textarea>
        <i class="bi-markdown-fill" @mousedown="goToMarkDown" :title="$t('todoDetails.markdown')"></i>
    </div>
    <div v-show="!editingDescription && desc != ''" class="mt-2 todo-description" @dblclick="editDescription"
        v-html="todoDescription()"> </div>
    <div v-show="!editingDescription && desc.replace(/^\s*$(?:\r\n?|\n)/gm, '') == ''" @dblclick="editDescription"
        class="description-empty mt-2">
        {{ $t("todoDetails.notes") }}
    </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import markdownTargetBlankLinks from '../../helpers/markdownTargetBlankLinks';


export default {
    name: "descriptionTextArea",
    emits: ["updatedDescription"],
    data() {
        return {
            desc: "",
            editingDescription: false,
            md: new MarkdownIt()
        }
    },
    mounted() {
        markdownTargetBlankLinks.renderBlankLinks(this.md);
    },
    props: {
        todoDesc: { required: true }
    },
    methods: {
        resizeTextArea: function () {
            let textArea = this.$refs["descriptionInput"];
            textArea.style.height = "18px";
            textArea.style.height = textArea.scrollHeight + "px";
        },
        editDescription: function () {
            this.editingDescription = true;
            this.$nextTick(function () {
                this.resizeTextArea();
                this.$refs["descriptionInput"].focus();
                this.$refs["descriptionInput"].setSelectionRange(0, 0);
                this.$refs["descriptionInput"].scrollTop = 0;
            });
        },
        doneEditDescription: function () {
            this.editingDescription = false;
            this.$emit('updatedDescription', this.desc);
        },
        todoDescription: function () {
            return this.md.render(this.desc);
        },
        goToMarkDown: function () {
            window.open("https://commonmark.org/help/", "_blank");
        },
    },
    watch: {
        todoDesc(newValue) {
            this.desc = newValue
        }
    }
}

</script>

<style>
.todo-description-textarea {
    font-size: 14px;
    line-height: 19px;
    min-height: 150px;
    overflow: hidden;
    width: 100%;
    resize: none;
    background: unset;
    cursor: auto;
    outline: unset;
    border: 2px solid black;
    border-radius: 3px;

    .dark-theme & {
        border: 1px solid rgba(255, 255, 255, 0.658);
        color: #c9d1d9;
    }
}

.bi-markdown-fill {
    font-size: 20px;
    margin-top: -50px;
    position: absolute;
    right: 10px;
    bottom: 5px;
    opacity: 0.3;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }
}


.todo-description {
    word-wrap: break-word;
    zoom: 89%;
    user-select: auto;
    -moz-user-select: auto;
    -webkit-user-drag: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    padding: 4px;
    border: 2px solid transparent;
}

.description-empty {
    color: grey;
    font-size: 14px;
    line-height: 21px;
    padding: 2px;
    border: 2px solid transparent;
}
</style>