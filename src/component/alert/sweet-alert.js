import Swal from "sweetalert2"

export const errorSweetAlert = (title, text, confirmBtnText, action) => {
    const customizedWarningSweetAlert = Swal.mixin({
        customClass: {
            header: 'custom-sweet-alert-header',
            confirmButton: 'btn custom-sweet-alert-warning-confirm-btn',
            container: 'custom-sweet-alert-container',
            popup: 'custom-sweet-alert-popup',
            actions: 'custom-sweet-alert-actions',
            cancelButton: 'btn custom-sweet-alert-warning-cancel-button'
            // cancelButton: 'btn custom-sweet-alert-warning-cancel-button'
        },
        buttonsStyling: false
    })

    customizedWarningSweetAlert.fire({
        icon: "error",
        title: title ? title : null,
        text: text ? text : null,
        showCancelButton: false,
        confirmButtonText: confirmBtnText,
        reverseButtons: false
    }).then((result) => {
        if (result.isConfirmed) {
            if (action !== undefined) {
                action()
            }
        }
    })
}

