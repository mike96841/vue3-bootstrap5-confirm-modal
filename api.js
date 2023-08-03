import ConfirmModal from "./confirm-modal.vue";
import eventBus from "./helpers/event-bus.js";
import mount from "./helpers/mount-component";

const Api = (globalOptions = {}) => {
    return {
        show(options = {}) {
            return new Promise((resolve, reject) => {
                const props = { ...globalOptions, ...options };
                const modal = mount(ConfirmModal, { props });

                eventBus.$on("modalConfirm", () => {
                    resolve(true);
                    modal.destroy();
                });
                eventBus.$on("modalCancel", () => {
                    resolve(false);
                    modal.destroy();
                });
                eventBus.$on("modalClear", () => {
                    resolve(null);
                    modal.destroy();
                });
            });
        },

        clear() {
            eventBus.$emit("modalClear");
        },
    };
};

export default Api;
