const socket = io();

let user;
let chatBox = document.querySelector("#chatBox");
let messagesLogs = document.querySelector("#messagesLogs");

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa el usuario para identificarte en el CoderChat",
    inputValidator: (value) => {
        return !value && "¡Necesitas identificarte para continuar!";
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    console.log(`Tu nombre de usuario es ${user}`);

    socket.emit("userConnect", user);
});

chatBox.addEventListener("keypress", e => {
    if (e.key == "Enter") {
        if (chatBox.value.trim().length > 0) {
            console.log(`Mensaje: ${chatBox.value}`);

            socket.emit("message", {
                user,
                message: chatBox.value
            });

            chatBox.value = "";
        }
    }
});
