import Swal from "sweetalert2"

export const alertSuccess = (message) => {
    return Swal.fire({
        icon: "success",
        title: "Éxito",
        text: message,
        confirmButtonColor: "#ff6b00"
    })
}

export const alertError = (message) => {
    return Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        confirmButtonColor: "#ff6b00"
    })
}

export const alertWarning = (message) => {
    return Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: message,
        confirmButtonColor: "#ff6b00"
    })
}

export const alertLoading = (message = "Procesando...") => {
    Swal.fire({
        title: message,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    })
}

export const toastSuccess = (message) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 2500
    })
}