## Quick Start Usage

In main.js

```js
import ConfirmModal from "confirm-modal";

app.use(ConfirmModal);
```

Example

```js
this.$confirmModal
    .show({
        title: "Title",
        content: "<div>Content</div>",
        confirmButtonText: "confirm",
        cancelButtonText: "cancel",
        confirmButtonVariant: "primary",
        cancelButtonVariant: "danger",
    })
    .then((confirmed) => {
        console.log(confirmed);
    });
```
