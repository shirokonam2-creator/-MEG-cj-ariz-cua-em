// ==========================================
// ArizuOS Launcher
// ==========================================

// Đồng hồ
function updateClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const time = `${hours}:${minutes}`;

    const clock = document.getElementById("clock");
    const statusTime = document.getElementById("statusTime");

    if (clock) clock.textContent = time;
    if (statusTime) statusTime.textContent = time;

    updateDate(now);
}


// Ngày
function updateDate(date) {
    const days = [
        "Chủ Nhật",
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7"
    ];

    const day = days[date.getDay()];
    const dateNumber = date.getDate();
    const month = date.getMonth() + 1;

    const dateElement = document.getElementById("date");

    if (dateElement) {
        dateElement.textContent =
            `${day}, ${dateNumber} Tháng ${month}`;
    }
}


// Tìm kiếm
function searchWeb() {
    const input = document.getElementById("searchInput");

    if (!input) return;

    const query = input.value.trim();

    if (query === "") {
        showToast("Hãy nhập nội dung cần tìm 🔍");
        return;
    }

    const url =
        "https://www.google.com/search?q=" +
        encodeURIComponent(query);

    window.open(url, "_blank");
}


// Nhấn Enter để tìm kiếm
const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchWeb();
        }

    });
}


// Mở ARIZUOS
function openAI() {
    showToast("ARIZUOS đang khởi động 🤖");
}


// Mở ứng dụng
function openApp(appName) {

    const appNames = {
        files: "Tệp",
        settings: "Cài đặt",
        backup: "Backup & Restore",
        games: "Game Hub",
        browser: "Trình duyệt",
        gallery: "Thư viện",
        music: "Nhạc",
        video: "Video",
        apps: "Ứng dụng",
        phone: "Điện thoại",
        messages: "Tin nhắn",
        camera: "Camera"
    };

    const name = appNames[app