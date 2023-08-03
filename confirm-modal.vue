<template>
    <div
        class="modal fade"
        id="confirmModal"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-hidden="true"
        ref="modal"
    >
        <div class="modal-dialog" :class="modalDialogClass">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">
                        {{ title }}
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body" v-html="htmlContent"></div>
                <div class="modal-footer">
                    <div class="confirm-modal__footer">
                        <button
                            @click="onClickCloseBtn()"
                            v-text="cancelButtonText"
                            type="button"
                            class="btn confirm-cancel-btn"
                            :class="_cancelButtonClass"
                        ></button>
                        <button
                            ref="submitBtn"
                            type="button"
                            class="btn confirm-modal__submit-btn"
                            :class="_submitBtnClass"
                            v-text="confirmButtonText"
                            @click="onClickSubmit()"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const CONFIRM_MODAL_CONTAINER_CLASS_NAME = "confirm-modal-container";
import eventBus from "./helpers/event-bus";
import { removeElement } from "./helpers/dom";
import { Modal } from "bootstrap";

export default {
    name: "confirm-modal",

    data: () => ({
        showModal: false,
        modalRef: null,
        modal: null,
    }),

    props: {
        variant: String,
        onClose: {
            type: Function,
            default: () => {},
        },
        size: String,
        title: String,
        icon: String,
        content: String,
        text: String,
        cancelButtonText: {
            type: String,
            default: "Abbrechen",
        },
        cancelButtonVariant: {
            type: String,
            default: "light",
        },
        cancelButtonClass: String,
        cancelButtonDisabled: Boolean,
        confirmButtonText: {
            type: String,
            default: "Bestätigen",
        },
        confirmButtonVariant: {
            type: String,
            default: "primary",
        },
        confirmButtonClass: String,
        confirmButtonDisabled: Boolean,
        modalConfirm: {
            type: Function,
            default: () => {},
        },
        modalCancel: {
            type: Function,
            default: () => {},
        },
        backdrop: {
            type: Boolean,
            default: true,
        },
        centered: {
            type: Boolean,
            default: true,
        },
    },

    methods: {
        initModalRef() {
            this.$refs.submitBtn.$el.focus();
        },

        createParents() {
            this.parentEl = document.querySelector(
                "." + CONFIRM_MODAL_CONTAINER_CLASS_NAME
            );
            if (this.parentEl) return;
            this.parentEl = document.createElement("div");
            this.parentEl.className = CONFIRM_MODAL_CONTAINER_CLASS_NAME;
        },

        onClickSubmit() {
            this.modal.hide();
            eventBus.$emit("modalConfirm");
        },

        setupContainer() {
            const container = document.body;
            container.appendChild(this.parentEl);
        },

        createModal() {
            this.modal = new Modal(this.$refs.modal, {
                keyboard: true,
                backdrop: this.backdrop,
            });
            this.modal.show();
            this.parentEl.insertAdjacentElement("afterbegin", this.$el);
        },

        onClickCloseBtn() {
            this.modal.hide();
            eventBus.$emit("modalCancel");
        },
    },

    computed: {
        htmlContent() {
            if (this.content) return this.content;
            if (this.text) return this.text;

            switch (this.variant) {
                case "delete":
                case "danger":
                    return "Möchten Sie diesen Eintrag wirklich löschen?";
                    break;
                case "confirm":
                    return "Möchten Sie diese Atkion wirklich ausführen?";
                    break;
                default:
                    return "Möchten Sie diesen Eintrag wirklich speichern?";
                    break;
            }
        },

        _cancelButtonClass() {
            return [
                `btn-${this.cancelButtonVariant} ${this.cancelButtonClass}`,
                this.size === "sm" ? "btn-sm" : "",
            ];
        },

        _submitBtnClass() {
            return [
                `btn-${this.confirmButtonVariant} ${this.confirmButtonClass}`,
                this.size === "sm" ? "btn-sm" : "",
            ];
        },

        modalDialogClass() {
            return [
                this.size === "sm" ? "modal-sm" : "",
                this.size === "lg" ? "modal-lg" : "",
                this.size === "xl" ? "modal-xl" : "",
                this.centered ? "modal-dialog-centered" : "",
            ];
        },
    },

    beforeMount() {
        this.createParents();
        this.setupContainer();
    },

    mounted() {
        this.createModal();
        eventBus.$on("toast-clear", this.close);
    },
};
</script>

<style lang="scss">
.confirm-modal__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.confirm-modal__submit-btn {
    margin-left: 0.35rem;
}
</style>
