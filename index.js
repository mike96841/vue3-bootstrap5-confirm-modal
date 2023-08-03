import ConfirmModal from "./confirm-modal.vue";
import createPseuoModal from "./api.js";

const Plugin = (app, options = {}) => {
    let methods = createPseuoModal(options);
    app.$confirmModal = methods;
    app.config.globalProperties.$confirmModal = methods;
};

ConfirmModal.install = Plugin;

export default ConfirmModal;
export { ConfirmModal, createPseuoModal };
