function showToast(text) {

    const toast =
        document.getElementById("toast");

    toast.textContent = text;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);
}


function goBack() {

    window.history.back();

}


function showInfo() {

    showToast(
        "Backup giúp bảo vệ dữ liệu trước khi thay đổi hệ thống."
    );

}


function changeStorage() {

    showToast(
        "Chọn bộ nhớ sẽ được thêm ở module Storage."
    );

}


function getSelectedData() {

    const data = [];

    if (
        document.getElementById("photos").checked
    ) {
        data.push("Ảnh");
    }

    if (
        document.getElementById("videos").checked
    ) {
        data.push("Video");
    }

    if (
        document.getElementById("documents").checked
    ) {
        data.push("Tài liệu");
    }

    if (
        document.getElementById("files").checked
    ) {
        data.push("Tệp cá nhân");
    }

    if (
        document.getElementById("settings").checked
    ) {
        data.push("Cài đặt");
    }

    if (
        document.getElementById("appData").checked
    ) {
        data.push("Dữ liệu ứng dụng");
    }

    return data;
}


function startBackup() {

    const selected =
        getSelectedData();


    if (selected.length === 0) {

        showToast(
            "Hãy chọn ít nhất một loại dữ liệu."
        );

        return;
    }


    const progress =
        document.getElementById("progress");

    const fill =
        document.getElementById("progressFill");

    const percent =
        document.getElementById("progressPercent");

    const text =
        document.getElementById("progressText");


    progress.classList.add("show");


    let value = 0;


    const timer =
        setInterval(() => {

            value += 5;

            if (value > 100) {
                value = 100;
            }


            fill.style.width =
                value + "%";


            percent.textContent =
                value + "%";


            if (value < 30) {

                text.textContent =
                    "Chuẩn bị dữ liệu...";

            } else if (value < 60) {

                text.textContent =
                    "Đang sao chép dữ liệu...";

            } else if (value < 90) {

                text.textContent =
                    "Đang kiểm tra bản sao...";

            } else {

                text.textContent =
                    "Đang hoàn tất...";

            }


            if (value === 100) {

                clearInterval(timer);

                setTimeout(() => {

                    progress.classList.remove(
                        "show"
                    );

                    fill.style.width = "0%";

                    percent.textContent = "0%";

                    text.textContent =
                        "Chuẩn bị dữ liệu...";


                    showToast(
                        "Backup hoàn tất ✓"
                    );

                }, 700);

            }

        }, 120);

}


function openManager() {

    showToast(
        "Backup Manager đang được phát triển 📦"
    );

}