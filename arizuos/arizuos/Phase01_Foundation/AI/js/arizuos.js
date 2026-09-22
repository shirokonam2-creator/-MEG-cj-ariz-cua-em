const input =
    document.getElementById("messageInput");

const messages =
    document.getElementById("messages");

const stage =
    document.querySelector(".ai-stage");

const status =
    document.getElementById("status");


/* =========================
   TOAST
========================= */

function showToast(text) {

    const toast =
        document.getElementById("toast");

    toast.textContent = text;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);
}


/* =========================
   AI THINKING
========================= */

function setThinking(value) {

    stage.classList.toggle(
        "thinking",
        value
    );

    if (value) {

        status.innerHTML =
            '<i></i> ARIZUOS đang suy nghĩ...';

    } else {

        status.innerHTML =
            '<i></i> ARIZUOS đang hoạt động';
    }
}


/* =========================
   THÊM TIN NHẮN
========================= */

function addMessage(text, type) {

    const message =
        document.createElement("div");

    message.className =
        "message " + type;

    message.textContent = text;

    messages.appendChild(message);

    const chat =
        document.querySelector(".chat");

    chat.scrollTop =
        chat.scrollHeight;
}


/* =========================
   PHẢN HỒI AI
========================= */

function getResponse(text) {

    const t =
        text.toLowerCase();


    if (
        t.includes("chào") ||
        t.includes("hello") ||
        t.includes("hi")
    ) {

        return (
            "Xin chào! 👋 " +
            "Mình là ARIZUOS, " +
            "AI hệ thống của ArizuOS."
        );
    }


    if (
        t.includes("bạn là ai") ||
        t.includes("arizuos")
    ) {

        return (
            "Mình là ARIZUOS — " +
            "System AI duy nhất của ArizuOS."
        );
    }


    if (
        t.includes("ram")
    ) {

        return (
            "RAM Monitor sẽ hiển thị " +
            "mức sử dụng RAM khi module " +
            "hệ thống được kết nối."
        );
    }


    if (
        t.includes("bộ nhớ") ||
        t.includes("dung lượng")
    ) {

        return (
            "ArizuOS ưu tiên bảo vệ " +
            "dữ liệu người dùng và " +
            "không tự ý xóa dữ liệu " +
            "để giải phóng RAM."
        );
    }


    if (
        t.includes("backup") ||
        t.includes("sao lưu")
    ) {

        return (
            "Backup Manager sẽ tạo " +
            "bản sao mà không thay thế " +
            "dữ liệu gốc."
        );
    }


    if (
        t.includes("game") ||
        t.includes("game mode")
    ) {

        return (
            "Game Mode sẽ ưu tiên " +
            "tài nguyên cho game và " +
            "hạn chế tác vụ nền " +
            "không cần thiết."
        );
    }


    if (
        t.includes("hệ thống") ||
        t.includes("system")
    ) {

        return (
            "Module kiểm tra hệ thống " +
            "đang ở trạng thái phát triển."
        );
    }


    return (
        "Mình đã nhận được yêu cầu. " +
        "Module AI nâng cao của " +
        "ARIZUOS đang được phát triển."
    );
}


/* =========================
   GỬI TIN NHẮN
========================= */

function sendMessage() {

    const text =
        input.value.trim();

    if (text === "") {
        return;
    }


    addMessage(
        text,
        "user"
    );


    input.value = "";


    setThinking(true);


    setTimeout(() => {

        const answer =
            getResponse(text);

        setThinking(false);

        addMessage(
            answer,
            "ai"
        );

    }, 700);
}


/* =========================
   CÂU HỎI NHANH
========================= */

function quickAsk(text) {

    input.value = text;

    sendMessage();
}


/* =========================
   ENTER
========================= */

input.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            sendMessage();
        }

    }
);


/* =========================
   QUAY LẠI
========================= */

function goBack() {

    window.history.back();
}


/* =========================
   MENU
========================= */

function showMenu() {

    showToast(
        "Menu ARIZUOS đang phát triển ⚙️"
    );
}


/* =========================
   KHỞI ĐỘNG
========================= */

window.addEventListener(
    "load",
    function() {

        setTimeout(() => {

            showToast(
                "ARIZUOS đã sẵn sàng 🤖"
            );

        }, 600);

    }
);